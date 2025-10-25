import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import wrinkledPaper from "../assets/backgrounds/wrinkled_paper.webp";
import gradient from "../assets/backgrounds/sea_gradient.webp";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <>
      <div
        className="px-1 py-3 pt-6 min-h-[100svh] flex flex-col bg-cover bg-center overflow-x-hidden"
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
      <Toaster
        position="top-center"
        expand
        offset={50}
        duration={3000}
        toastOptions={{
          classNames: {
            toast:
              "!bg-white/80 !backdrop-blur-lg !rounded-2xl " +
              "!shadow-[0_14px_40px_-10px_rgba(0,0,0,0.30)] !ring-1 !ring-white/50 " +
              "!bg-[linear-gradient(135deg,rgba(253,226,228,.28),rgba(204,229,246,.24))] !text-green-500",
            title: "!text-purple-800",
            description: "!text-pink-700",
          },
        }}
      />
    </>
  );
}
