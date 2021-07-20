import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {setRightWrapper} from '../store/actions/rootAction'
import mypokeball from '../static/image/mypokeball.png'
function Header() {
    const dispatch = useDispatch()

    const {myPokemon, rightWrapper} = useSelector((state) => ({
      myPokemon: state.myPokemon,
      rightWrapper: state.rightWrapper
    }))

    return (
        <div className="header sticky">
        <div id="right" className="navigation" onClick={() => dispatch(setRightWrapper(!rightWrapper))}>
          <img alt="poke-ball" src={mypokeball}></img>
          <span className="m-0">My Pokemon: {myPokemon.length}</span>
        </div>
      </div>
    )
}

export default React.memo(Header)