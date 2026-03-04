import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse {
  courseId: string;
  courseName: string;
  duration: string;
  mode: 'Online' | 'Hybrid' | 'On-Campus';
  intake: string;
  availability: 'Open' | 'Limited Seats' | 'Closed';
  description: string;
}

export interface ISector extends Document {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  courses: ICourse[];
}

const CourseSchema = new Schema<ICourse>({
  courseId: { type: String, required: true },
  courseName: { type: String, required: true },
  duration: { type: String, required: true },
  mode: { type: String, enum: ['Online', 'Hybrid', 'On-Campus'], required: true },
  intake: { type: String, required: true },
  availability: { type: String, enum: ['Open', 'Limited Seats', 'Closed'], required: true },
  description: { type: String, required: true },
});

const SectorSchema = new Schema<ISector>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  iconName: { type: String, required: true },
  description: { type: String, required: true },
  courses: [CourseSchema],
});

export const Sector = mongoose.model<ISector>('Sector', SectorSchema);
