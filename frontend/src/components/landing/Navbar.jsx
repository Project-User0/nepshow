import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nepshow } from "../../images";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      id="navbar"
      className="w-full fixed top-0 left-0 z-50 bg-black/70 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#navbar">
            <img
              src={nepshow}
              alt="Nepshow"
              className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 object-contain cursor-pointer"
            />
          </a>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-2 lg:gap-5 xl:gap-8">
            <a
              href="#pricing"
              className="text-white hover:text-red-500 transition px-3 py-2 rounded-md"
            >
              Pricing
            </a>

            <a
              href="#testimonial"
              className="text-white hover:text-red-500 transition px-3 py-2 rounded-md"
            >
              Testimonial
            </a>

            <a
              href="#query"
              className="text-white hover:text-red-500 transition px-3 py-2 rounded-md"
            >
              FAQ
            </a>

            <a
              href="#contact"
              className="text-white hover:text-red-500 transition px-3 py-2 rounded-md"
            >
              Contact
            </a>
          </div>

          {/* Desktop Login */}

          <div className="hidden md:block">
            <a
              href="/login"
              className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-md text-white font-semibold"
            >
              Login
            </a>
          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {isOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800">
          <div className="flex flex-col px-6 py-5 space-y-4">
            <a
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-red-500"
            >
              Pricing
            </a>

            <a
              href="#testimonial"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-red-500"
            >
              Testimonial
            </a>

            <a
              href="#query"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-red-500"
            >
              FAQ
            </a>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-red-500"
            >
              Contact
            </a>

            <a
              href="/login"
              className="mt-3 bg-red-600 hover:bg-red-700 text-center py-3 rounded-lg text-white font-semibold"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
