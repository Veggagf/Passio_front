export default function RecentActivity({ activities = [] }) {
  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg mb-4">Registro de actividad</h3>
      <ul className="text-sm text-gray-700">
        {activities.map((act, idx) => (
          <li key={idx} className="py-1">{act}</li>
        ))}
      </ul>
    </div>
  );
}
