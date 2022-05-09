import React from 'react'
import { Link } from 'react-router-dom'
import './Newsletter.css'

function Newsletter() {
    return (
        <div className='newsletter-container'>
            <div className="newsletter-subscription">
                <div className="newsletter__div">
                    <i style={{ color: "white" }} className="fab fa-discord newsletter__icon"></i>
                    <Link className="newsletter-btn" onClick={() => window.open("https://discord.gg/YCgc779Syz", "_blank")}> Join Our Discord </Link>
                </div>
                <div className="newsletter__div" >
                    <i style={{ color: "white" }} className="fa fa-envelope newsletter__icon"></i>
                    <Link
                        className=" newsletter-btn"
                        onClick={(e) => {
                            window.location.href = "mailto:support@tcgfish.com";
                            e.preventDefault();
                        }}
                    >
                        Email Us
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Newsletter
