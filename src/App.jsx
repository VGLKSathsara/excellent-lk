import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Prices from "./components/Prices.jsx";
import Footer from "./components/Footer.jsx";
import LoginModal from "./components/LoginModal.jsx";
import useActiveSection from "./hooks/useActiveSection.js";
import { SECTION_IDS } from "./data/site.js";

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  return (
    <>
      <Header active={active} onLogin={() => setLoginOpen(true)} />
      <main>
        <Hero onLogin={() => setLoginOpen(true)} />
        <About />
        <Services />
        <Prices />
      </main>
      <Footer />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
