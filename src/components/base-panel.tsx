import type { FC, ReactNode } from 'react';

interface IBasePanelProps {
  children: ReactNode;
  title?: string;
}

const BasePanel: FC<IBasePanelProps> = ({ children, title }) => {
  return (
    <div className="relative flex h-full w-full flex-col gap-3 overflow-hidden rounded-md bg-white p-3 font-roboto text-text-dark shadow-md">
      {title && <p className="text-xs">{title}</p>}
      {children}
    </div>
  );
};

export default BasePanel;
