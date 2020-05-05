import axios from 'axios'

import {
    map,
    filter,
    groupBy,
    values,
    range,
    find,
    zipObject,
    padStart,
    join,
} from 'lodash'

const GSHEET_PREFIX = `${process.env.PROXY_URL || "https://spreadsheets.google.com"}/feeds/cells`
const GSHEET_SUFFIX = "public/full?alt=json"
const GSHEET_ID = "15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8"
const GSHEET_SHEET_META = 1
const GSHEET_SHEET_TASKFORSES = 2
const GSHEET_SHEET_MEMBERS = 3
const GSHEET_SHEET_MINUTES = 4
const GSHEET_SHEET_RESOURCES = 5

const getGSheetUrl = sheet => `/${sheet}/${GSHEET_SUFFIX}`

const GFORM_PREFIX = "https://docs.google.com/forms/d/e"
const GFORM_SUFFIX = "viewform"
export const GFORM_URL_TASKFORSE = `${GFORM_PREFIX}/1FAIpQLScDhV6oWfWaBhKiyALhFNq85W8O2_BI2I9ujUsXH2H8tM6Gwg/${GFORM_SUFFIX}`
export const GFORM_FIELDS_TASKFORSE = { "Id":"", "Nome":"1362059608", "Sito web":"1088344564", "Data di istituzione":"", "Data inizio lavori":"", "Data fine lavori":"", "Istituzione di riferimento":"243852443", "Descrizione":"1284557778" }
export const GFORM_URL_MEMBER = `${GFORM_PREFIX}/1FAIpQLSeZ8hkfUPPYEIHacQPjh-t0dGtp4aAkNoT7PNx1ZFcvsr1wCA/${GFORM_SUFFIX}`
export const GFORM_FIELDS_MEMBER = { "Task forse":"1362059608", "Nome":"731821199", "Cognome":"959101228", "Genere":"1661250724", "Foto":"744634925", "Istituto di affiliazione":"572162091", "Anno di nascita":"413223009", "Luogo di nascita":"601210153", "Professione":"1971278820", "Ruolo":"2043565287" }
export const GFORM_URL_MINUTE = `${GFORM_PREFIX}/1FAIpQLSegY4ktGyitg9VVn-K3UP-enzNxvThqz6cxjpUA6NWAqzMcLQ/${GFORM_SUFFIX}`
export const GFROM_FIELDS_MINUTE = { "Task forse":"1362059608" }
export const GFORM_URL_RESOURCE = `${GFORM_PREFIX}/1FAIpQLSegY4ktGyitg9VVn-K3UP-enzNxvThqz6cxjpUA6NWAqzMcLQ/${GFORM_SUFFIX}`
export const GFROM_FIELDS_RESOURCE = { "Task forse":"1362059608" }
export const GFORM_URL_ISSUE = `${GFORM_PREFIX}/1FAIpQLSfLU1vs2k0sm3zPlLpvSpn_txb0oYHftbaDCUGS0UXm6BbyeA/${GFORM_SUFFIX}`

export const getGFormUrl = (form, params, fields) => `${form}?${join(map(params, (v,k) => `${encodeURIComponent(`entry.${fields[k]}`)}=${encodeURIComponent(v)}`),"&")}`

export const AVATARS = { "f": "/unknown-woman.png", "m": "/unknown-man.png" }

const api = axios.create({
    baseURL: `${GSHEET_PREFIX}/${GSHEET_ID}`,
})

export const normalizeId = id => String(id).toLowerCase()

export async function getMeta() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_META)))
}

export async function getTaskForses() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_TASKFORSES)))
}

export async function getTaskForse(id) {
    return id ? find(
        await getTaskForses(),
        e => getTaskForseId(e) === normalizeId(id)
    ) || {} : {}
}

export const getTaskForseId = taskForse => normalizeId(taskForse["Id"])
export const getTaskForseUri = taskForse => `/task-forse/${getTaskForseId(taskForse)}`
export const getTaskForseApiUri = taskForse => `/api${getTaskForseUri(taskForse)}`

export async function getMembers() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_MEMBERS)))
}

export async function getMember(id) {
    return id ? find(
        await getMembers(),
        e => getMemberId(e) === normalizeId(id)
    ) || {} : {}
}

export const getMemberId = member => normalizeId(member["Id"])
export const getMemberUri = member => `/member/${getMemberId(member)}`
export const getMemberApiUri = member => `/api${getMemberUri(member)}`

export async function getMembersByTaskForse(id) {
    return id ? filter(
        await getMembers(),
        e => normalizeId(e["Task forse"]) === normalizeId(id)
    ) : []
}

export async function getMinutes() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_MINUTES)))
}

export async function getMinute(id) {
    return id ? find(
        await getMinutes(),
        e => getMinuteId(e) === normalizeId(id)
    ) || {} : {}
}

export const getMinuteId = minute => normalizeId(`${minute["Task forse"]}-${minute["Id"]}`)
export const getMinuteUri = minute => `/minute/${getMinuteId(minute)}`
export const getMinuteApiUri = minute => `/api${getMinuteUri(minute)}`

export async function getMinutesByTaskForse(id) {
    return id ? filter(
        await getMinutes(),
        e => normalizeId(e["Task forse"]) === normalizeId(id)
    ) : []
}

export async function getResources() {
    return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_RESOURCES)))
}

export async function getResource(id) {
    return id ? find(
        await getResources(),
        e => getResourceId(e) === normalizeId(id)
    ) || {} : {}
}
export const getResourceId = resource => normalizeId(`${resource["Task forse"]}-${resource["Id"]}`)
export const getResourceUri = resource => `/resource/${getResourceId(resource)}`
export const getResourceApiUri = resource => `/api${getResourceUri(resource)}`

export async function getResourcesByTaskForse(id) {
    return id ? filter(
        await getResources(),
        e => normalizeId(e["Task forse"]) === normalizeId(id)
    ) : []
}

function normalizeGSheetJSON(response) {

    const dataKeys = map(
        filter(
            response.data.feed.entry,
            e => +e["gs$cell"].row === 1
        ),
        e => +e["gs$cell"]["$t"] || e["gs$cell"]["$t"] || null
    )

    const dataValues = map(
        values(
            groupBy(
                filter(
                    response.data.feed.entry,
                    e => +e["gs$cell"].row > 1
                ),
                e => e["gs$cell"].row
            )
        ),
        row => map(
            range(dataKeys.length),
            col => {
                const e = find(row, c => +c["gs$cell"].col === col + 1)
                return e ? (+e["gs$cell"]["$t"] || e["gs$cell"]["$t"]) : null
            }
        )
    )

    return map(
        dataValues,
        v => zipObject(
            dataKeys,
            v
        )
    )

}

export const yyyy = dt => padStart((new Date(dt)).getFullYear(),4,0)
export const mm = dt => padStart((new Date(dt)).getMonth()+1,2,0)
export const dd = dt => padStart((new Date(dt)).getDate(),2,0)

export const yyyymmdd = dt => `${yyyy(dt)}/${mm(dt)}/${dd(dt)}`
export const ddmmyyyy = dt => `${dd(dt)}/${mm(dt)}/${yyyy(dt)}`
export const mmddyyyy = dt => `${mm(dt)}/${dd(dt)}/${yyyy(dt)}`
