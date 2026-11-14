import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Prices from "./components/Prices.jsx";
import Footer from "./components/Footer.jsx";
import useActiveSection from "./hooks/useActiveSection.js";
import useReveal from "./hooks/useReveal.js";
import { SECTION_IDS } from "./data/site.js";

export default function App() {
  const active = useActiveSection(SECTION_IDS);
  useReveal();

  return (
    <>
      <Header active={active} />
      <main>
        <Hero />
        <About />
        <Services />
        <Prices />
      </main>
      <Footer />
    </>
  );
}
