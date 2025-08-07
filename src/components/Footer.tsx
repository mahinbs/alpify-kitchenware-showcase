import { Link } from "react-router-dom"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-steel-primary text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Alpify Global</h3>
            <p className="text-steel-light leading-relaxed">
              Your trusted partner for premium stainless steel kitchenware export. 
              Delivering excellence to global markets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-steel-light hover:text-white transition-colors duration-300"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('products')}
                  className="text-steel-light hover:text-white transition-colors duration-300"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-steel-light hover:text-white transition-colors duration-300"
                >
                  Contact
                </button>
              </li>
              <li>
                <a 
                  href="#"
                  className="text-steel-light hover:text-white transition-colors duration-300"
                >
                  Terms
                </a>
              </li>
              <li>
                <Link 
                  to="/certificate"
                  className="text-steel-light hover:text-white transition-colors duration-300"
                >
                  Certificate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-steel-light">
              <p>info@alpifyglobal.com</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Export Avenue<br />Trade City, TC 12345</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-steel-accent pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-steel-light text-sm">
              © {currentYear} Alpify Global. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="#" 
                className="text-steel-light hover:text-white transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-steel-light hover:text-white transition-colors duration-300 text-sm"
              >
                Terms of Service
              </a>
              <Link 
                to="/admin/login" 
                className="text-steel-light hover:text-white transition-colors duration-300 text-sm"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer