const setBottomWrapper = (data) => ({
  type: 'SET_BOTTOM_WRAPPER',
  data,
})

const setRightWrapper = (data) => ({
  type: 'SET_RIGHT_WRAPPER',
  data,
})

const setDetailPokemon = (data) => ({
  type: 'SET_DETAIL_POKEMON',
  data,
})

const setMyPokemon = (data) => ({
  type: 'SET_MY_POKEMON',
  data,
})

const removeMyPokemon = (data) => ({
  type: 'REMOVE_MY_POKEMON',
  data,
})

const getData = async (url) => {
  const response = await fetch(url)
  const datas = await response.json()
  return datas
}

export {
  setBottomWrapper,
  setRightWrapper,
  setDetailPokemon,
  setMyPokemon,
  getData,
  removeMyPokemon
}
