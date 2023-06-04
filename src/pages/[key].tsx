import { size } from 'lodash';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { OgObjectInteral } from 'open-graph-scraper/dist/lib/types';
import { useEffect } from 'react';

import { callGetRedirect } from '@/api/routes/get-redirect';
import { callScrapeTags } from '@/api/routes/scrape-tags';
import type { IRedirect } from '@/interfaces/redirect';

export async function getServerSideProps(context: any) {
  try {
    const key = context.query.key.toString();

    const res = await callGetRedirect(key);
    const { data } = res;

    if (res.status !== 200 || !data.success) {
      return {
        notFound: true,
      };
    }
    if (!data.content.opg)
      return {
        redirect: {
          destination: data.content.url,
          permanent: false,
        },
      };

    const scrapedOPG = await callScrapeTags(data.content.url);
    return {
      props: {
        ...data.content,
        scrapedOPG: scrapedOPG.data.success ? scrapedOPG.data.content : null,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

interface IRedirectPage extends IRedirect {
  scrapedOPG: OgObjectInteral;
}

const Redirect: NextPage<IRedirectPage> = ({ opg, url, scrapedOPG }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(url);
  });
  return (
    <div>
      <Head>
        <title>{opg?.title || scrapedOPG.dcTitle}</title>
        <meta
          name="description"
          content={opg?.description || scrapedOPG.dcDescription}
        />

        <meta property="og:url" content={opg?.origin || url} />
        <meta
          property="og:site_name"
          content={opg?.origin || scrapedOPG.ogSiteName}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={opg?.title || scrapedOPG.ogTitle} />
        <meta
          property="og:description"
          content={opg?.description || scrapedOPG.ogDescription}
        />
        {(opg?.image ||
          (scrapedOPG.ogImage && size(scrapedOPG.ogImage) > 0)) && (
          <meta
            property="og:image"
            content={
              opg?.image ||
              (scrapedOPG.ogImage ? scrapedOPG.ogImage[0]?.url : ``)
            }
          />
        )}

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="youtube.com" />
        <meta property="twitter:url" content={opg?.origin || url} />
        <meta
          name="twitter:title"
          content={opg?.title || scrapedOPG.twitterDescription}
        />
        <meta
          name="twitter:description"
          content={opg?.description || scrapedOPG.twitterDescription}
        />
        {(opg?.image ||
          (scrapedOPG.twitterImage && size(scrapedOPG.twitterImage) > 0)) && (
          <meta
            name="twitter:image"
            content={
              opg?.image ||
              (scrapedOPG.twitterImage ? scrapedOPG.twitterImage[0]?.url : ``)
            }
          />
        )}
        <meta
          property="twitter:site_name"
          content={opg?.origin || scrapedOPG.ogSiteName}
        />
      </Head>
    </div>
  );
};

export default Redirect;
