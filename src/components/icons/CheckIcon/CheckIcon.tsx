import classNames from 'classnames';
import * as React from 'react'
import { IconProps } from '../Icon';

import styles from './CheckIcon.module.scss';

const CheckIcon: React.FC<IconProps> = ({className, color, ...props}) => {
    const iconClass = classNames(styles.icon, styles.__check, className, styles[`__${color}-c`]);
    return (
        <svg  {...props} width="24" height="24" className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M4 11.6129L9.87755 18L20 7" stroke="fill" strokeWidth="2"/>
        </svg>
    )
}

export default CheckIcon;
