"use client";

import React, { createContext, useContext, ReactNode } from "react";

import { EMPTY_SOCIAL_LINKS, socialProfiles, type SocialLinks, type SocialProfile } from "@/lib/socialLinks";

const SocialLinksContext = createContext<SocialLinks>(EMPTY_SOCIAL_LINKS);

// Fetched once, server-side, in the root layout (like LocationsContext), so the floating sidebar and the
// footer show the links saved under Advanced SEO without each fetching them again
export const SocialLinksProvider: React.FC<{ children: ReactNode; links: SocialLinks }> = ({ children, links }) => (
    <SocialLinksContext.Provider value={links}>{children}</SocialLinksContext.Provider>
);

/** Profiles with a link set, in display order (empty ones are left out) */
export const useSocialProfiles = (): SocialProfile[] => socialProfiles(useContext(SocialLinksContext));
