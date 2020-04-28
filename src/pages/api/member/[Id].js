import { isEmpty } from 'lodash'
import { getMember, getMemberApiUri } from '../../../config'

export default async ({ query }, res) => {
    const member = await getMember(query["Id"])
    if (isEmpty(member)) {
        return res.status(404).json({})
    } else {
        return res.status(200).json({ ...member, _url: getMemberApiUri(member) })
    }
}
