import { size } from 'lodash';
import type { FC } from 'react';

import type IEmbedInterface from './embed-interface';

const DiscordEmbed: FC<IEmbedInterface> = ({
  tags,
  customTags,
  editMode,
  onChange,
}) => {
  return (
    <div className="embed-shadow relative flex h-fit flex-col gap-4 overflow-hidden rounded-md border-[#E3E5E8] bg-[#F2F3F5] p-5 shadow-sm">
      <div className="absolute left-0 top-0 h-full w-1 bg-[#E3E5E8]" />
      <div className="flex flex-col gap-2">
        {(customTags?.origin || tags.ogSiteName || editMode) &&
          (editMode ? (
            <input
              onChange={(e) => {
                onChange && onChange({ ...customTags, origin: e.target.value });
              }}
              value={customTags?.origin || tags.ogSiteName}
              className="text-xs text-text-dark/50"
            />
          ) : (
            <p className="text-xs opacity-50">
              {customTags?.origin || tags.ogSiteName}
            </p>
          ))}
        {(customTags?.title || tags.ogTitle) && (
          <p className="text-sm">{customTags?.title || tags.ogTitle}</p>
        )}
        {(customTags?.description || tags.ogDescription || editMode) &&
          (editMode ? (
            <textarea
              onChange={(e) => {
                onChange &&
                  onChange({ ...customTags, description: e.target.value });
              }}
              value={customTags?.description || tags.ogDescription}
              className="text-xs text-text-dark/50"
            />
          ) : (
            <p className="text-xs opacity-50">
              {customTags?.description || tags.ogDescription}
            </p>
          ))}
      </div>
      {(customTags?.image || (tags.ogImage && size(tags.ogImage) > 0)) && (
        <div className="aspect-video w-full overflow-hidden rounded-md">
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
