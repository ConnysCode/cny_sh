import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

interface ICheckboxProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const Checkbox: FC<ICheckboxProps> = ({ label, ...props }) => {
  return (
    <label className="flex select-none flex-row items-center">
      <input {...props} type="checkbox" className="peer w-0" />
      <div className="mr-2 flex aspect-square h-5 w-5 shrink-0 items-center justify-center rounded-md border border-blue-500 text-xs text-transparent ring-blue-500 transition ease-in-out peer-checked:bg-blue-500 peer-checked:text-white peer-checked:ring-blue-300 peer-focus-within:ring">
        <FontAwesomeIcon icon={faCheck} />
      </div>
      {label}
    </label>
  );
};

export default Checkbox;
