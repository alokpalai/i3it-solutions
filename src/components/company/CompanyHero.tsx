import { TwoCtaHero, type TwoCtaHeroProps } from "@/components/internal/TwoCtaHero";

type CompanyHeroProps = Omit<TwoCtaHeroProps, "eyebrow"> & { eyebrow?: string };

export function CompanyHero({ eyebrow = "Company", ...props }: CompanyHeroProps) {
  return <TwoCtaHero eyebrow={eyebrow} {...props} />;
}
