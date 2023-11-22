import { programController } from '../controllers/program.controller'
import { environment } from '../environments'

const programUrl = environment.apiUrl + '/program'
export const programRoutes = [
  {
    method: 'GET',
    url: programUrl,
    handler: programController.getAll,
  },
  {
    method: 'GET',
    url: programUrl + '/:id',
    handler: programController.get,
  },
  {
    method: 'POST',
    url: programUrl,
    handler: programController.save,
  },
  {
    method: 'DELETE',
    url: programUrl + '/:id',
    handler: programController.delete,
  },
]