import { isEmpty } from 'lodash'
import { getTaskForses } from '../../../config'

export default async (req, res) => {
    const taskForses = await getTaskForses()
    if (isEmpty(taskForses)) {
        return res.status(404).json([])
    } else {
        return res.status(200).json(taskForses)
    }
}
