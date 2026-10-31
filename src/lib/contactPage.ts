import { API_URL } from "./api";

// Content of the Contact page, edited in the admin (Pages & CMS → Contact Us) and served by /api/contact-page

export interface ContactOffice {
  label: string;
  city: string;
  address: string; // one line per printed line
  mapQuery: string;
  image: string;
  imageAlt: string;
}

export interface ContactPageContent {
  hero: { eyebrow: string; headline: string; description: string; image: string; imageAlt: string; highlights: string[] };
  contactInfo: {
    eyebrow: string;
    title: string;
    description: string;
    phones: string[];
    email: string;
    weekdayHours: string;
    weekendHours: string;
  };
  offices: { eyebrow: string; title: string; description: string; items: ContactOffice[] };
  map: { eyebrow: string; title: string; description: string; buttonLabel: string; mapLink: string; embedUrl: string };
}

const HEAD_OFFICE_QUERY =
  "Design House India Pvt Ltd, Plot No. 12/29, Site-II Industrial Area, Loni Road, Mohan Nagar, Ghaziabad 201007";

export const mapsSearchUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

// Used if the backend can't be reached (same content as the backend's defaults)
export const DEFAULT_CONTACT_PAGE: ContactPageContent = {
  hero: {
    eyebrow: "Contact Us",
    headline: "Let's Build\nYour *Next Space*",
    description:
      "From concept to completion, our team is here to understand your requirements and create the right solution for your brand.",
    image: "/assets/banner/contact.webp",
    imageAlt: "Design House India reception and office",
    highlights: ["Discuss\nYour Idea", "Expert\nGuidance", "End-to-End\nSupport"],
  },
  contactInfo: {
    eyebrow: "Get in Touch",
    title: "We're Here to Help",
    description:
      "Have a project in mind or need expert advice? Our team will be happy to assist you with design, manufacturing and execution tailored to your requirements.",
    phones: ["+91 9654900525", "+91 9810247319"],
    email: "info@designhouse.co.in",
    weekdayHours: "Monday – Saturday: 9:00 AM – 6:00 PM",
    weekendHours: "Sunday: Closed",
  },
  offices: {
    eyebrow: "Our Offices",
    title: "Visit Us",
    description: "Meet our team at any of our locations or get in touch to schedule a discussion.",
    items: [
      {
        label: "Head Office",
        city: "Ghaziabad",
        address: "Plot No. 12/29, Site-II Industrial Area,\nLoni Road, Mohan Nagar, Ghaziabad,\nUttar Pradesh 201007, India",
        mapQuery: HEAD_OFFICE_QUERY,
        image: "/assets/image/c1.webp",
        imageAlt: "Design House Ghaziabad office",
      },
      {
        label: "Delhi Branch",
        city: "New Delhi",
        address: "Ground Floor, Main Market, E-1,\nopposite KFC, Kalkaji,\nNew Delhi 110019, India",
        mapQuery: "Ground Floor, Main Market, E-1, opposite KFC, Kalkaji, New Delhi 110019",
        image: "/assets/image/c2.webp",
        imageAlt: "Design House New Delhi office",
      },
      {
        label: "Mumbai Branch",
        city: "Vasai East",
        address: "U/IT-II SR Compound, Plot No. 49/459,\nOpp. Dynamic Flow Company,\nWakanpada Road, Vasai Phata,\nVasai East – 401208, India",
        mapQuery: "SR Compound, Wakanpada Road, Vasai Phata, Vasai East 401208",
        image: "/assets/image/c3.webp",
        imageAlt: "Design House Vasai East office",
      },
    ],
  },
  map: {
    eyebrow: "Our Location",
    title: "Find Us on Map",
    description: "Our head office is located in Ghaziabad, with branch offices in New Delhi and Mumbai.",
    buttonLabel: "Open in Google Maps",
    mapLink: mapsSearchUrl(HEAD_OFFICE_QUERY),
    embedUrl:
      "https://maps.google.com/maps?q=" + encodeURIComponent("Design House India Pvt Ltd, Mohan Nagar, Ghaziabad") + "&z=15&output=embed",
  },
};

/** Server-side: the saved Contact page content (refreshed every 30 s), or the defaults. */
export async function fetchContactPage(): Promise<ContactPageContent> {
  try {
    const res = await fetch(`${API_URL}/api/contact-page`, { next: { revalidate: 30 } });
    const json = await res.json();
    return json?.success && json.data ? (json.data as ContactPageContent) : DEFAULT_CONTACT_PAGE;
  } catch {
    return DEFAULT_CONTACT_PAGE;
  }
}
