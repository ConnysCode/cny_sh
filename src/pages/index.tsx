import { useRouter } from 'next/router';

import BasePanel from '@/components/base-panel';

const Index = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-1 w-32">{/* <BasePanel>hi</BasePanel> */}</div>
        <div className="col-span-2">
          <BasePanel title="Create a new Redirect">hi</BasePanel>
        </div>
        <div className="col-span-1 w-32" />
      </div>
    </div>
  );
};

export default Index;
