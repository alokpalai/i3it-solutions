import { TwoCtaHero, type TwoCtaHeroProps } from "@/components/internal/TwoCtaHero";

type GovernmentHeroProps = Omit<TwoCtaHeroProps, "eyebrow"> & { eyebrow?: string };

export function GovernmentHero({ eyebrow = "Government", ...props }: GovernmentHeroProps) {
  return <TwoCtaHero eyebrow={eyebrow} {...props} />;
}
