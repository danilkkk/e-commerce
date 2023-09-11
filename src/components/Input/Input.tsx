import classNames from 'classnames';
import React from 'react';

import styles from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, onFocus, onBlur, value, afterSlot, ...props }, ref) => {

    const [inputValue, setInputValue] = React.useState(value);
    const [isFocused, setFocusState] = React.useState(false);

      React.useEffect(() => {
          setInputValue(value);
      }, [value]);

    const onChangeWrapper = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = target.value;
        setInputValue(newValue)
        onChange(newValue);
    }

    const onFocusWrapper = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocusState(true);
        if (onFocus) {
            onFocus(event);
        }
    };
    const onBlurWrapper = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocusState(false);
        if (onBlur) {
            onBlur(event);
        }
    };

    const inputClassNames = classNames([
        styles['input-w'],
        className,
        afterSlot && styles['__with-icon'],
        !inputValue && styles['__empty'],
        isFocused && styles['__focus']
    ]);

    return (
        <div className={inputClassNames}>
            <input className={styles['input']}
                   {...props}
                   type={"text"}
                   ref={ref}
                   value={inputValue}
                   onChange={onChangeWrapper}
                   onFocus={onFocusWrapper}
                   onBlur={onBlurWrapper}
            />

            {
                Boolean(afterSlot) && <div className={styles['slot-w']}>{afterSlot}</div>
            }
        </div>
    )
  });

export default Input;
