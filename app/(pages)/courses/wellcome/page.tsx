'use client'
import React from 'react';
import style from '../style.module.scss'
import { compose } from 'redux';
import withAuth from '@/app/Assets/Hocs/withAuth';

function Wellcome() {
    return (
        <div>
            
        </div>
    );
}

export default compose(withAuth)(Wellcome)