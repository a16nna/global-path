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
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
    </div>
  );
}

export default Landing;