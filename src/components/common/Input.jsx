export default function Input({ label, id, type = 'text', value, onChange, placeholder = '', required = false, className = '', name }) {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && <label htmlFor={id} className="mb-1 text-sm text-gray-400">{label}</label>}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                name={name}
                className="bg-transparent border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}