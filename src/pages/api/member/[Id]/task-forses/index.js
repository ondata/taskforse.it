import {
    map,
    isEmpty,
} from 'lodash'

import {
    getTaskForsesByMember,
    getTaskForseApiUri,
} from '../../../../../config'

export default async ({ query }, res) => {
    if (isEmpty(query["Id"])) {
        return res.status(404).json({})
    } else {
        return res.status(200).json(
            map(
                await getTaskForsesByMember(query["Id"]),
                taskForse => ({
                    ...taskForse,
                    _url: getTaskForseApiUri(taskForse)
                })
            )
        )
    }
}
