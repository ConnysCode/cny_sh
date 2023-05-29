import { connect } from 'mongoose';

export default () => connect(process.env.MONGODB_URI || '');
