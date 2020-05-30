import { isEmpty } from 'lodash'

import {
    getMinute,
    getMinuteApiUri,
    getTaskForse,
} from '../../../../../config'

export default async ({ query }, res) => {
    const minute = await getMinute(query["Id"])
    const taskForse = await getTaskForse(minute["Task forse"])
    if (isEmpty(minute)) {
        return res.status(404).json({})
    } else {
        return res.status(200).json({
            ...minute,
            "Task forse": taskForse,
            _url: getMinuteApiUri(minute)
        })
    }
}
