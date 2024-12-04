import { ReactElement } from "react";

export enum ButtonVariants {
  PRIMARY = 'PRIMARY',
  GHOST = 'GHOST',
  SMALL= 'SMALL',
}

interface ButtonProps<T = void> extends React.PropsWithChildren {
  variants: ButtonVariants[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>, data: T) => void;
  onClickData?: T;
}

const Button = <T = void>(props: ButtonProps<T>): ReactElement => {
  const variants = props.variants || [];
  let variantClasses = 'px-4 py-2';
  if (variants.includes(ButtonVariants.PRIMARY)) variantClasses = `${variantClasses} bg-primary-500 hover:bg-primary-600 text-gray-200 hover:text-white`;
  if (variants.includes(ButtonVariants.GHOST)) variantClasses = `${variantClasses} hover:bg-white hover:text-accent-800`;
  if (variants.includes(ButtonVariants.SMALL)) variantClasses = `${variantClasses} px-2 py-1`;

    return (
      <button onClick={e => props.onClick(e, props.onClickData as T)} className={`rounded cursor-pointer ${variantClasses}`}>
        {props.children}
      </button>
    )
}

export default Button;