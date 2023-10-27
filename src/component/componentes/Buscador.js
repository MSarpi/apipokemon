import Modal from './ModalBuscador';
import React, { Component } from 'react';

class Buscador extends Component {
  state = {
    searchTerm: '',
    showModal: false,
    pokemonData: null,
  };

  handleInputChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    // Obtiene el valor del input
    const searchTerm = document.getElementById("searchInput").value.toLowerCase().replace(/ /g, "-");

    // Realiza una solicitud a la API de Pokémon y actualiza el estado con los datos del Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ pokemonData: data, showModal: true });
      })
      .catch((error) => {
        console.error(error);
        // Manejar errores, por ejemplo, mostrar un mensaje de error.
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
    const { searchTerm, showModal, pokemonData } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}> {/* Maneja el evento onSubmit del formulario */}
          <div className='row buscador'>
            <div className='col-sm-10'>
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  id="searchInput"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                  placeholder="Ingrese Nombre o ID de pokemon"
                />
              </div>
            </div>
            <div className='col-sm-2'>
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
