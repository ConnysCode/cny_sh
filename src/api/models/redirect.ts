import mongoose, { Schema } from 'mongoose';

const redirectSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});

export default mongoose.models.ShortUrl ||
  mongoose.model('ShortUrl', redirectSchema);
