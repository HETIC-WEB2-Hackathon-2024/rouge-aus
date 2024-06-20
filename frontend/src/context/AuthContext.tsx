import React, {useReducer} from "react";
import {markOffre} from "./OffreContext.tsx";

type AppState = {
    user: object;
    token: any
};

type User = any;
type Action = any;


type AppContext = {
    state: AppState;
    dispatch: React.Dispatch<Action>;
};

export function setUserInfos(user: User) {
    return { type: "SET_USER_INFOS", payload: user };
}

export function setToken(token: string) {
    return { type: "SET_TOKEN", payload: token };
}


export const initialState: AppState = {
    user: {},
    token: null
};

export function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case "SET_USER_INFOS": {
            return {...state, user:action.payload};
        }
        case "SET_TOKEN": {
            return {...state, token: action.payload};
        }
        default:
            return state;
    }
}

export const AuthContext = React.createContext<AppContext>({
    state: initialState,
    dispatch: () => {},
});

export function useAuth() {
    const context = React.useContext(AuthContext);
    if(!context){
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
}


export function AuthProvider({ children }: any) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}
