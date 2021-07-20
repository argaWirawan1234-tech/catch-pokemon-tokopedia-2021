/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState, useMemo} from 'react'

import { useDispatch, useSelector } from 'react-redux'
// import { useLazyQuery } from '@apollo/client'
import PropTypes from "prop-types";


import { setBottomWrapper } from '../store/actions/rootAction'
import { getData } from '../store/actions/rootAction'
// import evolutionQuery from '../query/evolutionQuery'
import imagePokemon from '../helper/imagePokemon' 
import '../styles/bottomWrapper.css'

import Skeleton from 'react-loading-skeleton';
import CatchPokemon from './CatchPokemon';

import SportsMotorsportsIcon from '@material-ui/icons/SportsMotorsports';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ToysIcon from '@material-ui/icons/Toys';
import FlareIcon from '@material-ui/icons/Flare';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import GestureIcon from '@material-ui/icons/Gesture';


// const GET_EVOLUTION = evolutionQuery

const iconComponent ={
    hp: FavoriteIcon,
    attack: FlareIcon,
    defense: ToysIcon,
    speed: GestureIcon,
    'special-attack': FlashOnIcon,
    'special-defense': SportsMotorsportsIcon,
}
function BottomWrapper({pokemonDetail}) {
    // const [ getEvolution, { data, fetchMore }] = useLazyQuery(GET_EVOLUTION)

    const nav = useRef()
    const centerNav = useRef()
    const rightNav = useRef()
    const wrapper = useRef()
    const prevScrollY = useRef(0)
    const playCatchPokemon = useRef()
    const [goingUp, setGoingUp] = useState(false);
    
    const [abilities, setAbilities] = useState([])
    const [move, setMove] = useState([])
    const [loadMove, setLoadMove] = useState(false)
    const [loadAbilities, setLoadAbilities] = useState(false)
    const [play, setPlay] = useState(false)
    const {bottomWrapper} = useSelector((state) => ({
        bottomWrapper: state.bottomWrapper
    }))

    const dispatch = useDispatch()
    const image = useMemo(() => {
        return pokemonDetail ? imagePokemon(pokemonDetail): ''
        
    }, [pokemonDetail]) 

    const Types = React.memo(({types}) => {
        return(
            types.map((x) => (
                <span className="type-label" key={`type-${x.type.name}`}>
                {x.type.name}
            </span>
            ))
        )
    })

    const Stats = React.memo(({stats}) => {
        return(
            stats.map((item, index) => { 
                const TagName = iconComponent[item.stat.name]
                const name = item.stat.name.split('-')
                return (
                    <div key={index}>
                        <span className="sec-2-top">{name.length === 2 ? name.join(' ') : name[0]}</span>
                        <TagName className="sec-2-center" />
                        <span className="sec-2-bot">{item.base_stat}</span>
                    </div>
                )}
            )
        )
    })

    const Abilities = React.memo(({abilities, loadAbilities})=> {
        return (loadAbilities ? Array.from(new Array(10)) : abilities).map((item, index) => (
            item ? (<div key={index}>
                <p className="sec-4-title">{item.name}</p>
                <p className="sec-4-desc">{item.description}</p>
            </div>  ) : 
            (<div key={String(index)} >
            <Skeleton height={80} width={'100%'}/>
            </div>)
        ))
    })

    const Move = React.memo(({move, loadMove}) => {
        return (loadMove ? Array.from(new Array(10)) : move).map((item, index) => { 
            return(
            item ? (<div style={{marginBottom: '10px'}} key={index}>
                <p className="sec-4-title">{item.name}</p>
                <p className="sec-4-desc">{item.description}</p>
            </div>  ) : 
            (<div style={{marginBottom: '10px'}} key={String(index)} >
            <Skeleton height={30} width={'100%'}/>
            </div>)
        )})
    })
    
    useEffect(() => {
        if (bottomWrapper) wrapper.current.scrollTop = 0    
    },[bottomWrapper])

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = wrapper.current.scrollTop;
        if (prevScrollY.current < currentScrollY && goingUp) {
          setGoingUp(false);
        }
        if (prevScrollY.current > currentScrollY && !goingUp) {
          setGoingUp(true);
        }

        if (currentScrollY >= 100) {
            centerNav.current.style.opacity = 1
            rightNav.current.style.opacity = 1
        }else {
            centerNav.current.style.opacity = 0
            rightNav.current.style.opacity = 0
        }

        if(currentScrollY > 0){
            nav.current.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
            nav.current.style.backdropFilter = 'blur(8px)'
        }else{
            nav.current.style.backgroundColor = 'transparant'
            nav.current.style.backdropFilter = 'blur(0px)'
        }
  
        prevScrollY.current = currentScrollY;
      };

      var bottomWrapper = wrapper ? wrapper.current : undefined
  
      if (bottomWrapper) bottomWrapper.addEventListener("scroll", handleScroll, { passive: true });
  
      return () =>  {
          if(bottomWrapper) return bottomWrapper.removeEventListener("scroll", handleScroll)
        };
    }, [goingUp, pokemonDetail]);

    useEffect(() => {
        const moveFetch = []
        const abilitiesFetch = []
        if(pokemonDetail) {
            setLoadAbilities(true)
            setLoadMove(true)

            // getEvolution({variables: {
            //     id: String(pokemonDetail.id),
            // }})

            pokemonDetail.abilities.forEach((item)=>{
                abilitiesFetch.push(getData(item.ability.url))
            })
            
            pokemonDetail.moves.forEach((item, index) => {
                if (index <=5) moveFetch.push(getData(item.move.url))
            })
    
            Promise.all(moveFetch)
            .then((res) => {
                console.log(res)
                setLoadMove(false)
                const move = res.map(x => ({
                    name: x.name.split('-').length === 1 ? x.name.split('-')[0] :  x.name.split('-').join(' ') ,
                    description: x.effect_entries.filter((x) => x.language.name === 'en')[0].effect
                }))
                setMove(move)
            })
    
            Promise.all(abilitiesFetch)
            .then((res) => {
                setLoadAbilities(false)
                const abilities = res.map(x => ({
                    name: x.name.split('-').length === 1 ? x.name.split('-')[0] :  x.name.split('-').join(' ') ,
                    description: x.effect_entries.filter((x) => x.language.name === 'en')[0].effect
                }))
                setAbilities(abilities)
            })
        }

    }, [pokemonDetail])

    useEffect(() => {
        if (play) {
            wrapper.current.scrollTop = '0'
            wrapper.current.style.height = '100vh'
            wrapper.current.style.overflow = 'hidden'
            playCatchPokemon.current.style.opacity = '1'
            playCatchPokemon.current.style.zIndex = '4'
        }
        if(!play &&  wrapper.current) {
            wrapper.current.style.height = '70vh'
            wrapper.current.style.overflow = 'auto'
            playCatchPokemon.current.style.opacity = '0'
            playCatchPokemon.current.style.zIndex = '0'
        }
    }, [play, wrapper, bottomWrapper, playCatchPokemon])

    function back(status){
        dispatch(setBottomWrapper(!status))
        setPlay(false)
    }
    
    return (
        <>{pokemonDetail && (<div ref={wrapper} className="bottomWrapper">
        <div ref={nav} className="bottomWrapperHeader">
            <div className="bottomWrapperHeaderLeft" onClick={()=> back(bottomWrapper)}>Kembali</div>
            <div ref={centerNav} className="bottomWrapperHeaderCenter">
                <img src={image} alt="avatar"></img>
            </div>
            <div ref={rightNav} className="bottomWrapperHeaderRight">
                <div className="bottomWrapperHeaderButton" onClick={() => setPlay((play) => !play)}>
                    DAPATKAN
                </div>
            </div>
        </div>
        <div style={{position: 'relative'}}>
            <div className="playCatchPokemon" ref={playCatchPokemon}>
                <CatchPokemon pokemonDetail={pokemonDetail} image={image}></CatchPokemon>
            </div>
        </div>
        <div className="bottomWrapperSection">
        <div className="sec-1">
            <img src={image} alt="avatar"></img>
            <div>
                <div id="top">
                    <p id="name">{pokemonDetail.species.name.charAt(0).toUpperCase() + pokemonDetail.species.name.slice(1)}</p>
                    <div className="type-label-bottomWrapper">
                    <Types types={pokemonDetail.types} />
                    </div>
                </div>
                <div id="bottom">
                <div style={{margin: '0'}} className="bottomWrapperHeaderButton" onClick={() => setPlay((play) => !play)}>
                    DAPATKAN
                </div>
                </div>
            </div>
        </div>
        <div className="sec-2">
            <Stats stats={pokemonDetail.stats} />
        </div>
        {/* <div style={{paddingTop:'0px', marginTop: '-30px'}}className="bottomWrapperSectionWrapper">
            <div className="sec-3">
            <div></div>
            <div></div>
            <div></div>
            </div>
        </div> */}
        <div className="bottomWrapperSectionWrapper">
            <p className="title">Abilities</p>
            <div className="sec-4">
                <Abilities abilities={abilities} loadAbilities={loadAbilities} />
            </div>
        </div>
        <div className="bottomWrapperSectionWrapper">
            <p className="title">Move</p>
            <div className="sec-4">
                <Move move={move} loadMove={loadMove}/>
            </div>
        </div> 
        </div>
    </div>)}</>
    )
}
BottomWrapper.propTypes = {
    pokemonDetail: PropTypes.object,
};

export default React.memo(BottomWrapper)
