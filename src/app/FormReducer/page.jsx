'use client'

import React, { useReducer } from 'react';

// Estado inicial del formulario
const initialState = {
    name: '',
    age: '',
    address: '',
    hobbies: []
};

// Acciones posibles
const ACTIONS = {
    SET_NAME: 'set_name',
    SET_AGE: 'set_age',
    SET_ADDRESS: 'set_address',
    ADD_HOBBY: 'add_hobby',
    REMOVE_HOBBY: 'remove_hobby'
};

// Reducer para manejar las acciones
function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_NAME:
            return { ...state, name: action.payload };
        case ACTIONS.SET_AGE:
            return { ...state, age: action.payload };
        case ACTIONS.SET_ADDRESS:
            return { ...state, address: action.payload };
        case ACTIONS.ADD_HOBBY:
            return { ...state, hobbies: [...state.hobbies, action.payload] };
        case ACTIONS.REMOVE_HOBBY:
            return { ...state, hobbies: state.hobbies.filter(hobby => hobby !== action.payload) };
        default:
            return state;
    }
}

function UserProfileForm() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleNameChange = (e) => {
        dispatch({ type: ACTIONS.SET_NAME, payload: e.target.value });
    };

    const handleAgeChange = (e) => {
        dispatch({ type: ACTIONS.SET_AGE, payload: e.target.value });
    };

    const handleAddressChange = (e) => {
        dispatch({ type: ACTIONS.SET_ADDRESS, payload: e.target.value });
    };

    const handleAddHobby = () => {
        const newHobby = prompt('Enter a new hobby:');
        if (newHobby) {
            dispatch({ type: ACTIONS.ADD_HOBBY, payload: newHobby });
        }
    };

    const handleRemoveHobby = (hobby) => {
        dispatch({ type: ACTIONS.REMOVE_HOBBY, payload: hobby });
    };

    return (
        <div>
            <h1>User Profile Form</h1>
            <label>
                Name:
                <input type="text" value={state.name} onChange={handleNameChange} />
            </label>
            <br />
            <label>
                Age:
                <input type="number" value={state.age} onChange={handleAgeChange} />
            </label>
            <br />
            <label>
                Address:
                <input type="text" value={state.address} onChange={handleAddressChange} />
            </label>
            <br />
            <button onClick={handleAddHobby}>Add Hobby</button>
            <ul>
                {state.hobbies.map((hobby, index) => (
                    <li key={index}>
                        {hobby}
                        <button onClick={() => handleRemoveHobby(hobby)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserProfileForm;
