import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const avatars = [
  { src: '/avatar-1.jpg', size: 48, delay: 0 },
  { src: '/avatar-2.jpg', size: 56, delay: 0.5 },
  { src: '/avatar-3.jpg', size: 44, delay: 1.0 },
  { src: '/avatar-4.jpg', size: 52, delay: 1.5 },
  { src: '/avatar-5.jpg', size: 40, delay: 2.0 },
  { src: '/avatar-6.jpg', size: 60, delay: 2.5 },
  { src: '/avatar-7.jpg', size: 42, delay: 3.0 },
  { src: '/avatar-8.jpg', size: 50, delay: 3.5 },
  { src: '/avatar-9.jpg', size: 46, delay: 4.0 },
  { src: '/avatar-10.jpg', size: 54, delay: 4.5 },
];

// Pre-calculated orbit positions for the constellation
const orbitPositions = [
  { angle: 0, radius: 0.38 },
  { angle: 36, radius: 0.42 },
  { angle: 72, radius: 0.35 },
  { angle: 108, radius: 0.45 },
  { angle: 144, radius: 0.32 },
  { angle: 180, radius: 0.40 },
  { angle: 216, radius: 0.36 },
  { angle: 252, radius: 0.44 },
  { angle: 288, radius: 0.33 },
  { angle: 324, radius: 0.41 },
];

export default function CommunitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Avatar entrance - scatter to position
      const avatarEls = orbitRef.current?.querySelectorAll('.orbit-avatar');
      if (avatarEls) {
        avatarEls.forEach((el, i) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              scale: 0.5,
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
            },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              duration: 1.2,
              ease: 'expo.out',
              delay: i * 0.08,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                once: true,
              },
            }
          );
        });
      }

      // Text entrance
      const textEls = textRef.current?.children;
      if (textEls) {
        gsap.fromTo(
          textEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Background parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const bg = sectionRef.current?.querySelector('.community-bg');
          if (bg) {
            gsap.set(bg, { y: self.progress * -80 });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden py-[120px]"
    >
      {/* Background Image with Overlay */}
      <div className="community-bg absolute inset-0 z-0">
        <img
          src="/community-bg.jpg"
          alt="Community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(10,10,40,0.88)]" />
      </div>

      {/* Orbit Constellation */}
      <div
        ref={orbitRef}
        className="relative z-10 w-[320px] h-[320px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] mb-12"
      >
        {/* Dotted orbit ring */}
        <div
          className="absolute inset-0 rounded-full border border-dashed border-white/10"
          style={{ transform: 'rotate(15deg)' }}
        />
        <div
          className="absolute inset-[15%] rounded-full border border-dashed border-white/5"
          style={{ transform: 'rotate(-10deg)' }}
        />

        {/* Rotating avatar container */}
        <div className="absolute inset-0 animate-orbit">
          {avatars.map((avatar, i) => {
            const pos = orbitPositions[i];
            const angleRad = (pos.angle * Math.PI) / 180;
            const x = 50 + pos.radius * Math.cos(angleRad) * 50;
            const y = 50 + pos.radius * Math.sin(angleRad) * 50;

            return (
              <div
                key={i}
                className="orbit-avatar absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%)`,
                  opacity: 0,
                }}
              >
                {/* Counter-rotate to keep avatar upright */}
                <div
                  className="rounded-full overflow-hidden border-2 border-white/10 shadow-lg hover:border-accent-purple/50 hover:scale-110 transition-all duration-300 cursor-pointer"
                  style={{
                    width: avatar.size,
                    height: avatar.size,
                    animation: `orbit 60s linear infinite reverse`,
                  }}
                >
                  <img
                    src={avatar.src}
                    alt={`Trader ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent-purple/50" />
      </div>

      {/* Text Content */}
      <div ref={textRef} className="relative z-10 text-center px-6 max-w-[600px]">
        <h2 className="text-[36px] md:text-[52px] lg:text-[64px] font-bold text-text-primary tracking-[-0.025em] leading-[1.08]">
          a trading app
          <br />
          for the rest of us
        </h2>

        <p className="text-base md:text-lg text-text-secondary mt-5">
          join 500,000 traders making their name on nexus
        </p>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button className="px-8 py-[14px] bg-accent-purple text-text-primary font-semibold text-base rounded-xl hover:bg-accent-purple-hover hover:scale-[1.02] hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-200">
            Start trading
          </button>
          <button className="px-8 py-[14px] bg-white/[0.08] text-text-primary font-semibold text-base rounded-xl border border-white/5 hover:bg-white/[0.12] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
            Download app
          </button>
        </div>
      </div>
    </section>
  );
}
