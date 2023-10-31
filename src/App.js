import React, { Component } from 'react';
import Buscador from './component/componentes/Buscador';
import CardPokemon from './component/componentes/CardPokemon';


import './App.css';
import '../src/component/css/buscador.css';
import '../src/component/css/cardpokemon.css';
import '../src/component/css/modal_resultado_buscador.css';

function App() {
  return (
    
    <div className="App">
      <header className="header">
        <div className="logo_pokemon">
          <div className='row'>
            <div className='col-3'>
            </div> 
            <div className='col-6'>
              <div className="overlay">
              </div>
            </div>
            <div className='col-3'>

            </div> 
          </div>
        </div>
        <Buscador/>
        
      </header>
      <div className="container-fluid bg-secondary altura"></div>
      <CardPokemon/>
    </div>
  );
}

export default App;
