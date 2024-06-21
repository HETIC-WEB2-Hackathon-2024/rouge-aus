import React, { useEffect, useReducer, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { authenticatedPost } from "../auth/helper.ts";

type AppState = {
    user: object | null;
    token: string | null;
};

type User = object | null;

type Action =
    | { type: 'SET_USER'; payload: User }
    | { type: 'SET_TOKEN'; payload: string | null };


type AppContextProps = {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<AppState>>;
};



const initialState: AppState = {
    user: null,
    token: null,
};

export const AuthContext = React.createContext<AppContextProps | undefined>(undefined);

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

function authReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        default:
            return state;
    }
}
type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, setState] = useState<AppState>({
        user: null,
        token: null,
    });


    return (
        <AuthContext.Provider value={{ state,setState }}>
            {children}
        </AuthContext.Provider>
    );
}
