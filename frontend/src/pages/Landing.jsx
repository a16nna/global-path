import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProblemSolution from "../components/ProblemSolution";
import Spotlight from "../components/Spotlight";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";

function Landing() {
  return (
    <div className="bg-black">
      <Spotlight />
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="problem">
        <ProblemSolution />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>
    </div>
  );
}

export default Landing;