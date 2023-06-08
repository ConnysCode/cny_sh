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
  dcTitle: 'cny.sh - Customize. Share. Stand Out!',
  ogTitle: 'cny.sh - Customize. Share. Stand Out!',
  ogDescription:
    'Discover the power of link customization and self-expression with cny.sh. Our cutting-edge link shortener provides you with a platform to unlock the full potential of your shortened URLs. Tailor the embeds of your shortened links to reflect your individuality, allowing you to share and promote with a personal touch. Experience the freedom to customize and express yourself with cny.sh, where every link can become a unique reflection of your style and identity.',
  dcDescription:
    'Discover the power of link customization and self-expression with cny.sh. Our cutting-edge link shortener provides you with a platform to unlock the full potential of your shortened URLs. Tailor the embeds of your shortened links to reflect your individuality, allowing you to share and promote with a personal touch. Experience the freedom to customize and express yourself with cny.sh, where every link can become a unique reflection of your style and identity.',
  ogImage: [
    {
      url: 'http://cdn.namespace.media/s/s8tNTZ7D8F8SaQX/download/cny%20bg%206.png',
      type: '',
    },
  ],
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
    <div className="flex w-[100vdh] flex-col gap-10 overflow-hidden">
      <div className="relative">
        <div className="relative">
          <div className="opacity-0 md:opacity-100 animate-hover">
            <HeaderLayerOne />
          </div>
          <div className="absolute left-0 top-0 flex h-[500px] w-full flex-col items-center justify-center gap-6 px-16 md:w-[530px]">
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
              {/* <Link className="text-white" href="/">
                Track Links
              </Link> */}
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
        <div className="absolute right-0 top-0 -z-10 animate-hover-delay-800">
          <HeaderLayerTwo />
        </div>
        <div className="absolute right-0 top-0 -z-20 animate-hover-delay-1600">
          <HeaderLayerThree />
        </div>
      </div>
      <div className="container flex w-full flex-col gap-10">
        <Heading text="Embed Injector" variant="dark" />
        <div className="relative w-full">
          <div className="pointer-events-none relative z-20 mb-56 flex h-fit w-full justify-center rounded-[50px] pt-8">
            <div
              style={{
                backgroundImage:
                  'linear-gradient(122.57deg, #FF7360 18.01%, #F35959 83.47%)',
              }}
              className="segment-shadow absolute top-0 -z-10 mx-auto h-36 w-4/5 rounded-[50px] sm:w-full"
            />
            <div className="z-0 grid w-full grid-cols-1 gap-28 px-[100px] md:grid-cols-2 xl:grid-cols-3">
              <div className="pointer-events-auto z-10 hidden xl:block">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`embed-preview-linkedin-editmode-${
                      selectedEdit === `linkedin` ? `enabled` : `disabled`
                    }`}
                    onClick={() => {
                      setSelectedEdit(`linkedin`);
                    }}
                    layout
                    layoutId="linkedin-dings"
                    className="cursor-pointer"
                  >
                    <LinkedInEmbed
                      onChange={(tags) => {
                        setCustomOPGTags(tags);
                      }}
                      editMode={selectedEdit === `linkedin`}
                      tags={opgTags || defaultOPGTags}
                      customTags={customOPGTags}
                      requestEndEdit={() => {
                        setSelectedEdit(undefined);
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="pointer-events-auto z-0">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`embed-preview-discord-editmode-${
                      selectedEdit === `discord` ? `enabled` : `disabled`
                    }`}
                    onClick={() => {
                      selectedEdit !== `discord` && setSelectedEdit(`discord`);
                    }}
                    layout
                    layoutId="discord-dings"
                    className="w-full cursor-pointer"
                  >
                    <DiscordEmbed
                      onChange={(tags) => {
                        setCustomOPGTags(tags);
                      }}
                      editMode={selectedEdit === `discord`}
                      tags={opgTags || defaultOPGTags}
                      customTags={customOPGTags}
                      requestEndEdit={() => {
                        setSelectedEdit(undefined);
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="pointer-events-auto z-10 hidden md:block">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`embed-preview-twitter-editmode-${
                      selectedEdit === `twitter` ? `enabled` : `disabled`
                    }`}
                    onClick={() => {
                      setSelectedEdit(`twitter`);
                    }}
                    layout
                    layoutId="twitter-dings"
                    className="cursor-pointer"
                  >
                    <TwitterEmbed
                      onChange={(tags) => {
                        setCustomOPGTags(tags);
                      }}
                      editMode={selectedEdit === `twitter`}
                      tags={opgTags || defaultOPGTags}
                      customTags={customOPGTags}
                      requestEndEdit={() => {
                        setSelectedEdit(undefined);
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedEdit && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          onClick={() => {
            setSelectedEdit(undefined);
          }}
          className="fixed left-0 top-0 z-10 h-screen w-screen"
        />
      )}
    </div>
  );
};

export default Index;
