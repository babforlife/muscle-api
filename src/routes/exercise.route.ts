import { exerciseController } from '../controllers'

const exerciseUrl = '/exercise'
export const exerciseRoutes = [
  {
    method: 'GET',
    url: url,
    handler: exerciseController.getAll,
  },
  {
    method: 'GET',
    url: url + '/:id',
    handler: exerciseController.get,
  },
  {
    method: 'GET',
    url: url + '/:id/activities',
    handler: exerciseController.getActivities,
  },
  {
    method: 'POST',
    url: url,
    handler: exerciseController.save,
  },
  {
    method: 'DELETE',
    url: url + '/:id',
    handler: exerciseController.delete,
  },
]
