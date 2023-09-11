import classNames from "classnames";
import React from 'react';
import CheckIcon from 'components/icons/CheckIcon';

import styles from './CheckBox.module.scss'

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  const { onChange, className, checked, disabled } = props;

  const [isChecked, setIsChecked] = React.useState<boolean>(checked ?? false);

  React.useEffect(() => {
    setIsChecked(checked ?? false);
  }, [checked]);

  const onChangeWrapper = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = target.checked;
    setIsChecked(newValue);
    onChange(newValue);
  }

  const checkboxClassNames = classNames([
    styles['checkbox-w'],
    className,
    disabled && styles.__disabled
  ]);

  return (
      <div className={checkboxClassNames}>
        {
            isChecked
            && <CheckIcon className={styles.icon}
                          width={40}
                          height={40}
            />
        }
        <input {...props}
               className={styles.checkbox}
               type="checkbox"
               checked={isChecked}
               onChange={onChangeWrapper}
        />
      </div>
  )
  
};

export default CheckBox;
