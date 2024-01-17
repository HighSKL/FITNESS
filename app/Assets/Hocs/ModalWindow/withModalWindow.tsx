'use client'
import React, { useRef, useState } from 'react';
import style from './modalWindow.module.scss'
import { Transition } from 'react-transition-group';

type injectedProps = {
    closeWindow: any
}

export default function withModalWindow<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const windowRef = useRef(null)

        const [elementDrag, setElementDrag] = useState(false);

        const [clienty, setclienty] = useState(0)

        const closeWindowHandler = (event: any) => {
            event.preventDefault();
            if (event.target === event.currentTarget)
                props.closeWindow(null);
        }

        const dragEventHandler = (event: any) => {
            setclienty(event.clientY)
            setElementDrag(true)
        }

        const dragEventOverHandler = (event: any) => {
            setElementDrag(false)
            if (clienty > 100) {
                setclienty(700)
                setTimeout(()=>{props.closeWindow(null)},200)
            } else {
                setclienty(0)
            }
        }



        return (
            <div className={style.background} onClick={closeWindowHandler}>

                    
                        <div className={style.window} style={{ top: `${clienty}px`, transition: !elementDrag?'.1s ease':'none'}} ref={windowRef}  >
                            <div className={style['mob-close-window-line']} draggable onDrag={dragEventHandler} onDragEnd={dragEventOverHandler}></div>
                            <WrappedComponent {...props} />
                        </div>
                    
                
            </div>
        );
    }
}