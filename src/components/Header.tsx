import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-primary text-white shadow-md">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <Link href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="ml-3 text-xl">My React Website</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-white">Home</Link>
          <Link href="/about" className="mr-5 hover:text-white">About</Link>
          <Link href="/services" className="mr-5 hover:text-white">Services</Link>
          <Link href="/contact" className="mr-5 hover:text-white">Contact</Link>
        </nav>
        <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          Get Started
        </button>
      </div>
    </header>
  )
} 