import { useState } from 'react';
import { obtenerVehiculo } from '../services/api';

/**
 * Paso 3: El usuario ingresa la matrícula/placa de su vehículo.
 */
function StepPlaca({ identificacion, onSuccess }) {
  const [placa, setPlaca] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const placaLimpia = placa.trim().toUpperCase();
      if (!placaLimpia) {
        throw new Error('Ingrese la placa del vehículo');
      }

      const result = await obtenerVehiculo(placaLimpia);
      if (!result.success) {
        throw new Error(result.error || 'No se encontró el vehículo');
      }

      onSuccess({
        placa: placaLimpia,
        vehiculo: result.data,
      });

    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error al consultar vehículo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>🚗 Paso 3: Matrícula del vehículo</h2>
      <p style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '0.9rem' }}>
        Cédula/RUC: <strong>{identificacion}</strong>
      </p>

      {error && <div className="alert alert-error">❌ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Placa del vehículo</label>
          <input
            type="text"
            placeholder="ABC-1234"
            value={placa}
            onChange={(e) => setPlaca(e.target.value.toUpperCase())}
            maxLength={10}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '⏳ Consultando...' : '🔍 Consultar vehículo'}
        </button>
      </form>
    </div>
  );
}

export default StepPlaca;
