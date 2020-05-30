import { isEmpty, map } from 'lodash'

import {
    getTaskForse,
    getMembersByTaskForse,
    getMemberApiUri,
} from '../../../../../../config'

export default async ({ query }, res) => {
    const taskForse = await getTaskForse(query["Id"])
    if (isEmpty(taskForse)) {
        return res.status(404).json({})
    } else {
        return res.status(200).json(
            map(
                await getMembersByTaskForse(taskForse["Id"]),
                member => ({
                    ...member,
                    "Task forse": taskForse,
                    _url: getMemberApiUri(member)
                })
            )
        )
    }
}
