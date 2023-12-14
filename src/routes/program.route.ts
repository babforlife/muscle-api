import { programController } from '../controllers/program.controller'

const url = '/program'
export const programRoutes = [
  {
    method: 'GET',
    url: url,
    handler: programController.getAll,
  },
  {
    method: 'GET',
    url: url + '/:id',
    handler: programController.get,
  },
  {
    method: 'POST',
    url: url,
    handler: programController.save,
  },
  {
    method: 'DELETE',
    url: url + '/:id',
    handler: programController.delete,
  },
]
