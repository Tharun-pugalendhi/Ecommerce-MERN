/* jshint esversion:6 */
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Pages/UserContext";
import axios from "axios";

const LoginSignup = () => {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Both fields are required");
    } else {
      setError("");
      try {
        const response = await axios.post("http://localhost:3001/login", {
          username,
          password,
          role, // Include the role in the request
        });
        if (response.status === 200) {
          loginUser(role, username);
          if (role === "admin") {
            navigate("/admin/Order");
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setError("Invalid username or password");
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "" || phone === "") {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username,
        email,
        password,
        phone,
      });
      console.log(response.data);
      setIsActive(false); // Switch to login form after successful signup
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Failed to sign up or Already Exists");
    }
  };

  return (
    <Container className={isActive ? "active" : ""} id="container">
      <FormContainer className="form-container sign-up">
        <Form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          {error && <Error>{error}</Error>}
          <SocialIcons>
            <Icon href="#">
              <i className="fa-brands fa-google-plus-g"></i>
            </Icon>
            <Icon href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </Icon>
            <Icon href="#">
              <i className="fa-brands fa-github"></i>
            </Icon>
            <Icon href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </Icon>
          </SocialIcons>
          <span>or use your email for registration</span>
          <Input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button type="submit">Sign Up</Button>
        </Form>
      </FormContainer>

      <FormContainer className="form-container sign-in">
        <Form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          {error && <Error>{error}</Error>}
          <SocialIcons>
            <Icon href="#">
              <i className="fa-brands fa-google-plus-g"></i>
            </Icon>
            <Icon href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </Icon>
            <Icon href="#">
              <i className="fa-brands fa-github"></i>
            </Icon>
            <Icon href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </Icon>
          </SocialIcons>
          <span>or use your email account</span>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#">Forgot Your Password?</a>
          <Button type="submit">Sign In</Button>
        </Form>
      </FormContainer>

      <ToggleContainer className="toggle-container">
        <Toggle className="toggle">
          <TogglePanel className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <Button className="hidden" id="login" onClick={toggleActive}>
              Sign In
            </Button>
          </TogglePanel>

          <TogglePanel className="toggle-panel toggle-right">
            <h1>Welcome, Friend!</h1>
            <p>Enter your personal details to use all site features</p>
            <Button className="hidden" id="register" onClick={toggleActive}>
              Sign Up
            </Button>
          </TogglePanel>
        </Toggle>
      </ToggleContainer>
    </Container>
  );
};

export default LoginSignup;

const Container = styled.div`
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;

  max-width: 70%;
  min-height: 500px;
  @media (max-width: 768px) {
    max-width: 70%;

    min-height: 700px;
  }
  margin-left: 15%;
  margin-top: 50px;
  margin-bottom: 50px;

  &.active .sign-in {
    transform: translateX(100%);
  }

  &.active .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: move 0.6s;
  }

  &.active .toggle-container {
    transform: translateX(-100%);
    border-radius: 0 150px 100px 0;
  }

  &.active .toggle-left {
    transform: translateX(0);
  }

  &.active .toggle-right {
    transform: translateX(200%);
  }
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;

  &.sign-in {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  &.sign-up {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }
`;

const Form = styled.form`
  // background: linear-gradient(
  //   60deg,
  //   rgba(226, 236, 178, 1) 0%,
  //   rgba(38, 202, 82, 1) 100%
  // );
  background: #c8a1e0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
`;

const SocialIcons = styled.div`
  margin: 20px 0;
`;

const Icon = styled.a`
  border: 1px solid #ccc;
  border-radius: 20%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  width: 40px;
  height: 40px;
`;

const Button = styled.button`
  background-color: #674188;
  color: #fff;
  font-size: 12px;
  padding: 10px 45px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;

  &.hidden {
    background-color: transparent;
    border-color: #fff;
  }
`;

const Select = styled.select`
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
`;

const Error = styled.p`
  color: red;
  margin-bottom: 20px;
`;

const ToggleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 100px;
  z-index: 1000;
`;

const Toggle = styled.div`
  background-color: orange;
  height: 100%;
  background: #674188;
  // linear-gradient(to right, #f8a25c, #e1ec3c);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;

  .toggle-left {
    right: 0;
    transform: translateX(100%);
  }

  .toggle-right {
    right: 0;
    transform: translateX(0);
  }
`;
const TogglePanel = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;

  margin-right: -30px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
`;

const keyframes = `
@keyframes move {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
   50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}`;
const style = document.createElement("style");
style.innerHTML = keyframes;
document.head.appendChild(style);
