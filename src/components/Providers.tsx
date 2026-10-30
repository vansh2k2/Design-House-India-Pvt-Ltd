"use client";

import { ReactNode, Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SmoothScroll from "@/components/SmoothScroll";
import { SeoProvider } from "@/context/SeoContext";
// Shown only after the page is idle, so their code (incl. the booking form) is split out of the first load
const WhatsAppFloat = dynamic(() => import("@/components/ui/WhatsAppFloat"), { ssr: false });
const SocialSidebar = dynamic(() => import("@/components/ui/SocialSidebar"), { ssr: false });
const BookingFloat = dynamic(() => import("@/components/layout/BookingFloat"), { ssr: false });

const Providers = ({ children }: { children: ReactNode }) => {
  const [showFloating, setShowFloating] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleIdle = () => {
      if (!showFloating) setShowFloating(true);
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(handleIdle, { timeout: 3000 });
    } else {
      setTimeout(handleIdle, 3000);
    }
  }, [showFloating]);

  return (
    <LazyMotion features={domAnimation} strict>
          <ToastContainer position="top-right" autoClose={4000} newestOnTop />
          <SeoProvider>
            <SmoothScroll stopped={isBookingOpen}>
              {children}

              {showFloating && (
                <Suspense fallback={null}>
                  <WhatsAppFloat />
                  <SocialSidebar />
                  <BookingFloat open={isBookingOpen} onOpenChange={setIsBookingOpen} />
                </Suspense>
              )}
            </SmoothScroll>
          </SeoProvider>
    </LazyMotion>
  );
};

export default Providers;
