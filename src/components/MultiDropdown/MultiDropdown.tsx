import classNames from "classnames";
import React from 'react';
import Input from 'components/Input';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';

import styles from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
  const wrapperClassNames = classNames(styles['select-w'], 'js-select-wrapper', className);

  const [displayedOptions, setDisplayed] = React.useState<Option[]>(options);
  const [selectedOptions, setSelected] = React.useState<Option[]>(value);
  const [isDropdownOpened, setIsDropdownOpened] = React.useState<boolean>(false);

  React.useEffect(() => setSelected(value), [value]);

  React.useEffect(() => {
    setSelected(value);
    setDisplayed(options);
  }, [options]);

  React.useEffect(() => {
    const handleOuterClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest('.js-select-wrapper')) {
        setIsDropdownOpened(false);
      }
    }
    window.addEventListener('click', handleOuterClick);

    return () => {
      window.removeEventListener('click', handleOuterClick);
    }
  }, [])

  const onInputChange = (value: string) => {
    if (value) {
      return setDisplayed(options.filter(option => option.value.startsWith(value)))
    }
    setDisplayed([...options]);
  }

  const openDropdown = () => setIsDropdownOpened(!disabled);

  const handleOptionClick = (option: Option) => {
    const indexOfOption = selectedOptions.indexOf(option);

    let selectedValues;

    if (indexOfOption !== -1) {
      selectedValues = [...selectedOptions.slice(0, indexOfOption), ...selectedOptions.slice(indexOfOption + 1)];
      onChange(selectedValues);
    } else {
      selectedValues = [...selectedOptions, option];
      onChange([option]);
    }

    console.log(selectedValues);

    setSelected(selectedValues);
  }

  const [title, setTitle] = React.useState(getTitle(selectedOptions));

  const isSelected = (option: Option, options: Option[]) => options.includes(option);

  React.useEffect(() => {
    setTitle(getTitle(selectedOptions));
  }, [selectedOptions])

  const arrowDown = <ArrowDownIcon className={styles['open-dropdown']}/>;

  return (
      <div className={wrapperClassNames}>
        <Input className={styles['input']}
               value={selectedOptions.length ? title : ''}
               placeholder={!selectedOptions.length ? title : ''}
               onClick={openDropdown}
               onChange={onInputChange}
               afterSlot={arrowDown}
        />
        {
          !disabled && isDropdownOpened && (
                <div className={styles['dropdown-w']}>
                  {displayedOptions.map((option) => (
                      <div className={classNames(styles['option'], 'js-option')}
                           key={option.key}
                           onClick={() => handleOptionClick(option)}
                      >
                        <Text className={styles['option-text']}
                              view={"p-16"}
                              color={isSelected(option, selectedOptions) ? "accent" : undefined}
                        >
                          {option.value}
                        </Text>
                      </div>
                  ))}
                </div>
            )
        }
      </div>
  )
};

export default MultiDropdown;
