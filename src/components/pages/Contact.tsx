"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ComponentType, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image, { type StaticImageData } from "next/image";
import { m, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
  ClipboardPen,
  FileText,
  LayoutList,
  Loader2,
  Lock,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone,
  Send,
  User,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";

import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { api } from "@/lib/api";
import { useSettings } from "@/hooks/useSettings";
import heroImg from "@/assets/banner/contact.webp";
import officeGhaziabad from "@/assets/image/c1.webp";
import officeDelhi from "@/assets/image/c2.webp";
import officeMumbai from "@/assets/image/c3.webp";

const SERVICES_DATA = {
  "Interiors": ["Retail Interior", "Corporate Interior", "Restaurant Interior", "Shop in Shops"],
  "Merchandising": ["Retail Display Merchandising", "Acrylic Display", "Gondolas", "Window Display"],
  "Kiosk": ["Retail Kiosk", "Mobile Booth"],
  "Signage": [],
  "Exhibitions & Events": [],
  "Office Interior": ["Modular Work Station", "MD Cabin", "Chairs"],
  "Furniture": ["Wardrobe", "Kitchen", "LCD Unit", "Dressing Table", "Sofas"]
};

// Fixed here, as in the design (not taken from Settings → Phones)
const CONTACT_PHONES = ["+91 9654900525", "+91 9810247319"];
const FALLBACK_EMAIL = "info@designhouse.co.in";

const HERO_POINTS: { icon: ComponentType<{ className?: string; strokeWidth?: number }>; label: string }[] = [
  { icon: MapPin, label: "Discuss\nYour Idea" },
  { icon: ClipboardPen, label: "Expert\nGuidance" },
  { icon: MessageCircleMore, label: "End-to-End\nSupport" },
];

// lines: the address as printed on the card, one entry per line (as in the design)
const OFFICES: { label: string; city: string; lines: string[]; query: string; img: StaticImageData }[] = [
  {
    label: "Head Office",
    city: "Ghaziabad",
    lines: ["Plot No. 12/29, Site-II Industrial Area,", "Loni Road, Mohan Nagar, Ghaziabad,", "Uttar Pradesh 201007, India"],
    query: "Design House India Pvt Ltd, Plot No. 12/29, Site-II Industrial Area, Loni Road, Mohan Nagar, Ghaziabad 201007",
    img: officeGhaziabad,
  },
  {
    label: "Delhi Branch",
    city: "New Delhi",
    lines: ["Ground Floor, Main Market, E-1,", "opposite KFC, Kalkaji,", "New Delhi 110019, India"],
    query: "Ground Floor, Main Market, E-1, opposite KFC, Kalkaji, New Delhi 110019",
    img: officeDelhi,
  },
  {
    label: "Mumbai Branch",
    city: "Vasai East",
    lines: ["U/IT-II SR Compound, Plot No. 49/459,", "Opp. Dynamic Flow Company,", "Wakanpada Road, Vasai Phata,", "Vasai East – 401208, India"],
    query: "SR Compound, Wakanpada Road, Vasai Phata, Vasai East 401208",
    img: officeMumbai,
  },
];

const mapsUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// Head office, zoomed in, with its marker and place card
const FALLBACK_MAP = "https://maps.google.com/maps?q=" + encodeURIComponent("Design House India Pvt Ltd, Mohan Nagar, Ghaziabad") + "&z=15&output=embed";

/* ─── Small pieces ─── */

// Orange small-caps label above a section heading
const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#E8742A] mb-2">{children}</p>
);

// Text field with an icon on the left; `right` holds the Verify button / Verified badge
const Field = ({
  icon: Icon,
  error,
  right,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  error?: string;
  right?: ReactNode;
  children: ReactNode;
}) => (
  <div>
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      {children}
      {right && <div className="absolute right-2 top-1/2 -translate-y-1/2">{right}</div>}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const inputClass = (error?: string, extra = "") =>
  `w-full h-[46px] pl-10 pr-3 rounded-[3px] border ${error ? "border-red-500" : "border-gray-300"} bg-white text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#134698] focus:ring-2 focus:ring-[#134698]/10 transition disabled:bg-gray-50 ${extra}`;

type PhoneAlert = { id: number; type: "success" | "error"; title: string; text?: string; whatsapp?: boolean };

const PHONE_ALERT_MS = 4500;

const subscribeNoop = () => () => {};

// Mobile-style notification that drops in from the top of the screen (OTP sent / verified / errors)
const PhoneNotification = ({ alert, onClose }: { alert: PhoneAlert | null; onClose: () => void }) => {
  // Rendered into <body>, so only once the page is running in the browser
  const isClient = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!isClient) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[100000] flex justify-center px-3 sm:top-5">
      <AnimatePresence>
        {alert && (
          <m.div
            key={alert.id}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -90, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -90, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            onClick={onClose}
            className="pointer-events-auto relative w-full max-w-[340px] cursor-pointer overflow-hidden rounded-[20px] border border-white/60 px-3 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.16)]"
            style={{
              // iPhone notification glass: frosted, slightly tinted white
              background: "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(245,245,247,0.55) 100%)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[8px] text-white shadow-[0_1px_3px_rgba(0,0,0,0.18)] ${
                  alert.whatsapp ? "bg-[#25D366]" : alert.type === "success" ? "bg-[#134698]" : "bg-[#ff3b30]"
                }`}
              >
                {alert.whatsapp ? (
                  <FaWhatsapp className="h-[20px] w-[20px]" />
                ) : alert.type === "success" ? (
                  <CheckCircle className="h-[18px] w-[18px]" />
                ) : (
                  <AlertCircle className="h-[18px] w-[18px]" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-[13px] font-semibold leading-[1.25] text-black">{alert.title}</p>
                  <span className="shrink-0 text-[11px] text-black/45">now</span>
                </div>
                {alert.text && <p className="line-clamp-2 text-[12.5px] leading-[1.3] text-black/75">{alert.text}</p>}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
};

const ContactItem = ({ icon: Icon, title, children }: { icon: ComponentType<{ className?: string }>; title: string; children: ReactNode }) => (
  <div className="flex items-start gap-4">
    <span className="w-12 h-12 rounded-full bg-[#0f2a5c] flex items-center justify-center flex-shrink-0 shadow-[0_8px_18px_-8px_rgba(15,42,92,0.7)]">
      <Icon className="w-5 h-5 text-[#F28A3A]" />
    </span>
    <div className="pt-0.5">
      <h3 className="text-[13px] font-bold uppercase tracking-wide text-[#0f2a5c] mb-1">{title}</h3>
      <div className="text-[14px] text-gray-800 leading-relaxed">{children}</div>
    </div>
  </div>
);

/* ─── Page ─── */

const Contact = () => {
  const { settings } = useSettings();
  const email = settings?.emails?.find((e) => e.forContact)?.email || FALLBACK_EMAIL;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    subService: "",
    location: "",
    message: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  // Phone OTP (sent on WhatsApp)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneOtpLoading, setPhoneOtpLoading] = useState(false);
  const [phoneAlert, setPhoneAlert] = useState<PhoneAlert | null>(null);
  const phoneAlertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showPhoneAlert = (alert: Omit<PhoneAlert, "id">) => {
    if (phoneAlertTimer.current) clearTimeout(phoneAlertTimer.current);
    setPhoneAlert({ ...alert, id: Date.now() });
    phoneAlertTimer.current = setTimeout(() => setPhoneAlert(null), PHONE_ALERT_MS);
  };

  useEffect(() => () => {
    if (phoneAlertTimer.current) clearTimeout(phoneAlertTimer.current);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "service") {
      setFormData({
        ...formData,
        service: value,
        subService: "" // Reset subservice when main service changes
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Reset verification if the phone number changes
    if (name === "phone") { setIsPhoneVerified(false); setPhoneOtpSent(false); setPhoneOtp(""); }
  };

  const handleSendPhoneOtp = async () => {
    if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      setErrors({ ...errors, phone: "Enter a valid 10-digit number first" });
      return;
    }
    setPhoneOtpLoading(true);
    setPhoneOtp("");
    setErrors({ ...errors, phone: "" });
    try {
      const res = await api.post("/api/otp/send-whatsapp", { mobile: formData.phone });
      if (res.data.success) {
        setPhoneOtpSent(true);
        const digits = formData.phone.replace(/\D/g, "").slice(-10);
        showPhoneAlert({
          type: "success",
          whatsapp: true,
          title: "OTP sent successfully",
          text: `Your 6-digit code has been sent to +91 ${digits.slice(0, 5)} ${digits.slice(5)}`,
        });
      } else {
        showPhoneAlert({ type: "error", title: "OTP not sent", text: res.data.message || "Please try again." });
      }
    } catch (err: any) {
      showPhoneAlert({ type: "error", title: "OTP not sent", text: err.response?.data?.message || "Please try again." });
    } finally {
      setPhoneOtpLoading(false);
    }
  };

  const handleVerifyPhoneOtp = async () => {
    if (!phoneOtp.trim()) { showPhoneAlert({ type: "error", title: "Please enter the OTP" }); return; }
    setPhoneOtpLoading(true);
    try {
      const res = await api.post("/api/otp/verify-whatsapp", { mobile: formData.phone, otp: phoneOtp });
      if (res.data.success) {
        setIsPhoneVerified(true);
        setPhoneOtpSent(false);
        setErrors((prev) => ({ ...prev, phone: "" }));
        showPhoneAlert({ type: "success", title: "Phone number verified", text: "You can now send your enquiry." });
      } else {
        showPhoneAlert({ type: "error", title: "Wrong OTP", text: res.data.message || "Please check the code and try again." });
      }
    } catch (err: any) {
      showPhoneAlert({ type: "error", title: "Wrong OTP", text: err.response?.data?.message || "Please check the code and try again." });
    } finally {
      setPhoneOtpLoading(false);
    }
  };

  // Validation: the fields marked * in the form
  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    // 10 digits, optionally with the 91 country code in front
    const digits = formData.phone.replace(/[^0-9]/g, "");
    if (!(digits.length === 10 || (digits.length === 12 && digits.startsWith("91")))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
      isValid = false;
    } else if (!isPhoneVerified) {
      newErrors.phone = "Phone number must be verified (OTP on WhatsApp)";
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }
    if (!formData.service) {
      newErrors.service = "Please select a service";
      isValid = false;
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = "Please describe your requirement (at least 10 characters)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error(isPhoneVerified ? "Please fill in the required fields" : "Please verify your phone number first");
      return;
    }

    try {
      setSubmitting(true);

      const submitData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        service: formData.service.trim(),
        subService: formData.subService.trim(),
        location: formData.location.trim(),
        message: formData.message.trim()
      };

      const response = await api.post("/api/contact-enquiry", submitData);

      if (response.data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setFormData({
            name: "",
            phone: "",
            email: "",
            service: "",
            subService: "",
            location: "",
            message: ""
          });
          setIsPhoneVerified(false);
          setIsSuccess(false);
        }, 4000);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit message");
    } finally {
      setSubmitting(false);
    }
  };

  const subServices = SERVICES_DATA[formData.service as keyof typeof SERVICES_DATA] || [];
  const mapHtml = settings?.mapIframe?.includes("<iframe") ? settings.mapIframe : "";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Topbar />
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#0b1426]">
        <Image
          src={heroImg}
          alt="Design House India reception and office"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        {/* Dark on the left for the text, clear over the reception and logo on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08111f]/80 via-[#08111f]/45 via-35% to-transparent to-60%" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-[120px] pb-12 sm:pt-[132px] sm:pb-14 lg:pt-[112px] lg:pb-6 lg:h-[435px] flex flex-col justify-center">
          <m.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="max-w-[580px]">
            <p className="flex items-center gap-4 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.4em] text-white/90 mb-3">
              Contact Us
              <span className="w-16 sm:w-24 h-[3px] rounded-full bg-gradient-to-r from-[#E8742A] to-[#E8742A]/0" />
            </p>
            <h1 className="font-display font-bold text-white leading-[1.08] text-[35px] sm:text-[46px] lg:text-[52px] mb-3">
              Let&apos;s Build
              <br />
              Your <span className="text-[#F28A2E]">Next Space</span>
            </h1>
            <p className="text-white/90 text-[14px] sm:text-[16.5px] leading-relaxed mb-6 max-w-[520px]">
              From concept to completion, our team is here to understand your requirements and create the right solution for your&nbsp;brand.
            </p>
            <ul className="flex flex-wrap gap-y-4">
              {HERO_POINTS.map(({ icon: Icon, label }, i) => (
                <li key={label} className={`flex items-center gap-2.5 pr-4 sm:pr-6 ${i > 0 ? "pl-4 sm:pl-6 border-l border-white/30" : ""}`}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.4} />
                  <span className="text-white text-[13px] sm:text-[14px] font-medium leading-snug whitespace-pre-line">{label}</span>
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </section>

      {/* ================= CONTACT INFO · FORM · OFFICES ================= */}
      <section className="bg-white pt-10 pb-6 sm:pt-12 sm:pb-7 font-sans">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2 2xl:grid-cols-[0.78fr_1.22fr_1.06fr] 2xl:gap-6 items-start">
          {/* Get in touch */}
          <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2 2xl:col-span-1 2xl:pt-1">
            <Eyebrow>Get in Touch</Eyebrow>
            <h2 className="font-display font-bold text-[#0f2a5c] text-[32px] sm:text-[38px] leading-[1.08] mb-4">
              We&apos;re Here
              <br className="hidden 2xl:block" /> to Help
            </h2>
            <p className="text-[14.5px] text-gray-600 leading-relaxed mb-8 max-w-[420px]">
              Have a project in mind or need expert advice? Our team will be happy to assist you with design, manufacturing and execution tailored to your requirements.
            </p>
            <div className="grid gap-7 sm:grid-cols-3 2xl:grid-cols-1">
              <ContactItem icon={Phone} title="Call Us">
                {CONTACT_PHONES.map((p) => (
                  <a key={p} href={`tel:${p.replace(/[^0-9+]/g, "")}`} className="block font-semibold hover:text-[#E8742A] transition-colors">
                    {p}
                  </a>
                ))}
              </ContactItem>
              <ContactItem icon={Mail} title="Email Us">
                <a href={`mailto:${email}`} className="font-semibold break-all hover:text-[#E8742A] transition-colors">
                  {email}
                </a>
              </ContactItem>
              <ContactItem icon={Clock} title="Working Hours">
                <p className="whitespace-nowrap">Monday – Saturday: 9:00 AM – 6:00 PM</p>
                <p>Sunday: Closed</p>
              </ContactItem>
            </div>
          </m.div>

          {/* Enquiry form */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="bg-white rounded-md shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] p-5 sm:p-7 2xl:p-6"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                // Same success screen as the Career page form
                <m.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="border-2 border-green-500 p-12 bg-green-50 shadow-lg flex flex-col items-center justify-center min-h-[500px]"
                >
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                  </m.div>

                  <m.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-gray-900 mb-4 text-center"
                  >
                    Enquiry Submitted Successfully!
                  </m.h3>

                  <m.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 text-center mb-8 max-w-md text-lg"
                  >
                    Thank you for contacting us! Our team will review your requirement and get back to you within 24 hours.
                  </m.p>

                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 text-sm text-gray-500"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Form will reset automatically...
                  </m.div>
                </m.div>
              ) : (
                <m.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Eyebrow>Send Us a Message</Eyebrow>
                  <h2 className="font-display font-bold text-[#0f2a5c] text-[30px] sm:text-[34px] leading-tight mb-2">Enquire Now</h2>
                  <p className="text-[14px] text-gray-600 mb-6">Share your requirements and we will get back to you shortly.</p>

                  <div className="space-y-3.5">
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <Field icon={User} error={errors.name}>
                        <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleInputChange} className={inputClass(errors.name)} disabled={submitting} />
                      </Field>
                      {/* Phone: Send OTP -> enter OTP in the same box -> Verified */}
                      <div className="relative">
                        <div
                          className={`flex h-[46px] items-center rounded-[3px] border transition focus-within:border-[#134698] focus-within:ring-2 focus-within:ring-[#134698]/10 ${
                            isPhoneVerified
                              ? "border-green-500 bg-green-50/50"
                              : errors.phone
                                ? "border-red-500 bg-white"
                                : "border-gray-300 bg-white"
                          }`}
                        >
                          <Phone className="ml-3.5 h-4 w-4 shrink-0 text-gray-400" />
                          {phoneOtpSent ? (
                            <input
                              autoFocus
                              type="text"
                              inputMode="numeric"
                              autoComplete="one-time-code"
                              aria-label="WhatsApp OTP"
                              placeholder="Enter 6-digit OTP"
                              maxLength={6}
                              value={phoneOtp}
                              onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ""))}
                              onKeyDown={(e) => { if (e.key === "Enter" && phoneOtp.length === 6) handleVerifyPhoneOtp(); }}
                              className="h-full min-w-0 flex-1 bg-transparent px-3 text-center text-[15px] font-bold tracking-[0.45em] text-gray-800 placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-500 focus:outline-none"
                            />
                          ) : (
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Phone Number *"
                              value={formData.phone}
                              onChange={handleInputChange}
                              maxLength={14}
                              className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none disabled:text-gray-700"
                              disabled={submitting || isPhoneVerified}
                            />
                          )}
                          {isPhoneVerified ? (
                            <span className="mr-2 flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-green-700">
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span className="text-[9px] font-bold uppercase">Verified</span>
                            </span>
                          ) : phoneOtpSent ? (
                            <button
                              type="button"
                              onClick={handleVerifyPhoneOtp}
                              disabled={phoneOtpLoading || phoneOtp.length !== 6}
                              className={`m-1.5 flex min-w-[66px] items-center justify-center rounded-[3px] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white transition-colors ${
                                phoneOtp.length === 6 ? "bg-green-600 hover:bg-green-700" : "cursor-not-allowed bg-gray-300"
                              }`}
                            >
                              {phoneOtpLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Verify"}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSendPhoneOtp}
                              disabled={phoneOtpLoading || submitting}
                              className={`m-1.5 flex min-w-[78px] items-center justify-center rounded-[3px] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white transition-colors ${
                                formData.phone.replace(/\D/g, "").length >= 10 ? "bg-[#134698] hover:bg-[#E8742A]" : "bg-gray-300 hover:bg-gray-400"
                              }`}
                            >
                              {phoneOtpLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Send OTP"}
                            </button>
                          )}
                        </div>

                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        <PhoneNotification alert={phoneAlert} onClose={() => setPhoneAlert(null)} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <Field icon={Mail} error={errors.email}>
                        <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleInputChange} className={inputClass(errors.email)} disabled={submitting} />
                      </Field>
                      <Field icon={LayoutList} error={errors.service} right={<ChevronDown className="pointer-events-none w-4 h-4 text-gray-500 mr-1" />}>
                        <select name="service" value={formData.service} onChange={handleInputChange} className={inputClass(errors.service, `appearance-none !pr-8 ${formData.service ? "" : "text-gray-500 2xl:text-[13px]"}`)} disabled={submitting}>
                          <option value="">Service Interested In *</option>
                          {Object.keys(SERVICES_DATA).map((s) => (
                            <option key={s} value={s} className="text-gray-800">{s}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    {/* Sub-service, for services that have them */}
                    <AnimatePresence>
                      {subServices.length > 0 && (
                        <m.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                          <Field icon={LayoutList} right={<ChevronDown className="pointer-events-none w-4 h-4 text-gray-500 mr-1" />}>
                            <select name="subService" value={formData.subService} onChange={handleInputChange} className={inputClass(undefined, `appearance-none pr-9 bg-[#134698]/[0.03] ${formData.subService ? "" : "text-gray-500"}`)} disabled={submitting}>
                              <option value="">Select {formData.service} Type</option>
                              {subServices.map((ss) => (
                                <option key={ss} value={ss} className="text-gray-800">{ss}</option>
                              ))}
                            </select>
                          </Field>
                        </m.div>
                      )}
                    </AnimatePresence>

                    <Field icon={MapPin}>
                      <input type="text" name="location" placeholder="Project Location" value={formData.location} onChange={handleInputChange} className={inputClass()} disabled={submitting} />
                    </Field>

                    <div>
                      <div className="relative">
                        <FileText className="pointer-events-none absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                        <textarea
                          name="message"
                          placeholder="Project Details / Your Requirement *"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className={`w-full pl-10 pr-3 py-3 rounded-[3px] border ${errors.message ? "border-red-500" : "border-gray-300"} text-sm text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-[#134698] focus:ring-2 focus:ring-[#134698]/10 transition resize-y min-h-[104px]`}
                          disabled={submitting}
                        />
                      </div>
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="w-full h-[50px] mt-1 rounded-[3px] flex items-center justify-center gap-3 bg-[#0f2a5c] hover:bg-[#E8742A] text-white text-[14px] font-bold uppercase tracking-wide shadow-[0_10px_24px_-12px_rgba(15,42,92,0.8)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Send Enquiry</>
                      )}
                    </button>
                    <p className="flex items-center justify-center gap-1.5 text-[11px] 2xl:text-[10.5px] min-[1700px]:text-[11px] leading-snug text-gray-500 sm:whitespace-nowrap">
                      <Lock className="w-3 h-3 flex-shrink-0" />
                      Your information is safe with us. We typically respond during business hours.
                    </p>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>

          {/* Offices */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="bg-[#eef1f6] rounded-md p-4 sm:p-5"
          >
            <Eyebrow>Our Offices</Eyebrow>
            <h2 className="font-display font-bold text-[#0f2a5c] text-[30px] sm:text-[34px] leading-tight mb-2">Visit Us</h2>
            <p className="text-[14px] text-gray-600 mb-5">Meet our team at any of our locations or get in touch to schedule a discussion.</p>

            <ul className="space-y-2.5">
              {OFFICES.map((o) => (
                <li key={o.label} className="flex items-stretch gap-3 p-2 bg-white rounded-md shadow-sm ring-1 ring-black/[0.04]">
                  <div className="relative hidden sm:block w-[112px] min-h-[96px] flex-shrink-0 rounded-[3px] overflow-hidden">
                    <Image src={o.img} alt={`Design House ${o.city} office`} fill placeholder="blur" sizes="112px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 py-1 pl-1 sm:pl-0">
                    <p className="text-[12px] font-bold uppercase text-[#E8742A] leading-tight">{o.label}</p>
                    <h3 className="text-[16px] font-extrabold uppercase text-[#0f2a5c] leading-tight mb-1">{o.city}</h3>
                    <div className="text-[12.5px] 2xl:text-[12px] min-[1700px]:text-[12.5px] leading-[1.4] text-gray-600 sm:whitespace-nowrap">
                      {o.lines.map((l) => (
                        <p key={l}>{l}</p>
                      ))}
                    </div>
                  </div>
                  <a
                    href={mapsUrl(o.query)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-[80px] flex-shrink-0 rounded-[3px] bg-[#f3f5f9] flex flex-col items-center justify-center gap-2 text-center hover:bg-[#0f2a5c] transition-colors"
                  >
                    <span className="w-10 h-10 rounded-full ring-1 ring-[#0f2a5c]/25 bg-white flex items-center justify-center">
                      <MapPin className="w-[18px] h-[18px] text-[#0f2a5c]" />
                    </span>
                    <span className="text-[10px] font-bold uppercase leading-tight text-[#0f2a5c] group-hover:text-white">
                      Get
                      <br />
                      Directions
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="relative bg-[#0f2a5c] font-sans lg:h-[230px]">
        {/* Navy panel over the map's left side; its right edge slants out towards the bottom (stacked above the map on phones) */}
        <div className="relative z-10 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[38%] xl:w-[34%] bg-[#0f2a5c] lg:[clip-path:polygon(0_0,88%_0,100%_100%,0_100%)]">
          <div className="h-full flex flex-col justify-center px-4 sm:px-6 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))] lg:pr-16 py-9 lg:py-6">
            <Eyebrow>Our Location</Eyebrow>
            <h2 className="font-display font-bold text-white text-[28px] sm:text-[32px] leading-tight mb-2">Find Us on Map</h2>
            <p className="text-white/85 text-[13.5px] leading-snug mb-5 max-w-[330px]">
              Our head office is located in Ghaziabad, with branch offices in New Delhi and Mumbai.
            </p>
            <a
              href={mapsUrl(OFFICES[0].query)}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-3 rounded-[3px] border border-white/80 px-4 py-2.5 text-white text-[12px] font-bold uppercase tracking-wide hover:bg-white hover:text-[#0f2a5c] transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Open in Google Maps
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Map fills the rest; on lg+ it starts under the panel's slant so the marker sits in the open part */}
        <div className="relative h-[300px] lg:absolute lg:inset-y-0 lg:right-0 lg:left-[30%] lg:h-auto [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0">
          {mapHtml ? (
            <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: mapHtml }} />
          ) : (
            <iframe
              src={FALLBACK_MAP}
              title="Design House India on Google Maps"
              className="absolute inset-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
