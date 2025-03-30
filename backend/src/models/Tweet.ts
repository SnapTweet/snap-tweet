import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface ITweet extends Document {
  content: string;
  user: IUser['_id'];
  likes: IUser['_id'][];
  createdAt: Date;
}

const tweetSchema = new Schema<ITweet>({
  content: { type: String, required: true, maxlength: 280 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Users who liked the tweet
  createdAt: { type: Date, default: Date.now },
});

const Tweet = mongoose.model<ITweet>('Tweet', tweetSchema);

export default Tweet;
