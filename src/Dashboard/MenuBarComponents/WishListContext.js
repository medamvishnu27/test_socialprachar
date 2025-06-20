import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../../firebase';


const WishListContext = createContext();

const WishListProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const user = auth.currentUser;

    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (card) => {
        if (user) {
            setWishlist((prevWishlist) => [...prevWishlist, card]);
        } else {
            // Handle the case where the user is not logged in (e.g., show a message)
            alert("Please log in to add items to your wishlist.");
        }
    };

    const removeFromWishlist = (courseID) => {
        setWishlist((prevWishlist) => prevWishlist.filter((card) => card.courseID !== courseID));
    };

    const toggleWishlist = (card) => {
        const isCardInWishlist = wishlist.some((wishlistCard) => wishlistCard.courseID === card.courseID);
        if (isCardInWishlist) {
            removeFromWishlist(card.courseID);
        } else {
            addToWishlist(card);
        }
    };

    return (
        <WishListContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist }}>
            {children}
        </WishListContext.Provider>
    );
};

export { WishListProvider, WishListContext };

// Custom hook to use the wishlist context easily
export const useWishlist = () => useContext(WishListContext);
