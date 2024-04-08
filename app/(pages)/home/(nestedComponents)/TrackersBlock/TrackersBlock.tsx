import { RootState } from "@/app/(storage)/store";
import { useSelector } from "react-redux";
import style from './style.module.scss'
import { Lock } from "@/app/(components)/Lock/Lock";

type PropsType = {
    briefCompleted: boolean | undefined;
    setReasonShow: any;
    setActiveModalWindow: any;
}

export default function TrackersBlock(props: PropsType) {

    const trackers = useSelector((state: RootState) => state.mainData.trackers)

    const trackersRender = trackers.map(tracker => (
        <div className={style.tracker} key={tracker.trackerID} >
            <Lock onClick={() => props.setReasonShow(true)} lockWhere={props.briefCompleted === false}>
                <div className={style.tracker_content} onClick={() => { props.setActiveModalWindow(tracker.windowType) }}>
                    <div className={style.tracker_icon}>
                        <p>{tracker.icon}</p>
                    </div>
                    <div className={style.progress_bar} style={{ background: `radial-gradient(closest-side, #34363D 79%, transparent 80% 100%),conic-gradient( ${tracker.trackerColor} 75%, white 0)` }}>
                    </div>
                </div>
            </Lock>
        </div>
    ))

    return (
        <div className={style.trackers_block}>
            <h1 className={style.block_title}>Трекеры и здоровье</h1>
            <div className={style.trackers_container}>
                {trackersRender}
            </div>
        </div>
    );
}