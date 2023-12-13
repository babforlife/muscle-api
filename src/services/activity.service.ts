import { DeleteResult } from 'mongodb'
import { Activity, IActivity } from '../models'
import { seriesExerciseService } from './seriesExercise.service'

export const activityService = {
  async upsert(activity: IActivity): Promise<IActivity | null> {
    if(activity._id === '') delete activity._id
    if(activity._id) return await Activity.findOneAndUpdate({ _id: activity._id }, activity, { upsert: true, new: true });
    if (activity.session && activity.session.length > 0) {
      for (let i = 0; i < activity.session.length; i++) {
        let seriesExercise = await seriesExerciseService.create(activity.session[i]);
        activity.session[i] = seriesExercise;
      }
    }
    return await Activity.create(activity)
  },
  async getAll(): Promise<IActivity[]> {
    return await Activity.find({}).populate({
      path: 'session',
      populate: {
        path: 'exercise'
      }
    });
  },
  async getById(_id: string): Promise<IActivity | null> {
    return await Activity.findById(_id).populate({
      path: 'session',
      populate: {
        path: 'exercise'
      }
    })
  },
  async deleteById(_id: string): Promise<IActivity | null> {
    const activity = await Activity.findByIdAndRemove(_id).populate('session');
    if (activity && activity.session) {
      for (let seriesExercise of activity.session) {
        await seriesExerciseService.deleteOne(seriesExercise._id!);
      }
    }
    return activity;
  }
}
