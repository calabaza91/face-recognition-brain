import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt 
                className="Tilt br2 shadow-2"  
                tiltMaxAngleX={40}
                tiltMaxAngleY={40}
                perspective={800}
                scale={1.1}
                transitionSpeed={1500}
                gyroscope={true}
                style={{ height: 100, width: 100 }} 
            >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: "4px"}} src={brain} alt="brain logo"/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;