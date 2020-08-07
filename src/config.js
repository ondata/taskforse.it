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
  includes,
  split,
  toNumber,
  orderBy,
  isNaN
} from 'lodash'

export const API_VERSION = 'v1'
export const REVALIDATE_INTERVAL = 300 // In seconds

const GSHEET_PREFIX = `${process.env.PROXY_URL || 'https://spreadsheets.google.com'}/feeds/cells`
const GSHEET_SUFFIX = 'public/full?alt=json'
const GSHEET_ID = '15LmCiYKg2cWzovAiqquhp_lYsaBSuGNau7suUkQddl8'
export const GSHEET_SHEET_META = 1
export const GSHEET_SHEET_TASKFORSES = 2
export const GSHEET_SHEET_MEMBERS = 3
export const GSHEET_SHEET_MINUTES = 4
export const GSHEET_SHEET_RESOURCES = 5
export const GSHEET_MULTIFIELDS_SEPARATOR = ';'

const getGSheetUrl = sheet => `/${sheet}/${GSHEET_SUFFIX}`

const GFORM_PREFIX = 'https://docs.google.com/forms/d/e'
const GFORM_SUFFIX = 'viewform'
export const GFORM_URL_TASKFORSE = `${GFORM_PREFIX}/1FAIpQLScDhV6oWfWaBhKiyALhFNq85W8O2_BI2I9ujUsXH2H8tM6Gwg/${GFORM_SUFFIX}`
export const GFORM_FIELDS_TASKFORSE = { Id: '834271559', Nome: '1362059608', 'Sito web': '1088344564', 'Data di istituzione': '367732443', 'Data inizio lavori': '600188309', 'Data fine lavori': '1026929266', 'Istituzione di riferimento': '243852443', Descrizione: '1284557778' }
export const GFORM_URL_MEMBER = `${GFORM_PREFIX}/1FAIpQLSeZ8hkfUPPYEIHacQPjh-t0dGtp4aAkNoT7PNx1ZFcvsr1wCA/${GFORM_SUFFIX}`
export const GFORM_FIELDS_MEMBER = { Id: '531198919', 'Task forses': '1362059608', Nome: '731821199', Cognome: '959101228', Genere: '1661250724', Foto: '744634925', 'Istituto di affiliazione': '572162091', 'Anno di nascita': '413223009', 'Luogo di nascita': '601210153', Professione: '1971278820', Ruolo: '2043565287' }
export const GFORM_URL_MINUTE = `${GFORM_PREFIX}/1FAIpQLSegY4ktGyitg9VVn-K3UP-enzNxvThqz6cxjpUA6NWAqzMcLQ/${GFORM_SUFFIX}`
export const GFROM_FIELDS_MINUTE = { 'Task forse': '1362059608' }
export const GFORM_URL_RESOURCE = `${GFORM_PREFIX}/1FAIpQLSegY4ktGyitg9VVn-K3UP-enzNxvThqz6cxjpUA6NWAqzMcLQ/${GFORM_SUFFIX}`
export const GFROM_FIELDS_RESOURCE = { 'Task forse': '1362059608' }
export const GFORM_URL_ISSUE = `${GFORM_PREFIX}/1FAIpQLSfLU1vs2k0sm3zPlLpvSpn_txb0oYHftbaDCUGS0UXm6BbyeA/${GFORM_SUFFIX}`

export const getGFormUrl = (form, params, fields) => `${form}?${join(map(params, (v, k) => `${encodeURIComponent(`entry.${fields[k]}`)}=${encodeURIComponent(v || '')}`), '&')}`

export const AVATARS = { f: '/unknown-woman.png', m: '/unknown-man.png' }

const api = axios.create({
  baseURL: `${GSHEET_PREFIX}/${GSHEET_ID}`
})

export const normalizeId = id => id ? String(id).toLowerCase() : ''

export async function getMeta () {
  return normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_META)))
}

export async function getTaskForses () {
  return orderBy(filter(
    normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_TASKFORSES))),
    taskForse => !!getTaskForseId(taskForse)
  ), ['Data di istituzione'], ['asc'])
}

export async function getTaskForse (id) {
  return id ? find(
    await getTaskForses(),
    taskForse => getTaskForseId(taskForse) === normalizeId(id)
  ) || {} : {}
}

export function getTaskForseSync (id, taskForses) {
  return id ? find(
    taskForses,
    taskForse => getTaskForseId(taskForse) === normalizeId(id)
  ) || {} : {}
}

export const getTaskForseId = taskForse => normalizeId(taskForse.Id)
export const getTaskForseUri = taskForse => `/task-forse/${getTaskForseId(taskForse)}`
export const getTaskForseApiUri = taskForse => `/api/${API_VERSION}${getTaskForseUri(taskForse)}`

export async function getMembers () {
  return filter(
    normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_MEMBERS))),
    member => !!getMemberId(member)
  )
}

export async function getMember (id) {
  return id ? find(
    await getMembers(),
    member => getMemberId(member) === normalizeId(id)
  ) || {} : {}
}

export const getMemberId = member => normalizeId(member.Id)
export const getMemberUri = member => `/member/${getMemberId(member)}`
export const getMemberApiUri = member => `/api/${API_VERSION}${getMemberUri(member)}`

export async function getMembersByTaskForse (id) {
  return id ? filter(
    await getMembers(),
    member => includes(
      map(
        split(
          member['Task forses'],
          GSHEET_MULTIFIELDS_SEPARATOR
        ),
        normalizeId
      ),
      normalizeId(id)
    )
  ) : []
}

export function getMembersByTaskForseSync (id, members) {
  return id ? filter(
    members,
    member => includes(
      map(
        split(
          member['Task forses'],
          GSHEET_MULTIFIELDS_SEPARATOR
        ),
        normalizeId
      ),
      normalizeId(id)
    )
  ) : []
}

export async function getTaskForsesByMember (id) {
  if (!id) return []

  const member = await getMember(id)
  const taskForses = await getTaskForses()

  return filter(
    taskForses,
    taskForse => includes(
      map(
        split(
          member['Task forses'],
          GSHEET_MULTIFIELDS_SEPARATOR
        ),
        normalizeId
      ),
      getTaskForseId(taskForse)
    )
  )
}

export function getTaskForsesByMemberSync (member, taskForses) {
  return filter(
    taskForses,
    taskForse => includes(
      map(
        split(
          member['Task forses'],
          GSHEET_MULTIFIELDS_SEPARATOR
        ),
        normalizeId
      ),
      getTaskForseId(taskForse)
    )
  )
}

export async function getMinutes () {
  return orderBy(filter(
    normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_MINUTES))),
    minute => !!getMinuteId(minute)
  ), ['Data di pubblicazione'], ['desc'])
}

export async function getMinute (id) {
  return id ? find(
    await getMinutes(),
    e => getMinuteId(e) === normalizeId(id)
  ) || {} : {}
}

export const getMinuteId = minute => minute.Id ? normalizeId(`${minute['Task forse']}-${minute.Id}`) : ''
export const getMinuteUri = minute => `/minute/${getMinuteId(minute)}`
export const getMinuteApiUri = minute => `/api/${API_VERSION}${getMinuteUri(minute)}`

export async function getMinutesByTaskForse (id) {
  return id ? filter(
    await getMinutes(),
    minute => normalizeId(minute['Task forse']) === normalizeId(id)
  ) : []
}

export function getMinutesByTaskForseSync (id, minutes) {
  return id ? filter(
    minutes,
    minute => normalizeId(minute['Task forse']) === normalizeId(id)
  ) : []
}

export async function getResources () {
  return filter(
    normalizeGSheetJSON(await api.get(getGSheetUrl(GSHEET_SHEET_RESOURCES))),
    resource => getResourceId(resource)
  )
}

export async function getResource (id) {
  return id ? find(
    await getResources(),
    e => getResourceId(e) === normalizeId(id)
  ) || {} : {}
}
export const getResourceId = resource => resource.Id ? normalizeId(`${resource['Task forse']}-${resource.Id}`) : ''
export const getResourceUri = resource => `/resource/${getResourceId(resource)}`
export const getResourceApiUri = resource => `/api/${API_VERSION}${getResourceUri(resource)}`

export async function getResourcesByTaskForse (id) {
  return id ? filter(
    await getResources(),
    resource => normalizeId(resource['Task forse']) === normalizeId(id)
  ) : []
}

export function getResourcesByTaskForseSync (id, resources) {
  return id ? filter(
    resources,
    resource => normalizeId(resource['Task forse']) === normalizeId(id)
  ) : []
}

function normalizeGSheetJSON (response) {
  const dataKeys = map(
    filter(
      response.data.feed.entry,
      e => toNumber(e.gs$cell.row) === 1
    ),
    e => isNaN(toNumber(e.gs$cell.$t)) ? e.gs$cell.$t || null : toNumber(e.gs$cell.$t)
  )

  const dataValues = map(
    values(
      groupBy(
        filter(
          response.data.feed.entry,
          e => toNumber(e.gs$cell.row) > 1
        ),
        e => e.gs$cell.row
      )
    ),
    row => map(
      range(dataKeys.length),
      col => {
        const e = find(row, c => toNumber(c.gs$cell.col) === col + 1)
        if (!e || !e.gs$cell) return null
        return isNaN(toNumber(e.gs$cell.$t)) ? e.gs$cell.$t || '' : toNumber(e.gs$cell.$t)
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

export const yyyy = dt => padStart((new Date(dt)).getFullYear(), 4, 0)
export const mm = dt => padStart((new Date(dt)).getMonth() + 1, 2, 0)
export const dd = dt => padStart((new Date(dt)).getDate(), 2, 0)

export const yyyymmdd = dt => `${yyyy(dt)}/${mm(dt)}/${dd(dt)}`
export const ddmmyyyy = dt => `${dd(dt)}/${mm(dt)}/${yyyy(dt)}`
export const mmddyyyy = dt => `${mm(dt)}/${dd(dt)}/${yyyy(dt)}`
