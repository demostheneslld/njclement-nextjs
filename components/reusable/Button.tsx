import { MouseEvent, ReactChild, ReactElement, ReactFragment, ReactPortal } from "react";

export enum ButtonVariants {
  PRIMARY = 'PRIMARY',
  GHOST = 'GHOST',
  SMALL = 'SMALL',
}

const Button = (props: { variants: ButtonVariants[]; type?: "submit", onClick?: (event: React.MouseEvent<HTMLButtonElement>, data: any) => void; onClickData?: any; children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }): ReactElement => {
  const variants = props.variants || [];
  let variantClasses = 'p-2';
  if (variants.includes(ButtonVariants.PRIMARY)) variantClasses = `${variantClasses} bg-primary-500 hover:bg-primary-600 text-gray-200 hover:text-white`;
  if (variants.includes(ButtonVariants.GHOST)) variantClasses = `${variantClasses} hover:text-accent-500`;
  if (variants.includes(ButtonVariants.SMALL)) variantClasses = `${variantClasses} p-.5`;

  return (
    <button onClick={e => props?.onClick ? props.onClick(e, props.onClickData) : null} className={`rounded cursor-pointer ${variantClasses}`}>
      {props.children}
    </button>
  )

}

export default Button;