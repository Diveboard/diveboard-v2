import React, {FC} from 'react';
import styles from '../CommonInput/styles.module.scss';
import { Icon } from '../../Icons/Icon';

type Props = {
    padding?: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    inputError?: string;
    setInputError?: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
    iconName?: string;
    disabled?: boolean
    height?: number;
    width?: number
};

export const FormInput: FC<Props> = ({
                                     value,
                                     setValue,
                                     inputError,
                                     setInputError,
                                     placeholder,
                                     iconName,
                                     disabled,
                                     height,
                                     width
                                 }) => {
    const getInputStyle = (errorValue: string) => {
        if (errorValue) {
            return `${styles.input} ${styles.error}`;
        }
        return styles.input;
    };

    const inputStyle = {
        padding: `16px 16px 16px ${iconName ? '52px' : '16px'}`,
        height: `${height}px`,
        width: `${width}px`
    }

    return (
        <>
            <div className={styles.inputWrapper}>
                <input
                    style={inputStyle}
                    value={value}
                    onChange={(event) => {
                        setValue(+(event.target.value))
                        if (setInputError) {
                            setInputError('');
                        }
                    }}
                    className={getInputStyle(inputError)}
                    placeholder={placeholder}
                    disabled={disabled}

                />
                {inputError && <span className={styles.errorTextForm}>{inputError}</span>}

                {iconName && (
                    <div className={styles.icon}>
                        <Icon iconName={iconName}/>
                    </div>
                )}
            </div>

        </>
    );
};
