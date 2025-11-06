import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import wrinkledPaper from "../assets/backgrounds/wrinkled_paper.webp";
import gradient from "../assets/backgrounds/sea_gradient.webp";
import ToastProvider from "../contexts/ToastContext";
import Toast from "../components/Toast";

export default function Layout() {
  return (
    <ToastProvider>
      <div
        className="px-0.25 py-3 pt-6 min-h-[100svh] flex flex-col bg-cover bg-center overflow-x-hidden"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(255,255,255,0.25), transparent 40%),
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
      <Toast />
    </ToastProvider>
  );
}
