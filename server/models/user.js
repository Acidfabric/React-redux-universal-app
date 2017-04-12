import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: 'String', required: false },
  email: { type: 'String', required: true },
  password: { type: 'String', required: true },
  admin: Boolean,
});

export default mongoose.model('User', userSchema);
