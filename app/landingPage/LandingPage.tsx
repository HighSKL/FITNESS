import React from 'react';
import style from './landingPage.module.scss'
import HeaderBlock from './HeaderBlock/HeaderBlock';
import AdvantagesBlock from './AdvantagesBlock/AdvantagesBlock';
import CategoryBlock from './CategoryBlock/CategoryBlock';
import CalculatorBlock from './CalculatorBlock/CalculatorBlock';
import FooterBlock from './FooterBlock/FooterBlock';
import MotivationBlock from './MotivationBlock/MotivationBlock';

export default function LandingPage() {
    return (
        <div className={style.wrapper}>
            <HeaderBlock />
            <AdvantagesBlock />
            <CategoryBlock />
            <CalculatorBlock /> 
            <MotivationBlock />
            <FooterBlock />
        </div>
    );
}