const NotAvailable = require('../static/image/not-available.png')
export default function imagePokemon(store) {
  let pokeImage = store.sprites.other.dream_world.front_default

  if (pokeImage === null) {
    const frontDef = store.sprites.front_default
    if (frontDef) {
      pokeImage = frontDef
      return pokeImage
    }
    pokeImage = NotAvailable
    return pokeImage
  }

  return pokeImage
}
