import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className="px-5 py-3 pt-6 min-h-[100svh] flex flex-col">
      <Header />
      <main className="flex-1 min-h-full flex flex-col items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
