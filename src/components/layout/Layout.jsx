import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "./Layout.module.css";
import AboutUs from "./sections/AboutUs/AboutUs";
import Advantages from "./sections/Advantages/Advantages";
import Assortment from "./sections/Assortment/Assortment";
import Contacts from "./sections/Contacts/Contacts";
import Delivery from "./sections/Delivery/Delivery";
import Faq from "./sections/Faq/Faq";
import Hero from "./sections/Hero/Hero";
import Reviews from "./sections/Reviews/Reviews";
import Stages from "./sections/Stages/Stages";

const Layout = ({ container }) => {
  return (
    <div>
      <Header container={container} />
      <main className={styles.main}>
        <Hero container={container} />
        <Assortment container={container} />
        <Advantages container={container} />
        <Stages container={container} />
        <Delivery container={container} />
        <Reviews container={container} />
        <AboutUs container={container} />
        <Faq container={container} />
        <Contacts container={container} />
      </main>
      <Footer container={container} />
    </div>
  );
};

export default Layout;
