import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  courseId: string;
  courseName: string;
  fullName: string;
  email: string;
  phone: string;
  education: string;
  statement: string;
  status: 'Pending' | 'Under Review' | 'Accepted' | 'Rejected';
  appliedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: String, required: true },
  courseName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  education: { type: String, required: true },
  statement: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Under Review', 'Accepted', 'Rejected'], default: 'Pending' },
  appliedAt: { type: Date, default: Date.now }
});

export const Application = mongoose.model<IApplication>('Application', ApplicationSchema);
