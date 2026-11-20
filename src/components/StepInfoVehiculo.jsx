/**
 * Paso 4: Muestra la información del vehículo obtenida del SRI Matriculación.
 */
function StepInfoVehiculo({ vehiculo, onContinue }) {
  if (!vehiculo) return null;

  return (
    <div className="card">
      <h2>🚗 Información del Vehículo</h2>

      <div className="alert alert-success">
        Vehículo encontrado en el sistema del SRI
      </div>

      <div className="info-grid">
        <div className="info-item">
          <div className="label">Placa</div>
          <div className="value">{vehiculo.placa || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Marca</div>
          <div className="value">{vehiculo.marca || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Modelo</div>
          <div className="value">{vehiculo.modelo || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Año</div>
          <div className="value">{vehiculo.anioModelo || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Cilindraje</div>
          <div className="value">{vehiculo.cilindraje || '—'} cc</div>
        </div>
        <div className="info-item">
          <div className="label">Tipo</div>
          <div className="value">{vehiculo.tipo || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Clase</div>
          <div className="value">{vehiculo.claseVehiculo || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Color</div>
          <div className="value">{vehiculo.color || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Combustible</div>
          <div className="value">{vehiculo.combustible || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">País de origen</div>
          <div className="value">{vehiculo.paisOrigen || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Estado</div>
          <div className="value">{vehiculo.estado || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">CAMPV</div>
          <div className="value">{vehiculo.campv || '—'}</div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <button className="btn-success" onClick={onContinue}>
          Continuar → Consultar puntos de licencia
        </button>
      </div>
    </div>
  );
}

export default StepInfoVehiculo;
