export default function Card({ number, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">
      <h2 className="text-4xl font-light mb-2">{number}</h2>

      <h3 className="text-gray-900 font-medium mb-1">{title}</h3>

      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
}
 