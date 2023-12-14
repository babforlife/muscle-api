import { activityController } from '../controllers/activity.controller'

const url = '/activity'
export const activityRoutes = [
  {
    method: 'GET',
    url: url,
    handler: activityController.getAll,
  },
  {
    method: 'GET',
    url: url + '/:id',
    handler: activityController.get,
  },
  {
    method: 'POST',
    url: url,
    handler: activityController.save,
  },
  {
    method: 'DELETE',
    url: url + '/:id',
    handler: activityController.delete,
  },
]
