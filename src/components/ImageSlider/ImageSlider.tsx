import classNames from 'classnames';
import React from 'react';

import styles from './ImageSlider.module.scss';
import ArrowRightIcon from "../icons/ArrowRightIcon";


export interface ImageSliderProps {
    className: string;
    images: string[];
    width: number;
    height: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ className, images, width, height }) => {
    const style = {
        width,
        height
    };

    const [scrollLeft, setScrollLeft] = React.useState(0);

    const onLeftArrowClick = () => {
        setScrollLeft(currentScrollLeft => currentScrollLeft > 0 ? currentScrollLeft - width : currentScrollLeft);
    }

    const onRightArrowClick = () => {
        setScrollLeft(currentScrollLeft => currentScrollLeft < (images.length - 1) * width ? currentScrollLeft + width : currentScrollLeft);
    }

    return (
        <div className={classNames(className, styles['slider'])} style={style}>
            <div className={styles['wrapper']} style={{transform: `translateX(-${scrollLeft}px)`}}>
                {
                    images.map(src => (
                        <div className={styles['image-w']}
                             key={src}
                             style={style}
                        >
                            <img className={styles['image']} src={src} alt=""/>
                        </div>
                    ))
                }
            </div>

            <div className={classNames(styles['arrow'], styles['__left'], scrollLeft <= 0 && styles['__disabled'])}
                 onClick={onLeftArrowClick}
            >
                <ArrowRightIcon className={styles['icon']} />
            </div>

            <div className={classNames(styles['arrow'], styles['__right'], scrollLeft >= (images.length - 1) * width && styles['__disabled'])}
                 onClick={onRightArrowClick}
            >
                <ArrowRightIcon className={styles['icon']} />
            </div>
        </div>
    )
}

export default ImageSlider;