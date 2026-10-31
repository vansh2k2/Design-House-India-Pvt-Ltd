"use client";

import { useState, type ChangeEvent, type ComponentType, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  User,
} from "lucide-react";
import { toast } from "react-toastify";

import { api } from "@/lib/api";
import { HOME_SECTION_DEFAULTS, type GetInTouchContent } from "@/lib/homeSections";
import { PhoneNotification, usePhoneAlert } from "@/components/ui/PhoneNotification";

const telHref = (phone: string) => `tel:${phone.replace(/[^0-9+]/g, "")}`;

const EMPTY_FORM = { name: "", company: "", phone: "", email: "", projectType: "", message: "" };
type FormState = typeof EMPTY_FORM;

const CARD_SHADOW = "shadow-[rgba(0,0,0,0.1)_0px_1px_3px_0px,rgba(0,0,0,0.06)_0px_1px_2px_0px]";

const IconCircle = ({ children, size = "w-10 h-10 sm:w-11 sm:h-11" }: { children: ReactNode; size?: string }) => (
  <span className={`${size} shrink-0 rounded-full bg-[#FFEEE3] flex items-center justify-center text-[#fd6e15]`}>
    {children}
  </span>
);

const Field = ({
  label,
  required,
  error,
  icon: Icon,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  icon?: ComponentType<{ className?: string }>;
  children: ReactNode;
}) => (
  <label className="block">
    <span className="block text-[11.5px] font-medium text-[#1F2D44] mb-1">
      {label}
      {required && <span className="text-[#E5341C]"> *</span>}
    </span>
    <span className="relative block">
      {Icon && <Icon className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#7A8AA3] pointer-events-none" />}
      {children}
    </span>
    {error && <span className="block text-[11px] text-[#E5341C] mt-1">{error}</span>}
  </label>
);

const inputClass = (error?: string, extra = "") =>
  `w-full rounded-md border bg-white pl-8 pr-3 py-2 text-[12px] text-[#1F2D44] placeholder:text-[#8C9BAE] outline-none transition-colors focus:border-[#134698] disabled:opacity-60 ${
    error ? "border-[#E5341C]" : "border-[#DCE3EE]"
  } ${extra}`;

/* "Get in Touch": the office reception photo across the whole section (washed white on the left).
   Left: heading, call/email cards, office cards and an "Our Presence" row. Right: a free consultation
   form (mobile number verified by WhatsApp OTP). */
// Content: edited in the admin (Pages & CMS → Home → Get In Touch); submissions are listed in the admin's "Get In Touch" page
const GetInTouch = ({ data = HOME_SECTION_DEFAULTS["get-in-touch"] }: { data?: GetInTouchContent }) => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // Mobile number OTP (sent on WhatsApp)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneOtpLoading, setPhoneOtpLoading] = useState(false);
  const { alert: phoneAlert, show: showPhoneAlert, close: closePhoneAlert } = usePhoneAlert();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
    // A changed number has to be verified again
    if (name === "phone") {
      setIsPhoneVerified(false);
      setPhoneOtpSent(false);
      setPhoneOtp("");
    }
  };

  const sendPhoneOtp = async () => {
    const digits = form.phone.replace(/\D/g, "").slice(-10);
    if (!/^[0-9]{10}$/.test(form.phone.replace(/[^0-9]/g, ""))) {
      setErrors((er) => ({ ...er, phone: "Enter a valid 10-digit number first" }));
      return;
    }
    setPhoneOtpLoading(true);
    setPhoneOtp("");
    setErrors((er) => ({ ...er, phone: undefined }));
    try {
      const res = await api.post("/api/otp/send-whatsapp", { mobile: form.phone });
      if (res.data.success) {
        setPhoneOtpSent(true);
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

  const verifyPhoneOtp = async () => {
    setPhoneOtpLoading(true);
    try {
      const res = await api.post("/api/otp/verify-whatsapp", { mobile: form.phone, otp: phoneOtp });
      if (res.data.success) {
        setIsPhoneVerified(true);
        setPhoneOtpSent(false);
        setErrors((er) => ({ ...er, phone: undefined }));
        showPhoneAlert({ type: "success", title: "Mobile number verified", text: "You can now submit your enquiry." });
      } else {
        showPhoneAlert({ type: "error", title: "Wrong OTP", text: res.data.message || "Please check the code and try again." });
      }
    } catch (err: any) {
      showPhoneAlert({ type: "error", title: "Wrong OTP", text: err.response?.data?.message || "Please check the code and try again." });
    } finally {
      setPhoneOtpLoading(false);
    }
  };

  // The enquiry API requires name, phone, email and message
  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!/^[0-9]{10}$/.test(form.phone.replace(/[^0-9]/g, ""))) next.phone = "Enter a valid 10-digit mobile number";
    else if (!isPhoneVerified) next.phone = "Please verify your mobile number (OTP on WhatsApp)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error(isPhoneVerified ? "Please fill in the required fields" : "Please verify your mobile number first");
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post("/api/consultation-requests", {
        name: form.name.trim(),
        company: form.company.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
        projectType: form.projectType,
        message: form.message.trim(),
      });
      if (res.data?.success) {
        setSent(true);
        setForm(EMPTY_FORM);
        setIsPhoneVerified(false);
        setTimeout(() => setSent(false), 5000);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to submit enquiry");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* ── Background photo, washed white towards the left so the text reads ── */}
      {/* Drawn wider than the screen, so it asks for the full-width file at a higher quality to stay sharp */}
      <Image src={data.image} alt={data.imageAlt || ""} fill sizes="100vw" quality={85} className="object-cover object-center" />
      {/* White wash over the whole left column; clears quickly after it so the logo wall in the middle stays bright */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 via-28% to-white/0 to-45%" />
      {/* Solid white band behind the heading and intro; its bottom edge and right end fade out */}
      <div
        className="absolute left-0 top-0 w-[52%] h-[46%] bg-gradient-to-r from-white/95 via-white/90 via-70% to-white/0"
        style={{
          maskImage: "linear-gradient(to bottom, black 65%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent)",
        }}
      />
      {/* Solid white band behind the whole "Our Presence" row (right end included); its top edge and
          right end fade out so it blends into the photo */}
      <div
        className="absolute left-0 bottom-0 w-[75%] h-[34%] bg-gradient-to-r from-white/95 via-white/90 via-75% to-white/0"
        style={{
          maskImage: "linear-gradient(to top, black 60%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 60%, transparent)",
        }}
      />
      <div className="absolute inset-0 bg-white/60 xl:hidden" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 lg:pt-6 pb-5 lg:pb-6 grid xl:grid-cols-[minmax(0,1fr)_390px] gap-8 xl:gap-12 items-center">
        {/* ── Left ── */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2.5px] bg-[#fd6e15] rounded-full inline-block" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#134698]">{data.eyebrow}</span>
          </div>
          <h2 className="text-[30px] sm:text-[36px] lg:text-[42px] font-serif font-medium leading-[1.08] tracking-tight mb-3 text-[#0A2B5E]">
            {data.title}
            {data.title && data.highlight && <br />}
            <span className="text-[#fd6e15]">{data.highlight}</span>
          </h2>
          <p className="text-[13.5px] sm:text-[14.5px] text-black leading-relaxed mb-3.5 max-w-[500px]">
            {data.description}
          </p>

          {/* Call / email */}
          <div className="flex flex-wrap gap-3 mb-3">
            <div className={`flex items-center gap-4 rounded-md bg-white/95 px-3 py-2.5 min-w-[200px] ${CARD_SHADOW}`}>
              <IconCircle>
                <Phone className="w-5 h-5" strokeWidth={1.6} />
              </IconCircle>
              <div>
                <p className="text-[13.5px] font-bold text-[#0A2B5E] leading-tight mb-0.5">{data.callTitle}</p>
                {data.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="flex items-center min-h-6 text-[12.5px] text-[#1F2D44] hover:text-[#fd6e15] leading-snug">
                    {p}
                  </a>
                ))}
              </div>
            </div>
            <div className={`flex items-center gap-4 rounded-md bg-white/95 px-3 py-2.5 min-w-[200px] ${CARD_SHADOW}`}>
              <IconCircle>
                <Mail className="w-5 h-5" strokeWidth={1.6} />
              </IconCircle>
              <div className="min-w-0">
                <p className="text-[13.5px] font-bold text-[#0A2B5E] leading-tight mb-0.5">{data.emailTitle}</p>
                <a href={`mailto:${data.email}`} className="block text-[12.5px] text-[#1F2D44] hover:text-[#fd6e15] break-all">
                  {data.email}
                </a>
              </div>
            </div>
          </div>

          {/* Offices */}
          {/* Cards size to their text, so each office name stays on one line */}
          <div className="flex flex-wrap gap-3 mb-6">
            {data.offices.map(({ title, place, href }, i) => (
              <Link
                key={`${title}-${i}`}
                href={href || "/contact"}
                className={`group flex items-center gap-2.5 rounded-md bg-white/95 pl-2.5 pr-3 py-2 ${CARD_SHADOW}`}
              >
                <IconCircle size="w-9 h-9">
                  <MapPin className="w-[18px] h-[18px]" strokeWidth={1.6} />
                </IconCircle>
                <div className="whitespace-nowrap">
                  <p className="text-[12.5px] font-bold text-[#134698] leading-tight mb-0.5">{title}</p>
                  <p className="text-[11px] text-[#5B6B82] leading-snug">{place}</p>
                </div>
                <span className="ml-1 w-6 h-6 shrink-0 rounded-full bg-[#EEF0FB] text-[#4B4FC4] flex items-center justify-center group-hover:bg-[#fd6e15] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>

          {/* Our presence */}
          <div className="flex items-center gap-4 mb-3 max-w-[740px]">
            <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#134698] shrink-0">{data.presenceTitle}</span>
            <span className="h-px flex-1 bg-[#134698]/30" />
          </div>
          {/* One line from lg; wraps on smaller screens */}
          <ul className="flex flex-wrap lg:flex-nowrap items-center gap-y-3">
            {data.presence.map(({ icon, iconAlt, shape, title, place }, i) => (
              <li key={`${title}-${i}`} className={`flex items-center gap-2.5 pr-4 mr-4 last:pr-0 last:mr-0 ${i < data.presence.length - 1 ? "sm:border-r border-[#B9C8DD]" : ""}`}>
                {/* Wide drawings get a wider box to come out as tall as the others */}
                {icon && <Image src={icon} alt={iconAlt || ""} width={70} height={48} className={`${shape === "wide" ? "w-[70px] h-12" : "w-12 h-11"} shrink-0 object-contain`} />}
                <div className="whitespace-nowrap">
                  <p className="text-[12.5px] font-bold text-[#0A2B5E] leading-tight">{title}</p>
                  <p className="text-[11.5px] text-[#1F2D44] leading-snug">{place}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: consultation form ── */}
        <div className="rounded-lg bg-white p-4 sm:p-5 shadow-[0_12px_40px_-12px_rgba(10,43,94,0.35)]">
          <h3 className="text-[20px] sm:text-[23px] font-serif font-medium leading-tight text-[#0A2B5E] mb-1">
            {data.form.title} <span className="text-[#fd6e15]">{data.form.highlight}</span>
          </h3>
          <p className="text-[11.5px] text-[#46658C] mb-3">{data.form.subtitle}</p>

          {sent ? (
            <div className="flex flex-col items-center text-center py-12">
              <CheckCircle className="w-12 h-12 text-[#22A35A] mb-3" strokeWidth={1.6} />
              <p className="text-[16px] font-bold text-[#0A2B5E] mb-1">Thank you!</p>
              <p className="text-[13px] text-[#46658C]">Your enquiry has been sent. Our team will contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2.5">
              <Field label="Your Name" required error={errors.name} icon={User}>
                <input name="name" value={form.name} onChange={onChange} placeholder="Enter your name" className={inputClass(errors.name)} disabled={submitting} />
              </Field>
              <Field label="Company Name" icon={Building2}>
                <input name="company" value={form.company} onChange={onChange} placeholder="Enter company name" className={inputClass()} disabled={submitting} />
              </Field>
              {/* Mobile: Send OTP -> enter the OTP in the same box -> Verified */}
              <Field label="Mobile Number" required error={errors.phone}>
                <span
                  className={`flex items-center rounded-md border transition-colors focus-within:border-[#134698] ${
                    isPhoneVerified ? "border-[#22A35A] bg-green-50/60" : errors.phone ? "border-[#E5341C] bg-white" : "border-[#DCE3EE] bg-white"
                  }`}
                >
                  <Phone className="ml-3 w-3.5 h-3.5 shrink-0 text-[#7A8AA3]" />
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
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (phoneOtp.length === 6) verifyPhoneOtp();
                        }
                      }}
                      className="min-w-0 flex-1 bg-transparent px-2 py-2 text-center text-[12.5px] font-bold tracking-[0.3em] text-[#1F2D44] placeholder:text-[11.5px] placeholder:font-normal placeholder:tracking-normal placeholder:text-[#8C9BAE] outline-none"
                    />
                  ) : (
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={onChange}
                      maxLength={14}
                      placeholder="Enter mobile number"
                      className="min-w-0 flex-1 bg-transparent px-2 py-2 text-[12px] text-[#1F2D44] placeholder:text-[#8C9BAE] outline-none disabled:opacity-60"
                      disabled={submitting || isPhoneVerified}
                    />
                  )}
                  {isPhoneVerified ? (
                    <span className="mr-1.5 flex items-center gap-1 rounded bg-green-100 px-1.5 py-0.5 text-[#1C7F45]">
                      <CheckCircle className="w-3 h-3" />
                      <span className="text-[8.5px] font-bold uppercase">Verified</span>
                    </span>
                  ) : phoneOtpSent ? (
                    <button
                      type="button"
                      onClick={verifyPhoneOtp}
                      disabled={phoneOtpLoading || phoneOtp.length !== 6}
                      className={`m-1 flex min-w-[50px] items-center justify-center rounded px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white transition-colors ${
                        phoneOtp.length === 6 ? "bg-[#22A35A] hover:bg-[#1C7F45]" : "cursor-not-allowed bg-gray-300"
                      }`}
                    >
                      {phoneOtpLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Verify"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={sendPhoneOtp}
                      disabled={phoneOtpLoading || submitting}
                      className={`m-1 flex min-w-[62px] items-center justify-center rounded px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white transition-colors ${
                        form.phone.replace(/\D/g, "").length >= 10 ? "bg-[#134698] hover:bg-[#fd6e15]" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    >
                      {phoneOtpLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Send OTP"}
                    </button>
                  )}
                </span>
                <PhoneNotification alert={phoneAlert} onClose={closePhoneAlert} />
              </Field>
              <Field label="Email Address" required error={errors.email} icon={Mail}>
                <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Enter email address" className={inputClass(errors.email)} disabled={submitting} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Project Type">
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={onChange}
                    className={inputClass(undefined, `appearance-none !pl-3 pr-9 ${form.projectType ? "" : "text-[#8C9BAE]"}`)}
                    disabled={submitting}
                  >
                    <option value="">Select project type</option>
                    {data.form.projectTypes.map((t) => (
                      <option key={t} value={t} className="text-[#1F2D44]">
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-3.5 h-3.5 text-[#46658C] pointer-events-none" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Your Message" icon={MessageSquareText}>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={2}
                    placeholder="Share your requirements..."
                    className={inputClass(undefined, "resize-y")}
                    disabled={submitting}
                  />
                </Field>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="group sm:col-span-2 mt-1 flex items-center justify-center gap-2.5 rounded-md bg-[#fd6e15] hover:bg-[#e05d0e] py-3 text-white text-[13px] font-semibold uppercase tracking-wide shadow-[0_6px_16px_rgba(253,110,21,0.3)] disabled:opacity-70 transition-colors"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {data.form.buttonLabel || "Submit Enquiry"}
                {!submitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
