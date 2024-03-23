import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";
import { useEffect } from "react";

export default function AccountLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/account" || pathname === "/account/") {
      navigate("profile");
    }
  }, []);

  return (
    <div className=" grow flex flex-col">
      <AccountNavigation />
      <div className="grow flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
