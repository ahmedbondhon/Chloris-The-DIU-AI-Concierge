import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 mt-10 px-6 font-sora border-t border-border">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-text-primary uppercase tracking-widest">Chloris</span>
          <span className="w-1 h-1 bg-border rounded-full"></span>
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">Daffodil International University</span>
        </div>
        <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">
          Built by " 13 UPB "
        </p>
      </div>
    </footer>
  );
};

export default Footer;