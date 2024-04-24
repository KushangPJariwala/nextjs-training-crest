import Link from "next/link";
import classes from "./main-navigation.module.css";
import { signOut, useSession } from "next-auth/react";

function MainNavigation() {
  const { data: session, status } = useSession();
  console.log("session", session);
  console.log("status", status);
  const logout=()=>{
    signOut()
  }
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session &&<li>
            <Link href="/auth">Login</Link>
          </li>}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && <li>
            <button onClick={logout}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
