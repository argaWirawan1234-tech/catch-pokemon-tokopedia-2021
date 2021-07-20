/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useRef } from 'react'

import { useLazyQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton';

import PokemonCard from './PokemonCard'
import pokemonQuery from '../query/pokemonQuery'
import { getData } from '../store/actions/rootAction'
import { setBottomWrapper, setDetailPokemon } from '../store/actions/rootAction'
import '../styles/pokemonList.css'

const GET_POKEMON = pokemonQuery
function PokemonList() {
    const {bottomWrapper} = useSelector((state) => ({
      bottomWrapper: state.bottomWrapper
    }))
    const wrapper = useRef()
    const offsetMore = useRef(0)
    const moreButton = useRef()
    const dispatch = useDispatch()

    const [scrollTop, setScrollTop] = useState(0)
    const [loadingData, setLoadingData] = useState(false)
    const [pokemonData, setPokemonData] =useState([])

    const [getPokemon, { data, fetchMore }] = useLazyQuery(GET_POKEMON)

    const variables = useMemo(() => {
        return {
            variables: {
                limit: 10,
                offset: offsetMore.current,
              }
        }
      }, [offsetMore])

    function seeDetails(x, y) {
      dispatch(setBottomWrapper(!y))
      dispatch(setDetailPokemon(x))
    }

    const MapPokemon = React.memo(
      ({x,  pokemonData}) => {
        return pokemonData.map((item, index) => (
          <div key={String(index)} onClick={() => seeDetails(item, x)}>
            <PokemonCard pokemon={item} />
          </div>
      ))
      },
      [],
    )

    const MapSkeleton = React.memo(
      ({loadingData}) => {
        return loadingData ? Array.from(new Array(10)).map((item, index) => (
          <div key={String(index)} >
            <Skeleton height={80} width={'100%'}/>
          </div>
        )) : <></>
      },
      [],
    )
    function fetchMoreData(){
      offsetMore.current += 10
      setLoadingData(true)
      fetchMore({
        variables:{
          limit: 10,
          offset: offsetMore.current,
        },
        updateQuery: (prevRes, {fetchMoreResult})=>{
          fetchList(fetchMoreResult)
        }
      })
    }

    function fetchList(data) {
      const promise = []
          data.pokemons.results.forEach((x) => {
                promise.push(getData(x.url))  
            })
            Promise.all(promise)
          .then((res) => {
            setLoadingData(false)
            setPokemonData((pokemonData) => pokemonData.concat(res))
          })
          .catch(() => {
            alert('Opss, Get Data Failed')
          })
    }
  
    useEffect(() => {
        setLoadingData(true)
        getPokemon(variables)
        if (data) fetchList(data)
    }, [variables, data])

    useEffect(() => {
      var listWrapper = wrapper.current
      if(listWrapper.clientHeight === listWrapper.scrollHeight) {
        moreButton.current.style.display = 'flex'
      } else {
        moreButton.current.style.display = 'none'
      }
      
      function handleScroll(){
        setScrollTop(listWrapper.scrollTop)
        if(Math.ceil(listWrapper.clientHeight + listWrapper.scrollTop) >= listWrapper.scrollHeight){
          fetchMoreData()
        }
      }

      listWrapper.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        listWrapper.removeEventListener("scroll", handleScroll);
      }
    }, [scrollTop])

    return (
        <div ref={wrapper} className="pokemonList">
            <MapPokemon x={bottomWrapper} pokemonData={pokemonData} />
            <MapSkeleton loadingData={loadingData} />
            <div ref={moreButton} className="moreButton" onClick={() => fetchMoreData()}>
              Load More
            </div>
        </div>
    )
}
export default React.memo(PokemonList)