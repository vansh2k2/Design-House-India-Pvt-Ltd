"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { m, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export type PhoneAlert = { id: number; type: "success" | "error"; title: string; text?: string; whatsapp?: boolean };

const PHONE_ALERT_MS = 4500;

const subscribeNoop = () => () => {};

/** The current notification, and show() to drop in a new one (it hides itself after a few seconds). */
export const usePhoneAlert = () => {
  const [alert, setAlert] = useState<PhoneAlert | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (next: Omit<PhoneAlert, "id">) => {
    if (timer.current) clearTimeout(timer.current);
    setAlert({ ...next, id: Date.now() });
    timer.current = setTimeout(() => setAlert(null), PHONE_ALERT_MS);
  };

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return { alert, show, close: () => setAlert(null) };
};

// Mobile-style notification that drops in from the top of the screen (OTP sent / verified / errors)
export const PhoneNotification = ({ alert, onClose }: { alert: PhoneAlert | null; onClose: () => void }) => {
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
