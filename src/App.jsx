
import { ThemeProvider } from "./context/ThemeContext";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Value from "./components/Value";
import Footer from "./components/Footer";

const App = () => {
  return (
    <ThemeProvider>
      {/* Decorative premium cursor (desktop / fine-pointer only). */}
      <Cursor />

      <div className="min-h-screen bg-primary-50 dark:bg-dark-900 transition-colors duration-200">
        <Navbar />

        <div>
          <HeroSection />
          <About />
          <Skills />
          <Work />
          <Value />
          <Contact />
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
