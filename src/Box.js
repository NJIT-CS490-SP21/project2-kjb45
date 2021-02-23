import React from 'react';
import './Board.css';


export function Box(props){
    return<div className="box" onClick={props.onClick}>{}</div>;
    
}

