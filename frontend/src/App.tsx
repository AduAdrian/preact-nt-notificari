// MISEDA INSPECT SRL - Frontend Application
import { useState } from 'preact/hooks'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">🏭 MISEDA INSPECT SRL</h1>
          <p className="text-blue-100">Sistem de Notificări pentru Stația ITP</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto">
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              🏠 Acasă
            </button>
            <button 
              onClick={() => setActiveTab('auth')}
              className={`px-4 py-2 rounded ${activeTab === 'auth' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              🔐 Autentificare
            </button>
            <button 
              onClick={() => setActiveTab('sms')}
              className={`px-4 py-2 rounded ${activeTab === 'sms' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              📱 Test SMS
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {activeTab === 'home' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">📊 Dashboard</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-100 p-4 rounded">
                <h3 className="font-bold text-green-800">✅ Email</h3>
                <p className="text-green-600">Configurat și funcțional</p>
              </div>
              <div className="bg-blue-100 p-4 rounded">
                <h3 className="font-bold text-blue-800">📱 SMS</h3>
                <p className="text-blue-600">Integrat cu smsadvertr.ro</p>
              </div>
              <div className="bg-purple-100 p-4 rounded">
                <h3 className="font-bold text-purple-800">📊 API</h3>
                <p className="text-purple-600">Backend NestJS activ</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'auth' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">🔐 Sistem Autentificare</h2>
            <p className="text-gray-600 mb-4">Autentificare JWT cu verificare email/SMS</p>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
                📧 Înregistrare cu Email
              </button>
              <button className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">
                📱 Înregistrare cu SMS
              </button>
              <button className="w-full bg-gray-600 text-white p-3 rounded hover:bg-gray-700">
                🔑 Login
              </button>
            </div>
          </div>
        )}

        {activeTab === 'sms' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">📱 Test SMS</h2>
            <div className="space-y-4">
              <input 
                type="tel" 
                placeholder="Număr telefon (ex: 0721234567)"
                className="w-full p-3 border rounded"
              />
              <textarea 
                placeholder="Mesaj SMS..."
                className="w-full p-3 border rounded h-24"
              />
              <button className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">
                🚀 Trimite SMS Test
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2025 MISEDA INSPECT SRL - Sistem dezvoltat cu ❤️</p>
        </div>
      </footer>
    </div>
  )
}

export default App