import {
    isEmpty,
    map,
} from 'lodash'

import {
    getMinutes,
    getMinuteApiUri,
    getTaskForses,
    getTaskForseSync,
} from '../../../config'

export default async (req, res) => {
    const minutes = await getMinutes()
    const taskForses = await getTaskForses()
    if (isEmpty(minutes)) {
        return res.status(404).json([])
    } else {
        return res.status(200).json(
            map(
                minutes,
                minute => ({
                    ...minute,
                    "Task forse": getTaskForseSync(minute["Task forse"], taskForses),
                    _url: getMinuteApiUri(minute)
                })
            )
        )
    }
}
