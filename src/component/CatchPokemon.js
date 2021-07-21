/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react'

import { useDispatch, useSelector} from 'react-redux';
import { CSSTransition } from 'react-transition-group'
import PropTypes from "prop-types";

import {setMyPokemon, setBottomWrapper} from '../store/actions/rootAction'
import '../styles/catchPokemon.css'

const CatchPokemon = ({pokemonDetail, image}) => {
  const dispatch = useDispatch()
  const ball = useRef()
  const ball2 = useRef()
  const ball3 = useRef()
  const pokemon = useRef()
  const pokeBallZoomCircle = useRef()
  const clickPokeBall =useRef()

  const [ballZoom, setBallZoom] = useState(false)
  const [ballThrow, setBallThrow] = useState(false)
  const [catchText, setCatchText] = useState(false)
  const [ballThrow2, setBallThrow2] = useState(false)
  const [moveWrapper, setMoveWrapper] = useState(false)
  const [pokemonFree, setPokemonFree] = useState(false)
  const [catchSuccess, setCatchSuccess] = useState(false)
  const [catchFail, setCatchFail] = useState(false)
  const [pokemonName, setPokemonName] = useState('') 
  
  const {bottomWrapper} = useSelector((state) => ({
        bottomWrapper: state.bottomWrapper
    }))

  function catchProcess() {
    clickPokeBall.current.style.opacity= '0'
    clickPokeBall.current.className = 'clickPokeBall'
    setBallThrow(true)
    setTimeout(() => {
      ball2.current.style.opacity = 1
      setBallThrow2(true)
      pokemon.current.className += ' pokemonGlow'
      setTimeout(() => {
        setMoveWrapper(true)
      }, 1000)

      setTimeout(() => {
        ball2.current.style.display = 'none'
        ball3.current.style.display = 'flex'
        pokeBallZoomCircle.current.className += ' pokeBallActive'
        setBallZoom(true)

        setTimeout(() => {
          pokeBallZoomCircle.current.addEventListener('webkitAnimationIteration', addPokeBallCircle(pokeBallZoomCircle))

          setTimeout(() => {
            ball.current.removeEventListener('webkitAnimationIteration', catchProcess)
            pokeBallZoomCircle.current.removeEventListener('webkitAnimationIteration', addPokeBallCircle(pokeBallZoomCircle))
          }, 1000)

          if (Math.random() >= 0.5) {
            setCatchText(true)
            setCatchSuccess(true)
          } else {
            setPokemonFree(true)
            setCatchFail(true)
          }
        }, 3500)
      }, 1500)
    }, 500)
  }

  function addPokeBallCircle(pokeBallZoomCircle) {
    pokeBallZoomCircle.current.className = 'pokeBallCircle'
  }

  function throwTheBall() {
    if (ball && ball.current) {
      ball.current.addEventListener('webkitAnimationIteration', catchProcess)
    }
  }

  function resetComponent(){
    if(pokemonName.length > 0)setPokemonName('')
    if(catchFail)setCatchFail(false)
    if(catchSuccess)setCatchSuccess(false)
    if(pokemonFree)setPokemonFree(false)
    if(catchText)setCatchText(false)
    if(ballZoom) setBallZoom(false)
    if(moveWrapper)setMoveWrapper(false)
    if(ballThrow2)setBallThrow2(false)
    if(ballThrow)setBallThrow(false)
    pokemon.current.className = 'wrapper-target'
    ball2.current.style.display = 'flex'
    ball3.current.style.display = 'none'
    ball2.current.style.opacity = 0
    clickPokeBall.current.style.opacity= '1'
    clickPokeBall.current.className = 'clickPokeBall clickPokeBallActive'
  }

  function submitPokemon(data, nickname){
    const newData = {
      name: data.name,
      types: data.types,
      sprites: data.sprites,
      nickname,
    }

    dispatch(setMyPokemon(newData))
    resetComponent()
    dispatch(setBottomWrapper(!bottomWrapper)
  }

  useEffect(() => {
    if (pokemonDetail) resetComponent()
  }, [pokemonDetail])

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        overflowX: 'hidden',
        backgroundImage: `url(http://images.unsplash.com/photo-1529419412599-7bb870e11810?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max)`,
      }}
    >
      <CSSTransition in={moveWrapper} timeout={500} classNames="wrapper-target">
        <div ref={pokemon} className="wrapper-target">
          <img style={{width: '100%'}} src={image} alt="pokemonImage"></img>
        </div>
      </CSSTransition>
      <CSSTransition
        in={ballThrow2}
        timeout={200}
        classNames="pokeBall2Wrapper"
      >
        <div className="pokeBall2Wrapper">
          <div ref={ball2} className="pokeBall2">
            <div className="pokeBallCircle"></div>
          </div>
          <div style={{ position: 'relative' }}>
            <CSSTransition
              in={ballZoom}
              timeout={3000}
              classNames="pokeBAllZoomWrapper"
            >
              <div ref={ball3} className="pokeBAllZoomWrapper">
                <div className="pokeBallZoom">
                  <div
                    ref={pokeBallZoomCircle}
                    className="pokeBallCircle"
                  ></div>
                  <CSSTransition
                    in={pokemonFree}
                    timeout={200}
                    classNames="pokemonCatched"
                  >
                    <div className="pokemonCatched">
                      <img style={{width: '100%'}} src={image} alt="pokemonCatchedImage"></img>
                    </div>
                  </CSSTransition>
                  <CSSTransition
                    in={catchText || pokemonFree}
                    timeout={200}
                    classNames="catchedText"
                  >
                    <div className="catchedText">
                      {pokemonFree ? 'Fail' : 'Gotcha'}
                    </div>
                  </CSSTransition>
                </div>
              </div>
            </CSSTransition>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={ballThrow} timeout={500} classNames="pokeBall">
        <div
          ref={ball}
          onClick={throwTheBall}
          className={`pokeBall ${ballThrow ? 'throwing' : 'bounce'}`}
        >
          <div className="pokeBallCircle"></div>
        </div>
      </CSSTransition>
      <div ref={clickPokeBall} className="clickPokeBall clickPokeBallActive">Click Poke Ball</div>

      <CSSTransition in={catchSuccess || catchFail} timeout={500} classNames="catchSuccess">
          <div className="catchSuccess">
            <p>{catchSuccess ? 'Congrats, give it name!' : 'You fail!'}</p>
            {catchSuccess ? (
            <>
              <input className="inputPokemonName" value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} />
              <button className="alertButtonCatch" onClick={() => submitPokemon(pokemonDetail, pokemonName)}>Submit</button>
            </>) : (
            <>
            <button className="alertButtonCatch" onClick={() => resetComponent()}>Try Again</button>
            </>
            )}
          </div>
      </CSSTransition>
    </div>
  )
}


CatchPokemon.propTypes ={
  pokemonDetail: PropTypes.object,
  image: PropTypes.string
}

export default React.memo(CatchPokemon)
