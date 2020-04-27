import mongoose from 'mongoose';
import config from '../config';

const DB = config.host.replace('<username>', config.username).replace('<password>', config.password);
const connection = async () => await mongoose.createConnection(DB, { useNewUrlParser: true, useUnifiedTopology: false, bufferCommands: false, bufferMaxEntries: 0 });

export default connection;
