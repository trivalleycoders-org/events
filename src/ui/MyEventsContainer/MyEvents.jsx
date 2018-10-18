import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Grid,
} from '@material-ui/core'
/* User */
import Event from './Event'

/* Dev */
// eslint-disable-next-line
import { green } from 'logger'

const MyEvents = ({ classes, events }) => {

  return (
    <div id='MyEvents' className={classes.wrapper}>
      <Grid container spacing={Number(8)}>
        {events.map(e => {
          return (
            <Grid key={e._id} item xs={12} lg={6}>
              <Event
                event={e}
              />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

const styles = theme => ({
  wrapper: {
    [theme.breakpoints.only('sm')]: {
      paddingLeft: '10%',
      paddingRight: '10%',
    },
    [theme.breakpoints.only('md')]: {
      paddingLeft: '20%',
      paddingRight: '20%',
    },
  },
})

export default withStyles(styles)(MyEvents)
