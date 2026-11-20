import { useState } from 'react';
import { verificarContribuyente, obtenerContribuyente } from '../services/api';

/**
 * Paso 1: El usuario ingresa correo electrónico y cédula/RUC.
 * Se verifica que sea contribuyente del SRI y persona natural.
 */
function StepCorreoRuc({ onSuccess }) {
  const [correo, setCorreo] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validaciones locales
      if (!correo.includes('@')) {
        throw new Error('Ingrese un correo electrónico válido');
      }

      const idLimpia = identificacion.trim().replace(/[^0-9]/g, '');
      if (idLimpia.length !== 10 && idLimpia.length !== 13) {
        throw new Error('La cédula debe tener 10 dígitos o el RUC 13 dígitos');
      }

      // 1. Verificar si es contribuyente
      const verificacion = await verificarContribuyente(idLimpia);
      if (!verificacion.success || !verificacion.data) {
        throw new Error(verificacion.error || 'No es contribuyente del SRI');
      }

      // 2. Obtener datos y validar persona natural
      const info = await obtenerContribuyente(idLimpia);
      if (!info.success) {
        throw new Error(info.error || 'Error al obtener datos del contribuyente');
      }

      // Éxito → pasar al siguiente paso
      onSuccess({
        correo,
        identificacion: idLimpia,
        contribuyente: info.data,
      });

    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>📋 Paso 1: Datos del contribuyente</h2>

      {error && <div className="alert alert-error">❌ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="usuario@ejemplo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Cédula (10 dígitos) o RUC (13 dígitos)</label>
          <input
            type="text"
            placeholder="1234567890 o 1234567890001"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            maxLength={13}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '⏳ Verificando...' : '🔍 Verificar contribuyente'}
        </button>
      </form>
    </div>
  );
}

export default StepCorreoRuc;
