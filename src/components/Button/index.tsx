import * as React from 'react';
import './styles.scss';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'primary' | 'secondary' | 'disabled';
    customClassName?: string;
    status: boolean;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const { color, customClassName, status, ...btnProps } = props;
    // Disable button feature here
    return (
        <button disabled={status} className={`btn btn--${color} ${customClassName || ''}`} {...btnProps} >
            {props.children}
        </button>
    );
};
