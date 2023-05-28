import { AnimatePresence, motion } from 'framer-motion';
import { find, isEqual, map } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BasePanel from '@/components/base-panel';

const pages = [
  {
    target: `1`,
    title: `Create Redirect`,
    component: <BasePanel title="Create a new Redirect">hi</BasePanel>,
  },
  {
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

  const [currentTab, setCurrentTab] = useState<string>(pages[0]?.target);

  const handleTabChange = (target: string) => {
    router.push(`/?target=${target}`, undefined, { shallow: true });
    setCurrentTab(target);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <motion.div
        initial={{ z: 500, opacity: 0 }}
        animate={{ z: 0, opacity: 1 }}
      >
        <div className="flex flex-col gap-5">
          <motion.div
            layout
            className="flex flex-row items-center justify-center"
          >
            {map(pages, (page) => (
              <button
                type="button"
                onClick={() => {
                  handleTabChange(page.target);
                }}
                className="relative px-4 py-2 transition ease-in-out hover:bg-black/5"
              >
                {page.title}
                <div className="absolute bottom-0 left-0 h-0.5 w-full px-5">
                  <AnimatePresence mode="popLayout">
                    {router.query.target === page.target && (
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
          <AnimatePresence mode="wait">
            <motion.div
              transition={{ duration: 0.25 }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `auto`, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              key={`page-${currentTab}`}
            >
              {
                find(pages, (page) => isEqual(page.target, currentTab))
                  ?.component
              }
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
