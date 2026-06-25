import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  solid: boolean;
}

export default function Navigation({ solid }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
        solid
          ? 'bg-[rgba(5,5,17,0.85)] backdrop-blur-[16px]'
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img src="/assets/logo/logo1.png" alt="ChadWallet Logo" className="h-10 md:h-12 object-contain" />
      </a>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-6">
        {/* App Store Badges */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="h-[36px] px-3 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span className="text-[11px] text-text-secondary leading-tight">
              <span className="block">Download on the</span>
              <span className="block font-semibold text-text-primary">App Store</span>
            </span>
          </a>
          <a
            href="#"
            className="h-[36px] px-3 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z" />
            </svg>
            <span className="text-[11px] text-text-secondary leading-tight">
              <span className="block">GET IT ON</span>
              <span className="block font-semibold text-text-primary">Google Play</span>
            </span>
          </a>
        </div>

        {/* Login */}
        <button className="px-5 py-2 text-sm font-semibold text-text-primary bg-white/8 border border-white/10 rounded-xl hover:bg-white/12 hover:scale-[1.02] transition-all duration-200">
          Login
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-text-primary"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-[rgba(5,5,17,0.95)] backdrop-blur-[16px] border-t border-white/5 p-6 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              Download App
            </a>
            <button className="w-full px-5 py-3 text-sm font-semibold text-text-primary bg-white/8 border border-white/10 rounded-xl">
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
