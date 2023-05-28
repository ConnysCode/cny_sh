import type { Model } from 'mongoose';
import { model, models, Schema } from 'mongoose';

import type { IRedirect } from '@/interfaces/redirect';

const redirectSchema = new Schema<IRedirect>({
  url: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
});

export default (models.redirect ||
  model('redirect', redirectSchema)) as Model<IRedirect>;
