const footerColumns = [
  {
    title: 'ABOUT',
    links: ['Blog', 'FAQ', 'Affiliates'],
  },
  {
    title: 'SOCIAL',
    links: ['Discord', 'X/Twitter', 'Instagram', 'Youtube', 'LinkedIn'],
  },
  {
    title: 'LEGAL',
    links: ['Privacy Policy', 'Terms of Service'],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-bg-primary border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 py-[80px]">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          {/* Brand */}
          <div className="md:max-w-[300px]">
            <a href="/" className="text-3xl font-bold text-text-primary tracking-tight">
              nexus
            </a>
            <p className="text-sm text-text-secondary mt-2">
              where traders become legends.
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 my-10" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            &copy; 2026 Nexus Labs Inc.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
