import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import wrinkledPaper from "../assets/backgrounds/wrinkled_paper.webp";
import gradient from "../assets/backgrounds/sea_gradient.webp";

export default function Layout() {
  return (
    <div
      className="px-5 py-3 pt-6 min-h-[100svh] w-full flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `
        linear-gradient(to top, rgba(255,255,255,0.25), transparent 40%),
      linear-gradient(
        to bottom,
        rgba(253, 226, 228, 0.7),
        rgba(204, 229, 246, 0.7),
        rgba(240, 230, 250, 0.6)
      ),
      url(${wrinkledPaper}),
      url(${gradient})
    `,
        backgroundBlendMode: "normal, overlay, soft-light, soft-light",
        backgroundSize: "cover, cover, cover, cover",
        backgroundPosition: "center, center, center, center",
      }}
    >
      <Header />
      <main className="flex-1 min-h-full flex flex-col items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
