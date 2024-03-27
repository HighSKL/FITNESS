import { ReactNode, useEffect, useRef, useState } from 'react';
import style from './style.module.scss'
import { FaLock } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";


export function Lock({
    children, onClick, lockWhere
}: {
    children: ReactNode,
    onClick: any,
    lockWhere: any
}) {
    return (
        <>
            <div className={style['lock-wrapper']} style={{display: lockWhere?'flex':'none'}} onClick={() => onClick()}>
                <p><FaLock /></p>
            </div>
            {children}
        </>
    );
}

export function ShowReason({ reason, hideWindow }: { reason: string, hideWindow: any }) {

    const ref = useRef<any>(null)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(ref){
                ref.current.style.bottom = '-30vh'
                setTimeout(()=>{
                    hideWindow()
                }, 300)
            }
        }, 2000)
        return ()=>{
            clearTimeout(timer)
        }
    })

    return (
        <div className={style['reason-wrapper']} ref={ref}>
            <div className={style['title']}>
                <IoIosInformationCircleOutline className={style.icon} />
                <p>Внимание</p>
            </div>
            <p className={style['description']}>{reason}</p>
        </div>
    )
}