import { chain, size } from 'lodash';
import type { FC } from 'react';

import type IEmbedInterface from './embed-interface';

const LinkedInEmbed: FC<IEmbedInterface> = ({ tags, customTags }) => {
  const getDomainName = (link: string) => {
    try {
      const url = new URL(link);
      return chain(url.hostname).split('.').join('.').value();
    } catch (error) {
      return ``;
    }
  };
  return (
    <div className="embed-shadow flex h-fit flex-col overflow-hidden bg-white shadow-sm">
      {(customTags?.image || (tags.ogImage && size(tags.ogImage) > 0)) && (
        <div className="aspect-video grow overflow-hidden border-b">
          <img
            className="h-full w-full object-cover"
            src={
              customTags?.image
                ? customTags.image
                : `${tags.ogImage ? tags.ogImage[0]?.url : ''}`
            }
          />
        </div>
      )}

      <div className="flex max-h-fit flex-col gap-1 p-3">
        {(customTags?.title || tags.ogTitle) && (
          <p className="text-xs font-bold">
            {customTags?.title || tags.ogTitle}
          </p>
        )}
        <p className="text-[.6rem] font-medium uppercase opacity-25">
          {customTags?.origin ||
            getDomainName(tags.ogUrl || '') ||
            tags.ogSiteName ||
            tags.ogTitle}
        </p>
      </div>
    </div>
  );
};

export default LinkedInEmbed;
