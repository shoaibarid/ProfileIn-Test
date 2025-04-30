export default function TemplatesPage()
{
    return(
        <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Templates
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our collection of professionally designed templates,
              perfect for any industry.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TemplateCard
              title="Creative Portfolio"
              category="Designer"
              image="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              features={["Gallery Layout", "Project Showcase", "About Section"]}
            />
            <TemplateCard
              title="Developer Portfolio"
              category="Developer"
              image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              features={[
                "GitHub Integration",
                "Skills Section",
                "Project Timeline",
              ]}
            />
            <TemplateCard
              title="Photography Portfolio"
              category="Photographer"
              image="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              features={["Masonry Grid", "Image Lightbox", "Categories"]}
            />
            <TemplateCard
              title="Business Portfolio"
              category="Consultant"
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              features={["Services Section", "Testimonials", "Contact Form"]}
            />
            <TemplateCard
              title="Artist Portfolio"
              category="Artist"
              image="https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              features={["Art Gallery", "Exhibition History", "Artist Statement"]}
            />
            <TemplateCard
              title="Writer Portfolio"
              category="Writer"
              image="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              features={["Blog Section", "Publications", "Writing Samples"]}
            />
          </div>
        </div>
      </div>
    );
}

function TemplateCard({ title, category, image, features }) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <span className="text-sm font-medium text-indigo-600">{category}</span>
          <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-4">
            {title}
          </h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></div>
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full mt-6 bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            Preview Template
          </button>
        </div>
      </div>
    );
  }