export default function EventGallery({ images = [] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {images.map((img, idx) => (
        <img key={idx} src={img} alt={`img-${idx}`} className="w-full h-32 object-cover rounded-md" />
      ))}
    </div>
  );
}
