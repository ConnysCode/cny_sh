import { size } from 'lodash';
import type { OgObjectInteral } from 'open-graph-scraper/dist/lib/types';
import type { FC } from 'react';

import type { ICustomOPG } from '@/interfaces/custom-opg';

interface IDiscordEmbedProps {
  tags: OgObjectInteral;
  customTags?: ICustomOPG;
}

const DiscordEmbed: FC<IDiscordEmbedProps> = ({ tags, customTags }) => {
  return (
    <div className="embed-shadow relative flex h-fit flex-col gap-4 overflow-hidden rounded-md border-[#E3E5E8] bg-[#F2F3F5] p-5 shadow-sm">
      <div className="absolute left-0 top-0 h-full w-1 bg-[#E3E5E8]" />
      <div className="flex flex-col gap-2">
        {(customTags?.origin || tags.ogSiteName) && (
          <p className="text-xs opacity-50">
            {customTags?.origin || tags.ogSiteName}
          </p>
        )}
        {(customTags?.title || tags.ogTitle) && (
          <p className="text-sm">{customTags?.title || tags.ogTitle}</p>
        )}
        {(customTags?.description || tags.ogDescription) && (
          <p className="text-xs opacity-50">
            {customTags?.description || tags.ogDescription}
          </p>
        )}
      </div>
      {(customTags?.image || (tags.ogImage && size(tags.ogImage) > 0)) && (
        <div className="aspect-video overflow-hidden rounded-md">
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
    </div>
  );
};

export default DiscordEmbed;
