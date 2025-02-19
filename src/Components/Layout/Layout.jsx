import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Breadcrumb from "../../small Components/Breadcrumb/Breadcrumb";
import styles from "./Layout.module.css";
export default function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <div>
        <Header adText="Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!" />
        <Navbar />
        <Breadcrumb />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
