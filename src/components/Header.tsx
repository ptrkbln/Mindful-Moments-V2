import { Link, NavLink } from "react-router-dom";
import { FaHouseUser, FaPencil, FaUser, FaBookOpen } from "react-icons/fa6";
import type { IconType } from "react-icons";

const HoverEffect = () => (
  <>
    <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-accent group-hover:w-1/2"></span>
    <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-accent group-hover:w-1/2"></span>
  </>
);

type NavElement = {
  label: string;
  icon: IconType;
  to: string;
};
const navElements: NavElement[] = [
  { label: "Daily Practice", icon: FaPencil, to: "/app/practice" },
  { label: "Gratitude Journal", icon: FaBookOpen, to: "/app/journal" },
  { label: "My Profile", icon: FaUser, to: "/app/profile" },
  { label: "Home", icon: FaHouseUser, to: "/app" },
];

const renderNavElements = (arr: NavElement[]) => {
  if (arr.length < 1) return;
  return arr
    .filter((el) => el.label !== "Home")
    .map((el, i) => {
      const Icon = el.icon;
      return (
        <li key={i}>
          <NavLink
            to={el.to}
            className="relative group text-neutral-dark w-max flex items-center"
          >
            <Icon className="mr-2" />
            {el.label}
            <HoverEffect />
          </NavLink>
        </li>
      );
    });
};

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between items-end w-full max-w-screen-2xl mx-auto pl-10">
        <Link to="/app">
          <h1 className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
            <span className="text-3xl sm:text-4xl  font-bold text-primary">
              Mindful
            </span>
            <span className="font-semibold text-2xl sm:text-3xl text-primary-light">
              Moments
            </span>
          </h1>
        </Link>

        <ul className="flex gap-9 mr-8">{renderNavElements(navElements)}</ul>
      </nav>
    </header>
  );
}
