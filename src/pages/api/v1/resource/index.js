import {
    isEmpty,
    map,
} from 'lodash'

import {
    getResources,
    getResourceApiUri,
    getTaskForses,
    getTaskForseSync,
} from '../../../../config'

export default async (req, res) => {
    const resources = await getResources()
    const taskForses = await getTaskForses()
    if (isEmpty(resources)) {
        return res.status(404).json([])
    } else {
        return res.status(200).json(
            map(
                resources,
                resource => ({
                    ...resource,
                    "Task forse": getTaskForseSync(resource["Task forse"], taskForses),
                    _url: getResourceApiUri(resource)
                })
            )
        )
    }
}
