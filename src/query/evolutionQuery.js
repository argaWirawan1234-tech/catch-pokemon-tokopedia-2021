import { gql } from '@apollo/client'

const evolutionQuery = gql`
query evolutionChain($id: String!) {
    evolutionChain(id: $id) {
      params
      status
      message
      response
    }
  }
`

export default evolutionQuery


