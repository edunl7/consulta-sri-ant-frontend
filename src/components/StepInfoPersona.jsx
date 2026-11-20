/**
 * Paso 2: Muestra la información de la persona natural obtenida del SRI.
 */
function StepInfoPersona({ contribuyente, correo, onContinue }) {
  if (!contribuyente) return null;

  return (
    <div className="card">
      <h2>✅ Información del Contribuyente</h2>

      <div className="alert alert-success">
        Contribuyente verificado como persona natural
      </div>

      <div className="info-grid">
        <div className="info-item">
          <div className="label">RUC</div>
          <div className="value">{contribuyente.numeroRuc || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Correo registrado</div>
          <div className="value">{correo}</div>
        </div>
        <div className="info-item full-width">
          <div className="label">Razón Social / Nombre</div>
          <div className="value">{contribuyente.razonSocial || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Nombre Comercial</div>
          <div className="value">{contribuyente.nombreComercial || 'N/A'}</div>
        </div>
        <div className="info-item">
          <div className="label">Clase</div>
          <div className="value">{contribuyente.claseContribuyente || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Estado</div>
          <div className="value">{contribuyente.estadoContribuyente || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Obligado a llevar contabilidad</div>
          <div className="value">{contribuyente.obligado || '—'}</div>
        </div>
        <div className="info-item full-width">
          <div className="label">Actividad Económica Principal</div>
          <div className="value">{contribuyente.actividadEconomicaPrincipal || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Inicio de actividades</div>
          <div className="value">{contribuyente.fechaInicioActividades || '—'}</div>
        </div>
        <div className="info-item">
          <div className="label">Última actualización</div>
          <div className="value">{contribuyente.fechaActualizacion || '—'}</div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <button className="btn-success" onClick={onContinue}>
          Continuar → Ingresar placa del vehículo
        </button>
      </div>
    </div>
  );
}

export default StepInfoPersona;
