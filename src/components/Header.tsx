import { Link, NavLink } from "react-router-dom";
import { FaHouseUser, FaPencil, FaUser, FaBookOpen } from "react-icons/fa6";
import {
  PiHouseSimpleLight,
  PiPencilSimpleLineLight,
  PiBookLight,
  PiUserLight,
} from "react-icons/pi";
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
  { label: "Home", icon: PiHouseSimpleLight, to: "" },
  { label: "Practice", icon: PiPencilSimpleLineLight, to: "practice" },
  { label: "Journal", icon: PiBookLight, to: "journal" },
  { label: "Profile", icon: PiUserLight, to: "profile" },
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

//////////////////////////

function renderMobileNavigation(arr: NavElement[]) {
  if (arr.length < 1) return;
  return arr.map((el, i) => {
    const Icon = el.icon;
    return (
      <NavLink
        key={i}
        to={el.to}
        end
        className={({ isActive }) =>
          `size-full flex justify-center items-center transition-all duration-250 ${
            isActive ? "text-violet-600" : "text-violet-400"
          }`
        }
      >
        <Icon className="size-7" />
      </NavLink>
    );
  });
}

export default function Header() {
  return (
    <header>
      {/* desktop navigation */}
      <nav className="hidden sm:flex justify-between items-end w-full max-w-screen-2xl mx-auto pl-10">
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

      {/* mobile navigation */}
      <div
        className="sm:hidden fixed bottom-0 z-30 bg-white/40 rounded-t-3xl w-full backdrop-blur-lg shadow-[0_-4px_24px_rgba(167,139,250,0.15)] 
           border-t border-white/50"
      >
        <nav className="flex items-center justify-around py-3 px-2">
          {renderMobileNavigation(navElements)}
        </nav>
      </div>
    </header>
  );
}
