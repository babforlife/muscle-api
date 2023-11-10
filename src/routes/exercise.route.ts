import { exerciseController } from '../controllers'
import { environment } from '../environments'

const exerciseUrl = environment.apiUrl + '/exercise'
export const exerciseRoutes = [
  {
    method: 'GET',
    url: exerciseUrl,
    handler: exerciseController.getAll,
  },
  {
    method: 'GET',
    url: exerciseUrl + '/:id',
    handler: exerciseController.get,
  },
  {
    method: 'POST',
    url: exerciseUrl,
    handler: exerciseController.save,
  },
  {
    method: 'DELETE',
    url: exerciseUrl + '/:id',
    handler: exerciseController.delete,
  },
]