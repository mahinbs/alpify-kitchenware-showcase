import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

const StickyQuotationButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="cta"
        size="lg"
        onClick={scrollToContact}
        className="shadow-strong hover:shadow-medium transition-all duration-300 rounded-full px-6"
      >
        <FileText className="w-5 h-5 mr-2" />
        Get Quote
      </Button>
    </div>
  )
}

export default StickyQuotationButton