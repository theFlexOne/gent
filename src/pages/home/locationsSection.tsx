import { cn } from "@/lib/utils";

export default function LocationsSection() {
  return (
    <section className="flex flex-col relative mt-24">
      <nav className="absolute -top-16 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-xl flex gap-8 justify-center items-center px-12 h-32">
        <LocationLink href="#">St Paul</LocationLink>
        <LocationLink href="#">Minneapolis</LocationLink>
        <LocationLink href="#">Edina</LocationLink>
        <LocationLink href="#">Eagan</LocationLink>
        <LocationLink href="#">Eden Prairie</LocationLink>
        <LocationLink href="#" last>
          Apple Valley
        </LocationLink>
      </nav>
      <img src="/hero-2.png" alt="hero 2" className="w-screen" />
      <img
        src="/x-ribbon.png"
        alt="x ribbon"
        className="absolute bottom-0 w-full"
      />
    </section>
  );
}

function LocationLink({
  children,
  href,
  last = false,
}: {
  children: React.ReactNode;
  href: string;
  last?: boolean;
}) {
  const className = cn(
    "hover:underline cursor-pointer",
    !last &&
      " relative after:content-[''] after:w-[1px] after:h-12 after:bg-white after:absolute after:-right-4 after:top-1/2 after:-translate-y-1/2"
  );
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
