import React from 'react';


export const VenderLocation = ({hidden,cssClass,style,country,city,address,email,number}) =>{
    return(
        <div hidden={hidden} className={`pad-xl service-address-text ${cssClass}`} style={style}>
            <div className="teal" style={{marginBottom:"10px"}}><b>Location of service</b></div>
            <label className="block">{country}</label>
            <label className="block">{city}</label>
            <label className="block">{address}</label>
            <label className="block">{email}</label>
            <label className="block">{number}</label>
        </div>
    )
}