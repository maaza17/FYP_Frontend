import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
    return (
        <div className='cards'>
            <h1>Check out these EPIC Cards!</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem src="/images/unnamed.png" text="Your favourite characters from every era are all here."
                        label='Dragon Ball' path="/shop"
                        />
                        <CardItem src="/images/SWSH6_PC-thumb-1280x458-16623.png" text="Check out the Featured cards from the Chilling Reign Series"
                        label='Pokemon' path="/shop"
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem src="/images/TF_TCG_Facebook_Banner-Bumblebee_1300x539.webp" text="Transformers trading cards! TIL ALL ARE FANS!"
                        label='Transformers' path="/shop"
                        />
                        <CardItem src="/images/splashBanner_yugioh.jpg" text="Browse the latest YuGiOh! Single Trading Cards"
                        label='YuGiOh!' path="/shop"
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
