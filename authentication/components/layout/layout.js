import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainNavigation from "./main-navigation";
function Layout(props) {
  return (
    <>
      <ToastContainer />
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
