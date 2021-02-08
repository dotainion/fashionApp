import React from 'react';
import tools from '../components/Tools';
import './labelTag.css';


export const LabelTag = ({state, text}) =>{
    const mobileShow = (inputState) =>{
        if (!tools.isMobile()){
            return inputState;
        }else return true;
    }
    return(
        <div hidden={!mobileShow(state)} className="label-tag-container">
            <div className="label-tag-text">{text}</div>
        </div>
    )
}