import {
  faDisplay,
  faFileClipboard,
  faGear,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { debounce, isUndefined } from 'lodash';
import Link from 'next/link';
import type { OgObjectInteral } from 'open-graph-scraper/dist/lib/types';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { callCreateRedirect } from '@/api/routes/create';
import { callScrapeTags } from '@/api/routes/scrape-tags';
import type { ICustomOPG } from '@/interfaces/custom-opg';

import BasePanel from '../base-panel';
import Button from '../button';
import Checkbox from '../checkbox';
import DiscordEmbed from '../embed-previews/discord-embed';
import TwitterEmbed from '../embed-previews/twitter-embed';
import Modal from '../modal';

interface ICreateRedirectTabProps {}

type RedirectFormInputs = {
  url: string;
};

const CreateRedirectTab: FC<ICreateRedirectTabProps> = () => {
  const [sent, setSent] = useState(false);
  const [settings, setSettings] = useState<{ whitespaced: boolean }>({
    whitespaced: false,
  });
  const [createdRedirect, setCreatedRedirect] = useState<string | undefined>();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [embedEditorOpen, setEmbedEditorOpen] = useState(false);

  const [opgTags, setOpgTags] = useState<OgObjectInteral | undefined>();
  const [customOPGTags, setCustomOPGTags] = useState<ICustomOPG | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RedirectFormInputs>({ mode: 'all' });

  const url = watch('url');

  const createRedirect = async (data: RedirectFormInputs) => {
    const res = await callCreateRedirect({
      url: data.url,
      opg: customOPGTags || undefined,
      is_whitespaced: settings.whitespaced,
    });
    if (res.data.success) {
      setCreatedRedirect(`${process.env.DOMAIN}/${res.data.content.key}`);
      setSent(true);
    }
  };

  const getScrapeMetaTags = async (domain: string) => {
    try {
      const opg = await callScrapeTags(domain);
      if (!opg.data.success) return;
      setOpgTags(opg.data.content);
    } catch (error) {
      setOpgTags(undefined);
    }
  };

  const debouncedGetScrapeMetaTags = useCallback(
    debounce(getScrapeMetaTags, 250),
    []
  );

  useEffect(() => {
    if (!url) return;
    debouncedGetScrapeMetaTags(url);
  }, [url, debouncedGetScrapeMetaTags]);

  const onSubmitRedirect: SubmitHandler<RedirectFormInputs> = (data) => {
    createRedirect(data);
  };

  return (
    <div className="m-auto flex h-full w-full flex-col items-center gap-5">
      <div className="flex w-4/5 flex-col items-center lg:w-2/5">
        <BasePanel>
          <form onSubmit={handleSubmit(onSubmitRedirect)}>
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
                <Button
                  disabled={isUndefined(opgTags) || sent}
                  onClick={() => {
                    setEmbedEditorOpen(true);
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faDisplay} />
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
                    <li className="text-xs text-red-500">
                      {errors.url.message}
                    </li>
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
              className="w-fit"
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
      </div>
      <AnimatePresence mode="wait">
        {opgTags && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: `auto`, opacity: 1 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="flex w-4/5 flex-col items-center gap-5 overflow-hidden"
          >
            <hr className="w-full" />
            <p>Embed preview</p>
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:w-4/5 xl:w-3/5">
              <DiscordEmbed tags={opgTags} customTags={customOPGTags} />
              <TwitterEmbed tags={opgTags} customTags={customOPGTags} />
            </div>
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
      <Modal
        open={embedEditorOpen}
        requestClose={() => {
          setEmbedEditorOpen(false);
        }}
        title="Embed Injector"
      >
        <div className="flex flex-col gap-5">
          <input
            value={customOPGTags?.title}
            onChange={(e) => {
              setCustomOPGTags({
                ...customOPGTags,
                title: e.target.value || undefined,
              });
            }}
            placeholder={opgTags?.ogTitle || `Title`}
          />
          <div className="grid grid-cols-2 gap-5">
            <input
              value={customOPGTags?.origin}
              onChange={(e) => {
                setCustomOPGTags({
                  ...customOPGTags,
                  origin: e.target.value || undefined,
                });
              }}
              placeholder={opgTags?.ogUrl || `Origin`}
            />
            <input
              value={customOPGTags?.image}
              onChange={(e) => {
                setCustomOPGTags({
                  ...customOPGTags,
                  image: e.target.value || undefined,
                });
              }}
              placeholder={
                opgTags?.ogImage ? opgTags?.ogImage[0]?.url : 'Image URL'
              }
            />
          </div>
          <textarea
            value={customOPGTags?.description}
            onChange={(e) => {
              setCustomOPGTags({
                ...customOPGTags,
                description: e.target.value || undefined,
              });
            }}
            className="!h-40"
            placeholder={opgTags?.ogDescription || `Description`}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreateRedirectTab;
