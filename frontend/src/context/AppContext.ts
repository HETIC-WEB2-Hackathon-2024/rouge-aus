import React from "react";

type AppState = {
    offres: Offre[];
    user: any[];
};

type AppContext = {
    state: AppState;
    dispatch: React.Dispatch<Action>;
};

export function markOffre(offre: Offre) {
    return { type: "MARK_OFFRE", payload: offre };
}

export function setUserInfos(user: any) {
    return { type: "SET_USER_INFOS", payload: user };
}

type Action = ReturnType<typeof markOffre>;

export const initialState: AppState = {
    offres: [],
    user: [],
};

export function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case "MARK_OFFRE": {
            const offreUpdated = { ...action.payload, isMarqued: true };
            return { offres: [...state.offres, offreUpdated] };
        }
        case "SET_USER_INFOS": {
            return {...state, user:action.payload};
        }
        default:
            return state;
    }
}

export const AppContext = React.createContext<AppContext>({
    state: initialState,
    dispatch: () => {},
});
export function useAppContext() {
    return React.useContext(AppContext);
}