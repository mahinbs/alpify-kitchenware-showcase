import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { cardVariants } from "@/components/ui/card-variants"
import { Mail, Phone, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const ContactSection = () => {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string

    // Create enquiry object
    const enquiry = {
      id: Date.now().toString(),
      name: `${firstName} ${lastName}`,
      email,
      phone: phone || 'Not provided',
      subject: 'Contact Form Submission',
      message,
      category: 'General Inquiry',
      status: 'new' as const,
      priority: 'medium' as const,
      createdAt: new Date().toISOString(),
      source: 'Contact Form'
    }

    // Save to localStorage
    const existingEnquiries = localStorage.getItem('adminEnquiries')
    const enquiries = existingEnquiries ? JSON.parse(existingEnquiries) : []
    enquiries.unshift(enquiry) // Add to beginning
    localStorage.setItem('adminEnquiries', JSON.stringify(enquiries))

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    })

    if (formRef.current) {
      formRef.current.reset()
    }
    setIsSubmitting(false)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="contact" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-steel-primary mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to partner with us? Get in touch to discuss your requirements and receive a personalized quotation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Information */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-primary mb-8 bg-gradient-to-r from-primary to-electric-blue bg-clip-text text-transparent">
              Contact Information
            </h2>
            
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: "📍",
                  title: "Address",
                  content: "UNIT 101, oxford towers, 139, HAL Old Airport Rd, north, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
                  color: "vibrant-orange"
                },
                {
                  icon: "📞",
                  title: "Phone",
                  content: "+91 9886317956",
                  href: "tel:+919886317956",
                  color: "electric-blue"
                },
                {
                  icon: "✉️",
                  title: "Email",
                  content: "info@alpifyglobal.com",
                  href: "mailto:info@alpifyglobal.com",
                  color: "emerald-green"
                },
                {
                  icon: "🕒",
                  title: "Business Hours",
                  content: "Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed",
                  color: "vibrant-purple"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`p-6 rounded-2xl border border-${item.color}/20 bg-gradient-to-br from-${item.color}/10 to-${item.color}/5 hover:from-${item.color}/20 hover:to-${item.color}/10 transition-all duration-300`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`text-3xl bg-${item.color}/20 p-3 rounded-xl`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                      {item.href ? (
                        <a 
                          href={item.href}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      ) : (
                        <p 
                          className="text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-card p-8 rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500 border border-steel-light/20"
          >
            <h3 className="text-3xl font-bold text-primary mb-8 bg-gradient-to-r from-primary to-vibrant-orange bg-clip-text text-transparent">
              Get in Touch
            </h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="grid md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={itemVariants}>
                  <Label htmlFor="firstName" className="text-foreground font-medium">
                    First Name *
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      className="mt-2 bg-background/50 border-steel-light/30 focus:border-vibrant-orange transition-all duration-300"
                      required
                    />
                  </motion.div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Label htmlFor="lastName" className="text-foreground font-medium">
                    Last Name *
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      className="mt-2 bg-background/50 border-steel-light/30 focus:border-electric-blue transition-all duration-300"
                      required
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email Address *
                </Label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@company.com"
                    className="mt-2 bg-background/50 border-steel-light/30 focus:border-emerald-green transition-all duration-300"
                    required
                  />
                </motion.div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Label htmlFor="phone" className="text-foreground font-medium">
                  Contact Number
                </Label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98863 17956"
                    className="mt-2 bg-background/50 border-steel-light/30 focus:border-vibrant-purple transition-all duration-300"
                  />
                </motion.div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Label htmlFor="message" className="text-foreground font-medium">
                  Your Message *
                </Label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your requirements..."
                    className="mt-2 min-h-[120px] bg-background/50 border-steel-light/30 focus:border-coral transition-all duration-300"
                    required
                  />
                </motion.div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-vibrant-orange text-white py-4 text-lg font-semibold hover:shadow-glow transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <motion.div
                      className="flex items-center space-x-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </motion.div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection