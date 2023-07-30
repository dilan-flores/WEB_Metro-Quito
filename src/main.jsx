import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // modo estricta para trabajar de forma correcta
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
)


// public: imagen pública (ícono)
// git ignore: omitir archivos privados
// index.html: 
//src:
  // assert: información disponible para la aplicación (imágenes)
  // components: agregamos todos los componentes
  // app.css: en este caso tenemos integrado tailwinds
  // main.jsx: toma el componente y lo renderiza: renderizar en una parte de html
  // dato: React.StrictMode: Para trabajar de modo más estricto 
// packe: información de los módulos
// packege.jason:instalado todas las dependencia que yo voy a requerir: react, desarrollo,etc.
// postcss.config.cjs: conpilación de archivos css
// tailwind.config,cjs: 


// npm i: instala todas la dependencias necesarias: se crea el componente node_modules
// npm i uuid: dependencia para crear IDs que sean únicos
  // alternativa: randomUUID: sin dependencia

// npm run dev desarrollo
// npm run build: producción
// npm run prewiev: preproducción
// primero utilizamos un server fake con: npm i json-server: luego se ejecutará en un ambiente real (api falsa)
// -g: para que se instale de manera global
// npx json-server --watch db.json: genera un einpoint para: post, comentarios, perfil, etc

  // ESTADOS
// use stated: presenta información o trabajar con un estado; el componente reacciona respecto a un estado; pasar propiedades (props)