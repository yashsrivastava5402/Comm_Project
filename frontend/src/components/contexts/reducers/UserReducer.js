import React from 'react'


export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, {
        username: action.User.username, 
        email:action.User.email,
        password:action.User.password,

        }
      ]
    case 'REMOVE_BOOK':
      return state.filter(book => book.id !== action.id);
    default:
      return state;
  }
}