import classes from "./Login.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const submitHandler = (e) => {
        e.preventDefault()
        console.log("email = " + email + " password = " + password)
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
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className={classes.input}></input>
            <label htmlFor="password">Password</label>

            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className={classes.input}></input>
            <button type="submit" className={classes.button}>Login</button>
        </form>
        <p className={classes.bodyText}>Not a member?  
            <Link to="/register" className={classes.register}>Register</Link>
        </p>
       
      </motion.section>
    </AnimatePresence>
  );
};

export default Login;
