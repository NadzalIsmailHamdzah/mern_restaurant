import Navbar from "../../components/user/Navbar";
import Hero from "../../components/user/Hero";
import Features from "../../components/user/Features"
import Why from "../../components/user/Why"
import Menu from "../../components/user/Menu"
import About from "../../components/user/About"
import Review from "../../components/user/Review"
import CtaSection from "../../components/user/Cta";
import Footer from "../../components/user/Footer";
// import komponen lain: FeatureCards, WhyUs, MenuHighlights, About, Testimonials, CTASection, Footer

function Home() {
  return (
    <>
      <div className="bg-[#F8F7F2]">
        <Navbar />
        <Hero />
        <Features />
        <Why />
        <Menu />
        <About />
        <Review />
        <CtaSection />
        <Footer />
      </div>
    </>
  );
}

export default Home;
