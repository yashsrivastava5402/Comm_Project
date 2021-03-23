import React, {createContext, useReducer} from 'react';
import {UserReducer} from '../reducers/UserReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [User,
        dispatch] = useReducer(UserReducer, {
        username: {},
        email: {},
        password: {},
        NativeLanguage: {},
        LearningLanguage: {},
        CreatedAt: {},
        UpdatedAt: {}
    });
    return (
        <UserContext.Provider
            value={{
            User,
            dispatch
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;