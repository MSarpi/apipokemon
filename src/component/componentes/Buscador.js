import Modal from './ModalBuscador';
import React, { Component } from 'react';

import $ from 'jquery';
import 'select2'; 
import { UseFetch } from '../api_conexion/UseFetch';
import toast, { Toaster } from 'react-hot-toast';

class Buscador extends Component {
  state = {
    searchTerm: '',
    showModal: false,
    pokemonData: null,
    allPokemon: [], // Lista de todos los Pokémon
  };

  componentDidMount() {
    // Inicializa el select2 en el componente componentDidMount
    $('#searchInput').select2();
    // Obtiene la lista de todos los Pokémon y la almacena en el estado
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        this.setState({ allPokemon: data.results });
      });
  }

  componentWillUnmount() {
    // Desinicializa el select2 para evitar problemas de memoria
    if ($('#searchInput').data('select2')) {
      $('#searchInput').select2('destroy');
    }
  }

  handleInputChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    // Obtiene el valor del input
    const searchTerm = document.getElementById("searchInput").value;

    // Realiza una solicitud a la API de Pokémon y actualiza el estado con los datos del Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
                // Agregar tiempo de carga
          // Agregar tiempo de carga
          toast.loading('Buscando...');

          // Simular un retraso de 2 segundos (2000 milisegundos)
          setTimeout(() => {
            // Ocultar el toast de carga
            toast.dismiss();

            // Después de 2 segundos, mostrar el mensaje de error
            this.setState({ pokemonData: data, showModal: true });
            toast.success('Pokemon encontrado');
          }, 2000);
        
      })
      .catch((error) => {
        // Agregar tiempo de carga
          // Agregar tiempo de carga
          toast.loading('Buscando');

          // Simular un retraso de 2 segundos (2000 milisegundos)
          setTimeout(() => {
            // Ocultar el toast de carga
            toast.dismiss();

            // Después de 2 segundos, mostrar el mensaje de error
            toast.error('Debes Seleccionar un Pokémon');
          }, 1500);
        });
  };

  handleSubmit = (e) => {
    e.preventDefault(); // Previene la recarga de la página
    this.handleSearch(); // Llama a la función de búsqueda cuando se envía el formulario
  };

  closeModal = () => {
    this.setState({ showModal: false, pokemonData: null });
  };

  render() {
    const { searchTerm, showModal, pokemonData, allPokemon } = this.state;

    return (
      <div>
        <Toaster />
        <form onSubmit={this.handleSubmit}>
          <div className="row buscador">

            <div className="col-sm-10 " >

              <select id="searchInput" className="form-control select2" aria-label=".form-select-lg example" > 
                <option className='select2' value="">Ingrese Nombre o ID Pokemon</option>
                {allPokemon.map((pokemon) => {
                  const urlParts = pokemon.url.split('/'); // Divide la URL por las barras "/"
                  const pokemonNumber = urlParts[urlParts.length - 2]; // Obtiene el número del penúltimo segmento de la URL

                  const inputString = pokemon.name;
                  const firstLetter = inputString.charAt(0).toUpperCase(); // Obtiene la primera letra y la convierte en mayúscula
                  const restOfString = inputString.slice(1); // Obtiene el resto de la cadena
                  const result = firstLetter + restOfString; // Combina la primera letra en mayúscula con el resto de la cadena

                  const Quitarmenos = result;
                  const stringWithSpace = Quitarmenos.replace(/-/g, ' '); // Reemplaza todos los guiones con un espacio en blanco
                  return (
                    <option className='' key={pokemon.name} value={pokemon.name}>
                       Nº {pokemonNumber} - {stringWithSpace}
                    </option>
                  );
                })}
              </select>


            </div>
            <div className="col-sm-2">
              <button type="button" className="btn btn-lg btn_mood" onClick={this.handleSearch}>
                Buscar
              </button>
              
            </div>
          </div>
        </form>

        <Modal pokemon={pokemonData} onClose={this.closeModal} />
      </div>
    );
  }
}

export default Buscador;
