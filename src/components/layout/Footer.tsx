import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 mt-10 px-6 font-outfit border-t border-slate-800/50">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-slate-100 uppercase tracking-widest">Chloris</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Daffodil International University</span>
        </div>
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} All Rights Reserved. Built by DIU Dev Team.
        </p>
      </div>
    </footer>
  );
};

export default Footer;