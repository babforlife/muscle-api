import { sessionController } from '../controllers/session.controller'
import { environment } from '../environments'

const sessionUrl = environment.apiUrl + '/session'
export const sessionRoutes = [
  {
    method: 'GET',
    url: sessionUrl,
    handler: sessionController.getAll,
  },
  {
    method: 'GET',
    url: sessionUrl + '/:id',
    handler: sessionController.get,
  },
  {
    method: 'POST',
    url: sessionUrl,
    handler: sessionController.save,
  },
  {
    method: 'DELETE',
    url: sessionUrl + '/:id',
    handler: sessionController.delete,
  },
]