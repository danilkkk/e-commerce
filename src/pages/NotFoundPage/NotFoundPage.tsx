import React from 'react';
import Text from 'components/Text';

import styles from './NotFoundPage.module.scss';

const NotFoundPage: React.FC = () => {
    return (
        <div className={styles['text-wrapper']}>
            <Text className={styles.header} tag={'h1'} view={'title'}>
                Упс!
            </Text>

            <Text tag={'h3'}>
                Такой страницы не существует
            </Text>
        </div>
    )
}

export default NotFoundPage;