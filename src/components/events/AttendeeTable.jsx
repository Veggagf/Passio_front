import Table from '../common/Table';

export default function AttendeeTable({ attendees = [] }) {
	const columns = [
		{ key: 'id', label: 'ID' },
		{ key: 'name', label: 'Nombre' },
		{ key: 'email', label: 'Email' },
	];
	return (
		<div>
			<Table columns={columns} data={attendees} title={'Asistentes'} />
		</div>
	);
}
