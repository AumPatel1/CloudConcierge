export default function About() {
  return (
    <div className="container mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h2>
          <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt,
            nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt,
            nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt,
            nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Our Story</h2>
          <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt,
            nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt,
            nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt,
            nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4"></div>
              <h3 className="text-xl font-medium">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4"></div>
              <h3 className="text-xl font-medium">Jane Smith</h3>
              <p className="text-gray-600">CTO</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4"></div>
              <h3 className="text-xl font-medium">Michael Johnson</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 