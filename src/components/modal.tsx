import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import type { FC, ReactNode } from 'react';

import BasePanel from './base-panel';

interface IModalProps {
  open: boolean;
  requestClose?: () => void;
  title: string;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({ children, open, requestClose, title }) => {
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center">
      <AnimatePresence>
        {open && (
          <motion.div
            onClick={requestClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="modal-background"
            transition={{ ease: 'easeInOut' }}
            className="pointer-events-auto fixed left-0 top-0 -z-10 h-full w-full bg-black/75"
          />
        )}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="pointer-events-auto z-10"
            // transition={{ ease: 'easeInOut' }}
            key="modal-close-button"
          >
            <BasePanel title={title}>
              <div className="w-full ">
                {children}
                {requestClose && (
                  <button
                    onClick={requestClose}
                    type="button"
                    className="absolute right-2 top-2 flex aspect-square w-6 items-center justify-center rounded-full border border-transparent bg-white text-xs transition ease-in-out hover:scale-105 hover:border-gray-100 hover:shadow-lg active:scale-95"
                  >
                    <FontAwesomeIcon icon={faX} />
                  </button>
                )}
              </div>
            </BasePanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
