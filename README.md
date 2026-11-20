# Consulta SRI - ANT · Frontend

Interfaz web en React 18 + Vite para consultar contribuyentes, vehículos y puntos de licencia.

## Flujo de la aplicación

1. **Paso 1** → Ingresar correo + cédula/RUC → Verificar contribuyente en SRI
2. **Paso 2** → Mostrar información de la persona natural
3. **Paso 3** → Ingresar placa del vehículo → Consultar en SRI Matriculación
4. **Paso 4** → Mostrar información del vehículo
5. **Paso 5** → Consultar puntos de licencia en ANT (con caché)

## Requisitos

- Node.js 18+
- npm o pnpm

## Ejecutar

```bash
npm install
npm run dev
```

La app corre en `http://localhost:5173` y hace proxy a `http://localhost:8080` (backend).

## Tecnologías

- React 18
- Vite 5
- Axios
