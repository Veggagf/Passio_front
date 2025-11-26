export default function EventInfoCard({ value, label }) {
  const isNumber = typeof value === "number" || /^\d+$/.test(value);
  return (
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
