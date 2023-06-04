import type { FC } from 'react';

interface IHeaderProps {}

const Header: FC<IHeaderProps> = () => {
  return (
    <header className="fixed left-0 top-0 flex w-full items-center justify-center gap-5 border-b bg-background/50 py-5 text-xs backdrop-blur-sm md:border-b-transparent ">
      <p className="text-black/25">cny.sh</p>
    </header>
  );
};

export default Header;
