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
    <div className="embed-shadow gradie relative flex h-fit flex-col gap-4 rounded-md border-[#E3E5E8] bg-[#F2F3F5] p-5 shadow-sm">
      <div className="absolute left-0 top-0 h-full w-1 bg-[#E3E5E8]" />
      <div className="flex flex-col gap-2">
        {(customTags?.origin || tags.ogSiteName || editMode) &&
          (editMode ? (
            <input
              onChange={(e) => {
                onChange && onChange({ ...customTags, origin: e.target.value });
              }}
              placeholder="Origin"
              value={customTags?.origin || tags.ogSiteName}
              className="text-xs text-text-dark/50"
            />
          ) : (
            <p className="text-xs opacity-50">
              {customTags?.origin || tags.ogSiteName}
            </p>
          ))}
        {(customTags?.title || tags.ogTitle || editMode) &&
          (editMode ? (
            <input
              onChange={(e) => {
                onChange && onChange({ ...customTags, title: e.target.value });
              }}
              placeholder="Title"
              value={customTags?.title || tags.ogTitle}
              className="text-xs text-text-dark/50"
            />
          ) : (
            <p className="text-sm">{customTags?.title || tags.ogTitle}</p>
          ))}
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
            <p className="line-clamp-5 text-xs opacity-50">
              {customTags?.description || tags.ogDescription}
            </p>
          ))}
      </div>
      {(customTags?.image ||
        (tags.ogImage && size(tags.ogImage) > 0) ||
        editMode) && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <img
            className="h-full w-full object-cover"
            src={
              customTags?.image
                ? customTags.image
                : `${tags.ogImage ? tags.ogImage[0]?.url : ''}`
            }
          />
          {editMode && (
            <div className="absolute bottom-0 left-0 w-full overflow-hidden p-3">
              <div className="w-full overflow-hidden rounded-md bg-background p-3 shadow-md">
                <input
                  onChange={(e) => {
                    onChange &&
                      onChange({ ...customTags, image: e.target.value });
                  }}
                  placeholder="Image URL"
                  value={
                    customTags?.image ||
                    (tags.ogImage && tags.ogImage[0]?.url) ||
                    ``
                  }
                  className="text-xs text-text-dark/50"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscordEmbed;
