import { isEmpty, map } from 'lodash'

import {
  getTaskForse,
  getMinutesByTaskForse,
  getMinuteApiUri
} from '../../../../../../config'

export default async ({ query }, res) => {
  const taskForse = await getTaskForse(query.Id)
  if (isEmpty(taskForse)) {
    return res.status(404).json({})
  } else {
    return res.status(200).json(
      map(
        await getMinutesByTaskForse(taskForse.Id),
        minute => ({
          ...minute,
          'Task forse': taskForse,
          _url: getMinuteApiUri(minute)
        })
      )
    )
  }
}
