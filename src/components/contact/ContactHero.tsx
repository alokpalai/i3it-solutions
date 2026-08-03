import { TwoCtaHero, type TwoCtaHeroProps } from "@/components/internal/TwoCtaHero";

type ContactHeroProps = Omit<TwoCtaHeroProps, "eyebrow"> & { eyebrow?: string };

export function ContactHero({ eyebrow = "Contact", ...props }: ContactHeroProps) {
  return <TwoCtaHero eyebrow={eyebrow} {...props} />;
}
