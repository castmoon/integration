/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mongoose from 'mongoose';

export const MongoHelper = {
  client: null as unknown as mongoose.Connection,
  uri: null as unknown as string,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await mongoose.connect(uri);
  },

  async disconnect(): Promise<void> {
    await mongoose.connection.close();
    this.client = null as any;
  },

  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection as any;
    const newObject = { ...collectionWithoutId._doc, id: _id };
    delete newObject._id;
    return newObject;
  },

  mapCollection: (collection: any[]): any[] => {
    const collections = collection.map((c) => MongoHelper.map(c));
    return collections;
  },
};
