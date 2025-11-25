export default function EventInfoCard({ value, label }) {
  // Verifica si el value es solo número (opcionalmente permite espacios)
  const isNumber = typeof value === "number" || /^\d+$/.test(value);
  return (
    //max-w-sm
    <div className="bg-white rounded-xl shadow-md p-8 w-full text-center font-jetbrains">
      <div
        className={`${
          isNumber ? "text-7xl" : "text-5xl"
        } mb-2 text-gray-900 font-jetbrains`}
      >
        {value}
      </div>
      <div className="text-gray-600 text-base font-medium font-jetbrains">
        {label}
      </div>
    </div>
  );
}
