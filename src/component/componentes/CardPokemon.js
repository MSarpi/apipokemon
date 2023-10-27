import React from 'react';
import { UseFetch } from '../api_conexion/UseFetch';
import ImgReplace from '../img/remplazo_pk.jpg'
import Paginacion from '../componentes/Paginacion';

function CardPokemon() {
    const { pokemonList, loading } = UseFetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'); 
    console.log(pokemonList)
    if (loading) {
        return <div>Loading...</div>;
    }

    return ( 
        <div className='container'>
            <div className='row'>
                {pokemonList
                // .filter((pokemon) => pokemon.sprites.front_default)
                .map((pokemon, index) => (
                    <div className='col-sm-3' key={index}>
                        <div className="card card_mood">
                            <div>
                            {pokemon.sprites.other['official-artwork'].front_default ? (
                                <img className="card-img-top img_pokemon" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                                ) : (
                                <img className="card-img-top img_pokemon" src={ImgReplace} alt={pokemon.name} />
                                )
                            }

                            </div>
                            <div className="card-body">
                                <input type="number" hidden className="form-control nombre_pokemon" value={pokemon.id}/>
                                <strong><h5 className="card-title">{pokemon.name.toUpperCase()}</h5></strong> 
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
                    </div>
                ))}
            </div>
        </div>
        
    );
}

export default CardPokemon;