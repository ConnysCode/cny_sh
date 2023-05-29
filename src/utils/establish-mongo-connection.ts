import { connect } from 'mongoose';

export default () =>
  connect(process.env.MONGODB_URI || '', { dbName: 'cny_sh' });
