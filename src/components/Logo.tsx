import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  href?: string;
};

export function Logo({ compact = false, href = "/" }: LogoProps) {
  return (
    <Link href={href} className="inline-flex min-w-0 items-center gap-2.5 no-underline" aria-label="Serpens home">
      <svg
        viewBox="0 0 36 36"
        aria-hidden="true"
        className="size-8 shrink-0 rounded-full ring-1 ring-[var(--line)] sm:size-9"
      >
        <circle cx="18" cy="18" r="17" fill="#E6CA98" stroke="#B89260" strokeWidth="1" />
        <path
          d="M10 22.5c1.8 3.6 7.2 5 11.4 2.4 3.4-2.1 3.6-6.2.2-8.2-2.8-1.6-6.4-.6-7.2 2.2-.7 2.4 1.4 4.2 3.8 3.8 2.2-.4 3.4-2.4 2.6-4.2"
          fill="none"
          stroke="#0F4C5C"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M20.6 18.4c1.8-1.1 4.6-1.2 6.2.2"
          fill="none"
          stroke="#0F4C5C"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle cx="27.2" cy="17.2" r="1.35" fill="#0F4C5C" />
        <circle cx="27.6" cy="16.8" r="0.38" fill="#F6EAD8" />
      </svg>
      {!compact && (
        <span className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--ink)] sm:text-2xl">
          Serpens
        </span>
      )}
    </Link>
  );
}
