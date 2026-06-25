import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WebPlatformSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text elements entrance
      const textEls = [badgeRef.current, headlineRef.current, descRef.current];
      textEls.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
            delay: i * 0.15,
          }
        );
      });

      // Desktop mockup entrance
      gsap.fromTo(
        desktopRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        }
      );

      // Phone mockup entrance
      gsap.fromTo(
        phoneRef.current,
        { opacity: 0, y: 100, x: 30 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 1.0,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            once: true,
          },
        }
      );

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(desktopRef.current, { y: p * -30 });
          gsap.set(phoneRef.current, { y: p * -50 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-[120px] overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-[rgba(99,102,241,0.12)] mb-6"
          style={{ opacity: 0 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-purple">
            Now Available on Web
          </span>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-[36px] md:text-[52px] lg:text-[64px] font-bold text-text-primary tracking-[-0.025em] leading-[1.08]"
          style={{ opacity: 0 }}
        >
          trade from anywhere.
          <br />
          never lose a beat.
        </h2>

        {/* Description */}
        <p
          ref={descRef}
          className="text-base md:text-lg text-text-secondary max-w-[520px] mx-auto mt-6"
          style={{ opacity: 0 }}
        >
          Open a trade on your phone, close it on your desktop — all in one app.
        </p>

        {/* Device Mockups */}
        <div className="relative mt-16 md:mt-20 max-w-[1000px] mx-auto">
          {/* Desktop Mockup */}
          <div
            ref={desktopRef}
            className="relative rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)] border border-white/5"
            style={{ opacity: 0 }}
          >
            <img
              src="/nexus-desktop-mockup.jpg"
              alt="Nexus trading platform on desktop"
              className="w-full h-auto"
            />
          </div>

          {/* Phone Mockup - overlapping */}
          <div
            ref={phoneRef}
            className="absolute -bottom-8 right-4 md:right-12 w-[140px] md:w-[200px] lg:w-[240px]"
            style={{ opacity: 0, transform: 'rotate(-8deg)' }}
          >
            <img
              src="/nexus-mobile-mockup.png"
              alt="Nexus mobile app"
              className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
