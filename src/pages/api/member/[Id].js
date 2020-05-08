import {
    isEmpty,
    map,
    split,
} from 'lodash'

import {
    getMember,
    getMemberApiUri,
    getTaskForses,
    getTaskForseSync,
} from '../../../config'

export default async ({ query }, res) => {
    const member = await getMember(query["Id"])
    const taskForses = await getTaskForses()
    if (isEmpty(member)) {
        return res.status(404).json({})
    } else {
        return res.status(200).json({
            ...member,
            "Task forses": map(
                split(member["Task forses"], ","),
                id => getTaskForseSync(id, taskForses)
            ),
            _url: getMemberApiUri(member)
        })
    }
}
