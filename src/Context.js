import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./Reducer";

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
    isLoading : true,
    query: "",
    nbPages: 0,
    page: 0,
    hits: [],
};

// create Context 

const AppContext = React.createContext();

// to create a provider function 

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchApiData = async (url) => {

        dispatch({ Type: "SET_LOADING" });

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            dispatch({
                type: 'GET_STORIES',
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                }
            });
            // isLoading = false;
        } catch (error) {
            console.log(error);
        }
    };

    // remove post
    const removePost = (post_ID) => {
        dispatch({
            type: "REMOVE_POST",
            payload: post_ID
        })
    }

    // search post
    const searchPost = (searchQuery) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: searchQuery,
        });
    };
    
    // next page
    const getNextPage = () => {
        dispatch({
            type: "NEXT_PAGE",
        });
    };
    
    // previous page
    const getPrevPage = () => {
        dispatch({
            type: "PREV_PAGE",
        });
    };
    
    // call api function
    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query, state.page]);

    return (
        <AppContext.Provider value={{ ...state, removePost, searchPost, getPrevPage, getNextPage }}>
            {children}
        </AppContext.Provider>
    );
};

// create custom hook

const useGlobalContext = () => {
    return useContext(AppContext);
}


export { AppContext, AppProvider, useGlobalContext };