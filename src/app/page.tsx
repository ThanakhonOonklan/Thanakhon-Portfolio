import { Navbar } from '@/components/layout';
import { WavyBackground } from '@/components/ui';
import ClickSpark from '@/components/reactbits/ClickSpark';
import {
  Hero,
  Projects,
  OtherSkills,
  Experience,
  Skills,
  Certificates,
  About,
  Contact,
} from '@/components/sections';

export default function Home() {
  return (
    <ClickSpark sparkColor="#F28CA6" sparkSize={10} sparkRadius={22} sparkCount={8} duration={450} className="!h-auto">
    <main className="min-h-screen relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />
      <Hero />
      {/* Post-Hero Container with Wavy Curved Background Lines */}
      <div className="relative">
        <WavyBackground />
        <div className="relative z-10">
          <About />
          <Projects />
          <Experience />
          <OtherSkills />
          <Skills />
          <Certificates />
          <Contact />
        </div>
      </div>
    </main>
    </ClickSpark>
  );
}
