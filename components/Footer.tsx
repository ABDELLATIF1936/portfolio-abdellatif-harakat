
import React from 'react';

interface FooterProps {
  name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
  return (
    <footer className="py-12 border-t border-gray-800 bg-[#0D1117]">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {name}.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
