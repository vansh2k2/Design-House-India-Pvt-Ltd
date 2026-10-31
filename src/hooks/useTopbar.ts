"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export interface TopbarData {
  phones: string[];
  email: string;
  links: { label: string; href: string }[];
}

// Shown if the backend can't be reached
export const DEFAULT_TOPBAR: TopbarData = {
  phones: ["+91 9654900525", "+91 9810247319"],
  email: "info@designhouse.co.in",
  links: [
    { label: "Brochure", href: "/downloads" },
    { label: "Company Profile", href: "/downloads" },
    { label: "Careers", href: "/career" },
  ],
};

// One request per page load, shared by every Topbar on the page
let request: Promise<TopbarData> | null = null;

const loadTopbar = () => {
  request ??= api
    .get("/api/topbar")
    .then((res) => (res.data?.success && res.data.data ? (res.data.data as TopbarData) : DEFAULT_TOPBAR))
    .catch(() => {
      request = null; // try again on the next page
      return DEFAULT_TOPBAR;
    });
  return request;
};

/** Phone numbers, email and quick links of the Topbar (edited in the admin: Pages → Home → Topbar). */
export const useTopbar = () => {
  const [topbar, setTopbar] = useState<TopbarData | null>(null);

  useEffect(() => {
    let active = true;
    loadTopbar().then((data) => {
      if (active) setTopbar(data);
    });
    return () => {
      active = false;
    };
  }, []);

  return { topbar, loading: topbar === null };
};
