import { chain, size } from 'lodash';
import type { FC } from 'react';

import type IEmbedInterface from './embed-interface';

const TwitterEmbed: FC<IEmbedInterface> = ({
  tags,
  customTags,
  editMode,
  onChange,
}) => {
  const getDomainName = (link: string) => {
    try {
      const url = new URL(link);
      return chain(url.hostname).split('.').join('.').value();
    } catch (error) {
      return ``;
    }
  };
  return (
    <div className="embed-shadow relative flex h-fit flex-col rounded-lg bg-white shadow-sm">
      {(customTags?.image || (tags.ogImage && size(tags.ogImage) > 0)) && (
        <div className="relative aspect-video grow overflow-hidden border-b">
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

      <div className="flex max-h-fit flex-col gap-2 p-3">
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
            <p className="text-xs font-bold">
              {customTags?.title || tags.ogTitle}
            </p>
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
            <p className="line-clamp-1 text-xs opacity-75">
              {customTags?.description || tags.ogDescription}
            </p>
          ))}
        {(customTags?.origin ||
          getDomainName(tags.ogUrl || '') ||
          tags.ogSiteName ||
          tags.ogTitle ||
          editMode) &&
          (editMode ? (
            <input
              onChange={(e) => {
                onChange && onChange({ ...customTags, origin: e.target.value });
              }}
              placeholder="Origin"
              value={
                customTags?.origin ||
                getDomainName(tags.ogUrl || '') ||
                tags.ogSiteName
              }
              className="text-xs text-text-dark/50"
            />
          ) : (
            <p className="text-xs opacity-25">
              {customTags?.origin ||
                getDomainName(tags.ogUrl || '') ||
                tags.ogSiteName}
            </p>
          ))}
      </div>
    </div>
  );
};

export default TwitterEmbed;
