import { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";

function UserProfile() {
  // Redirect away if NOT auth

  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = "/auth";
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);
  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }
  const changePswd = async (passwordData) => {
    const res = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json()
    console.log('data', data)
    if(data.success){
      toast.success(data.success,{ position: "top-right" })
    }
    if(data.error){
      toast.error(data.error,{ position: "top-right" })
    }
  };
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm changePswd={changePswd} />
    </section>
  );
}

export default UserProfile;
