import classNames from 'classnames';
import React from 'react';
import Text from 'components/Text';
import styles from './HeaderCounter.module.scss';

export interface HeaderCounterProps {
    className?: string;
    title: string;
    count: number;
}

const HeaderCounter: React.FC<HeaderCounterProps> = ({ className, title, count }) => {
    return (
        <div className={classNames(className, styles['wrapper'])}>
            <Text view={'title'}>{title}</Text>
            <Text className={styles['count']} view={'p-20'} color={'accent'}>{count}</Text>
        </div>
    )
}

export default HeaderCounter;