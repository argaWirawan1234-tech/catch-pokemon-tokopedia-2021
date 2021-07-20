const initialState = {
  pokemonDetail: null,
  bottomWrapper: false,
  rightWrapper: false,
  myPokemon: [],
  test:false
}

function rootReducer(state = initialState, action) {
  console.log(action.type, action.data)
  switch (action.type) {
    case 'SET_MY_POKEMON':
      return {
        ...state,
        myPokemon: [...state.myPokemon, action.data],
      }
    case 'REMOVE_MY_POKEMON':
      return {
        ...state,
        myPokemon: state.myPokemon.filter(x => x.id !== action.data),
      }
    case 'SET_DETAIL_POKEMON':
      return {
        ...state,
        pokemonDetail: action.data,
      }
      case 'SET_BOTTOM_WRAPPER':
      return {
        ...state,
        bottomWrapper: action.data,
      }
      case 'SET_RIGHT_WRAPPER':
      return {
        ...state,
        rightWrapper: action.data,
      }
      case 'TEST':
      return {
        ...state,
        test: action.data,
      }
    default:
      return state
  }
}
export default rootReducer
