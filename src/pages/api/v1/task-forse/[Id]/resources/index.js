import { isEmpty, map } from 'lodash'

import {
  getTaskForse,
  getResourcesByTaskForse,
  getResourceApiUri
} from '../../../../../../config'

export default async ({ query }, res) => {
  const taskForse = await getTaskForse(query.Id)
  if (isEmpty(taskForse)) {
    return res.status(404).json({})
  } else {
    return res.status(200).json(
      map(
        await getResourcesByTaskForse(taskForse.Id),
        resource => ({
          ...resource,
          'Task forse': taskForse,
          _url: getResourceApiUri(resource)
        })
      )
    )
  }
}
