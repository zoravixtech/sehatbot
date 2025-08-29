import { useState } from 'react'

function App() {
  const [health, setHealth] = useState(null)

  async function checkHealth() {
    try {
      const res = await fetch('/api/health')
      const data = await res.json()
      setHealth(data)
    } catch (e) {
      setHealth({ error: e.message })
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>SehatBot Client</h1>
      <p>Use the button below to hit the API health endpoint via proxy.</p>
      <button onClick={checkHealth}>Check API Health</button>
      <pre style={{ background:'#111', color:'#0f0', padding:12, marginTop:12 }}>
        {health ? JSON.stringify(health, null, 2) : 'No data yet'}
      </pre>
    </div>
  )
}

export default App
