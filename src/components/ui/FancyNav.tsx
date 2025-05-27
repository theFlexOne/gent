import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function FancyNav({
  className = "",
  linkClassName = "",
  links = [],
}: {
  className?: string;
  linkClassName?: string;
  links?: {
    to: string;
    text: string;
  }[];
}) {
  className = cn(
    "bg-neutral-800 text-white text-lg font-[Lucida] whitespace-nowrap tracking-widest uppercase flex gap-8 justify-center items-center",
    className
  );

  return (
    <nav className={className}>
      {links &&
        links.map((link, index) => (
          <LocationLink
            key={link.to + index}
            to={formatHref(link.to)}
            className={linkClassName}
            last={index === links.length - 1}
          >
            {link.text}
          </LocationLink>
        ))}
    </nav>
  );
}

function LocationLink({
  children,
  to,
  className,
  last = false,
}: {
  children: React.ReactNode;
  to: string;
  className?: string;
  last?: boolean;
}) {
  className = cn(
    "cursor-pointer relative",
    "after:content-[''] after:w-[1px] after:h-12 after:bg-white after:absolute after:-right-4 after:top-1/2 after:-translate-y-1/2 after:pointer-events-none",
    last && "after:content-none",
    className
  );
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

function formatHref(to: string): string {
  if (!to.startsWith("/")) {
    to = `/${to}`;
  }
  return to;
}
