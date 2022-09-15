import classes from "./Register.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../Button/Button";
import Input from "../../input/Input";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordCheck: ""
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const authURL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  const apiKey = process.env.REACT_APP_API_KEY;

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user.password !== user.passwordCheck) {
      setLoading(false);
      setValid({ ...valid, passwordCheck: [false, "Passwords do not match"] });

    } else {
      try {
        const res = await axios.post(authURL + apiKey, {
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        });
        setAuth(true, {
          email: res.data.email,
          token: res.data.idToken,
          userId: res.data.localId,
        });
      } catch (ex) {
        setLoading(false);
        if (
          ex.response.data.error.message ===
          "WEAK_PASSWORD : Password should be at least 6 characters"
        ) {
          setValid({ ...valid, password: [false, "Too weak password"] });
        }
        if (ex.response.data.error.message === "EMAIL_EXISTS") {
          setValid({ ...valid, email: [false, "Email already exists"] });
        }
        console.log(ex.response.data);
      }
    }
  };

  const [valid, setValid] = useState({
    email: [true, ""],
    password: [true, ""],
    passwordCheck: [true, ""],
  });

  const inputChangeHandler = (value, description) => {
    setUser({ ...user, [description]: value });
    setValid({ ...valid, [description]: [true, ""] });
  };

  if (auth) {
    navigate("/");
  }

  return (
    <AnimatePresence>
      <motion.section
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={classes.registerContainer}
      >
        <h4 className={classes.headerText}>Register</h4>
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

          <Input
            value={user.passwordCheck}
            type="password"
            id="passwordCheck"
            onChange={(val) => inputChangeHandler(val, "passwordCheck")}
            valid={valid.passwordCheck}
          >
            Repeat password
          </Input>

          <Button type="submit" label="Register" loading={loading} />
        </form>
      </motion.section>
    </AnimatePresence>
  );
};

export default Register;
