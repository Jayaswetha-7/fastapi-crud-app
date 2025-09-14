
import './App.css'
import * as React from 'react'
import Fruit from './components/Fruit'

function App() {

  return (
    <>
      <div className="App">
      <header className="App-header">
        <h1>Fruit Management App</h1>
      </header>
      <main>
        <Fruit />
      </main>
    </div>
    </>
  )
}

export default App
