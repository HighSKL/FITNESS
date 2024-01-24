import React from 'react';
import style from './style.module.scss'
import CSS from 'csstype';

type PropsType = {
    width?: string
    height?: string
    borderRadius?: string
    style?: CSS.Properties
    className?: string
}

function ComponentPreloader(props: PropsType) {
    return (
        <div style={props.style?props.style:{}} className={props.className?props.className:''}>
            <div className={style.wrapper} style={{
                width: props.width?props.width:'100px', 
                height: props.height?props.height:'20px',
                borderRadius: props.borderRadius?props.borderRadius:'0px'
            }}>
                <div className={style['load-line']}></div>
            </div>
        </div>
    );
}

export default ComponentPreloader;