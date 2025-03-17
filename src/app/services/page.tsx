export default function Services() {
  return (
    <div className="container mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 bg-primary"></div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Web Development</h2>
              <p className="text-gray-700 mb-4">
                We create beautiful, responsive websites that work across all devices. Our sites are built with the latest technologies.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Custom Website Design</li>
                <li>E-commerce Solutions</li>
                <li>Mobile-Responsive Layouts</li>
                <li>SEO Optimization</li>
              </ul>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Service 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 bg-secondary"></div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">App Development</h2>
              <p className="text-gray-700 mb-4">
                Our app development services deliver cutting-edge mobile applications for iOS and Android platforms.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Native iOS & Android Apps</li>
                <li>Cross-Platform Solutions</li>
                <li>UI/UX Design</li>
                <li>App Maintenance & Support</li>
              </ul>
              <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Service 3 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 bg-danger"></div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Digital Marketing</h2>
              <p className="text-gray-700 mb-4">
                Get more leads and customers with our comprehensive digital marketing strategies tailored to your business.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>SEO & Content Marketing</li>
                <li>Social Media Management</li>
                <li>PPC Campaigns</li>
                <li>Email Marketing</li>
              </ul>
              <button className="bg-danger text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Ready to Get Started?</h2>
          <p className="text-lg text-center mb-8">
            Contact us today for a free consultation on how we can help your business grow.
          </p>
          <div className="flex justify-center">
            <button className="bg-primary text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 