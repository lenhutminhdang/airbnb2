import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormWrapper from "../components/Form/FormWrapper";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/signup", {
        name,
        email,
        password,
      });

      window.alert("Sign up successfully. You can login now!");
      navigate("/login");
    } catch (error) {
      window.alert("Sign up failed. Please try again!");
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit} type="signup">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="name"
        className="w-full"
        required
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="example@email.com"
        className="w-full"
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
