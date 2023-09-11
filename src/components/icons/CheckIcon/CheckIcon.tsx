import * as React from 'react'
import { IconProps } from '../Icon';
import classNames from "classnames";

const CheckIcon: React.FC<IconProps> = (props) => {
    const iconClass = classNames('custom-icon', '__check', props.className, `__${props.color}-c`);
    return (
    <svg  width="24" height="24" {...props} className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path d="M4 11.6129L9.87755 18L20 7" stroke="fill" strokeWidth="2"/>
    </svg>
    )

}

export default CheckIcon;
