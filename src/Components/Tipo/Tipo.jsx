import React from 'react';
import './Tipo.css'

export default function Tipo(props){
    return(
        <div className={"type " + props.type.type.name}>
            <span>{props.type.type.name}</span>
        </div>
    )
}