import React from 'react';
import style from './footerBlock.module.scss'

export default function FooterBlock() {
    return (
        <footer>
            <div className={style.wrapper}>
                <p className={style.description}>
                    Приложение выполняет роль ассистента, не&nbsp;стоит полагаться на&nbsp;предлагаемые данные. 
                    Запрещается ставить данные из&nbsp;приложения превыше медицинских рекомендаций. Не&nbsp;рекомендуем
                    полагаться на&nbsp;созданным приложением планы и&nbsp;цели если это может как-то навредить вам
                    или&nbsp;же противоречить показаниям мед. работников. Рекомендуется&nbsp;использовать приложение в&nbsp;
                    ознакомительных целях. Приложение не&nbsp;несет цели нарушить чьи либо авторские права. 
                    Все совпадения случайны.
                </p>
            </div>
        </footer>
    );
}