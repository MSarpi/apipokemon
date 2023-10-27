import React, { useState, useEffect } from 'react'; 

export function UseFetch(url) {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        // Function to obtain a list of Pokémon
        const getPokemonList = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        };

        // Function to obtain the details of a Pokémon
        const getPokemonDetails = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        };

        const fetchPokemonData = async () => {
            const initialPokemonList = await getPokemonList(url);
            const promises = initialPokemonList.results.map(pokemon => getPokemonDetails(pokemon.url));
            const pokemonDataList = await Promise.all(promises);
            setPokemonList(pokemonDataList);
        };

        fetchPokemonData();
    }, [url]); // Add 'url' as a dependency to re-fetch when the URL changes

    return { pokemonList }; // Return the fetched data
}