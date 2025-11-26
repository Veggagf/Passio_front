import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="bg-black text-white rounded-md p-6 relative z-10 max-w-3xl w-full">
        {title && <h2 className="text-2xl mb-4">{title}</h2>}
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
