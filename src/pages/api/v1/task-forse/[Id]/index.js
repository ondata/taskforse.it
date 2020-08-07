import { isEmpty } from 'lodash'

import {
  getTaskForse,
  getTaskForseApiUri,
  getMembersByTaskForse,
  getMinutesByTaskForse,
  getResourcesByTaskForse
} from '../../../../../config'

export default async ({ query }, res) => {
  const taskForse = await getTaskForse(query.Id)
  if (isEmpty(taskForse)) {
    return res.status(404).json({})
  } else {
    const members = await getMembersByTaskForse(taskForse.Id)
    const minutes = await getMinutesByTaskForse(taskForse.Id)
    const resources = await getResourcesByTaskForse(taskForse.Id)
    return res.status(200).json({
      ...taskForse,
      'Membri conosciuti': members,
      'Verbali pubblicati': minutes,
      'Risorse disponibili': resources,
      _url: getTaskForseApiUri(taskForse)
    })
  }
}
