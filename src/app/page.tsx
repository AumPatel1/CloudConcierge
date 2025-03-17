import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-8 text-center">
        <h1 className="text-6xl font-bold mt-20 mb-6">
          Welcome to{' '}
          <a className="text-primary hover:underline" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="text-2xl my-4">
          Get started by editing{' '}
          <code className="bg-gray-100 p-2 rounded-md font-mono text-lg">
            src/app/page.tsx
          </code>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mt-8">
          <a
            href="https://nextjs.org/docs"
            className="p-6 border border-gray-300 rounded-lg hover:text-primary hover:border-primary transition-colors"
          >
            <h2 className="text-2xl font-bold mb-2">Documentation &rarr;</h2>
            <p className="text-lg">
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="p-6 border border-gray-300 rounded-lg hover:text-primary hover:border-primary transition-colors"
          >
            <h2 className="text-2xl font-bold mb-2">Learn &rarr;</h2>
            <p className="text-lg">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className="p-6 border border-gray-300 rounded-lg hover:text-primary hover:border-primary transition-colors"
          >
            <h2 className="text-2xl font-bold mb-2">Examples &rarr;</h2>
            <p className="text-lg">
              Discover and deploy example Next.js projects.
            </p>
          </a>
        </div>
      </main>

      <footer className="w-full h-24 border-t border-gray-300 flex justify-center items-center">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={72}
            height={16}
            className="ml-2"
          />
        </a>
      </footer>
    </div>
  )
}

// This is where you would connect to your database in the future
function fetchRushPredictions() {
    // In the future, this would be your actual database connection code
    // For example, using fetch API to call your backend API:
    
    /*
    fetch('/api/rush-predictions')
        .then(response => response.json())
        .then(data => {
            // Process and display data
            updateDashboard(data);
        })
        .catch(error => {
            console.error('Error fetching prediction data:', error);
        });
    */
    
    // This is where you would replace the dummy data with real database data
    const dummyData = {
        lastUpdated: new Date().toLocaleString(),
        days: [
            { day: "Monday", rushLevel: "Low", expectedGuests: 45, peakTime: "7:00 PM - 8:30 PM" },
            // other days...
        ]
    };
} 