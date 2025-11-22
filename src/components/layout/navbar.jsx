export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white px-8 py-6 flex items-center justify-between">
      <h1 className="text-4xl font-metrophobic font-bold tracking-wide">
        PASSIO
      </h1>

      <div className="flex items-center gap-4 font-jetbrains text-lg">

        <a href="#" className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
          Login
        </a>
        <a href="#" className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">
          Register
        </a>
      </div>
    </nav>
  );
}
