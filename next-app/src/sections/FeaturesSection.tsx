'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    label: 'LEADERBOARD',
    title: 'become a legend, top the leaderboard',
    image: '/card-leaderboard-new.png',
    isWide: true,
  },
  {
    label: 'FEED',
    title: 'discover and follow top traders',
    image: '/card-feed-new.png',
    isWide: false,
  },
  {
    label: 'ALERTS',
    title: 'real time notifications for what the best are buying',
    image: '/card-alerts-new.png',
    isWide: false,
  },
  {
    label: 'EASY ONBOARDING',
    title: 'create an account in an instant',
    image: '/card-onboarding.jpg',
    isWide: true,
  },
  {
    label: 'ZERO COMPLEXITY',
    title: 'multichain & gasless',
    image: '/card-multichain.jpg',
    isWide: true,
  },
  {
    label: 'ONE CLICK TO BUY',
    title: 'fund with apple pay',
    image: '/card-applepay.jpg',
    isWide: false,
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      const headerEls = headerRef.current?.children;
      if (headerEls) {
        gsap.fromTo(
          headerEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Cards entrance
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-[120px] bg-bg-primary"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <h2 className="text-[36px] md:text-[52px] lg:text-[64px] font-bold text-text-primary tracking-[-0.025em] leading-[1.08]">
            never miss out again
          </h2>
          <p className="text-base md:text-lg text-text-secondary mt-3">
            the only social-first trading app
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  label: string;
  title: string;
  image: string;
  isWide: boolean;
}

function FeatureCard({ label, title, image, isWide }: FeatureCardProps) {
  return (
    <div
      className={`group relative bg-bg-card border border-bg-card-border rounded-[20px] overflow-hidden transition-all duration-400 hover:border-[rgba(99,102,241,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(99,102,241,0.08)] ${
        isWide ? 'lg:col-span-2' : ''
      }`}
    >
      <div className={`flex flex-col h-full ${isWide ? 'lg:flex-row' : ''}`}>
        {/* Text Content */}
        <div className={`p-8 pb-4 flex flex-col justify-center ${isWide ? 'lg:w-[45%] lg:pb-8' : 'w-full'}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-purple">
            {label}
          </span>
          <h3 className="text-xl md:text-2xl font-semibold text-text-primary mt-3 leading-[1.2]">
            {title}
          </h3>
        </div>

        {/* Image */}
        <div className={`relative px-4 pb-4 flex items-center justify-center ${isWide ? 'lg:p-6 lg:pl-0 lg:w-[55%]' : 'w-full'}`}>
          <div className="relative rounded-xl overflow-hidden w-full h-full flex items-center justify-center">
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-contain max-h-[300px] rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
