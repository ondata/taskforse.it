import { isEmpty } from 'lodash'
import { getResource, getResourceApiUri } from '../../../config'

export default async ({ query }, res) => {
    const resource = await getResource(query["Id"])
    if (isEmpty(resource)) {
        return res.status(404).json({})
    } else {
        return res.status(200).json({ ...resource, _url: getResourceApiUri(resource) })
    }
}
