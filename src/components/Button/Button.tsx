import classNames from 'classnames';
import React from 'react';
import Loader from 'components/Loader';
import Text from 'components/Text';

import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

// eslint-disable-next-line react/prop-types
const Button: React.FC<ButtonProps> = ({  children, className, loading, disabled, onClick, ...props}) => {
  const buttonClasses = classNames([
    styles.button,
    className,
    disabled && styles.__disabled,
    loading && styles.__loading,
  ]);

  const onClickWrapper = onClick ? (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(event);
    }
  } : undefined;

  return (
      <button {...props} className={buttonClasses} disabled={disabled || loading} onClick={onClickWrapper}>
        {
          Boolean(loading) && <Loader className={styles['button-loader']} size={'s'} />
        }
        <Text view={'button'}>
          {children}
        </Text>
      </button>
  )
};

export default Button;
