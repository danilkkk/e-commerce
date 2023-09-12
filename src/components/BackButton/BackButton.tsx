import classNames from "classnames";
import React from 'react';
import { useNavigate } from "react-router-dom";
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon'
import styles from './BackButton.module.scss';

export interface BackButtonProps {
    className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
    const navigate = useNavigate();
    const onButtonClick = () =>  navigate(-1);

    return (
        <div onClick={onButtonClick} className={classNames(styles['wrapper'], className)}>
            <ArrowRightIcon className={styles['icon']} width={'32'} height={'32'} />
            <Text className={styles['text']} view={'p-20'}>
                Назад
            </Text>
        </div>
    )
}

export default BackButton;
