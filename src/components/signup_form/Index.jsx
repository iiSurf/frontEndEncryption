import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/auth_context";

const SignUp = ({ setNewUser }) => {
  const nav = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.password2) {
        throw "Password Do Not Match";
      } else {
        await signUp(formData);
        nav("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = () => {
    setNewUser(false);
  };

  return (
    <div className="forms">
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="name1">Name: </label>
        <input
          type="text"
          id="name1"
          name="name"
          placeholder="First and Last Name"
          onChange={handleChange}
        />
        <label htmlFor="email1">Email: </label>
        <input
          type="email"
          id="email1"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <label htmlFor="password1">Password: </label>
        <input
          type="password"
          id="password1"
          name="password"
          placeholder="Password"
          minLength="6"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password2"
          name="password2"
          placeholder="Confirm Password"
          minLength="6"
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Already have an account? <button onClick={handleClick}>Sign In</button>
      </p>
    </div>
  );
};

export default SignUp;
