import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
            <p>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className="center">
                <div className="center form pa4 br3 shadow-5">
                    <input 
                        className="f2 pa2 w-70 center" 
                        type="text" 
                        onChange={onInputChange}
                    />
                    <button 
                        className="w-30 pa2 grow f4 link pv2 dib white bg-light-purple"
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;