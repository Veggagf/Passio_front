export default function Loading({ size = 24, text = 'Cargando...' }) {
  return (
    <div className="flex items-center gap-3">
      <div className="animate-spin rounded-full border-t-2 border-white h-6 w-6"></div>
      <span className="text-white">{text}</span>
    </div>
  );
}
