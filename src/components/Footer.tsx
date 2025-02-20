import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 border-t bg-white/50 backdrop-blur-sm">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:gap-2">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Pietrosul. All rights reserved.
        </p>
        <a
          href="https://github.com/yourusername/plant-recognition"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Github className="w-4 h-4" />
          This project is open-source and public on GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
