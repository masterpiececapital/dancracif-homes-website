// Shared pricing data — single source of truth used across components
export interface UnitPlan {
  id: string;
  label: string;
  units: number;
  basePrice: number; // in Naira
  instalments: Instalment[];
  additionalCharges: AdditionalCharge[];
  note?: string;
}

export interface Instalment {
  percentage: number;
  title: string;
  subtitle: string;
  amount: number;
}

export interface AdditionalCharge {
  label: string;
  sublabel: string;
  amount: number;
  isTotal?: boolean;
  isTotalOwnership?: boolean;
}

export const UNIT_PLANS: UnitPlan[] = [
  {
    id: "1-bed",
    label: "1-Bedroom Apartment",
    units: 32,
    basePrice: 53_000_000,
    instalments: [
      { percentage: 40, title: "Initial deposit", subtitle: "On subscription (minimum)", amount: 21_200_000 },
      { percentage: 20, title: "2nd instalment", subtitle: "After 3 months", amount: 10_600_000 },
      { percentage: 20, title: "3rd instalment", subtitle: "After 6 months", amount: 10_600_000 },
      { percentage: 20, title: "Final instalment", subtitle: "Within 12 months, with charges", amount: 10_600_000 },
    ],
    additionalCharges: [
      { label: "Legal, Admin & Survey Fee", sublabel: "2% of Basic Price", amount: 1_060_000 },
      { label: "Infrastructure Fee", sublabel: "Per unit", amount: 300_000 },
      { label: "Asset Replacement Deposit", sublabel: "Remitted to the Owners' Association on completion", amount: 300_000 },
      { label: "Service Charge Deposit", sublabel: "Subject to review at completion", amount: 600_000 },
      { label: "Total charges", sublabel: "", amount: 2_260_000 },
      { label: "Total cost of ownership", sublabel: "", amount: 55_260_000, isTotalOwnership: true },
    ],
    note: "Final instalment attracts applicable charges.",
  },
  {
    id: "2-bed",
    label: "2-Bedroom Apartment",
    units: 48,
    basePrice: 80_000_000,
    instalments: [
      { percentage: 40, title: "Initial deposit", subtitle: "On subscription (minimum)", amount: 32_000_000 },
      { percentage: 20, title: "2nd instalment", subtitle: "After 3 months", amount: 16_000_000 },
      { percentage: 20, title: "3rd instalment", subtitle: "After 6 months", amount: 16_000_000 },
      { percentage: 20, title: "Final instalment", subtitle: "Within 12 months, with charges", amount: 16_000_000 },
    ],
    additionalCharges: [
      { label: "Legal, Admin & Survey Fee", sublabel: "2% of Basic Price", amount: 1_600_000 },
      { label: "Infrastructure Fee", sublabel: "Per unit", amount: 300_000 },
      { label: "Asset Replacement Deposit", sublabel: "Remitted to the Owners' Association on completion", amount: 300_000 },
      { label: "Service Charge Deposit", sublabel: "Subject to review at completion", amount: 600_000 },
      { label: "Total charges", sublabel: "", amount: 2_800_000 },
      { label: "Total cost of ownership", sublabel: "", amount: 82_800_000, isTotalOwnership: true },
    ],
    note: "Final instalment attracts applicable charges.",
  },
  {
    id: "4-bed",
    label: "4-Bedroom Terrace (Shell)",
    units: 8,
    basePrice: 125_000_000,
    instalments: [
      { percentage: 40, title: "Initial deposit", subtitle: "On subscription (minimum)", amount: 50_000_000 },
      { percentage: 20, title: "2nd instalment", subtitle: "After 3 months", amount: 25_000_000 },
      { percentage: 20, title: "3rd instalment", subtitle: "After 6 months", amount: 25_000_000 },
      { percentage: 20, title: "Final instalment", subtitle: "Within 12 months, with charges", amount: 25_000_000 },
    ],
    additionalCharges: [
      { label: "Legal, Admin & Survey Fee", sublabel: "2% of Basic Price", amount: 2_500_000 },
      { label: "Infrastructure Fee", sublabel: "Per unit", amount: 300_000 },
      { label: "Asset Replacement Deposit", sublabel: "Remitted to the Owners' Association on completion", amount: 300_000 },
      { label: "Service Charge Deposit", sublabel: "Subject to review at completion", amount: 600_000 },
      { label: "Total charges", sublabel: "", amount: 3_700_000 },
      { label: "Total cost of ownership", sublabel: "", amount: 128_700_000, isTotalOwnership: true },
    ],
    note: "Final instalment attracts applicable charges.",
  },
];

export const formatNaira = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;
