import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
       // toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
       
        if (auth && auth.user) {
          if (auth.user.role === 1) {
            navigate("/dashboard/admin");
          } else if (auth.user.role === 0) {
            navigate("/home");
          } else {
            navigate("/login");
          }
        } else {
          // Handle the case when user data is missing
          navigate("/login");
        }
        

        // auth?.user?.role === 1 ? navigate("/dashboard/admin") :auth?.user?.role !== 0?null:  navigate("/home")
        // navigate(location.state || "/dashboard/admin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Sign In- Ecommerce App">
      <div className="form-container ">
        <form onSubmit={handleSubmit}  style={{ height: 300,width:350 }}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{marginLeft:28,marginTop:30}}>
            LOGIN
          </button>
          

         
        </form>
      </div>
    </Layout>
  );
};

export default Login;
