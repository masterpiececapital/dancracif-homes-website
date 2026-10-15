export interface AmenityItem {
  id: string;
  title: string;
  description: string;
  icon: "security" | "power" | "wifi" | "water";
}

export const AMENITIES_DATA: AmenityItem[] = [
  {
    id: "security",
    title: "24-hour security",
    description: "Gate house, patrols and intercom access control to every home.",
    icon: "security",
  },
  {
    id: "power",
    title: "Dedicated power",
    description: "Own transformer, smart metering and generator for common areas.",
    icon: "power",
  },
  {
    id: "wifi",
    title: "Fibre internet",
    description: "High-speed fibre connectivity built into the estate.",
    icon: "wifi",
  },
  {
    id: "water",
    title: "Water reticulation",
    description: "Industrial borehole with treated water to every unit.",
    icon: "water",
  },
];
