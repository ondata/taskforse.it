import { isEmpty } from 'lodash'
import { getMember, getMemberUri } from '../../../config'

export default async ({ query }, res) => {
    const member = await getMember(query["Id"])
    if (isEmpty(member)) {
        return res.status(404).json({})
    } else {
        return res.status(200).json({ ...member, _url: getMemberUri(member) })
    }
}
