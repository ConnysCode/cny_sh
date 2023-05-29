import { AnimatePresence, motion } from 'framer-motion';
import { find, isEqual, map, toString } from 'lodash';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useState } from 'react';

import BasePanel from '@/components/base-panel';
import CreateRedirectTab from '@/components/tap-pages/create-redirect-tab';

const pages: {
  disabled?: boolean;
  target: string;
  title: string;
  component: ReactNode;
}[] = [
  {
    target: `1`,
    title: `Create Redirect`,
    component: <CreateRedirectTab />,
  },
  {
    disabled: true,
    target: `2`,
    title: `Track Usages`,
    component: (
      <BasePanel title="Create a new Redirect">
        <div className="h-80" />
      </BasePanel>
    ),
  },
];

const Index = () => {
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState<string>(
    toString(pages[0]?.target)
  );

  const handleTabChange = (target: string) => {
    router.push(`/?target=${target}`, undefined, { shallow: true });
    setCurrentTab(target);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-2/5">
        <div className="-mt-24 flex w-full flex-col gap-5">
          <motion.div
            layout
            className="flex flex-row items-center justify-center"
          >
            {map(pages, (page) => (
              <button
                disabled={page.disabled}
                type="button"
                onClick={() => {
                  handleTabChange(page.target);
                }}
                className={`${
                  page.disabled
                    ? `cursor-not-allowed opacity-25`
                    : `hover:bg-black/5`
                } relative px-4 py-2 transition ease-in-out`}
              >
                {page.title}
                <div className="absolute bottom-0 left-0 h-0.5 w-full px-5">
                  <AnimatePresence mode="popLayout">
                    {currentTab === page.target && (
                      <motion.div
                        transition={{ type: 'spring', bounce: 0.05 }}
                        layoutId="tab-bar"
                        className=" h-full w-full rounded-full bg-blue-500"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </button>
            ))}
          </motion.div>
          <div>
            {find(pages, (page) => isEqual(page.target, currentTab))?.component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
