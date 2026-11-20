import { useState } from 'react';
import StepCorreoRuc from './components/StepCorreoRuc';
import StepInfoPersona from './components/StepInfoPersona';
import StepPlaca from './components/StepPlaca';
import StepInfoVehiculo from './components/StepInfoVehiculo';
import StepPuntos from './components/StepPuntos';

function App() {
  // ── Estado global del flujo ──
  const [step, setStep] = useState(1);
  const [correo, setCorreo] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [contribuyente, setContribuyente] = useState(null);
  const [placa, setPlaca] = useState('');
  const [vehiculo, setVehiculo] = useState(null);
  const [puntos, setPuntos] = useState(null);

  const reiniciar = () => {
    setStep(1);
    setCorreo('');
    setIdentificacion('');
    setContribuyente(null);
    setPlaca('');
    setVehiculo(null);
    setPuntos(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🇪🇨 Sistema de Consulta SRI - ANT</h1>
        <p className="subtitle">Consulta de contribuyente, vehículo y puntos de licencia</p>

        {/* Indicador de pasos */}
        <div className="steps-indicator">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`step-dot ${step >= s ? 'active' : ''} ${step === s ? 'current' : ''}`}>
              {s}
            </div>
          ))}
        </div>
      </header>

      <main className="app-main">
        {/* ── Paso 1: Correo + Cédula/RUC ── */}
        {step === 1 && (
          <StepCorreoRuc
            onSuccess={(data) => {
              setCorreo(data.correo);
              setIdentificacion(data.identificacion);
              setContribuyente(data.contribuyente);
              setStep(2);
            }}
          />
        )}

        {/* ── Paso 2: Mostrar info de la persona ── */}
        {step === 2 && (
          <StepInfoPersona
            contribuyente={contribuyente}
            correo={correo}
            onContinue={() => setStep(3)}
          />
        )}

        {/* ── Paso 3: Ingresar placa ── */}
        {step === 3 && (
          <StepPlaca
            identificacion={identificacion}
            onSuccess={(data) => {
              setPlaca(data.placa);
              setVehiculo(data.vehiculo);
              setStep(4);
            }}
          />
        )}

        {/* ── Paso 4: Mostrar info del vehículo ── */}
        {step === 4 && (
          <StepInfoVehiculo
            vehiculo={vehiculo}
            onContinue={() => setStep(5)}
          />
        )}

        {/* ── Paso 5: Puntos de licencia ── */}
        {step === 5 && (
          <StepPuntos
            cedula={identificacion.length === 13 ? identificacion.substring(0, 10) : identificacion}
            placa={placa}
            onResult={(data) => setPuntos(data)}
          />
        )}
      </main>

      {/* Botón de reinicio */}
      {step > 1 && (
        <footer className="app-footer">
          <button className="btn-secondary" onClick={reiniciar}>
            ↩ Nueva consulta
          </button>
        </footer>
      )}
    </div>
  );
}

export default App;
