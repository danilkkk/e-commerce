import * as React from 'react'
import { IconProps } from '../Icon';
import classNames from 'classnames';
import styles from './ArrowDown.module.scss';

const ArrowDownIcon: React.FC<IconProps> = ({ className, color, ...svgProps }) => {
    const iconClass = classNames(styles.icon, className, styles[`__${color}-c`]);

    return (
        <svg width="24" height="24" className={iconClass} {...svgProps} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"/>
        </svg>
    )
}

export default ArrowDownIcon;
