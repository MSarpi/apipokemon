import React from 'react';
import { UseFetch } from '../api_conexion/UseFetch';
import ImgReplace from '../img/remplazo_pk.jpg'
import Paginacion from '../componentes/Paginacion';
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

function CardPokemon() {
    const { pokemonList, loading } = UseFetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');

    return ( 
        <div>
            {loading ? (
            // Si loading es true, muestra un pre-cargador o una animación de carga
            <div className="loading-indicator">Cargando...</div>
            ) : (
            // Si loading es false, muestra el contenido una vez que la solicitud esté completa
            <div>
                        <div className='container'>
            <div className='row'>
                {pokemonList
                // .filter((pokemon) => pokemon.sprites.front_default)
                .map((pokemon, index) => (
                    <div className='col-sm-3' key={index}>
                        {pokemon.sprites.other['official-artwork'].front_default ? (

                            <div className="card card_mood">
                            <div>

                                <img className="card-img-top img_pokemon" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />

                            </div>
                            <div className="card-body">
                                <input type="number" hidden className="form-control nombre_pokemon" value={pokemon.id}/>
                                <strong><p className="card-title">
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
                                    </p></strong> 
                                {/* <strong>Pokemon ID: </strong><span>{pokemon.id}</span>
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
                                </span> */}
                            </div>
                        </div>
                        ):(
                        <div className="card card_mood">
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
                                ):pokemon.name.endsWith('koraidon-swimming-build') ? (
                                    <img className="card-img-top img_pokemon" width={"100%"} src={pk_10266} alt={pokemon.name} />
                                ):pokemon.name.endsWith('koraidon-gliding-build') ? (
                                    <img className="card-img-top img_pokemon" width={"100%"} src={pk_10267} alt={pokemon.name} />
                                ):pokemon.name.endsWith('miraidon-low-power-mode') ? (
                                    <img className="card-img-top img_pokemon" width={"100%"} src={pk_10268} alt={pokemon.name} />
                                ):pokemon.name.endsWith('miraidon-drive-mode') ? (
                                    <img className="card-img-top img_pokemon" width={"100%"} src={pk_10269} alt={pokemon.name} />
                                ):pokemon.name.endsWith('miraidon-aquatic-mode') ? (
                                    <img className="card-img-top img_pokemon" width={"100%"} src={pk_10270} alt={pokemon.name} />
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
                                    <img className="card-img-top img_pokemon" src={ImgReplace} alt={pokemon.name} />
                                )
                            }

                            <div className="card-body">
                                <input type="number" hidden className="form-control nombre_pokemon" value={pokemon.id}/>
                                <strong><p className="card-title">{pokemon.name
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
                                    }</p></strong> 
                                {/* <strong>Pokemon ID: </strong><span>{pokemon.id}</span> */}
                                {/* <br/>
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
                                </span> */}
                            </div>
                        </div>
                        )
                        }
                    </div>
                ))}
            </div>
        </div>
            </div>
            )}
        </div>

        
    );
}

export default CardPokemon;