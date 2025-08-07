import { Shield, Gem, Grid, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"
import { cardVariants } from "@/components/ui/card-variants"

const features = [
  {
    icon: Shield,
    title: "Uncompromising Quality",
    description: "Every product undergoes rigorous quality control to ensure it meets international standards and exceeds expectations."
  },
  {
    icon: Gem,
    title: "Exceptional Craftsmanship",
    description: "Meticulously designed and manufactured using premium materials and time-tested techniques by skilled artisans."
  },
  {
    icon: Grid,
    title: "Wide Selection",
    description: "Comprehensive product range covering all kitchenware categories to meet diverse market needs and preferences."
  },
  {
    icon: Headphones,
    title: "Dedicated Customer Service",
    description: "Professional support team committed to providing personalized assistance throughout your entire buying journey."
  }
]

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-6 bg-brand-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-steel-primary mb-6">
            Why Choose Alpify Global
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Partner with us for reliability, quality, and service that sets the industry standard
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(cardVariants({ variant: "feature", padding: "lg" }))}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-steel-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs