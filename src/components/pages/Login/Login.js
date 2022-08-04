import classes from "./Login.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext} from "react";
import AuthContext from "../../context/authContext";
import Button from "../../Button/Button";
import Input from "../../input/Input";

const Login = () => {

    const [user, setUser] = useState({
      email: "dsa@dsa",
      password: ""
    })

    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(()=>{
          auth.login()
          navigate("/")
          // setLoading(false)
        }, 1000)
    }

    const [valid, setValid] = useState({
      email: [true, ""],
      password: [true, ""],
    })

    const inputChangeHandler = (value, description) => {
      setUser({ ...user, [description]: value });
      setValid({...valid, [description]: [true, ""]})
    };
    

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
