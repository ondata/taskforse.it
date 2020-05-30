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

    GSHEET_MULTIFIELDS_SEPARATOR,
} from '../../../../../config'

export default async ({ query }, res) => {

    const member = await getMember(query["Id"])

    if (isEmpty(member)) {
        return res.status(404).json({})
    } else {
        const taskForses = await getTaskForses()
        return res.status(200).json({
            ...member,
            "Task forses": map(
                split(member["Task forses"], GSHEET_MULTIFIELDS_SEPARATOR),
                id => getTaskForseSync(id, taskForses)
            ),
            _url: getMemberApiUri(member)
        })
    }

}
