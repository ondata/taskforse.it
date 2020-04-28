import { isEmpty, map } from 'lodash'
import { getResources, getResourceUri } from '../../../config'

export default async (req, res) => {
    const resources = await getResources()
    if (isEmpty(resources)) {
        return res.status(404).json([])
    } else {
        return res.status(200).json(
            map(
                resources,
                resource => ({ ...resource, _url: getResourceUri(resource) })
            )
        )
    }
}
