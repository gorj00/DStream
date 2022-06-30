import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client'

export const useTheGraph = () => {


  const GET_USERS = gql`
    query GetUsers{
      users {
        id
        date
        addr
        isLoggedIn
      }
    }
  `;

  const GET_USER = gql`
    query GetUser($id: String!) {
      user(id: $id) {
        id
        date
        addr
        isLoggedIn
      }
    }
  `;

  return {
    useQuery,

    GET_USERS, GET_USER,
  }
}


