import { Outlet } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Footer from "./components/Footer";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <div className="mb-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
