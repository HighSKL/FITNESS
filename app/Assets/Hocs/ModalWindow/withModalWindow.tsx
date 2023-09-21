'use client'
import React from 'react';
import style from './modalWindow.module.scss'

type injectedProps = {
    closeWindow: any
}

export default function withModalWindow<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const closeWindowHandler = (event: any) => {
            event.preventDefault();
            if (event.target === event.currentTarget)
                props.closeWindow(null);
        }

        return (
            <div className={style.background} onClick={closeWindowHandler}>
                <div className={style.window}>
                    <WrappedComponent {...props} />
                </div>
            </div>
        );
    }
}