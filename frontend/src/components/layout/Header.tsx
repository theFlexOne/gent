import { NavLink } from "react-router-dom";
import Button from "../ui/Button";
import useGlobalModalContext from "@/context/globalModal/useGlobalModalContext";
import useUserDataContext from "@/context/user/useUserDataContext";

export default function Header() {
  const { openModal } = useGlobalModalContext("login");
  const { user, logout } = useUserDataContext();

  function handleClick(): void {
    if (user) {
      return logout();
    }
    openModal();
  }

  return (
    <>
      <div className="h-20 bg-stone-950 absolute w-full top-6 flex items-center z-10 px-12">
        <NavLink to="/" className="h-[160%] flex items-center">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-full min-w-[100px] object-contain"
          />
        </NavLink>
        <nav className="flex-1 uppercase h-full flex whitespace-nowrap tracking-wider font-[Lucinda] text-sm font-bold">
          <ul className="flex flex-1 h-full items-center">
            <div className="flex-1 flex h-full justify-around">
              <HeaderLink to="/schedule">Schedule</HeaderLink>
              <HeaderLink to="/locations">Locations</HeaderLink>
              <HeaderLink to="/products">Products</HeaderLink>
              <HeaderLink to="/services">Services We Offer</HeaderLink>
              <HeaderLink to="/education">Education & Training</HeaderLink>
              <HeaderLink to="/careers">Careers</HeaderLink>
            </div>
            <Button size="sm" className="ml-4" onClick={handleClick}>
              {user ? "Logout" : "Login"}
            </Button>
          </ul>
        </nav>
      </div>
    </>
  );
}

function HeaderLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className="cursor-pointer h-full flex text-center hover:bg-stone-800 hover:text-primary"
      style={({ isActive }) =>
        isActive ? { color: "#8B7F3D" } : { color: "white" }
      }
    >
      <li className="h-full flex items-center">{children}</li>
    </NavLink>
  );
}
