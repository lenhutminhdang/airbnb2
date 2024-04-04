import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import FormWrapper from "../components/Form/FormWrapper";

export default function Login() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDoc = await axios.post("/login", { email, password });

      setUser(userDoc.data);
      navigate("/");
    } catch (error) {
      window.alert("Login failed!");
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit} type="login">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="example@email.com"
        className="w-full "
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
        className="w-full"
        required
      />
    </FormWrapper>
  );
}
