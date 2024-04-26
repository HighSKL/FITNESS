import { RootState } from "@/app/(storage)/store";
import { useSelector } from "react-redux";
import style from './style.module.scss'
import { Lock } from "@/app/(components)/Lock/Lock";
import { useEffect, useState } from "react";

type PropsType = {
    briefCompleted: boolean | undefined;
    setReasonShow: any;
    setActiveModalWindow: any;
}

export default function TrackersBlock(props: PropsType) {

    const trackers = useSelector((state: RootState) => state.mainData.trackers)

    const trackersRender = trackers.map(tracker => {

        const radius = 52;
        const circumference = 2 * Math.PI * radius;

        function setProgress(percent: number) {
            const offset = circumference - percent / 100 * circumference;
            changeProgress(offset)
        }

        const [progress, changeProgress] = useState(circumference)

        useEffect(() => {
            setProgress((tracker.progress.done / tracker.progress.need) * 100)
        }, [])

        return (
            <div className={style.tracker} key={tracker.trackerID} >
                <Lock onClick={() => props.setReasonShow(true)} lockWhere={props.briefCompleted === false}>
                    <div className={style.tracker_content} onClick={() => { props.setActiveModalWindow(tracker.windowType) }}>
                        <div className={style.tracker_icon}>
                            <p>{tracker.icon}</p>
                        </div>
                        <svg className={style["progress-ring"]} width="120" height="120">
                            <circle className={style["progress-ring__circle"]} stroke={"white"} stroke-width="10" cx="60" cy="60" r={radius} fill="transparent"
                                style={{ strokeDasharray: `${circumference} ${circumference}` }}/>
                            <circle className={style["progress-ring__circle"]} stroke={tracker.trackerColor} stroke-width="10" cx="60" cy="60" r={radius} fill="transparent"
                                style={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: progress }} />
                        </svg>


                    </div>
                </Lock>
            </div>
        )

    })

    return (
        <div className={style.trackers_block}>
            <h1 className={style.block_title}>Трекеры и здоровье</h1>
            <div className={style.trackers_container}>
                {trackersRender}
            </div>
        </div>
    );
}