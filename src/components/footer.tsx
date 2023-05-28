import Link from 'next/link';
import type { FC } from 'react';

import { DiscordIcon, GithubIcon } from './icons/logo-icons';

interface IFooterProps {}

const Footer: FC<IFooterProps> = () => {
  return (
    <footer className="absolute bottom-0 left-0 flex w-full items-center justify-center gap-5 text-xs py-5 ">
      <Link target="_blank" href="test">
        API
      </Link>
      <Link target="_blank" href="test">
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
