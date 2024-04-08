import { useSelector } from 'react-redux';
import style from './style.module.scss';
import { RootState } from '@/app/(storage)/store';
import Router from '@/app/Assets/CustomRouter/router';

function CoursesBlock() {

    const router = new Router()

    const courses = useSelector((state: RootState) => state.mainData.courses )

    const coursesRender = courses.available.map(course => (
        <div className={style.course} key={course.id} onClick={() => router.sendUserTo(course.link)} style={{backgroundImage: "url("+course.bgImg+")"}}>
            <h3 className={style['course-title']} style={{background: course.bgColor}}>{course.name}</h3>
        </div>
    ))

    return (
        <div className={style['courses']}>
            <h1 className={style.block_title}>Важное и интересное</h1>
            <div className={style['courses-container']}>
                {coursesRender}
            </div>
            <button className={style['show-more-btn']}>Показать больше курсов</button>
        </div>
    );
}

export default CoursesBlock;