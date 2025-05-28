import FancyNav from "@/components/ui/FancyNav";

export default function TopSection({
  links,
}: {
  links: { to: string; text: string }[] | undefined;
}) {
  return (
    <div className="h-[500px] mb-16 relative w-full">
      <img
        src="/images/hero-3.png"
        alt="hero"
        className="w-full h-full object-cover object-center"
      />
      {links && (
        <FancyNav
          links={links}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 h-32 px-10"
        />
      )}
    </div>
  );
}
