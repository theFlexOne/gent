import LineBreak from "@/components/misc/lineBreak";
import { Button } from "@/components/ui/button";

export default function ServicesSection() {
  return (
    <section className="flex justify-center -mt-2 pt-18">
      <div className="w-1/2 flex flex-col items-center gap-8">
        <h2 className="text-5xl text-primary font-bold uppercase text-center tracking-widest">
          Men's Haircuts, Beard Styling, Waxing & More!
        </h2>
        <LineBreak />
        <p className="text-center text-lg">
          We built GENT Cuts and Grooming for the man who wants luxury without
          pretense and quality without stuffiness. GENT provides a comfortable,
          un-gimmicky atmosphere where classic barbershop services and a cool
          vintage vibe are paired with modern touches for a unique and pleasant
          grooming experience.
        </p>
        <LineBreak />
        <Button>
          <a href="#">More Services</a>
        </Button>
        <p className="text-center text-md font-bold">
          Download the NEW GENT App today and make scheduling your next
          appointment even easier
        </p>
        <div className="flex gap-4">
          <a href="#">
            <img src="/appstore.png" alt="app store" className="h-12" />
          </a>
          <a href="#">
            <img src="/googleplay.png" alt="google play" className="h-12" />
          </a>
        </div>
      </div>
    </section>
  );
}
