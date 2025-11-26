export default function StatsCard({ value, label }) {
  return (
    <div className="bg-white text-black p-6 rounded-xl text-center">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
