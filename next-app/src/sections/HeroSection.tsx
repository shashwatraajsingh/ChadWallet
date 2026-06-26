import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const astronautRef = useRef<HTMLImageElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Step 1: Background zoom
      tl.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }
      );

      // Step 2: Astronaut
      tl.fromTo(
        astronautRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 },
        0.4
      );

      // Step 3: Wordmark
      tl.fromTo(
        wordmarkRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.3
      );

      // Step 4: Headline
      tl.fromTo(
        headlineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.5
      );

      // Step 5: Subheadline
      tl.fromTo(
        subRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.65
      );

      // Step 6: CTA buttons
      tl.fromTo(
        ctaRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.8
      );

      // Step 7: Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 0.5 },
        1.0
      );

      // Floating animation for astronaut
      gsap.to(astronautRef.current, {
        y: -12,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Scroll exit animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(bgRef.current, {
            scale: 1 + progress * 0.05,
          });
          gsap.set([wordmarkRef.current, headlineRef.current, subRef.current, ctaRef.current], {
            y: -progress * 100,
            opacity: 1 - progress * 1.5,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <img
          src="/background.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050511] via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050511]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,17,0.4)_100%)]" />
      </div>

      {/* Floating App Preview */}
      <img
        ref={astronautRef}
        src="/hero-mockup.png"
        alt="App Preview"
        className="absolute z-[1] w-[550px] md:w-[720px] lg:w-[1000px] -bottom-[9%] md:-bottom-[15%] lg:-bottom-[2%] left-1/2 -translate-x-1/2 drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-3xl"
        style={{ opacity: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto mt-[-10vh]">
        {/* Brand Wordmark */}
        <h1
          ref={wordmarkRef}
          className="text-[72px] md:text-[100px] lg:text-[140px] font-extrabold text-text-primary tracking-[-0.04em] leading-[0.95] drop-shadow-[0_4px_60px_rgba(0,0,0,0.5)]"
        >
          ChadWallet
        </h1>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-[32px] md:text-[42px] lg:text-[48px] font-semibold text-text-primary tracking-[-0.02em] mt-6"
          style={{ opacity: 0 }}
        >
          where traders become legends.
        </h2>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="text-base md:text-lg text-text-secondary max-w-[540px] mx-auto mt-4"
          style={{ opacity: 0 }}
        >
          From memecoins to viral tokens, trade any crypto in seconds.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex items-center justify-center gap-4 mt-10"
          style={{ opacity: 0 }}
        >
          <button className="px-8 py-[14px] bg-accent-purple text-text-primary font-semibold text-base rounded-xl hover:bg-accent-purple-hover hover:scale-[1.02] hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200">
            Start trading
          </button>
          <button className="px-8 py-[14px] bg-white/[0.08] text-text-primary font-semibold text-base rounded-xl border border-white/5 hover:bg-white/[0.12] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
            Download app
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce-gentle"
        style={{ opacity: 0 }}
      >
        <ChevronDown className="w-6 h-6 text-text-secondary/50" />
      </div>
    </section>
  );
}
