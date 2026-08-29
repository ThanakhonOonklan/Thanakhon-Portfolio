import { Navbar } from '@/components/layout';
import { WavyBackground } from '@/components/ui';
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
    <main className="min-h-screen relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />
      <Hero />
      {/* Post-Hero Container with Wavy Curved Background Lines */}
      <div className="relative">
        <WavyBackground />
        <div className="relative z-10">
          <About />
          <Projects />
          <OtherSkills />
          <Experience />
          <Skills />
          <Certificates />
          <Contact />
        </div>
      </div>
    </main>
  );
}
