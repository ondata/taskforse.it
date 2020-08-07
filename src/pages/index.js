import Link from 'next/link'

import {
  map,
  sumBy
} from 'lodash'

import {
  getTaskForses,
  getTaskForseId,
  getTaskForseUri,

  GFORM_URL_TASKFORSE,
  getGFormUrl,

  REVALIDATE_INTERVAL
} from '../config'

import {
  Container,
  Typography,
  List,
  Divider,
  Grid
} from '@material-ui/core'

import {
  ArrowForward,
  Add
} from '@material-ui/icons'

import {
  Header,
  Footer,
  IconListItem,
  IconListAddItem,
  TextListItem,
  BarListItem,
  Counter
} from '../components'

export default function Index ({
  taskForses = []
}) {
  return (
    <>
      <Header
        suptitle='nel dubbio ...'
        title={<>Task<br />Forse</>}
        subtitle={<>by @<a target='_blank' href='https://twitter.com/ondatait' rel='noopener noreferrer'>ondatait</a></>}
      />

      <main>

        <Container maxWidth='sm'>

          <Typography gutterBottom>
                        In seguito allo stato di emergenza nazionale da COVID-19, sono state istituite numerose <strong>task force</strong>, le cui informazioni sono disperse in molte pagine web e documenti pdf difficilmente reperibili.
          </Typography>

          <Typography gutterBottom>
                        Con il progetto <strong>Task Forse</strong> vogliamo raccoglierle e organizzarle in un unico luogo, per metterle a disposizione di tutti. <a target='_blank' href={getGFormUrl(GFORM_URL_TASKFORSE)} rel='noopener noreferrer'>Dai una mano anche tu!</a>
          </Typography>

          <Grid container spacing={4} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
            <Grid item xs={6}>
              <Counter count={sumBy(taskForses, 'Numero membri conosciuti') || '-'} title='Membri delle task force' />
            </Grid>
            <Grid item xs={6}>
              <Counter count={taskForses.length || '-'} title='Task force istituite' />
            </Grid>
          </Grid>

        </Container>

        <Container maxWidth='sm'>

          <Typography variant='h2' gutterBottom>
                        Tutte le task force
          </Typography>

          <Typography gutterBottom>
                        Al momento sappiamo che {taskForses.length} task force sono attive con lo specifico mandato di gestire l'emergenza COVID-19.
            {' '}Se hai informazioni su task force non presenti in questo elenco, <a target='_blank' href={getGFormUrl(GFORM_URL_TASKFORSE)} rel='noopener noreferrer'>mandaci tutti i dettagli</a>.
          </Typography>

        </Container>

        <Container maxWidth='md'>

          <List>
            <a target='_blank' href={GFORM_URL_TASKFORSE} rel='noopener noreferrer'>
              <IconListAddItem
                primary='Segnala una nuova task force'
                icon={<Add />}
              />
              <Divider variant='inset' />
            </a>
            {
              map(
                taskForses,
                (taskForse, index, arr) => (
                  <Link key={getTaskForseId(taskForse)} href='/task-forse/[Id]' as={getTaskForseUri(taskForse)}>
                    <span>
                      <IconListItem
                        primary={taskForse.Nome}
                        secondary={taskForse.Descrizione}
                        icon={<ArrowForward />}
                      />
                      {index < arr.length - 1 && <Divider variant='inset' />}
                    </span>
                  </Link>
                )
              )
            }
          </List>

        </Container>

        <Container maxWidth='sm'>

          <Typography variant='h2' gutterBottom>
                        Task force in numeri
          </Typography>

          <List>

            <TextListItem
              keyText='Task force istituite'
              valueText={taskForses.length}
            />

            <TextListItem
              keyText='Risorse pubblicate'
              valueText={sumBy(
                taskForses,
                tf => +tf['Numero verbali pubblicati'] || 0
              ) + sumBy(
                taskForses,
                tf => +tf['Numero risorse disponibili'] || 0
              )}
            />

            <TextListItem
              keyText='Membri nominati'
              valueText={sumBy(taskForses, 'Numero membri conosciuti')}
            />

            <BarListItem
              items={[
                { label: 'Donne', value: sumBy(taskForses, tf => +tf['Numero donne'] || 0), color: 'primary' },
                { label: 'Uomini', value: sumBy(taskForses, tf => +tf['Numero uomini'] || 0), color: 'secondary' }
              ]}
            />

            {/* <TextListItem
                            keyText="Task force attive"
                            valueText={
                                filter(
                                    taskForses,
                                    tf => !tf["Data fine lavori"] || (new Date(tf["Data fine lavori"])) > (new Date())
                                ).length
                            }
                        /> */}

          </List>

          {/* <Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            disableElevation
                            startIcon={<Add />}
                            fullWidth
                            target="_blank"
                            href={getGFormUrl(GFORM_URL_TASKFORSE)}
                        >
                            Segnala una nuova task force
                        </Button>
                    </Typography> */}

        </Container>

      </main>

      <Footer />
    </>
  )
}

export async function getStaticProps () {
  return {
    props: {
      taskForses: await getTaskForses()
    },
    revalidate: REVALIDATE_INTERVAL
  }
}
