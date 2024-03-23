import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser() {},
  ready: false,
});

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const { data } = await axios.get("/profile");
        setUser(data);
        setReady(true);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
