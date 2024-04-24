import { useContext, useRef, useState } from "react";
import classes from "./auth-form.module.css";
import Context from "../../store/context";
import Loader from "../ui/loader";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function AuthForm() {
  // const [isLogin, setIsLogin] = useState(true);
  const router = useRouter()
  const context = useContext(Context);
  const { isLogin, setIsLogin, loading, setLoading } = context;
  const em = useRef();
  const p = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const signUp = async (email, password) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      // console.log("data", data);
      setLoading(false);
      if (data.success) {
        toast.success(data.success, { position: "top-right" });
      }
      if (data.warning) {
        toast.warning(data.warning, { position: "top-right" });
      }
      if (data.error) {
        toast.error(data.error, { position: "top-right" });
      }
    } catch (err) {
      toast.error(err.message, { position: "top-right" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = em.current.value;
    const password = p.current.value;
    if (isLogin === false) {
      await signUp(email, password);
    } else if (isLogin) {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log("res", res);
      if (!res.error) {
        // window.loca`tion.href = "/profile";
        router.replace('/profile')
        toast.success("login successfull", { position: "top-right" });
      }
      if (res.error) {
        toast.error(res.error, { position: "top-right" });
      }
      setLoading(false);
    }
  };
  return (
    <section className={classes.auth}>
      {loading && <Loader />}
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={em} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={p} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
