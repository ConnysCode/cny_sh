import {
  faFileClipboard,
  faGear,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { callCreateRedirect } from '@/api/routes/create';

import BasePanel from '../base-panel';
import Button from '../button';
import Checkbox from '../checkbox';
import Modal from '../modal';

interface ICreateRedirectTabProps {}

type FormInputs = {
  url: string;
};

const CreateRedirectTab: FC<ICreateRedirectTabProps> = () => {
  const [sent, setSent] = useState(false);
  const [settings, setSettings] = useState<{ whitespaced: boolean }>({
    whitespaced: false,
  });
  const [createdRedirect, setCreatedRedirect] = useState<string | undefined>();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'all' });

  const debouncedCreateRedirect = async (data: FormInputs) => {
    const res = await callCreateRedirect({
      url: data.url,
      is_whitespaced: settings.whitespaced,
    });
    if (res.data.success) {
      setCreatedRedirect(`${process.env.DOMAIN}/${res.data.content.key}`);
      setSent(true);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    debouncedCreateRedirect(data);
  };
  return (
    <div className="flex h-full w-full flex-col items-center">
      <BasePanel>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col">
            <div className="flex flex-row gap-3">
              <input
                placeholder="https://cny.sh/"
                {...register('url', {
                  required: `An URL is required to use this tool.`,
                  pattern: {
                    value: /^(https:\/\/)/,
                    global: true,
                    multiline: true,
                    message: `A secure (https://) URL is required to use this tool.`,
                  },
                  onChange() {
                    setSent(false);
                    setCreatedRedirect(undefined);
                  },
                })}
                type="url"
                className="h-10 w-full rounded-md border bg-white px-3 !outline-none ring-blue-500 transition ease-in-out focus-within:ring-2 hover:ring-1 hover:focus-within:ring-2"
              />
              <Button
                type={sent ? `button` : `submit`}
                onClick={() => {
                  if (sent && createdRedirect)
                    navigator.clipboard.writeText(createdRedirect);
                }}
                className={`${sent ? `text-green-500` : ``}`}
              >
                <span>
                  <FontAwesomeIcon
                    icon={sent && createdRedirect ? faFileClipboard : faLink}
                  />
                </span>
              </Button>
              <Button
                disabled={sent}
                onClick={() => {
                  setSettingsOpen(true);
                }}
              >
                <span>
                  <FontAwesomeIcon icon={faGear} />
                </span>
              </Button>
            </div>
            <AnimatePresence mode="wait">
              {errors.url && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: `auto`, opacity: 1, marginTop: 20 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                >
                  <li className="text-xs text-red-500">{errors.url.message}</li>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </BasePanel>
      <AnimatePresence mode="wait">
        {sent && createdRedirect && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: `auto`, opacity: 1, marginTop: 20 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
          >
            <BasePanel>
              <span className="text-xs">
                Created redirect:{' '}
                <Link
                  className="inline-block text-blue-500 transition ease-in-out hover:-translate-y-0.5"
                  target="_blank"
                  href={createdRedirect}
                >
                  {createdRedirect}
                </Link>
              </span>
            </BasePanel>
          </motion.div>
        )}
      </AnimatePresence>
      <Modal
        open={settingsOpen}
        requestClose={() => {
          setSettingsOpen(false);
        }}
        title="Advanced Settings"
      >
        <Checkbox
          checked={settings.whitespaced}
          onChange={(e) => {
            setSettings({ ...settings, whitespaced: e.target.checked });
          }}
          label="Use zero width characters (Hard to copy / keep track of)"
        />
      </Modal>
    </div>
  );
};

export default CreateRedirectTab;
