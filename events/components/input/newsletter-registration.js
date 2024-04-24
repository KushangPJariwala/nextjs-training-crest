import { useContext, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const e = useRef();

  const notiCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();
    const email = e.current.value;

    notiCtx.showNotification({
      title: "signing up...",
      message: "registering news letter",
      status: "pending",
    });
    try {
      const res = await fetch("/api/register-email", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("data", data);
      notiCtx.showNotification({
        title: "success",
        message: "registered news letter...",
        status: "success",
      });
    } catch (err) {
      notiCtx.showNotification({
        title: "Error",
        message: err.message || 'something wrong',
        status: "error",
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={e}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
