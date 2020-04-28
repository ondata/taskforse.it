import { isEmpty, map } from 'lodash'
import { getMinutes, getMinuteUri } from '../../../config'

export default async (req, res) => {
    const minutes = await getMinutes()
    if (isEmpty(minutes)) {
        return res.status(404).json([])
    } else {
        return res.status(200).json(
            map(
                minutes,
                minute => ({ ...minute, _url: getMinuteUri(minute) })
            )
        )
    }
}
