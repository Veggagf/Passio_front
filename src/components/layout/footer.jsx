export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-10 px-8 flex items-center justify-between border-t border-white/30">
      <div className="flex items-center gap-10 font-jetbrains text-sm">
        <span className="text-lg font-metrophobic tracking-wide">PASSIO</span>
        <a href="#" className="hover:text-gray-300 transition">Features</a>
        <a href="#" className="hover:text-gray-300 transition">Learn more</a>
        <a href="#" className="hover:text-gray-300 transition">Support</a>
      </div>
      <div className="flex items-center gap-6 text-xl">
        <a href="#" className="hover:text-gray-300 transition">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="#" className="hover:text-gray-300 transition">
          <i className="bi bi-x"></i>
        </a>
      </div>
    </footer>
  );
}
