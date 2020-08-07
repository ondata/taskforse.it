import { useRouter } from 'next/router'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import extractDomain from 'url-domain-name'

import {
  map,
  isEmpty,
  range,
  orderBy,
  max,
  filter
} from 'lodash'

import {
  getTaskForse,
  getTaskForseId,
  getTaskForses,
  getMembersByTaskForse,
  getMemberId,
  getMemberUri,
  getMinutesByTaskForse,
  getMinuteId,
  getResourcesByTaskForse,
  getResourceId,
  ddmmyyyy,

  GFORM_URL_TASKFORSE,
  GFORM_FIELDS_TASKFORSE,
  GFORM_URL_MEMBER,
  GFORM_FIELDS_MEMBER,
  GFORM_URL_MINUTE,
  GFROM_FIELDS_MINUTE,
  GFORM_URL_RESOURCE,
  GFROM_FIELDS_RESOURCE,
  getGFormUrl,

  AVATARS,

  REVALIDATE_INTERVAL
} from '../../../config'

import {
  Container,
  Typography,
  List,
  Grid,
  Divider,
  useMediaQuery,
  Button
} from '@material-ui/core'

import { useTheme } from '@material-ui/core/styles'

import {
  Group,
  Description,
  InsertLink,
  Edit,
  ArrowForward,
  Add,
  TouchApp
} from '@material-ui/icons'

import {
  Header,
  Footer,
  GridItem,
  IconListItem,
  IconListAddItem,
  TextListItem,
  GridAddItem,
  CountBadge,
  Counter,
  BarListItem
} from '../../../components'

export default function Index ({
  taskForse = {},
  members = [],
  minutes = [],
  resources = []
}) {
  const router = useRouter()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  if (router.isFallback) {
    return (
      <Container maxWidth='sm'>
        <Typography>Loading...</Typography>
      </Container>
    )
  } else {
    return (
      <>
        <NextSeo
          title={taskForse.Nome}
          description={taskForse.Descrizione}
          openGraph={{
            title: `${taskForse.Nome} | Task Forse by @ondatait`,
            description: taskForse.Descrizione
          }}
        />

        <Header
          title='Tutte le task force'
          href='/'
          as='/'
        />

        <main>
          <Container maxWidth='sm'>

            <Typography variant='h1' gutterBottom>{`${taskForse.Nome || 'N/A'}`}</Typography>
            <Typography gutterBottom align='center'>{taskForse.Descrizione}</Typography>

            <Grid container justify='center'>
              <Grid item xs={12} sm={6}>
                <Counter count={members.length || '-'} title={`Membr${members.length > 1 ? 'i' : 'o'} della task force`} />
                <List>
                  <BarListItem
                    items={[
                      { label: 'Donne', value: filter(members, member => member.Genere === 'F').length, color: 'primary' },
                      { label: 'Uomini', value: filter(members, member => member.Genere === 'M').length, color: 'secondary' }
                    ]}
                  />
                </List>
              </Grid>
            </Grid>

            <Typography variant='h2' gutterBottom>Mission</Typography>
            <Typography>{taskForse.Mission || <span style={{ backgroundColor: 'black', opacity: 0.87 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In accumsan dolor molestie mattis vulputate. Donec auctor fringilla blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla in tincidunt odio. Proin a luctus nulla. Vivamus tincidunt est risus, quis facilisis lacus interdum id. Donec a semper dolor, auctor consectetur quam.</span>}</Typography>

            <List>

              <TextListItem
                keyText={<><TouchApp fontSize='small' color='secondary' />Sito web ufficiale</>}
                valueText={!!taskForse['Sito web'] && <a target='_blank' href={taskForse['Sito web']} rel='noopener noreferrer'>{extractDomain.from(taskForse['Sito web'])}</a>}
              />

              <TextListItem
                keyText='Istituzione di riferimento'
                valueText={taskForse['Istituzione di riferimento']}
              />

              <TextListItem
                keyText='Data di istituzione'
                valueText={ddmmyyyy(taskForse['Data di istituzione'] || taskForse['Data inizio lavori'])}
              />

              {
                !!taskForse['Data inizio lavori'] && taskForse['Data inizio lavori'] !== (taskForse['Data di istituzione'] || taskForse['Data inizio lavori']) &&
                  <TextListItem
                    keyText='Inizio dei lavori'
                    valueText={ddmmyyyy(taskForse['Data inizio lavori'])}
                  />
              }

              {
                !!taskForse['Data fine lavori'] &&
                  <TextListItem
                    keyText='Fine dei lavori'
                    valueText={ddmmyyyy(taskForse['Data fine lavori'])}
                  />
              }

              <TextListItem
                keyText='Verbali pubblicati'
                valueText={taskForse['Numero verbali pubblicati']}
              />

              <TextListItem
                keyText='Altre risorse pubbliche'
                valueText={taskForse['Numero risorse disponibili']}
              />

            </List>

            <Typography align='center'>
              <Button
                variant='contained'
                color='secondary'
                disableElevation
                startIcon={<Edit />}
                target='_blank'
                fullWidth
                href={getGFormUrl(
                  GFORM_URL_TASKFORSE,
                  taskForse,
                  GFORM_FIELDS_TASKFORSE
                )}
              >
                Proponi una modifica
              </Button>
            </Typography>

            <Typography variant='h2' gutterBottom>
                            Membri della task force
              {!isEmpty(members) && <CountBadge count={members.length} color='secondary'><Group /></CountBadge>}
            </Typography>
            <Typography gutterBottom>
              {!!taskForse['Numero membri'] && isEmpty(members) && `Questa task force risulta composta da ${taskForse['Numero membri']} membr${taskForse['Numero membri'] > 1 ? 'i' : 'o'}, ma non ne conosciamo ancora nessuno.`}
              {!!taskForse['Numero membri'] && members.length >= taskForse['Numero membri'] && `Questa task force risulta composta da ${taskForse['Numero membri']} membr${taskForse['Numero membri'] > 1 ? 'i' : 'o'}, li trovi elencati tutti qui.`}
              {!!taskForse['Numero membri'] && members.length < taskForse['Numero membri'] && `Questa task force risulta composta da ${taskForse['Numero membri']} membr${taskForse['Numero membri'] > 1 ? 'i' : 'o'}, ma ne conosciamo ancora solo ${members.length}.`}
              {!taskForse['Numero membri'] && isEmpty(members) && 'Nessun membro conosciuto.'}
              {!taskForse['Numero membri'] && !isEmpty(members) && `Questa task force è composta da ${members.length} membr${members.length > 1 ? 'i' : 'o'}.`}
              {' '}Se hai informazioni su membri della task force non presenti in questo elenco, <a target='_blank' href={getGFormUrl(GFORM_URL_MEMBER, { 'Task forse': taskForse.Id }, GFORM_FIELDS_MEMBER)} rel='noopener noreferrer'>mandaci tutti i dettagli</a>.
            </Typography>

          </Container>

          <Container maxWidth='lg'>

            {
              isEmpty(members) && !taskForse['Numero membri']
                ? (
                  <Typography>Nessun membro conosciuto.</Typography>
                ) : (
                  <Grid container spacing={1}>

                    <Grid item xs={12} sm={6} md={3}>
                      <a
                        target='_blank'
                        href={getGFormUrl(
                          GFORM_URL_MEMBER,
                          { 'Task forses': taskForse.Id },
                          GFORM_FIELDS_MEMBER
                        )}
                        rel='noopener noreferrer'
                      >
                        <GridAddItem />
                      </a>
                    </Grid>

                    {// Known members
                      map(
                        orderBy(
                          members,
                          ['Cognome'],
                          ['asc']
                        ),
                        member => (
                          <Grid item xs={12} sm={6} md={3} key={getMemberId(member)}>
                            <Link href='/member/[Id]' as={getMemberUri(member)}>
                              <a>
                                <GridItem
                                  title={<>{member.Nome}<br />{member.Cognome}</>}
                                  subtitle={member.Ruolo || 'Membro'}
                                  image={member.Foto || AVATARS[member.Genere.toLowerCase()]}
                                />
                              </a>
                            </Link>
                          </Grid>
                        )
                      )
                    }

                    {// Unknown members
                      map(
                        range(max([0, taskForse['Numero membri'] - members.length])),
                        i => (
                          <Grid item xs={12} sm={6} md={3} key={i}>
                            <a
                              target='_blank'
                              href={getGFormUrl(
                                GFORM_URL_MEMBER,
                                { 'Task forses': taskForse.Id },
                                GFORM_FIELDS_MEMBER
                              )}
                              rel='noopener noreferrer'
                            >
                              <GridAddItem topsecret />
                            </a>
                          </Grid>
                        )
                      )
                    }

                    {
                      members.length > 15 &&
                        <Grid item xs={12} sm={6} md={3}>
                          <a
                            target='_blank'
                            href={getGFormUrl(
                              GFORM_URL_MEMBER,
                              { 'Task forses': taskForse.Id },
                              GFORM_FIELDS_MEMBER
                            )}
                            rel='noopener noreferrer'
                          >
                            <GridAddItem />
                          </a>
                        </Grid>
                    }

                  </Grid>
                )
            }

          </Container>

          <Container maxWidth='md'>

            <Grid container spacing={matches ? 1 : 8}>

              <Grid item xs={12} sm={6}>

                <Typography variant='h2' gutterBottom>
                  Verbali {!isEmpty(minutes) && <CountBadge count={minutes.length} color='secondary'><Description /></CountBadge>}
                </Typography>

                <Typography gutterBottom>
                  {!!taskForse['Numero verbali'] && isEmpty(minutes) && `Questa task force risulta aver prodotto e pubblicato ${taskForse['Numero verbali']} verbal${taskForse['Numero verbali'] > 1 ? 'i' : 'e'}, ma non ne conosciamo ancora nessuno.`}
                  {!!taskForse['Numero verbali'] && minutes.length >= taskForse['Numero verbali'] && `Questa task force risulta aver prodotto e pubblicato ${taskForse['Numero verbali']} verbal${taskForse['Numero verbali'] > 1 ? 'i' : 'e'}, li trovi elencati tutti qui.`}
                  {!!taskForse['Numero verbali'] && !isEmpty(minutes) && minutes.length < taskForse['Numero verbali'] && `Questa task force risulta aver prodotto e pubblicato ${taskForse['Numero verbali']} verbal${taskForse['Numero verbali'] > 1 ? 'i' : 'e'}, ma ne conosciamo ancora solo ${minutes.length}.`}
                  {!taskForse['Numero verbali'] && isEmpty(minutes) && 'Nessun verbale disponibile.'}
                  {!taskForse['Numero verbali'] && !isEmpty(minutes) && `Questa task force ha prodotto e pubblicato ${minutes.length} verbal${minutes.length > 1 ? 'i' : 'e'}.`}
                  {' '}Se hai informazioni su verbali prodotti e pubblicati dalla task force non presenti in questo elenco, <a target='_blank' href={getGFormUrl(GFORM_URL_MINUTE, { 'Task forse': taskForse.Id }, GFROM_FIELDS_MINUTE)} rel='noopener noreferrer'>mandaci tutti i dettagli</a>.
                </Typography>

                <List>

                  <a
                    target='_blank'
                    href={getGFormUrl(
                      GFORM_URL_MINUTE,
                      { 'Task forse': taskForse.Id },
                      GFROM_FIELDS_MINUTE
                    )}
                    rel='noopener noreferrer'
                  >
                    <IconListAddItem
                      primary='Suggerisci un verbale'
                      icon={<Add />}
                    />
                    <Divider variant='inset' />
                  </a>

                  {// Known minutes
                    map(
                      orderBy(
                        minutes,
                        'Data di pubblicazione',
                        'desc'
                      ),
                      (minute, index, arr) => (
                        <a key={getMinuteId(minute)} target='_blank' href={minute.URL || '#'} rel='noopener noreferrer'>
                          <IconListItem
                            primary={minute.Titolo}
                            secondary={ddmmyyyy(minute['Data di pubblicazione'])}
                            icon={<ArrowForward />}
                          />
                          <Divider variant='inset' />
                        </a>
                      )
                    )
                  }

                  {// Unknown minutes
                    map(
                      range(max([0, taskForse['Numero verbali'] - minutes.length])),
                      i => (
                        <a
                          key={i}
                          target='_blank'
                          href={getGFormUrl(
                            GFORM_URL_MINUTE,
                            { 'Task forse': taskForse.Id },
                            GFROM_FIELDS_MINUTE
                          )}
                          rel='noopener noreferrer'
                        >
                          <IconListItem
                            icon={<Add />}
                          />
                          <Divider variant='inset' />
                        </a>
                      )
                    )
                  }

                  {
                    minutes.length > 5 &&
                      <a
                        target='_blank'
                        href={getGFormUrl(
                          GFORM_URL_MINUTE,
                          { 'Task forse': taskForse.Id },
                          GFROM_FIELDS_MINUTE
                        )}
                        rel='noopener noreferrer'
                      >
                        <IconListAddItem
                          primary='Suggerisci un verbale'
                          icon={<Add />}
                        />
                      </a>
                  }

                </List>

              </Grid>

              <Grid item xs={12} sm={6}>

                <Typography variant='h2' gutterBottom>
                                    Risorse
                  {!isEmpty(resources) && <CountBadge count={resources.length} color='secondary'><InsertLink /></CountBadge>}
                </Typography>

                <Typography gutterBottom>
                  {!isEmpty(resources) && `A questa task force ${resources.length > 1 ? 'sono' : 'è'} associat${resources.length > 1 ? 'e' : 'a'} ${resources.length} risors${resources.length > 1 ? 'e' : 'a'} aggiuntiv${resources.length > 1 ? 'e' : 'a'}.`}
                  {isEmpty(resources) && 'Nessuna risorsa aggiuntiva disponibile.'}
                  {' '}Se hai informazioni su ulteriori risorse relative alla task force non presenti in questo elenco, <a target='_blank' href={getGFormUrl(GFORM_URL_RESOURCE, { 'Task forse': taskForse.Id }, GFROM_FIELDS_RESOURCE)} rel='noopener noreferrer'>mandaci tutti i dettagli</a>.
                </Typography>

                <List>

                  <a
                    target='_blank'
                    href={getGFormUrl(
                      GFORM_URL_RESOURCE,
                      { 'Task forse': taskForse.Id },
                      GFROM_FIELDS_RESOURCE
                    )}
                    rel='noopener noreferrer'
                  >
                    <IconListAddItem
                      primary='Suggerisci una risorsa'
                      icon={<Add />}
                    />
                    <Divider variant='inset' />
                  </a>

                  {
                    map(
                      resources,
                      resource => (
                        <a target='_blank' href={resource['Pagina web']} key={getResourceId(resource)} rel='noopener noreferrer'>
                          <IconListItem
                            primary={resource.Titolo}
                            secondary={resource.Categoria}
                            icon={<ArrowForward />}
                          />
                          <Divider variant='inset' />
                        </a>
                      )
                    )
                  }

                  {
                    resources.length > 5 &&
                      <a
                        target='_blank'
                        href={getGFormUrl(
                          GFORM_URL_RESOURCE,
                          { 'Task forse': taskForse.Id },
                          GFROM_FIELDS_RESOURCE
                        )}
                        rel='noopener noreferrer'
                      >
                        <IconListAddItem
                          primary='Suggerisci una risorsa'
                          icon={<Add />}
                        />
                      </a>

                  }

                </List>

              </Grid>

            </Grid>

          </Container>
        </main>
        <Footer />
      </>
    )
  }
}

export async function getStaticProps ({ params }) {
  return {
    props: {
      taskForse: await getTaskForse(params.Id),
      members: await getMembersByTaskForse(params.Id),
      minutes: await getMinutesByTaskForse(params.Id),
      resources: await getResourcesByTaskForse(params.Id)
    },
    revalidate: REVALIDATE_INTERVAL
  }
}

export async function getStaticPaths () {
  return {
    paths: map(
      await getTaskForses(),
      taskForse => ({ params: { Id: getTaskForseId(taskForse) } })
    ),
    fallback: true
  }
}
