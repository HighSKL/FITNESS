'use client'
import { useState } from 'react';
import style from './modalWindow.module.scss'

type injectedProps = {
    closeWindow: any
}

export default function withModalWindow<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const [windowClose, setWindowClose] = useState(false)

        const closeWindowHandler = (event: any) => {
            event.preventDefault();
            if (event.target === event.currentTarget){
                setWindowClose(true);
                setTimeout(()=>props.closeWindow(null), 200)
            }
        }

        return (
            <div className={style.background} onClick={closeWindowHandler}>
                <div className={style.window} style={{bottom:windowClose?'-100vh':'0'}}>
                    <div className={style['mob-close-window-line']} onClick={closeWindowHandler} ></div>
                    <WrappedComponent {...props} />
                </div>
            </div>
        );
    }
}