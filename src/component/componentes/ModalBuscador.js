import React from 'react';

const Modal = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  // Función para renderizar las evoluciones
  const renderEvolutions = (evolutions) => {
    if (evolutions && evolutions.length > 0) {
      return (
        <div>
          <h5>Evolutions:</h5>
          <ul>
            {evolutions.map((evolution, index) => (
              <li key={index}>{evolution.name}</li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };
  
    return (
      <div className="modal fade show" style={{ display: 'block' }} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header header-mood-buscador">
              <center><h5 className="modal-title">{pokemon.name}</h5></center>
            </div>
            <div className="modal-body">
              <div className='row'>  
                <div className='col-sm-4'> 
                  {pokemon.sprites.front_shiny ? (

                    <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                      <div class="carousel-item active" data-bs-interval="2000">
                      <img className="card-img-top img_pokemon" src={pokemon.sprites.front_default} alt={pokemon.name} />
                      <div class="">
                        <h5 style={{ textAlign: 'center' }}>Normal</h5>
                      </div>
                      </div>
                      <div class="carousel-item" data-bs-interval="2000">
                      <img className="card-img-top img_pokemon" src={pokemon.sprites.front_shiny} alt={pokemon.name} />
                      <div class="">
                        <h5 style={{ textAlign: 'center' }}>Shiny</h5>
                      </div>
                      </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                    </div>
                    ) : (
                      <img className="card-img-top img_pokemon" src={pokemon.sprites.front_default} alt={pokemon.name} />

                    )
                  }
 
                </div>
                <div className='col-sm-7 card-data-pokemon'>  
                  <strong>Pokemon ID: </strong><span>{pokemon.id}</span>
                  <br/>
                  <strong>Peso: </strong><span>{(pokemon.weight / 10).toLocaleString()} kg</span>
                  <br/>
                  <strong>Tipo: </strong>
                  <span> 
                      {pokemon.types[0].type.name}
                      {pokemon.types.length > 1 ? ` / ${pokemon.types[1].type.name}` : ''}
                  </span>
                  <br/>
                  <strong>Habilidades: </strong>
                  <span> 
                      {pokemon.abilities[0].ability.name}
                      {pokemon.abilities.length > 1 ? ` / ${pokemon.abilities[1].ability.name}` : ''}
                  </span>
                </div>
              </div>
              {renderEvolutions(pokemon.evolutions)} 
            </div>
            <div className="modal-footer footer-mood-buscador">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default Modal;
