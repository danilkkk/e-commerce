import classNames from 'classnames';
import React from 'react';

import Text from 'components/Text';

import styles from './HorizontalCard.module.scss';

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const HorizontalCard: React.FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot }) => {
    return (
        <div className={classNames(styles.card, className)} onClick={onClick}>
            <div className={styles['image-w']}>
                <img src={image} className={styles.image} />
            </div>

            <div className={styles['content-w']}>
                {
                    Boolean(captionSlot) && <Text view={"p-14"} className={styles.caption} color={'secondary'}>{captionSlot}</Text>
                }
                {
                    Boolean(title) && <Text view={"p-20"} className={styles.title}>{title}</Text>
                }
                {
                    Boolean(subtitle) && <Text view={"p-16"} className={styles.subtitle} color={'secondary'}>{subtitle}</Text>
                }

                <div className={styles['footer-w']}>
                    {
                        contentSlot && <Text view={"p-18"} weight={'bold'} className={styles.content}>{contentSlot}</Text>
                    }
                    {
                        Boolean(actionSlot) && actionSlot
                    }
                </div>
            </div>
        </div>
    )
};

export default HorizontalCard;
