import { useAuth } from "../../context/Auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./login.css"

const Login = () => {
  const { error, handleLogin } = useAuth();
  const navigate =  useNavigate()

  const [cridentials, setCridentials] = useState({
    email: "",
    password: ""
  });

  const handleChnage = (e) => {
    setCridentials({
      ...cridentials,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(cridentials.email, cridentials.password);
    navigate('/house')
  }

  return (
    <div className="login_wrapper">
      <div className="login_content">
        <h2 className="login_title">Login Page</h2>
        <form onSubmit={handleSubmit} className="login_form">
          <div className="login_div">
            <input 
              type="email"
              name="email"
              placeholder="Email"
              value={cridentials.email}
              className="input login_input"
              onChange={handleChnage}
            />
            <input 
              type="password"
              name="password"
              className="input login_input"
              placeholder="Password"
              value={cridentials.password}
              onChange={handleChnage}
            />
          </div>
          <button type="submit" className="login_button">Login</button>
          <p className="login_register">
            Don't have an account? <a href="/register" className="register_link">Register</a>
          </p>
        </form>
        {error && <p className="error_message">{error.message}</p>}
      </div>
    </div>
  )
}

export default Login;
