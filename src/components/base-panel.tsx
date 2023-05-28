import type { FC, ReactNode } from 'react';

interface IBasePanelProps {
  children: ReactNode;
  title?: string;
}

const BasePanel: FC<IBasePanelProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-3 font-nunito shadow-md">
      {title && <p className="text-lg font-semibold opacity-50">{title}</p>}
      {/* <hr /> */}
      {children}
    </div>
  );
};

export default BasePanel;
