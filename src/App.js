import React from 'react'

import { CSSTransition } from 'react-transition-group'
import { useSelector } from 'react-redux';

import './App.css';
import '../src/styles/pokemonBackgroundColor.css'
import '../src/styles/pokemonColor.css'

import RightWrapper from './component/RightWrapper';
import BottomWrapper from './component/BottomWrapper';
import PokemonList from './component/PokemonList'
import Header from './component/Header'
function App() {

  const {pokemonDetail, bottomWrapper, rightWrapper, myPokemon} = useSelector((state) => ({
    pokemonDetail: state.pokemonDetail,
    bottomWrapper: state.bottomWrapper,
    rightWrapper: state.rightWrapper,
    myPokemon: state.myPokemon
  }))

  return (
    <div className="container">
    <div className="AppWrapper">
    <Header />
    <PokemonList />
    <CSSTransition in ={bottomWrapper} timeout={1000} classNames="shadowWrapper">
      <div className="shadowWrapper"></div>
    </CSSTransition>
    <CSSTransition in={rightWrapper} timeout={1000} classNames="rightWrapper">
      <RightWrapper myPokemon={myPokemon} />
    </CSSTransition>
    <CSSTransition in={bottomWrapper} timeout={1000} classNames="bottomWrapper">
      <BottomWrapper pokemonDetail={pokemonDetail} />
    </CSSTransition>
    </div>
  </div>
  );
}

export default App;
