import FacebookBadge from "../misc/FacebookBadge";
import InstagramBadge from "../misc/InstagramBadge";
import FancyNav from "../ui/FancyNav";
import Header from "./Header";
import { Link, Outlet } from "react-router-dom";
import GlobalModalProvider from "@/context/globalModal/GlobalModalProvider";
import UserDataProvider from "@/context/user/UserDataProvider";

const FOOTER_LINKS = [
  {
    to: "#",
    text: "Careers",
  },
  {
    to: "#",
    text: "Contact",
  },
  {
    to: "#",
    text: "Privacy Policy",
  },
];

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <UserDataProvider>
        <GlobalModalProvider>
          <Header />
          <div className="flex-1">
            <Outlet />
          </div>
          <Footer />
        </GlobalModalProvider>
      </UserDataProvider>
    </div>
  );
}

function Footer() {
  return (
    <div className="h-16 mt-12 bg-neutral-800 flex gap-8 px-8">
      <div className="flex gap-2 -mt-4 h-3/4">
        <Link to="#">
          <FacebookBadge />
        </Link>
        <Link to="#">
          <InstagramBadge />
        </Link>
      </div>
      <FancyNav
        links={FOOTER_LINKS}
        className="px-8 text-gray-300/80"
        linkClassName="after:h-8 text-sm hover:text-white after:bg-gray-300/80"
      />
    </div>
  );
}
