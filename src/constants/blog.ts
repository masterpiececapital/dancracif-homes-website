export interface BlogPost {
  id: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  date: string;
  title: string;
  summary: string;
  expandedContent: string;
  linkText: string;
  linkHref: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "groundbreaking-fidelis-court",
    imageSrc: "/fidelis-court/Skyward Construction Site.png",
    imageAlt: "Groundbreaking at Fidelis Court estate in Kubwa",
    imageCaption: "Artist's impression",
    date: "APRIL 2026",
    title: "Groundbreaking at Fidelis Court",
    summary:
      "Site mobilisation began in April 2026, marking the start of our journey to deliver 88 homes in Kubwa F01.",
    expandedContent:
      "We broke ground at 21, Josephat Mojeckwu Avenue, Kubwa F01. Site clearing, setting out and mobilisation are complete, and the 14-month construction programme runs from October 2026 to December 2027. Follow our YouTube channel for regular construction updates.",
    linkText: "View construction updates",
    linkHref: "https://youtube.com",
  },
  {
    id: "12-month-payment-plan",
    imageSrc: "/fidelis-court/Renovation in Progress_ Bright Unfinished Interior.png",
    imageAlt: "Interior living room of apartment showing flexible payment plan",
    imageCaption: "Artist's impression",
    date: "SEPTEMBER 2026",
    title: "How our 12-month payment plan works",
    summary:
      "Own a home with a 40% deposit and spread the balance over 12 months.",
    expandedContent:
      "Start with a minimum 40% deposit, then pay 20% after 3 months, 20% after another 3 months, and the final 20% within 12 months (with charges). Additional fees cover legal/admin/survey, infrastructure, asset replacement and service charge deposits.",
    linkText: "View prices & payment plan",
    linkHref: "/pricing",
  },
  {
    id: "join-open-house",
    imageSrc: "/fidelis-court/Urban Construction Under Dramatic Skies.png",
    imageAlt: "Terrace duplex units during Fidelis Court open house",
    imageCaption: "Artist's impression",
    date: "OCTOBER 2026",
    title: "Join our open house at the estate",
    summary:
      "Tour the site, meet our sales team and see the plans in person.",
    expandedContent:
      "Our open house is ongoing at the Fidelis Court estate in Kubwa. Register on our home page, bring family or friends, and our team will walk you through the units, pricing and payment plan.",
    linkText: "Register for the open house",
    linkHref: "/#contact",
  },
];
