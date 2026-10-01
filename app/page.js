import Hero from '../components/Hero';
import About from '../components/About';
import WhatIDo from '../components/WhatIDo';
import Expertise from '../components/Expertise';
import Work from '../components/Work';
import Experience from '../components/Experience';
import Collaboration from '../components/Collaboration';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <WhatIDo />
      </Reveal>
      <Reveal>
        <Expertise />
      </Reveal>
      <Reveal>
        <Work />
      </Reveal>
      <Reveal>
        <Experience />
      </Reveal>
      <Reveal>
        <Collaboration />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Footer />
    </>
  );
}
