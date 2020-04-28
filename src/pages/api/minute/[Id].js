import { isEmpty } from 'lodash'
import { getMinute, getMinuteUri } from '../../../config'

export default async ({ query }, res) => {
    const minute = await getMinute(query["Id"])
    if (isEmpty(minute)) {
        return res.status(404).json({})
    } else {
        return res.status(200).json({ ...minute, _url: getMinuteUri(minute) })
    }
}
