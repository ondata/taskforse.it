import {
    isEmpty,
    map,
    split,
} from 'lodash'

import {
    getMembers,
    getMemberApiUri,
    getTaskForses,
    getTaskForseSync,
} from '../../../config'

export default async (req, res) => {
    const members = await getMembers()
    const taskForses = await getTaskForses()
    if (isEmpty(members)) {
        return res.status(404).json([])
    } else {
        return res.status(200).json(
            map(
                members,
                member => ({
                    ...member,
                    "Task forses": map(
                        split(member["Task forses"], ","),
                        id => getTaskForseSync(id, taskForses)
                    ),
                    _url: getMemberApiUri(member)
                })
            )
        )
    }
}
