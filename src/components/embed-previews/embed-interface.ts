import type { OgObjectInteral } from 'open-graph-scraper/dist/lib/types';

import type { ICustomOPG } from '@/interfaces/custom-opg';

interface IEmbedInterfaceContent {
  tags: OgObjectInteral;
  customTags?: ICustomOPG;
}

interface IEmbedInterface extends IEmbedInterfaceContent {
  editMode?: boolean;
  onChange?: (tags: ICustomOPG) => void;
  requestEndEdit?: () => void;
}

export default IEmbedInterface;
