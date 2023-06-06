import { faLink, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { debounce } from 'lodash';
import Link from 'next/link';
import type { OgObjectInteral } from 'open-graph-scraper/dist/lib/types';
import { useCallback, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { callCreateRedirect } from '@/api/routes/create';
import { callScrapeTags } from '@/api/routes/scrape-tags';
import DiscordEmbed from '@/components/embed-previews/discord-embed';
import LinkedInEmbed from '@/components/embed-previews/linkedin-embed';
import TwitterEmbed from '@/components/embed-previews/twitter-embed';
import Heading from '@/components/heading';
import {
  HeaderLayerOne,
  HeaderLayerThree,
  HeaderLayerTwo,
} from '@/components/svgs/header-waves';
import type { ICustomOPG } from '@/interfaces/custom-opg';

type RedirectFormInputs = {
  url: string;
};

const defaultOPGTags: OgObjectInteral = {
  dcTitle: 'cny.sh',
  ogTitle: 'cny.sh',
};

const Index = () => {
  const [, setSent] = useState(false);
  const [settings] = useState<{ whitespaced: boolean }>({
    whitespaced: false,
  });
  const [, setCreatedRedirect] = useState<string | undefined>();
  // const [settingsOpen, setSettingsOpen] = useState(false);
  // const [embedEditorOpen, setEmbedEditorOpen] = useState(false);

  const [selectedEdit, setSelectedEdit] = useState<string | undefined>();

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
    setCustomOPGTags(undefined);
    setSent(false);
    setCreatedRedirect(undefined);
    if (!url) return;
    debouncedGetScrapeMetaTags(url);
  }, [url, debouncedGetScrapeMetaTags]);

  const onSubmitRedirect: SubmitHandler<RedirectFormInputs> = (data) => {
    createRedirect(data);
  };
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="relative">
        <div className="relative">
          <HeaderLayerOne />
          <div className="absolute left-0 top-0 flex h-[500px] w-[530px] flex-col items-center justify-center gap-6 px-16">
            <Heading text="cny.sh" variant="header" />

            <div className="w-full">
              <form
                onSubmit={handleSubmit(onSubmitRedirect)}
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, #FFDAD3 0%, #FFB1B1 100%)',
                }}
                className="panel-shadow flex h-14 w-full flex-row items-center gap-2 rounded-xl py-2 pr-2 text-header-input transition duration-300 ease-in-out"
              >
                <input
                  placeholder="Domain"
                  {...register('url', {
                    required: `An URL is required to use this tool.`,
                    pattern: {
                      value: /^(https:\/\/)/,
                      global: true,
                      multiline: true,
                      message: `A secure (https://) URL is required to use this tool.`,
                    },
                  })}
                  type="url"
                  className="h-full grow border-none bg-transparent pl-4 outline-none !ring-0 placeholder:text-header-input/50"
                />
                <div className="h-3/5 w-0.5 shrink-0 rounded-full bg-header-input" />
                <button
                  type="button"
                  className="aspect-square h-full shrink-0 rounded-md transition duration-300 ease-in-out hover:bg-white/25"
                >
                  <FontAwesomeIcon icon={faLink} />
                </button>
              </form>

              <AnimatePresence>
                {errors.url && (
                  <motion.div
                    key={errors.url.message}
                    layout
                    initial={{
                      marginTop: 0,
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      marginTop: 24,
                      height: 'fit-content',
                      opacity: 1,
                    }}
                    exit={{
                      marginTop: 0,
                      height: 0,
                      opacity: 0,
                    }}
                    className="panel-shadow mx-5 overflow-hidden rounded-xl"
                  >
                    <div
                      style={{
                        backgroundImage:
                          'linear-gradient(90deg, #FFDAD3 0%, #FFB1B1 100%)',
                      }}
                      className="flex w-full flex-row items-center gap-2 p-2 px-4 text-sm text-header-input transition duration-300 ease-in-out"
                    >
                      <FontAwesomeIcon icon={faWarning} />
                      <span>{errors.url.message}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex h-14 flex-row gap-7">
              <Link className="text-white" href="/">
                Track Links
              </Link>
              <Link className="text-white" href="/">
                Contribute
              </Link>
            </div>
          </div>
          {/* <img
            className="absolute left-0 top-0 w-[700px] opacity-50"
            src="https://media.discordapp.net/attachments/791841931486298152/1115362097988116500/image.png?width=1266&height=1020"
          /> */}
        </div>
        <div className="absolute right-0 top-0 -z-10">
          <HeaderLayerTwo />
        </div>
        <div className="absolute right-0 top-0 -z-20">
          <HeaderLayerThree />
        </div>
      </div>
      <div className="container flex w-full flex-col gap-10">
        <Heading text="Embed Injector" variant="dark" />
        <div className="relative w-full">
          <div className="relative mb-56 h-36 w-full rounded-[50px] pt-8">
            <div
              style={{
                backgroundImage:
                  'linear-gradient(122.57deg, #FF7360 18.01%, #F35959 83.47%)',
              }}
              className="segment-shadow absolute left-0 top-0 -z-10 h-full w-full rounded-[50px]"
            />
            <div className=" z-0 grid w-full grid-cols-3 gap-28 px-[100px]">
              <div className="z-10">
                <AnimatePresence mode="wait">
                  {selectedEdit !== `linkedin` && (
                    <motion.div
                      onClick={() => {
                        setSelectedEdit(`linkedin`);
                      }}
                      whileHover={{
                        scale: 1.05,
                      }}
                      layout
                      layoutId="linkedin-dings"
                      className="cursor-pointer"
                    >
                      <LinkedInEmbed
                        tags={opgTags || defaultOPGTags}
                        customTags={customOPGTags}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="z-0">
                <AnimatePresence mode="wait">
                  {selectedEdit !== `discord` && (
                    <motion.div
                      onClick={() => {
                        setSelectedEdit(`discord`);
                      }}
                      whileHover={{
                        scale: 1.05,
                      }}
                      layout
                      layoutId="discord-dings"
                      className="cursor-pointer"
                    >
                      <DiscordEmbed
                        tags={opgTags || defaultOPGTags}
                        customTags={customOPGTags}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="z-10">
                <AnimatePresence mode="wait">
                  {selectedEdit !== `twitter` && (
                    <motion.div
                      onClick={() => {
                        setSelectedEdit(`twitter`);
                      }}
                      whileHover={{
                        scale: 1.05,
                      }}
                      layout
                      layoutId="twitter-dings"
                      className="cursor-pointer"
                    >
                      <TwitterEmbed
                        tags={opgTags || defaultOPGTags}
                        customTags={customOPGTags}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <AnimatePresence mode="wait">
        {!!selectedEdit && (
          <motion.div
            initial="init"
            animate="base"
            exit="exit"
            variants={{
              init: { opacity: 0 },
              base: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            className="fixed left-0 top-0 z-10 h-screen w-screen"
          >
            <div
              onClick={() => {
                console.log('hi');

                setSelectedEdit(undefined);
              }}
              className="absolute left-0 top-0 z-0 h-full w-full bg-red-500/75"
            />
            <div className="pointer-events-none absolute z-10 flex h-full w-full items-center justify-center">
              <motion.div
                variants={{
                  init: { width: 0 },
                  base: { width: '30%' },
                  exit: { width: 0 },
                }}
                style={{
                  backgroundImage:
                    'linear-gradient(122.57deg, #FF7360 18.01%, #F35959 83.47%)',
                }}
                className="segment-shadow h-20 rounded-[25px]"
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="container pointer-events-none relative z-20 grid h-full w-full grid-cols-3 flex-row gap-24 px-[100px]"
            >
              <div />
              <div className="flex h-full w-full items-center justify-center">
                {(() => {
                  switch (selectedEdit) {
                    case `discord`:
                      return (
                        <motion.div
                          layout
                          layoutId={`${selectedEdit}-dings`}
                          className="pointer-events-auto w-full"
                        >
                          <DiscordEmbed
                            onChange={(newTags) => {
                              console.log(newTags);

                              setCustomOPGTags(newTags);
                            }}
                            editMode
                            tags={opgTags || defaultOPGTags}
                            customTags={customOPGTags}
                          />
                        </motion.div>
                      );
                    case `linkedin`:
                      return (
                        <motion.div
                          layout
                          layoutId={`${selectedEdit}-dings`}
                          className="pointer-events-auto w-full"
                        >
                          <LinkedInEmbed
                            tags={opgTags || defaultOPGTags}
                            customTags={customOPGTags}
                          />
                        </motion.div>
                      );
                    case `twitter`:
                    default:
                      return (
                        <motion.div
                          layout
                          layoutId={`${selectedEdit}-dings`}
                          className="pointer-events-auto w-full"
                        >
                          <TwitterEmbed
                            tags={opgTags || defaultOPGTags}
                            customTags={customOPGTags}
                          />
                        </motion.div>
                      );
                  }
                })()}
              </div>
              <div />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
