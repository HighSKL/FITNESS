'use client'
import { useState } from 'react';
import style from './modalWindow.module.scss'

type injectedProps = {
    closeWindow: any
}

export default function withModalWindow<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const [elementDrag, setElementDrag] = useState(false);

        const [ClientY, setClientY] = useState(0)

        const closeWindowHandler = (event: any) => {
            event.preventDefault();
            if (event.target === event.currentTarget)
                props.closeWindow(null);
        }

        const dragEventHandler = (event: any) => {
            setClientY(event.clientY)
            setElementDrag(true)
        }

        const dragEventOverHandler = (event: any) => {
            if (ClientY > 100) {
                setClientY(700)
                setTimeout(() => { props.closeWindow(null) }, 200)
            } else
                setClientY(0)
            setElementDrag(false)
        }

        return (
            <div className={style.background} onClick={closeWindowHandler}>
                <div className={style.window} style={{ top: `${ClientY}px`, transition: !elementDrag ? '.1s ease' : 'none' }} draggable onDrag={dragEventHandler} onDragEnd={dragEventOverHandler}>
                    <div className={style['mob-close-window-line']} ></div>
                    <WrappedComponent {...props} />
                </div>
            </div>
        );
    }
}