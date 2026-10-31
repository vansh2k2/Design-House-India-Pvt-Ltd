"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { HOME_SECTION_DEFAULTS, type FooterContent } from "@/lib/homeSections";

// One request per page load, shared by the Footer and the floating social icons
let request: Promise<FooterContent> | null = null;

const loadFooter = () => {
  request ??= api
    .get("/api/home-sections/footer")
    .then((res) => {
      const content = res.data?.success ? res.data.data?.content : null;
      return content && typeof content === "object" ? (content as FooterContent) : HOME_SECTION_DEFAULTS.footer;
    })
    .catch(() => {
      request = null; // try again on the next page
      return HOME_SECTION_DEFAULTS.footer;
    });
  return request;
};

/** Footer content and social links (edited in the admin: Pages → Home → Footer & Social Links). */
export const useFooter = () => {
  const [footer, setFooter] = useState<FooterContent>(HOME_SECTION_DEFAULTS.footer);

  useEffect(() => {
    let active = true;
    loadFooter().then((data) => {
      if (active) setFooter(data);
    });
    return () => {
      active = false;
    };
  }, []);

  return footer;
};
