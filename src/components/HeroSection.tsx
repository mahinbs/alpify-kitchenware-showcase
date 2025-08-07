import { Button } from "@/components/ui/button"
import heroBackground from "@/assets/hero-background.jpg"

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-85" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block">Alpify Global</span>
          <span className="block text-3xl md:text-4xl font-medium opacity-90 mt-2">
            Premium Kitchenware Export
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
          We are a trusted export company committed to delivering excellence in stainless steel kitchenware to markets worldwide.
        </p>
        
        <Button 
          variant="hero" 
          size="lg" 
          onClick={scrollToContact}
          className="text-lg px-12 py-4 h-auto"
        >
          Request for Quotation
        </Button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-70 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection