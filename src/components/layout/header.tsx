import { Button } from "../ui/button";

const logoImage = "/gents-logo.png";

export default function Header() {
  return (
    <div className="h-16 bg-stone-950 absolute w-full top-6 flex items-center px-4 space-x-8 z-50">
      <img src={logoImage} alt="logo" className="h-full" />
      <nav className="flex-1 uppercase flex text-white">
        <ul className="flex-1 flex justify-evenly items-center">
          <Button variant="link" className="text-white" size="text">
            <a href="#">Schedule</a>
          </Button>
          <Button variant="link" className="text-white" size="text">
            <a href="#">Locations</a>
          </Button>
          <Button variant="link" className="text-white" size="text">
            <a href="#">Products</a>
          </Button>
          <Button variant="link" className="text-white" size="text">
            <a href="#">Services We Offer</a>
          </Button>
          <Button variant="link" className="text-white" size="text">
            <a href="#">Education & Training</a>
          </Button>
          <Button variant="link" className="text-white" size="text">
            <a href="#">Careers</a>
          </Button>
        </ul>
        <Button size="sm">
          <a href="#">Contact</a>
        </Button>
      </nav>
    </div>
  );
}
