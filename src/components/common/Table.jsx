export default function Table({ columns, data, onEdit, onDelete, title }) {
  return (
    <div className="bg-white rounded-2xl p-8 w-full">
      {title && <h3 className="text-4xl mb-6 text-black">{title}</h3>}
      <table className="w-full text-center border-separate border-spacing-0">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="py-3 px-2 border border-black font-medium"
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="py-3 px-2 border border-black font-medium">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="py-6 text-gray-400 text-center"
              >
                No hay datos disponibles.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="border-t">
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-2 border border-black">
                    {row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="py-3 px-2 border border-black">
                    {onEdit && (
                      <button
                        className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm mr-2 hover:bg-gray-800"
                        onClick={() => onEdit(row)}
                      >
                        Editar
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="bg-white border px-3 py-1 rounded-lg text-sm hover:bg-gray-100"
                        onClick={() => onDelete(row)}
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
