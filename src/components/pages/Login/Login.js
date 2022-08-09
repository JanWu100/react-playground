import classes from "./Login.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../Button/Button";
import Input from "../../input/Input";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Login = () => {
    const [auth, setAuth] = useAuth();
    const [user, setUser] = useState({
      email: "",
      password: ""
    })

    const [valid, setValid] = useState({
      email: [true, ""],
      password: [true, ""]
    })

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const authURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
    const apiKey = process.env.REACT_APP_API_KEY

    const submitHandler = async (e) => {
        e.preventDefault()
        if (user.email.length + user.password.length === 0) {
          setValid({...valid, email: [false, "Fill in email"], password: [false, "Fill in password"]})
        } else if (user.email.length === 0) {
          setValid({...valid, email: [false, "Fill in email"]})
        } else if (user.password.length === 0) {
          setValid({...valid, password: [false, "Fill in"]})
        } else {
          setLoading(true)

        try {
            const res = await axios.post(authURL + apiKey, {
                email: user.email,
                password: user.password,
                returnSecureToken: true
            })

            setAuth(true, {
              email: res.data.email,
              token: res.data.idToken,
              userId: res.data.localId
            })
            
        } catch (ex) {
            setLoading(false)
            if (ex.response.data.error.message === "INVALID_PASSWORD") {
                setValid({...valid, password: [false, "Invalid password"]})
            }
            if (ex.response.data.error.message === "EMAIL_NOT_FOUND") {
                setValid({...valid, email: [false, "Email not found"]})
            }
        }
    }
  }


    const inputChangeHandler = (value, description) => {
      setUser({ ...user, [description]: value });
      setValid({...valid, [description]: [true, ""]})
    };

  if (auth) {
    navigate("/")
  }
    

  return (
    <AnimatePresence>
      <motion.section
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: .2 }}
        className={classes.loginContainer}
      >
        <h4 className={classes.headerText}>Login</h4>
        <form onSubmit={submitHandler}>
              <Input
                value={user.email}
                type="email"
                id="email"
                onChange={(val) => inputChangeHandler(val, "email")}
                valid={valid.email}
                >
                Email
              </Input>

              <Input
                value={user.password}
                type="password"
                id="password"
                onChange={(val) => inputChangeHandler(val, "password")}
                valid={valid.password}
                >
                Password
              </Input>

            <Button type="submit" label="Login" loading={loading} />
        </form>
        <p className={classes.bodyText}>Not a member?  
            <Link to="/register" className={classes.register}>Register</Link>
        </p>
       
      </motion.section>
    </AnimatePresence>
  );
};

export default Login;
