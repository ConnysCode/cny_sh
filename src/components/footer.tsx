import Link from 'next/link';
import type { FC } from 'react';

import { DiscordIcon, GithubIcon } from './icons/logo-icons';

interface IFooterProps {}

const Footer: FC<IFooterProps> = () => {
  return (
    <footer className="fixed bottom-0 left-0 flex w-full items-center justify-center gap-5 bg-background/50 py-5 text-xs backdrop-blur-sm ">
      {/* <Link target="_blank" href="test">
        API
      </Link> */}
      <Link target="_blank" href="https://github.com/ConnysCode/cny_sh">
        Contribute
      </Link>
      <Link
        target="_blank"
        className="aspect-square w-4"
        href="https://github.com/ConnysCode"
      >
        <GithubIcon />
      </Link>
      <Link
        target="_blank"
        className="aspect-square w-4"
        href="https://discord.com/users/524860237979582464"
      >
        <DiscordIcon />
      </Link>
    </footer>
  );
};

export default Footer;
