import * as React from 'react'
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view, tag = 'p', weight, children, color, maxLines }) => {
    const TagName = tag;

    const style = maxLines
        ? {
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical' as const,
            WebkitLineClamp: maxLines
        }
        : {};

    const textClassNames = classNames(styles.text, styles[`__${view}-view`], styles[`__${color}-c`], styles[`__${weight}-w`], className);

    return (
        <TagName className={textClassNames}
                 style={style}
        >
            {children}
        </TagName>
    )
}

export default Text;
