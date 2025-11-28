import { useState, useEffect } from 'react';
import { userService } from '../../services/apiService';
import './UserForm.css';
const UserFormEdit = ({ userId, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'usuario'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {

        if (userId) {
            setIsEditing(true);
            fetchUserData();
        }
    }, [userId]);
    const fetchUserData = async () => {
        try {
            setLoading(true);
            const userData = await userService.getUserById(userId);
            setFormData({
                name: userData.name || '',
                email: userData.email || '',
                password: '',
                role: userData.role || 'usuario'
            });
        } catch (err) {
            console.error('Error al cargar usuario:', err);
            setError('Error al cargar los datos del usuario');
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            setLoading(true);
            const dataToSend = {
                name: formData.name,
                email: formData.email,
                role: formData.role
            };
            if (formData.password && formData.password.trim() !== '') {
                dataToSend.password = formData.password;
            }
            if (isEditing) {
                await userService.updateUser(userId, dataToSend);
                alert('Usuario actualizado exitosamente');
            } else {
                if (!formData.password) {
                    setError('La contraseña es requerida para crear un usuario');
                    setLoading(false);
                    return;
                }
                await userService.createUser(dataToSend);
                alert('Usuario creado exitosamente');
            }
            if (onSuccess) {
                onSuccess();
            }
            if (onClose) {
                onClose();
            }
        } catch (err) {
            console.error('Error al guardar usuario:', err);
            setError(err.response?.data?.message || 'Error al guardar el usuario');
        } finally {
            setLoading(false);
        }
    };
    if (loading && isEditing && !formData.name) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Cargando datos del usuario...</p>
            </div>
        );
    }
    return (
        <div className="user-form-container">
            <h2>{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</h2>
            {error && (
                <div className="error-banner">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Nombre completo"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="correo@ejemplo.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Contraseña {isEditing ? '(dejar en blanco para no cambiar)' : '*'}
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={!isEditing}
                        placeholder={isEditing ? 'Nueva contraseña (opcional)' : 'Contraseña'}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Rol *</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="usuario">Usuario</option>
                        <option value="staff">Staff</option>
                        <option value="organizador">Organizador</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn-cancel"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default UserFormEdit;
