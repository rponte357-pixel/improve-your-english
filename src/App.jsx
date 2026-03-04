import './App.css'

// Este es el componente de la burbuja
function Bubble({ title, url, color, delay }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="bubble"
      style={{ 
        backgroundColor: color,
        animationDelay: delay // Esto hace que no todas floten al mismo tiempo
      }}
    >
      <div className="bubble-content">
        {title}
      </div>
    </a>
  );
}

function App() {
  return (
    <div className="main-container">
      <header>
        <h1>Improve Your English</h1>
        <p>Selecciona una herramienta para empezar a practicar</p>
      </header>

      <div className="bubble-container">
        {/* BURBUJA 1: FRASES */}
        <Bubble 
          title="Daily Phrases" 
          url="https://rponte357-pixel.github.io/phraseup/" 
          color="#FF6B6B" 
          delay="0s"
        />

        {/* BURBUJA 2: PRONUNCIACIÓN */}
        <Bubble 
          title="Pronunciation" 
          url="https://rponte357-pixel.github.io/english-pronunciation/" 
          color="#4ECDC4" 
          delay="0.5s"
        />

        {/* BURBUJA 3: PRÓXIMAMENTE */}
        <Bubble 
          title="Coming Soon..." 
          url="#" 
          color="#A29BFE" 
          delay="1s"
        />
      </div>
    </div>
  )
}

export default App
