import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🚀 Viral Token Creator</h1>
          <p className="text-xl mb-8">Create viral cryptocurrency tokens on Solana</p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Test Counter</h2>
            <p className="text-lg mb-4">Count: {count}</p>
            <button 
              onClick={() => setCount(count + 1)}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Click me!
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-2">✅ Devnet Testing</h3>
              <p className="text-sm">Create tokens for FREE</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-2">💰 Mainnet Deploy</h3>
              <p className="text-sm">Real tokens with Phantom</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm opacity-75">
              If you can see this page and the counter works, React is loading properly!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

