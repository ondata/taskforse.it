import {
  isEmpty,
  map
} from 'lodash'

import {
  getTaskForses,
  getTaskForseApiUri,
  getMembers,
  getMinutes,
  getResources,
  getMembersByTaskForseSync,
  getMinutesByTaskForseSync,
  getResourcesByTaskForseSync
} from '../../../../config'

export default async (req, res) => {
  const taskForses = await getTaskForses()
  const members = await getMembers()
  const minutes = await getMinutes()
  const resources = await getResources()
  if (isEmpty(taskForses)) {
    return res.status(404).json([])
  } else {
    return res.status(200).json(
      map(
        taskForses,
        taskForse => ({
          ...taskForse,
          'Membri conosciuti': getMembersByTaskForseSync(taskForse.Id, members),
          'Verbali pubblicati': getMinutesByTaskForseSync(taskForse.Id, minutes),
          'Risorse disponibili': getResourcesByTaskForseSync(taskForse.Id, resources),
          _url: getTaskForseApiUri(taskForse)
        })
      )
    )
  }
}
