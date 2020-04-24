import { isEmpty } from 'lodash'
import { getMembers } from '../../../config'

export default async (req, res) => {
    const members = await getMembers()
    if (isEmpty(members)) {
        return res.status(404).json([])
    } else {
        return res.status(200).json(members)
    }
}
