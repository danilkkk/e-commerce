import * as React from 'react'
import { IconProps } from '../Icon';
import classNames from 'classnames';
import styles from './ArrowRight.module.scss';

const ArrowRightIcon: React.FC<IconProps> = ({className, color, ...svgProps}) => {
    const iconClass = classNames(styles.icon, className, styles[`__${color}-c`]);

    return (
        <svg width="24" height="24" className={iconClass} {...svgProps} viewBox="0 0 32 32"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
                  stroke="fill" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    )
}

export default ArrowRightIcon;
