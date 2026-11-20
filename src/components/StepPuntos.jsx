import { useState, useEffect } from 'react';
import { consultarPuntos } from '../services/api';

/**
 * Paso 5: Consulta y muestra los puntos de licencia (ANT).
 * Indica si el dato viene de caché y cuándo se consultó.
 */
function StepPuntos({ cedula, placa, onResult }) {
  const [puntos, setPuntos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPuntos = async () => {
      try {
        const result = await consultarPuntos(cedula, placa);
        if (!result.success) {
          throw new Error(result.error || 'Error al consultar puntos');
        }
        setPuntos(result.data);
        if (onResult) onResult(result.data);

        // Mostrar mensaje de caché si aplica
        if (result.message) {
          console.log('Info:', result.message);
        }
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Error al consultar puntos de licencia');
      } finally {
        setLoading(false);
      }
    };

    fetchPuntos();
  }, [cedula, placa]);

  // ── Loading ──
  if (loading) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
          <p>Consultando puntos de licencia en la ANT...</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
            Este servicio puede demorar debido a la disponibilidad de la ANT
          </p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="card">
        <h2>🪪 Puntos de Licencia</h2>
        <div className="alert alert-error">❌ {error}</div>
      </div>
    );
  }

  // ── Resultado ──
  if (!puntos) return null;

  const getPuntosClass = (pts) => {
    if (pts >= 20) return 'bueno';
    if (pts >= 10) return 'medio';
    return 'malo';
  };

  return (
    <div className="card">
      <h2>🪪 Puntos de Licencia</h2>

      {/* Indicador de caché */}
      {puntos.desdeCachE && (
        <div className="alert alert-warning">
          ⚠️ Datos obtenidos desde <strong>caché</strong> (última consulta: {
            puntos.fechaConsulta
              ? new Date(puntos.fechaConsulta).toLocaleString('es-EC')
              : 'desconocida'
          })
        </div>
      )}

      {!puntos.desdeCachE && (
        <div className="alert alert-success">
          ✅ Datos obtenidos en <strong>tiempo real</strong> desde la ANT
        </div>
      )}

      {/* Badge de puntos */}
      <div style={{ textAlign: 'center' }}>
        <div className={`puntos-badge ${getPuntosClass(puntos.puntosActuales)}`}>
          🪪 {puntos.puntosActuales} puntos
        </div>
        <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>
          de 30 puntos disponibles
        </p>
      </div>

      {/* Info básica */}
      <div className="info-grid" style={{ marginTop: '1.5rem' }}>
        <div className="info-item">
          <div className="label">Cédula</div>
          <div className="value">{puntos.cedula}</div>
        </div>
        <div className="info-item">
          <div className="label">Placa</div>
          <div className="value">{puntos.placa || 'N/A'}</div>
        </div>
        <div className="info-item">
          <div className="label">Total citaciones</div>
          <div className="value">{puntos.totalCitaciones}</div>
        </div>
        <div className="info-item">
          <div className="label">Fecha de consulta</div>
          <div className="value">
            {puntos.fechaConsulta
              ? new Date(puntos.fechaConsulta).toLocaleString('es-EC')
              : '—'}
          </div>
        </div>
      </div>

      {/* Tabla de citaciones */}
      {puntos.citaciones && puntos.citaciones.length > 0 && (
        <>
          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1rem' }}>
            📋 Detalle de citaciones
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="citaciones-table">
              <thead>
                <tr>
                  <th>N° Citación</th>
                  <th>Fecha</th>
                  <th>Infracción</th>
                  <th>Puntos</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {puntos.citaciones.map((c, i) => (
                  <tr key={i}>
                    <td>{c.numeroCitacion}</td>
                    <td>{c.fechaCitacion}</td>
                    <td>{c.infraccion}</td>
                    <td>{c.puntos}</td>
                    <td>{c.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {puntos.citaciones && puntos.citaciones.length === 0 && (
        <div className="alert alert-info" style={{ marginTop: '1rem' }}>
          🎉 No se encontraron citaciones. ¡Buen historial de conducción!
        </div>
      )}
    </div>
  );
}

export default StepPuntos;
