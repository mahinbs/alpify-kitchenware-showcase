import { cn } from "@/lib/utils"
import { cardVariants } from "@/components/ui/card-variants"
import servewareImg from "@/assets/serveware.jpg"
import cookwareImg from "@/assets/cookware.jpg"
import tablewareImg from "@/assets/tableware.jpg"
import storageImg from "@/assets/storage.jpg"
import dinnerwareImg from "@/assets/dinnerware.jpg"
import drinkwareImg from "@/assets/drinkware.jpg"

const categories = [
  {
    id: 1,
    title: "Serveware",
    image: servewareImg,
    description: "Elegant serving platters, bowls, and serving accessories"
  },
  {
    id: 2,
    title: "Cookware",
    image: cookwareImg,
    description: "Professional-grade pots, pans, and cooking vessels"
  },
  {
    id: 3,
    title: "Tableware & Cutlery",
    image: tablewareImg,
    description: "Premium cutlery sets and dining accessories"
  },
  {
    id: 4,
    title: "Storage & Containers",
    image: storageImg,
    description: "Airtight containers and kitchen organization solutions"
  },
  {
    id: 5,
    title: "Dinnerware",
    image: dinnerwareImg,
    description: "Sophisticated plates, bowls, and dining sets"
  },
  {
    id: 6,
    title: "Drinkware",
    image: drinkwareImg,
    description: "Stylish tumblers, cups, and beverage containers"
  }
]

const ProductCategories = () => {
  return (
    <section className="py-20 px-6 bg-gradient-steel">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-steel-primary mb-6">
            Our Product Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of premium stainless steel kitchenware designed for global markets
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className={cn(cardVariants({ variant: "category", padding: "none" }))}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-steel-primary mb-2">
                  {category.title}
                </h3>
                <p className="text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductCategories