import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { JSX } from "react";
import type { IconType } from "react-icons";

const footerLinks = ["About", "Privacy Policy", "Contact"];
type FooterMedia = {
  icon: IconType;
  size: number;
  className: string;
};
const footerMedia: FooterMedia[] = [
  { icon: FaFacebook, size: 20, className: "text-blue-500 hover:scale-125" },
  { icon: FaWhatsapp, size: 20, className: "text-green-500 hover:scale-125" },
  { icon: FaInstagram, size: 20, className: "text-pink-500 hover:scale-125" },
];
const signature = `© ${new Date().getFullYear()} MindfulMoments, Inc.`;

const renderFooterLinks = (arr: string[]) => {
  if (arr.length < 1) return;
  return arr.map((str, i) => {
    return (
      <li key={i}>
        <Link to="#" className="hover:underline">
          {str}
        </Link>
      </li>
    );
  });
};
// FINISH FUNCTION
const renderFooterMedia = (arr: FooterMedia[]) => {
  if (arr.length < 1) return;
  return arr.map((el, j) => {
    const Icon = el.icon;
    return (
      <li key={j}>
        <Link
          to="#"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon size={el.size} className={el.className} />
        </Link>
      </li>
    );
  });
};

export default function Footer() {
  return (
    <footer className="p-1 w-full block">
      <div className="w-full p2 flex items-center justify-between mt-3">
        <ul className="flex text-sm gap-3">{renderFooterLinks(footerLinks)}</ul>
        <span className="flex gap-3 text-sm items-center">
          {signature}
          <ul className="flex text-sm gap-3">
            {renderFooterMedia(footerMedia)}
          </ul>
        </span>
      </div>
    </footer>
  );
}
