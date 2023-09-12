import React from 'react';
import Text from 'components/Text';
import styles from './TextWithTitle.module.scss';

export interface TextWithTitleProps {
    title: string;
    text: string;
}

const TextWithTitle: React.FC<TextWithTitleProps> = ({ title, text }) => (
    <div className={styles['wrapper']}>
        <Text className={styles.title}
              view={'title'}
        >
            { title }
        </Text>

        <Text className={styles.text}
              color={'secondary'}
              view={'p-20'}
        >
            { text }
        </Text>
    </div>
);

export default TextWithTitle;