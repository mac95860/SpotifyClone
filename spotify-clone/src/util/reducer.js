export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    token: null,
}

// state is the what is currently in the datalayer, action is setting the latest state
const reducer = (state, action) => {
    console.log(action);

    switch(action.type) {
        case 'SET_USER':
          //actions > type, [payload]  
            return {
                //keep what is in current state
                ...state,
                user: action.user,
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token:action.token,
            }
        default: 
            return state;
    }
}

export default reducer;