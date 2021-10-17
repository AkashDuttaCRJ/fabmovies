import React, { useState, createContext, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistMovies, setWishlistMovies] = useState([]);
    const [wishlistShows, setWishlistShows] = useState([]);
    const [firstRender, setFirstRender] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fetchFirstOpen = () => {
            const first = localStorage.getItem("first");
            !first &&  localStorage?.setItem("wishlistMovies", JSON.stringify(wishlistMovies));
            !first && localStorage?.setItem("wishlistShows", JSON.stringify(wishlistShows));    
        }
        fetchFirstOpen();
        fetchFromLocalStorage();
        setFirstRender(false);
        updateFirstOpen()
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        !firstRender && updateLocalStorage();
        // eslint-disable-next-line
    }, [wishlistMovies, wishlistShows])

    const updateFirstOpen = () => {
        localStorage.setItem("first", "not");
    }

    const fetchFromLocalStorage = () => {
        const localStorageMoviesData = JSON.parse(localStorage?.getItem("wishlistMovies"));
        localStorageMoviesData?.length !== 0 ? setWishlistMovies(localStorageMoviesData) : setWishlistMovies([]);
        const localStorageShowsData = JSON.parse(localStorage?.getItem("wishlistShows"));
        localStorageShowsData?.length !== 0 ? setWishlistShows(localStorageShowsData) : setWishlistShows([]);
    }

    const updateLocalStorage = () => {
        localStorage?.setItem("wishlistMovies", JSON.stringify(wishlistMovies));
        localStorage?.setItem("wishlistShows", JSON.stringify(wishlistShows));
    }

    return (
        <WishlistContext.Provider value={{wishlistMovies, setWishlistMovies, wishlistShows, setWishlistShows, menuOpen, setMenuOpen}}>
            {children}
        </WishlistContext.Provider>
    )
}
