import Header from "./components/layout/header";
import { Button } from "./components/ui/button";
import LineBreak from "./components/misc/lineBreak";
import { cn } from "./lib/utils";
import Quote from "./components/misc/quote";
import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import MapSquare from "./components/misc/mapSquare";

const TESTIMONIALS = [
  {
    name: "John Doe",
    quote:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga libero possimus quibusdam reiciendis, nemo quos, fugit rerum perferendis sequi reprehenderit mollitia similique non molestias nihil placeat quam? Est, repellat maiores!",
  },
  {
    name: "Jane Doe",
    quote:
      "Velit iure ut laborum? Voluptatum, inventore porro aliquam perspiciatis dolorum nemo sed eius quos recusandae laudantium, molestiae quo saepe voluptatem velit ab nesciunt praesentium quam consequatur, eveniet pariatur at. Qui.",
  },
  {
    name: "John Doe",
    quote:
      "Iste odit, voluptates asperiores ducimus cupiditate corporis. Voluptatem dolore quisquam necessitatibus, eligendi tenetur omnis laudantium dignissimos qui provident illo odio, magnam alias pariatur. Odio quasi facere tempora consequatur, veniam odit.",
  },
];

function App() {
  const [quote, setQuote] = useState(0);
  const [testimonials, setTestimonials] = useState<
    { name: string; quote: string }[]
  >([]);

  useEffect(() => {
    setTestimonials(TESTIMONIALS);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setQuote((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials, quote]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center gap-8">
        <section className="relative">
          <img src="/hero-1.png" alt="hero" className="w-full" />
          <div className="w-full absolute bottom-30 left-1/2 -translate-x-1/2 flex justify-evenly">
            <Button>
              <a href="#">Schedule Appointment</a>
            </Button>
            <Button>
              <a href="#">Contact Us</a>
            </Button>
          </div>
        </section>
        <section className="flex justify-center -mt-2 pt-18">
          <div className="w-1/2 flex flex-col items-center gap-8">
            <h2 className="text-5xl text-primary font-bold uppercase text-center tracking-widest">
              Men's Haircuts, Beard Styling, Waxing & More!
            </h2>
            <LineBreak />
            <p className="text-center text-lg">
              We built GENT Cuts and Grooming for the man who wants luxury
              without pretense and quality without stuffiness. GENT provides a
              comfortable, un-gimmicky atmosphere where classic barbershop
              services and a cool vintage vibe are paired with modern touches
              for a unique and pleasant grooming experience.
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
          <img src="/hero-2.png" alt="hero 2" className="w-full" />
          <img
            src="/x-ribbon.png"
            alt="x ribbon"
            className="absolute bottom-0 w-full"
          />
        </section>
        <section className="grid grid-cols-2 grid-rows-[auto_auto_auto] gap-17 w-5/8 mx-auto">
          <div className="col-span-1 grid grid-rows-subgrid row-span-3 gap-8 items-center">
            <div>
              <h3 className="text-4xl text-primary font-[Lucida] tracking-widest text-center uppercase">
                Gift Cards
              </h3>
              <LineBreak fancy />
            </div>
            <p className="text-center px-12">
              Giving the gift of GENT has never been easier. A GENT gift card is
              suitable for any occasion, and can be used for all GENT products
              or services. Gift cards come in a variety of denominations and
              arrive ready to give in our signature black envelopes. We also
              have E-Gift cards available for purchase. Click on our gift card
              link!
            </p>
            <div className="relative mb-5">
              <img src="/gift-cards.png" alt="gift cards" className="w-full" />
              <Button
                size="sm"
                className="absolute -bottom-5 left-1/2 -translate-x-1/2"
              >
                Buy Now
              </Button>
            </div>
          </div>
          <div className="col-span-1 grid grid-rows-subgrid row-span-3 gap-8 items-center">
            <div>
              <h3 className="text-4xl text-primary font-[Lucida] tracking-widest text-center uppercase">
                Grooms Parties
              </h3>
              <LineBreak fancy />
            </div>
            <p className="text-center px-12">
              Ditch the cramped quarters of the church office or hotel room, and
              get ready at GENT! Our customizable Groom’s Parties offer a
              dedicated staff, our classic services and the relaxed environment
              of our Minneapolis location. Grab your groomsmen and make it a
              grooming experience to remember!
            </p>
            <div className="relative mb-5">
              <img src="/groom-pic.png" alt="gift cards" className="w-full" />
              <Button
                size="sm"
                className="absolute -bottom-5 left-1/2 -translate-x-1/2"
              >
                More Info
              </Button>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-6 items-center mt-8">
          <h3 className="text-4xl text-primary font-[Lucida] tracking-widest uppercase">
            Testimonials
          </h3>
          <div className="flex flex-col items-center gap-8 w-5/8">
            <div className="w-12">
              <Quote />
            </div>
            {testimonials.length > 0 && (
              <>
                {
                  <div className="flex flex-col items-center gap-6">
                    <p className="text-2xl font-bold text-center font-[Roboto] tracking-wide leading-12">
                      {testimonials[quote].quote}
                    </p>
                    <span className="font-bold text-gray-500 font-[Roboto]">
                      {testimonials[quote].name}
                    </span>
                  </div>
                }
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <span
                      key={index}
                      className={cn(
                        "w-3 h-3 rounded-full cursor-pointer",
                        quote === index ? "bg-primary" : "border border-primary"
                      )}
                      onClick={() => setQuote(index)}
                    ></span>
                  ))}
                </div>
              </>
            )}
            <LineBreak fancy />
          </div>
        </section>
        <section className="w-5/8">
          <div className="grid grid-cols-2 gap-6">
            <form action="" className="col-span-1 flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Name"
                className="bg-gray-300 placeholder:font-semibold placeholder:text-sm"
              />
              <Input
                type="email"
                placeholder="Email"
                className="bg-gray-300 placeholder:font-semibold placeholder:text-sm"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                className="bg-gray-300 placeholder:font-semibold placeholder:text-sm"
              />
              <Textarea
                rows={4}
                placeholder="Message"
                className="bg-gray-300 placeholder:font-semibold placeholder:text-sm"
              />
            </form>
            <div className="flex flex-col gap-4 col-span-1 items-center">
              <MapSquare className="w-6/8 aspect-square" />
              <div>locations</div>
            </div>
          </div>
        </section>
        <div className="h-16 bg-cyan-500"></div>
      </main>
    </div>
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

export default App;
