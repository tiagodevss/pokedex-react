import React, { useEffect, useState } from 'react';
import Api from './Services/Api';
import FadeLoader from 'react-spinners/FadeLoader';
import './App.css'
import Tipo from './Components/Tipo/Tipo'

export default function App() {

  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [typedPokemon, setTypedPokemon] = useState('');
  const [isLoading, setIsLoading] = useState(null);

  async function InitialState(){
    const response = await Api.get(`/pokemon/1`)
    setPokemon(response.data)
  }

  const handleChange = (event) => {
    setTypedPokemon(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!typedPokemon) {
      return
    }
    setIsLoading(true)
    try {
      const response = await Api.get(`/pokemon/${typedPokemon}`)
      setPokemon(response.data)
      setError(null)
      setIsLoading(false)
    } catch (error) {
      setError("Pokemon não encontrado!")
      setIsLoading(false)
      setPokemon(null);
    }
  }
  useEffect(() => {
    InitialState()
  }, [])
  return (
    <div className="conteudo">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            value={typedPokemon}
            placeholder="Nome do Pokemon ou ID"
            onChange={handleChange}
            autoComplete="none"
          />
          <button type="submit">
            Buscar
          </button>
        </form>
        <div className="dadosPokemon">
          {pokemon && (
            <div key={pokemon.id}>
              {console.log(pokemon)}
              {isLoading ? (
                <FadeLoader />
              ) : (
                <>
                  <h2 className="nomePokemon">{pokemon.name}</h2>
                  <img
                    className="imagemPokemon"
                    src={pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}
                    alt={pokemon.name}
                  />
                  <div className='tipos'>
                    {pokemon.types.map((type) => {
                      return (
                        <Tipo key={type.slot} type={type} />
                      )
                    })}
                  </div>
                  <p>
                    <strong>ID:</strong> {pokemon.id}<br/>
                    <strong>Altura:</strong> {pokemon.height * 10} cm<br/>
                    <strong>Peso:</strong> {pokemon.weight / 10} kg<br/>
                  </p>
                </>
              )}
            </div>
          )}
          {error}
        </div>
      </div>
      <p className='creditos'>Desenvolvido por <a href='https://github.com/tiagodevss'>Tiago Santos</a>. API disponibilizada por "pokeapi.co"</p>
    </div>
  )
}