import React, { useMemo } from 'react'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';

import LazyImage from './LazyImage'
import imagePokemon from '../helper/imagePokemon' 
import {removeMyPokemon} from '../store/actions/rootAction'
import '../styles/pokemonCard.css'

function PokemonCard({pokemon, enableDelete}) {
  const dispatch = useDispatch()
    const image = useMemo(() => imagePokemon(pokemon), [pokemon]) 
    return (
        <div
        className={`cp item ${
          pokemon.types[0].type.name ? `${pokemon.types[0].type.name}` : ''
          }`}
        >
          {enableDelete ? <div className="removeButton" onClick={() => dispatch(removeMyPokemon(pokemon.id))}>x</div> : <></>}
        <h3 className="m-0" style={{textTransform: 'capitalize'}}>
          {pokemon.name} <span style={{fontSize: '12px'}}>{pokemon.nickname ? `(${pokemon.nickname.length < 8 ? pokemon.nickname : `${pokemon.nickname.substring(0,8)} ...`})` : ''}</span>
        </h3>

        <div className="type-label-wrapper">
            {pokemon.types.map((x) => (
                <span className="type-label" key={`type-${x.type.name}`}>
                {x.type.name}
              </span>
            ))}
        </div>
        <LazyImage src={image} alt={pokemon.name} imgClass={"image-item"} wrapperClass={"wrapper-image-pokemon"} />
      </div>
    )
}

PokemonCard.propTypes = {
    pokemon: PropTypes.object,
  }

export default React.memo(PokemonCard)
