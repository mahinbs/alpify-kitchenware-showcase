import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

const FloatingWhatsAppButton = () => {
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

  const openWhatsApp = () => {
    const phoneNumber = "919886317956"
    const message = "Hi! I'm interested in your kitchenware products"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        onClick={openWhatsApp}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20c95a] text-white shadow-strong hover:shadow-medium transition-all duration-300 p-0 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  )
}

export default FloatingWhatsAppButton