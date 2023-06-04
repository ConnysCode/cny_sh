import { connect } from 'mongoose';

export default () => {
  const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${
    process.env.MONGO_INITDB_ROOT_PASSWORD
  }@${
    process.env.NODE_ENV === `production`
      ? `mongodb`
      : `${process.env.MONGO_HOST}`
  }:${process.env.MONGO_PORT || `27017`}/?authMechanism=DEFAULT`;

  return connect(uri, { dbName: 'cny_sh' });
};
