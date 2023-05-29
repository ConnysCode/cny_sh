import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const Button: FC<IButtonProps> = ({ ...props }) => {
  return (
    <button
      {...props}
      // eslint-disable-next-line react/button-has-type
      type={props.type || `button`}
      className={`aspect-square w-10 shrink-0 !overflow-hidden rounded-md border bg-white ring-blue-500 transition ease-in-out hover:border-blue-500 active:scale-105 active:ring ${
        props.disabled ? `pointer-events-none opacity-50 saturate-0` : ``
      } ${props.className || ``}`}
    >
      <span>{props.children}</span>
    </button>
  );
};

export default Button;
