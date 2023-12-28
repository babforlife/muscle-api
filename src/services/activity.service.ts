import { Activity, IActivity } from '../models'
import { seriesExerciseService } from './seriesExercise.service'
import { UserService } from './user.service'

class ActivityService extends UserService {

  async upsert(activity: IActivity): Promise<IActivity | null> {
    if (activity._id === '') delete activity._id
    activity.userId = this.user.id
    if (activity._id) return await Activity.findOneAndUpdate({ _id: activity._id, userId: this.user.id }, activity, { upsert: true, new: true })
    if (activity.session && activity.session.length > 0) {
      for (let i = 0; i < activity.session.length; i++) activity.session[i] = await seriesExerciseService.create(activity.session[i])
    }
    return await Activity.create(activity)
  }

  async getAll(): Promise<IActivity[]> {
    return await Activity.find({ userId: this.user.id }).populate({ path: 'session', populate: { path: 'exercise' } })
  }

  async getById(_id: string): Promise<IActivity | null> {
    return await Activity.findOne({ _id, userId: this.user.id }).populate({ path: 'session', populate: { path: 'exercise' } })
  }

  async deleteById(_id: string): Promise<IActivity | null> {
    const activity = await Activity.findOneAndRemove({ _id, userId: this.user.id }).populate('session')
    if (activity && activity.session) for (let seriesExercise of activity.session) await seriesExerciseService.deleteOne(seriesExercise._id!)
    return activity
  }
}
export const activityService = new ActivityService()