import { isEmpty, map } from 'lodash'
import { getMembers, getMemberUri } from '../../../config'

export default async (req, res) => {
    const members = await getMembers()
    if (isEmpty(members)) {
        return res.status(404).json([])
    } else {
        return res.status(200).json(
            map(
                members,
                member => ({ ...member, _url: getMemberUri(member) })
            )
        )
    }
}
