import type { FC } from 'react';

interface IHeaderProps {}

const Header: FC<IHeaderProps> = () => {
  return (
    <header className="pointer-events-none absolute left-0 top-0 flex w-full items-center justify-center gap-5 py-5 text-xs opacity-25">
      <p>cny.sh</p>
    </header>
  );
};

export default Header;
