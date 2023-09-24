
import './App.css';
import TituloPagina from './components/componentsHtml/Header';
import ListaDinamica from './components/ListaDinamica';
import { useState } from 'react'

function App() {
  const [listaCompras, setListaCompras] = useState(['banana']);
  return (
    <div className="App">
      <header className="App-header">
        <TituloPagina />
      </header>
      <div className='MainContainer'>
        <ListaDinamica listaCompras={listaCompras} setListaCompras={setListaCompras} />

      </div>
    </div>
  );
}

export default App;
