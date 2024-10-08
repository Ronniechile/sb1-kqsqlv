import React, { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import TodoList from './components/TodoList'
import Calculator from './components/Calculator'
import PostItNotes from './components/PostItNotes'
import { Calendar as CalendarIcon, CheckSquare, Calculator as CalculatorIcon, Sun, Moon, StickyNote, Palette } from 'lucide-react'

type Tab = 'calendar' | 'todo' | 'calculator' | 'postit'

const themes = [
  { primary: 'bg-purple-600', secondary: 'bg-purple-500', text: 'text-white' },
  { primary: 'bg-blue-600', secondary: 'bg-blue-500', text: 'text-white' },
  { primary: 'bg-green-600', secondary: 'bg-green-500', text: 'text-white' },
  { primary: 'bg-red-600', secondary: 'bg-red-500', text: 'text-white' },
]

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const saved = localStorage.getItem('activeTab')
    return (saved as Tab) || 'calendar'
  })
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [currentTheme, setCurrentTheme] = useState(0)

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab)
  }, [activeTab])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const changeTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme + 1) % themes.length)
  }

  const theme = themes[currentTheme]

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'} flex flex-col transition-colors duration-300`}>
      <header className={`${darkMode ? theme.primary : theme.secondary} ${theme.text} p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-filter backdrop-blur-lg`}>
        <h1 className="text-2xl font-bold">Mi Aplicación Web</h1>
        <div className="flex space-x-2">
          <button onClick={changeTheme} className={`p-2 rounded-full hover:${darkMode ? theme.secondary : theme.primary} transition-colors duration-300`}>
            <Palette size={24} />
          </button>
          <button onClick={toggleDarkMode} className={`p-2 rounded-full hover:${darkMode ? theme.secondary : theme.primary} transition-colors duration-300`}>
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>
      <main className="flex-grow p-4 flex mt-16">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 flex-grow mr-4 transition-colors duration-300`}>
          {activeTab === 'calendar' && <Calendar darkMode={darkMode} />}
          {activeTab === 'todo' && <TodoList darkMode={darkMode} />}
          {activeTab === 'calculator' && <Calculator darkMode={darkMode} />}
          {activeTab === 'postit' && <PostItNotes darkMode={darkMode} />}
        </div>
        <nav className="flex flex-col space-y-4">
          {[
            { id: 'calendar', Icon: CalendarIcon },
            { id: 'todo', Icon: CheckSquare },
            { id: 'calculator', Icon: CalculatorIcon },
            { id: 'postit', Icon: StickyNote },
          ].map(({ id, Icon }) => (
            <button
              key={id}
              className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
                activeTab === id 
                  ? (darkMode ? theme.primary : theme.secondary) 
                  : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-600')
              }`}
              onClick={() => setActiveTab(id as Tab)}
            >
              <Icon size={24} />
            </button>
          ))}
        </nav>
      </main>
    </div>
  )
}

export default App