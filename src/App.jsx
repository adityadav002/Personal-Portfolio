import "./App.css";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Project from "./pages/Project.jsx";
import Skills from "./pages/Skills.jsx";
import Hero from "./pages/Hero.jsx";
import GuitarString from "./components/GuitarString.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div>
        
        <ToastContainer
          position="top-right"
          toastStyle={{
            background: "black",
            color: "white",
          }}
        />

        <div id="hero" className="w-full">
          <Hero />
        </div>

        <div id="about" className="w-full">
          <About />
        </div>

        <div id="skills" className="w-full">
          <Skills />
        </div>

        <div id="projects" className="w-full">
          <Project />
        </div>

        <div id="contact" className="w-full">
          <Contact />
        </div>

      </div>
    </>
  );
}

export default App;
