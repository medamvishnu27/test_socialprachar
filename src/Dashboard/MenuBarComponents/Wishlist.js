import React from 'react';
import { useWishlist } from '../../Dashboard/MenuBarComponents/WishListContext';
import emptystate from '../../assets/emptystate.svg';
import OneCard from '../../components/Cards/OneCard';
import { useNavigate } from 'react-router-dom';


const Wishlist = () => {
    const { wishlist, toggleWishlist } = useWishlist();
    const navigate = useNavigate();

    const handleCardTitleClick = (courseID) => {
        navigate(`/details/${courseID}`);
    };

    const handleSaveClick = (card) => {
        toggleWishlist(card);
    };

    return (
        <div className="container-fluid p-3 mb-4">
            <h3>Wishlist</h3>
            <div className="d-flex flex-wrap">
                {wishlist.length === 0 ? (
                    <>
                        <img
                            src={emptystate}
                            alt="emptystate Image"
                            style={{
                                alignSelf: 'center',
                                justifySelf: 'center',
                                height: 'auto',
                                width: '100%',
                            }}
                        />
                        <p style={{ textAlign: 'center' }}>No Data Available in this Section</p>
                    </>
                ) : (
                    wishlist.map((card) => (
                        <OneCard
                            key={card.courseID}
                            card={card}
                            selectedButton="list"
                            handleCardTitleClick={handleCardTitleClick}
                            handleSaveClick={handleSaveClick}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Wishlist;