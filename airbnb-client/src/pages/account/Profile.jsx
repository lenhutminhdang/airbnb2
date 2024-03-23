import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();
  const { user, ready, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    await axios.get("/logout");

    setUser(null);
    navigate("/");
  };

  if (!ready) {
    return <p className="text-sm text-center text-gray-700">Loading...</p>;
  }

  if (!user && ready) {
    navigate("/login");
  }

  return (
    <div className="flex justify-center items-center mt-3 rounded-md">
      <div className="flex flex-col gap-6 p-4 bg-red-50 rounded-lg">
        <div className="flex flex-col gap-2">
          <p className="p-1">
            Logged in as <span className="font-semibold">{user.name}</span>
          </p>
          <p className="p-1">Email: {user.email}</p>
        </div>
        <button onClick={handleLogout} className="primary">
          Logout
        </button>
      </div>
    </div>
  );
}
