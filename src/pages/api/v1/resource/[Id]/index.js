import { isEmpty } from 'lodash'

import {
  getResource,
  getResourceApiUri,
  getTaskForse
} from '../../../../../config'

export default async ({ query }, res) => {
  const resource = await getResource(query.Id)
  const taskForse = await getTaskForse(resource['Task forse'])
  if (isEmpty(resource)) {
    return res.status(404).json({})
  } else {
    return res.status(200).json({
      ...resource,
      'Task forse': taskForse,
      _url: getResourceApiUri(resource)
    })
  }
}
