import Table from '../common/Table';
import Button from '../common/Button';
import { deleteUser } from '../../api/userService';
import { useAuthStore } from '../../store/authStore';

export default function UserTable({ users = [], onEdit, onDelete, onRefresh }) {
  const { role } = useAuthStore();

  const handleDelete = async (user) => {
    if (!confirm(`¿Eliminar usuario ${user.name}?`)) return;
    try {
      await deleteUser(user.id, role);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error(err);
      alert('Error eliminando usuario');
    }
  };

  const onEditInternal = (row) => onEdit && onEdit(row);

  return (
    <div>
      <Table columns={[{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }]} data={users} onEdit={onEditInternal} onDelete={handleDelete} title={'Usuarios'} />
    </div>
  );
}

