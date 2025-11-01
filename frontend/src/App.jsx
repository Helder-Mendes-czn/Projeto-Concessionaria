import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
      <p className="read-the-docs">
        <Link to={"/cadastro"}>Ir cadastrar usuario</Link><br />
        <Link to={"/login"}>Login</Link>
      </p>
    </>
  )
}

export default App
