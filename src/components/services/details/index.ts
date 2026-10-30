import { corporateInteriors } from "./corporateInteriors";
import { retailShowrooms } from "./retailShowrooms";
import { restaurantInteriors } from "./restaurantInteriors";
import { exhibitionStalls } from "./exhibitionStalls";
import { retailKiosks } from "./retailKiosks";
import { signageBranding } from "./signageBranding";
import { manufacturingExecution } from "./manufacturingExecution";
import { residentialInteriors } from "./residentialInteriors";
import { displayFixtures } from "./displayFixtures";
import { ensis } from "./ensis";
import type { ServiceDetail } from "../detail/types";

// Service detail pages, by URL slug (/services/<slug>). Add a data file here to publish another service page.
export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  [corporateInteriors.slug]: corporateInteriors,
  [retailShowrooms.slug]: retailShowrooms,
  [restaurantInteriors.slug]: restaurantInteriors,
  [exhibitionStalls.slug]: exhibitionStalls,
  [retailKiosks.slug]: retailKiosks,
  [signageBranding.slug]: signageBranding,
  [manufacturingExecution.slug]: manufacturingExecution,
  [residentialInteriors.slug]: residentialInteriors,
  [displayFixtures.slug]: displayFixtures,
  [ensis.slug]: ensis,
};

export const getServiceDetail = (slug: string) => SERVICE_DETAILS[slug];
