import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Background from "../components/layout/Background";
import Hero from "../components/hero/Hero";
import ProblemSolution from "../components/sections/ProblemSolution";
import Features from "../components/sections/Features";
import HowItWorks from "../components/sections/HowItWorks";
import Stats from "../components/sections/Stats";
import Testimonials from "../components/sections/Testimonials";
import FAQ from "../components/sections/FAQ";
import CTA from "../components/sections/CTA";

export default function Landing() {
  return (
    <div className="relative">
      <Background />
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
