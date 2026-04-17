export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type PlanId = "free" | "pro" | "family";

export type Plan = {
  id: PlanId;
  name: string;
  priceLabel: string;
  monthlyPrice: number;
  tagline: string;
  features: string[];
  note?: string;
  highlighted: boolean;
  ctaLabel: string;
};
