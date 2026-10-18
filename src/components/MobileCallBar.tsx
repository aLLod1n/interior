import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

/** Phones only: call and WhatsApp always one tap away at the bottom of the screen. */
export function MobileCallBar({ dict }: { dict: Dictionary }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-ink bg-canvas pb-[env(safe-area-inset-bottom)] sm:hidden">
      <a
        href={site.phoneHref}
        className="flex h-14 items-center justify-center gap-2.5 bg-ink text-caption font-medium uppercase tracking-[0.06em] text-canvas active:bg-graphite"
      >
        <PhoneIcon />
        {dict.footer.call}
      </a>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="flex h-14 items-center justify-center gap-2.5 text-caption font-medium uppercase tracking-[0.06em] active:bg-linen"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
    </div>
  );
}
