import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';


const Modal = ({ pokemon, onClose }) => {
  if (!pokemon) return null;
  
    return (
      <div className="modal fade show" style={{ display: 'block' }} id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header header-mood-buscador" >
              <h5  className="modal-title">{pokemon.name}</h5>
            </div>
            <div className="modal-body">
              <div className='row'>  
                <div className='col-sm-6'> 
                  {pokemon.sprites.other['official-artwork'].front_shiny ? (

                    <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                      <div class="carousel-item active" data-bs-interval="2000">
                      <img className="card-img-top img_pokemon" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                      <div class="">
                        <h5 style={{ textAlign: 'center' }}>Normal</h5>
                      </div>
                      </div>
                      <div class="carousel-item" data-bs-interval="2000">
                      <img className="card-img-top img_pokemon" src={pokemon.sprites.other['official-artwork'].front_shiny} alt={pokemon.name} />
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
                      <img className="card-img-top img_pokemon" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />

                    )
                  }
 
                </div>
                <div className='col-sm-6 '>
                  <div className='card-data-pokemon'>
                    <h5 style={{ textAlign: 'center' }}>Datos Principales</h5>
                    <hr/> 
                    <div className='row' style={{ marginBottom: '-20px'}}>
                      <div className='col-5'>
                      <strong><p style={{ textAlign: 'right'}}><strong>Pokemon ID: </strong></p></strong>
                      </div>
                      <div className='col-7'>
                      <span>{pokemon.id}</span>
                      </div>
                    </div>
                  
                    <div className='row' style={{ marginBottom: '-20px'}}>
                      <div className='col-5'>
                      <strong><p style={{ textAlign: 'right'}}><strong>Peso: </strong></p></strong>
                      </div>
                      <div className='col-7'>
                      <span>{(pokemon.weight / 10).toLocaleString()} kg</span>
                      </div>
                    </div>
                  
                    <div className='row' style={{ marginBottom: '-20px'}}>
                      <div className='col-5'>
                      <strong><p style={{ textAlign: 'right'}}><strong>Tipo: </strong></p></strong>
                      </div>
                      <div className='col-7'>
                      <span> 
                        {pokemon.types[0].type.name}
                        {pokemon.types.length > 1 ? ` / ${pokemon.types[1].type.name}` : ''}
                      </span>
                      </div>
                    </div>
                    
                    <div className='row' style={{ marginBottom: '0px'}}>
                      <div className='col-5'>
                      <strong><p style={{ textAlign: 'right'}}><strong>Habilidades: </strong></p></strong>
                      </div>
                      <div className='col-7'>
                      <span> 
                        {pokemon.abilities[0].ability.name}
                        {pokemon.abilities.length > 1 ? ` / ${pokemon.abilities[1].ability.name}` : ''}
                    </span>
                      </div>
                    </div>
                    
                    
                  </div>
                  <div className='card-data-pokemon'>
                    <h5 style={{ textAlign: 'center' }}>Estadisticas basicas</h5>
                    <hr/>
                    <div className='row' style={{ marginBottom: '-15px'}}>
                      <div className='col-4'>
                      <strong><p style={{ textAlign: 'right'}}>HP:</p></strong>
                      </div>
                      <div className='col-8'>
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" style={{ width: `${(pokemon.stats[0].base_stat / 120) * 100}%`}}  aria-valuenow={pokemon.stats[0].base_stat} aria-valuemin="0" aria-valuemax="120">{pokemon.stats[0].base_stat}</div>
                        </div>
                      </div>
                    </div>
                    <div className='row' style={{ marginBottom: '-15px'}}>
                      <div className='col-4'>
                        <strong><p style={{ textAlign: 'right'}}>Ataque E:</p></strong>
                      </div>
                      <div className='col-8'>
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" style={{width: `${(pokemon.stats[1].base_stat / 190) * 100}%`}} aria-valuenow={pokemon.stats[1].base_stat} aria-valuemin="0" aria-valuemax="190">{pokemon.stats[1].base_stat}</div>
                        </div>
                      </div>
                    </div>
                    <div className='row' style={{ marginBottom: '-15px'}}>
                      <div className='col-4'>
                        <strong><p style={{ textAlign: 'right'}}>Ataque E:</p></strong>
                      </div>
                      <div className='col-8'>
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" style={{width: `${(pokemon.stats[3].base_stat / 194) * 100}%`}} aria-valuenow={pokemon.stats[3].base_stat} aria-valuemin="0" aria-valuemax="194">{pokemon.stats[3].base_stat}</div>
                        </div>
                      </div>
                    </div>
                    <div className='row' style={{ marginBottom: '-15px'}}>
                      <div className='col-4'>
                        <strong><p style={{ textAlign: 'right'}}>Defensa:</p></strong>
                      </div>
                      <div className='col-8'>
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" style={{width: `${(pokemon.stats[2].base_stat / 230) * 100}%`}} aria-valuenow={pokemon.stats[2].base_stat} aria-valuemin="0" aria-valuemax="230">{pokemon.stats[2].base_stat}</div>
                        </div>
                      </div>
                    </div>
                    <div className='row' style={{ marginBottom: '-15px'}}>
                      <div className='col-4'>
                        <strong><p style={{ textAlign: 'right'}}>Defensa S:</p></strong>
                      </div>
                      <div className='col-8'>
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" style={{width: `${(pokemon.stats[4].base_stat / 230) * 100}%`}} aria-valuenow={pokemon.stats[4].base_stat} aria-valuemin="0" aria-valuemax="230">{pokemon.stats[4].base_stat}</div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-4'>
                        <strong><p style={{ textAlign: 'right'}}>Velocidad:</p></strong>
                      </div>
                      <div className='col-8'>
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" style={{width: `${(pokemon.stats[5].base_stat / 180) * 100}%`}} aria-valuenow={pokemon.stats[5].base_stat} aria-valuemin="0" aria-valuemax="180">{pokemon.stats[5].base_stat}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                  {pokemon.sprites && (
                    <div className='card-data-pokemon'>
                      <h5 style={{ textAlign: 'center' }}>Diseños de Generacion</h5>
                      <hr />
                      <Swiper
                        slidesPerView={4}
                        centeredSlides={true}
                        spaceBetween={30}
                        grabCursor={true}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                      >
                        {pokemon.sprites.versions['generation-i']['red-blue'].front_default && (
                          <SwiperSlide>
                            <img
                              src={pokemon.sprites.versions['generation-i']['red-blue'].front_default}
                              width={'100%'}
                              alt="Generation I"
                            />
                          </SwiperSlide>
                        )}
                        {pokemon.sprites.versions['generation-ii'].silver.front_default && (
                          <SwiperSlide>
                            <img
                              src={pokemon.sprites.versions['generation-ii'].silver.front_default}
                              width={'100%'}
                              alt="Generation II"
                            />
                          </SwiperSlide>
                        )}
                        {pokemon.sprites.versions['generation-iii'].emerald.front_default && (
                          <SwiperSlide>
                            <img
                              src={pokemon.sprites.versions['generation-iii'].emerald.front_default}
                              width={'115%'}
                              alt="Generation III"
                            />
                          </SwiperSlide>
                        )}
                        {pokemon.sprites.versions['generation-iv'].platinum.front_default && (
                          <SwiperSlide>
                            <img
                              src={pokemon.sprites.versions['generation-iv'].platinum.front_default}
                              width={'115%'}
                              alt="Generation IV"
                            />
                          </SwiperSlide>
                        )}
                        {pokemon.sprites.versions['generation-v']['black-white'].animated.front_default && (
                          <SwiperSlide>
                            <img
                              src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}
                              width={'100%'}
                              alt="Generation V"
                            />
                          </SwiperSlide>
                        )}
                        {pokemon.sprites.versions['generation-vi']['x-y'].front_default && (
                          <SwiperSlide>
                            <img
                              src={pokemon.sprites.versions['generation-vi']['x-y'].front_default}
                              width={'100%'}
                              alt="Generation VI"
                            />
                          </SwiperSlide>
                        )}
                        {/* Agrega más condicionales según sea necesario */}
                      </Swiper>
                    </div>
                  )}

            </div>
            <div className="modal-footer footer-mood-buscador">
              <button type="button" className="btn btn-warning" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default Modal;
