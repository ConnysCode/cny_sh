import type { NextPage } from 'next';
import Link from 'next/link';

import { callGetRedirect } from '@/api/routes/get-redirect';

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

    return {
      redirect: {
        destination: data.content.url,
        permanent: false,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const Redirect: NextPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
      <div className="max-w-sm text-center">
        <h1 className="text-2xl font-bold">Redirecting you.</h1>
        <p>
          If you are not being redirected within a few seconds, your link might
          be invalid.
        </p>
        <p className="text-custom-400 py-8 font-bold">
          <Link href="/">qwq.sh</Link>
        </p>
      </div>
    </div>
  );
};

export default Redirect;
