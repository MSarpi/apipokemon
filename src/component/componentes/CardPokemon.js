import React, { useState, useEffect, useRef  } from 'react';
import ModalPokemon from './ModalPokemon';
import { UseFetch } from '../api_conexion/UseFetch';


import toast, { Toaster } from 'react-hot-toast';
import 'select2';
import $ from 'jquery';
import ImgReplace from '../img/remplazo_pk.jpg';
import pk_1013 from '../img/1013.png';
import pk_10143 from '../img/10143.png';
import pk_10264 from '../img/10264.png';
import pk_10265 from '../img/10264 - 10265.png';
import pk_10266 from '../img/10266.png';
import pk_10267 from '../img/10267.png';
import pk_10268 from '../img/10268.png';
import pk_10269 from '../img/10269.png';
import pk_10270 from '../img/10270.png';
import pk_10271 from '../img/10271.png';
import pk_10272 from '../img/10272.png';
import pk_10273 from '../img/10273.png';
import pk_10274 from '../img/10274.png';
import pk_10275 from '../img/10275.png';
import pokedex from '../img/pokedex.png';
import Pagination from './Pagination';
import Loader from "../componentes/loading";
 



function CardPokemon() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
  
    const openModal = (pokemon) => {
      setSelectedPokemon(pokemon);
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setSelectedPokemon(null);
      setModalVisible(false);
    };


    const tuRef = useRef(); 
    const [pagina, setPagina] = useState(1);
    const elementosPorPagina = 20; 
    const [cargando, setCargando] = useState(false);

    const [selectedValue1, setSelectedValue1] = useState("");
    const [selectedValue2, setSelectedValue2] = useState("");

    const pokemonPerPage = 9; // Cantidad de Pokémon por página

    // const [page, setPage] = useState(1);
    // const resultsPerPage = 100000; // Cambia esto al número deseado de resultados por página
    
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);

    const [selectedValue, setSelectedValue] = useState('0');
    const [inputValue, setInputValue] = useState(151);

    const [GetValue, setGetValueValue] = useState('Generation I');

    // const [showLoading, setShowLoading] = useState(false);
    
    const handleSelectChange = (event) => {

      const value = event.target.value;
      setInputValue(value);
      setGetValueValue(value);
      //If para actualizar los datos de pokemones dependiendo la generacion 
    {
        if (value === '151') {
            setSelectedValue(0);
            setGetValueValue('Generation I');
          }
    
          if (value === '100') {
            setSelectedValue(151);
            setGetValueValue('Generation II');
          }
    
          if (value === '135') {
            setSelectedValue(251);
            setGetValueValue('Generation III');
          }
    
          if (value === '107') {
            setSelectedValue(386);
            setGetValueValue('Generation IV');
          }
    
          if (value === '155') {
            setSelectedValue(494);
            setGetValueValue('Generation V');
          }
    
          if (value === '72') {
            setSelectedValue(649);
            setGetValueValue('Generation VI');
          }
    
          if (value === '88') {
            setSelectedValue(721);
            setGetValueValue('Generation VII');
          }
    
          if (value === '96') {
            setSelectedValue(809);
            setGetValueValue('Generation VIII');
          }
    
          if (value === '112') {
            setSelectedValue(905);
            setGetValueValue('Generation IX');
          }
    
          if (value === '283') {
            setSelectedValue(1017);
            setGetValueValue('eXTRAS');
          }
    }

    };

    const { pokemonList, loading } = UseFetch(`https://pokeapi.co/api/v2/pokemon?limit=${inputValue}&offset=${selectedValue}`);
    const { TypeList, loadingType } = UseFetch(`https://pokeapi.co/api/v2/type`);
    const { DescriptionList, loadingDescription } = UseFetch(`https://pokeapi.co/api/v2/pokemon-species?limit=${inputValue}&offset=${selectedValue}}`);

    const obtenerMasPokemones = async () => {
        if (cargando) return; // Evitar solicitudes simultáneas
        setCargando(true);
        const respuesta = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${elementosPorPagina}&offset=${(pagina - 1) * elementosPorPagina}`
        );
        const datos = await respuesta.json();
        // Procesar los datos y agregarlos a la lista existente de Pokémon
        setPagina(pagina + 1);
        setCargando(false);
    };
    // Usa IntersectionObserver para detectar cuando el usuario se acerca al final de la página
    useEffect(() => {
        const opciones = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0, // Cuando el elemento está completamente en el área visible
        };

    const observador = new IntersectionObserver((entradas) => {
        if (entradas[0].isIntersecting) {
        obtenerMasPokemones();
        }
    }, opciones);

    // Asocia el observador a un elemento (por ejemplo, un div con todas las tarjetas de Pokémon)
    if (tuRef.current) {
        observador.observe(tuRef.current);
    }

    return () => {
        if (tuRef.current) {
        observador.unobserve(tuRef.current);
        }
    };
    }, [pagina]);

    useEffect(() => {
        filterPokemonList();
    }, [selectedValue1, selectedValue2, pokemonList]);

    const calculateVisiblePokemon = () => {
        const startIndex = (currentPage - 1) * pokemonPerPage;
        const endIndex = startIndex + pokemonPerPage;
        return filteredPokemonList.slice(startIndex, endIndex);
    };

    const filterPokemonList = () => {
        if (pokemonList) { // Verifica si pokemonList no es null o undefined
            const filteredList = pokemonList.filter((pokemon) => {
                const type1 = selectedValue1;
                const type2 = selectedValue2;
                if (type1 === '' && type2 === '') {
                    return true;
                }
                return (
                    (type1 === '' || pokemon.types.some((type) => type.type.name === type1)) &&
                    (type2 === '' || pokemon.types.some((type) => type.type.name === type2))
                );
            });
            setFilteredPokemonList(filteredList);
            setCurrentPage(1); // Restablece la página a la primera cuando se aplican filtros.
        }
    };

    const totalPages = Math.ceil(filteredPokemonList.length / pokemonPerPage);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
    const visiblePokemon = calculateVisiblePokemon();
    
    return ( 
        <div>
            {loading &&  loadingType && loadingDescription ? (
            // Si loading es true, muestra un pre-cargador o una animación de carga
            <div className="loading-indicator">Loading...</div>
            ) : (
            // Si loading es false, muestra el contenido una vez que la solicitud esté completa
            <div>
                
            <div className="container ">
                <div className="d-flex justify-content-center align-items-center ">
                    <img className='img_pokedex' src={pokedex}></img>
                </div>
            </div>


            <div className="d-flex justify-content-center align-items-center">
                <strong><p className='generacion_name' onChange={(e) => setGetValueValue(e.target.value)}>{GetValue}</p></strong>
            </div>


            <div className='container mood_filter'>
                <div className='row'>
                    <div className='col-12 col-sm-6'>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                <h5>Filter by generation</h5>
                            </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className='row '>
                                        <div className='col-sm-12 ' style={{marginBottom: "20px"}}> 
                                        <h5>Select a generation.</h5>   
                                        <select className='form-control'  onChange={handleSelectChange}>
                                            <option value={selectedValue} selected disabled>Ej: Generacion III</option>
                                            <option value="151">Generación I</option>
                                            <option value="100">generacion II</option>
                                            <option value="135">generacion III</option>
                                            <option value="107">generacion IV</option>
                                            <option value="155">generacion V</option>
                                            <option value="72">generacion VI</option>
                                            <option value="88">generacion VII</option>
                                            <option value="96">generacion VIII</option>
                                            <option value="112">generacion IX</option>
                                            {/* <option value="283">Extras</option> */}
                                            {/* Otras opciones de generación si es necesario */}
                                        </select>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-9'> </div>
                                        <div className='col-3' >  
                                        <div className="d-grid gap-2">
                                        <button className="btn btn-danger" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" onClick={() => { setSelectedValue(0); setInputValue(151); }}>
                                            Clean
                                            </button>
                                        </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <input hidden type="text" value={inputValue} readOnly />
                    </div>
                    <div className='col-12 col-sm-6'>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <h5>Filter by type</h5>
                            </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className='row '>
                                        <div className='col-sm-6 ' style={{marginBottom: "20px"}}> 
                                            <h5>Seleccione un tipo</h5>  
                                            <select className="form-control" onChange={(e) => setSelectedValue1(e.target.value)}>
                                                <option value={"1"} selected disabled>Ej: Fire</option>
                                                {TypeList.map((type) => (
                                                <option value={type.name} key={type.name}>{type.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <div className='col-sm-6 ' > 
                                            <h5>Seleccione un tipo (opcional)</h5>    
                                            <select className="form-control" onChange={(e) => setSelectedValue2(e.target.value)}>
                                                <option value={"1"}selected disabled>Ej: Fire</option>
                                                {TypeList.map((type) => (
                                                <option value={type.name} key={type.name}>{type.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-9' >  

                                        </div>
                                        <div className='col-3 ' >  
                                            <div className="d-grid gap-2">
                                                <button className="btn btn-danger" id="headingOne" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" onClick={() => { setSelectedValue1(''); setSelectedValue2(''); }}>
                                                    Clean
                                                </button>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row card-pokemon-border-mood' ref={tuRef}>
                    {visiblePokemon
                    .map((pokemon, index) => (
                        <div className=' col-12 col-md-6 col-lg-4' key={index}>
                            {pokemon.sprites.other['official-artwork'].front_default ? (

                            <div className="card-pokemon-border"  >

                                <div className="card-body card-body-titulo">

                                    <div className='row'>
                                        <div style={{textAlign: "center"}} className='col-12'>
                                            
                                        <input type="number" hidden readOnly value={pokemon.id}/>
                                        <h5 className="id_number_pk">#{pokemon.id}</h5>
                                        <a className="pk_miniatura"> <img src={pokemon.sprites.front_default}/></a>
                                            <strong>
                                            
                                                <p  className="card-title card-name-pokemon">
                                                    {pokemon.name
                                                        .split('-') // Dividir la cadena en un array en cada "-"
                                                        .map((word, index) => 
                                                            index === 0 // Verificar si es la primera palabra
                                                            ? word.charAt(0).toUpperCase() + word.slice(1) // Convertir la primera letra en mayúscula
                                                            : word // Mantener las otras palabras sin cambios
                                                        )
                                                        .join(' ')
                                                        .split(' ') // Dividir la cadena por espacios
                                                        .map((word, index, words) =>
                                                            index === 0 && words.length > 1 // Reemplazar el primer espacio si hay más de una palabra
                                                            ? word + ':'
                                                            : word.charAt(0).toUpperCase() + word.slice(1) // Convertir la primera letra en mayúscula
                                                        )
                                                        .join(' ')
                                                    }
                                                </p>
                                            </strong> 
                                        </div>   
                                    </div>
                                </div>

                                {
                                    // Casos con un solo tipo
                                    (pokemon.types[0] && !pokemon.types[1]) && (
                                        <div className={`background-${pokemon.types[0].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                                        </div>
                                    )
                                }

                                {
                                    // Casos con dos tipos
                                    (pokemon.types[0] && pokemon.types[1]) && (
                                        <div className={`background-${pokemon.types[0].type.name}-${pokemon.types[1].type.name} card-pokemon background-common`}>
                                        <img className="card-img-top img_pokemon" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                                        </div>
                                    )
                                }

                                {
                                // Caso por defecto (cuando no coincide con ninguno de los casos anteriores)
                                    (!pokemon.types[0]) && (
                                        <div>
                                        
                                        </div>
                                    )
                                }
                                 <div className='row pokemon-type' >
                                    <div className='col-3'>
                                    
                                    </div>
                                    <div className='col-6'>
                                    <div className="btn-group d-flex justify-content-center" role="group" aria-label="Tipos de Pokémon">
                                    <button className={`btn background-${pokemon.types[0].type.name} no-hover`}>
                                        {pokemon.types[0].type.name}
                                    </button>
                                    {pokemon.types.length > 1 ? 
                                        <button className={`btn background-${pokemon.types[1].type.name} no-hover`}>
                                        {pokemon.types[1].type.name}
                                        </button>
                                        : ''}
                                    </div>
                                    </div>
                                    <div className='col-3'>
                                    
                                    </div>
                                </div>
                                <div className='type-description'>
                                {/* <p className="description-text">
                                    {DescriptionList && DescriptionList[index] && DescriptionList[index].flavor_text_entries && (
                                        <p>{DescriptionList[index].flavor_text_entries[1].flavor_text}</p>
                                    )}
                                    </p> */}
                                    <div>
                                    {/* Botón para abrir el modal */}
                                    <div className="text-center">
                                        <button
                                            className="btn btn-warning w-100 btn-statistics"  // Agrega la clase w-100 para ocupar todo el ancho disponible
                                            onClick={() => openModal(pokemon)}
                                        >
                                            View Statistics
                                        </button>
                                        </div>
                                    
                                    {/* Renderiza el modal */}
                                    <ModalPokemon pokemon={selectedPokemon} closeModal={closeModal} />
                                    </div>
                                </div>
                                </div>

                            
                            ):(
                            <div className="card card_mood card-pokemon-border">
                                <div className="card-body card-body-titulo">
                                    <div className='row'>
                                        <div style={{textAlign: 'center'}} className='col-12'>
                                        <input type="number" hidden className="nombre_pokemon" defaultValue={pokemon.id}/>
                                            <strong>
                                                <p  className="card-title card-name-pokemon">
                                                    {pokemon.name
                                                        .split('-') // Dividir la cadena en un array en cada "-"
                                                        .map((word, index) => 
                                                            index === 0 // Verificar si es la primera palabra
                                                            ? word.charAt(0).toUpperCase() + word.slice(1) // Convertir la primera letra en mayúscula
                                                            : word // Mantener las otras palabras sin cambios
                                                        )
                                                        .join(' ')
                                                        .split(' ') // Dividir la cadena por espacios
                                                        .map((word, index, words) =>
                                                            index === 0 && words.length > 1 // Reemplazar el primer espacio si hay más de una palabra
                                                            ? word + ':'
                                                            : word.charAt(0).toUpperCase() + word.slice(1) // Convertir la primera letra en mayúscula
                                                        )
                                                        .join(' ')
                                                    }
                                                </p>
                                            </strong> 
                                        </div>     
                                    </div>
                                </div>
                                {
                                                                
                                 
                                pokemon.name.endsWith('sinistcha') ? (
                                    
                                    <img className="card-img-top img_pokemon" src={pk_1013} alt={pokemon.name} />
                                    ) : pokemon.name.endsWith('mimikyu-busted') ? (
                                        <img className="card-img-top img_pokemon" src={pk_10143} alt={pokemon.name} />
                                    ) : pokemon.name.endsWith('mimikyu-totem-busted') ? (
                                        <img className="card-img-top img_pokemon" src={pk_10143} alt={pokemon.name} />
                                    ):pokemon.name.endsWith('koraidon-limited-build') ? (
                                        <img className="card-img-top img_pokemon" src={pk_10264} alt={pokemon.name} />
                                    ):pokemon.name.endsWith('koraidon-sprinting-build') ? (
                                        <img className="card-img-top img_pokemon" src={pk_10265} alt={pokemon.name} />
                                    ):pokemon.name.endsWith('koraidon-gliding-build') ? (
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10267} alt={pokemon.name} />
                                    ):pokemon.name.endsWith('miraidon-low-power-mode') ? (
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10268} alt={pokemon.name} />
                                    ):pokemon.name.endsWith('miraidon-drive-mode') ? (
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10269} alt={pokemon.name} />
                                    ):pokemon.name.endsWith('miraidon-glide-mode') ? (
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10271} alt={pokemon.name} />
                                    ):pokemon.name.endsWith('miraidon-glide-mode') ? (
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10271} alt={pokemon.name} />
                                    ):pokemon.name.endsWith('ursaluna-bloodmoon') ? (
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10272} alt={pokemon.name} />
                                    ):pokemon.name.endsWith('ogerpon-wellspring-mask') ? (
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10273} alt={pokemon.name} />
                                    ):pokemon.name.endsWith('ogerpon-hearthflame-mask') ? (
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10274} alt={pokemon.name} />
                                    ):pokemon.name.endsWith('ogerpon-cornerstone-mask') ? (
                                        <img className="card-img-top img_pokemon" width={"100%"} src={pk_10275} alt={pokemon.name} />
                                    ):(
                                        <div/>
                                    )
                                }
                                                                <div className='row'>
                                    <div className='col-3'>
                                    
                                    </div>
                                    <div className='col-6'>
                                    <div className="btn-group d-flex justify-content-center" role="group" aria-label="Tipos de Pokémon">
                                    <button className={`btn background-${pokemon.types[0].type.name} no-hover`}>
                                        {pokemon.types[0].type.name}
                                    </button>
                                    {pokemon.types.length > 1 ? 
                                        <button className={`btn background-${pokemon.types[1].type.name} no-hover`}>
                                        {pokemon.types[1].type.name}
                                        </button>
                                        : ''}
                                    </div>
                                    </div>
                                    <div className='col-3'>
                                    
                                    </div>
                                </div>


                            </div>
                            )}
                      
                        </div>
                        
                    ))}
                </div>
                
            </div>
            <div className='row'>
                <div className='col-sm-4'></div>
                    <div className='col-sm-4'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />          
                    </div>
                <div className='col-sm-4'></div>
            </div>
        </div>      
    )}
</div>);}

export default CardPokemon;
