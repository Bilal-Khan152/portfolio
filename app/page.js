import Hero from '../components/Hero';
import About from '../components/About';
import Expertise from '../components/Expertise';
import Products from '../components/Products';
import Experience from '../components/Experience';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Reveal from '../components/Reveal';

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <About />
      </Reveal>
      <Reveal delay={80}>
        <Expertise />
      </Reveal>
      <Reveal delay={80}>
        <Products />
      </Reveal>
      <Reveal delay={80}>
        <Experience />
      </Reveal>
      <Reveal delay={80}>
        <Reviews />
      </Reveal>
      <Contact />
    </>
  );
}
