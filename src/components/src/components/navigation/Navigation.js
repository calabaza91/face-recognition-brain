import React from "react";

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn){
        return(
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p 
                    onClick={() => onRouteChange('signOut')}
                    className="f3 link dim black pointer underline pa3"
                >Sign Out</p>
            </nav>
        )
    } else {
        return(
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p 
                    onClick={() => onRouteChange('signIn')}
                    className="f3 link dim black pointer underline pa3"
                >Sign In</p>
                <p 
                    onClick={() => onRouteChange('register')}
                    className="f3 link dim black pointer underline pa3"
                >Register</p>
            </nav>
        )
    }
}

export default Navigation;