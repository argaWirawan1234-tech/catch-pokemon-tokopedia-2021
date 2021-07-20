import React from 'react'

import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';

import {setRightWrapper} from '../store/actions/rootAction'
import PokemonCard from './PokemonCard'
import '../styles/rightWrapper.css'

function RightWrapper({myPokemon}) {
    const dispatch = useDispatch()
    const {rightWrapper} = useSelector((state) => ({
        rightWrapper: state.rightWrapper
    }))
    const MapPokemon = React.memo(({pokemonData}) => {
        return pokemonData.map((item, index) => (
            <div key={String(index)}>
              <PokemonCard pokemon={item} enableDelete={true}/>
            </div>
        ))
    })
    return (
        <div className="rightWrapper">
            <div className="headerRightWrapper">
                <span>My Pokemon</span>
                <span onClick={() => dispatch(setRightWrapper(!rightWrapper))}>Back</span>
            </div>
            <MapPokemon pokemonData={myPokemon} />
        </div>
    )
}

RightWrapper.propTypes ={
    myPokemon: PropTypes.array
}

export default React.memo(RightWrapper)
