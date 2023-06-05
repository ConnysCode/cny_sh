import type { FC } from 'react';

const HeadingVariants = {
  header: {
    main: 'text-text-light',
    faded: 'header-title text-[105px] -bottom-[29px]',
  },
  dark: {
    main: 'text-text-dark font-medium',
    faded: 'text-text-dark/[.03] text-[85px] -bottom-[21px]',
  },
};

interface IHeadingProps {
  text: string;
  variant: keyof typeof HeadingVariants;
}

const Heading: FC<IHeadingProps> = ({ text, variant }) => {
  return (
    <div
      className={`relative flex h-14 w-full items-center justify-center text-center text-4xl font-normal uppercase tracking-tight ${HeadingVariants[variant].main} `}
    >
      <span>{text}</span>
      <div
        className={`${HeadingVariants[variant].faded} pointer-events-none absolute text-center font-medium`}
      >
        {text}
      </div>
    </div>
  );
};

export default Heading;
