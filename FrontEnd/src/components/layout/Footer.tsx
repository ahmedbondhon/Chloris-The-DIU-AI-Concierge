import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 text-center text-slate-400 text-xs border-t border-slate-200 mt-auto">
      <p>&copy; {new Date().getFullYear()} Chloris AI Concierge. Daffodil International University.</p>
    </footer>
  );
};

export default Footer;