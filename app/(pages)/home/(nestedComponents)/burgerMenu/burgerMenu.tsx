import React from 'react';
import style from './style.module.scss'
import { FaPersonRunning } from "react-icons/fa6";
import { IoWater } from "react-icons/io5";
import { GiWeight } from "react-icons/gi";
import { ImSpoonKnife } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { logOutUser } from '@/app/( RestApi )/api_services/user/service';
import Router from '@/app/Assets/CustomRouter/router';
import { setUserData } from '@/app/(storage)/reducers/userDataReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import Link from 'next/link';


export default function BurgerMenu() {

    const router = new Router()
    const dispatch = useDispatch()

    const logOut = async () => {
        const logout = await logOutUser().then(res => res);
        if (logout.status == 200) {
            dispatch(setUserData(null))
            router.sendUserTo('/sign')
        }
    }

    const isBriefingComplete = useSelector((state: RootState) => (state.userData.user?.iswellcomebriefingcomplete))

    return (
        <div className={style.wrapper}>
            <div className={style["items-container"]}>
                <h1 className={style.logotype}>F</h1>
                {
                    isBriefingComplete &&
                    <div className={style.tools}>
                        <button><Link href={'/active'}><FaPersonRunning /></Link></button>
                        <button><Link href={'/water'}><IoWater /></Link></button>
                        <button><Link href={'/mass'}><GiWeight /></Link></button>
                        <button><Link href={'/food'}><ImSpoonKnife /></Link></button>
                        <button><Link href={'/settings'}><IoMdSettings /></Link></button>
                    </div>
                }

                <button onClick={logOut}><BiLogOut /></button>
            </div>
        </div>
    );
}