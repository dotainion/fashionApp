import React from 'react';
import { ImSpinner9 } from 'react-icons/im';


export const Loader = ({isOpen}) =>{
    return(
        <div hidden={!isOpen} className="backgrop">
            <div className="float-center">
                <ImSpinner9 className="icon-spinner"/>
            </div>
        </div>
    )
}