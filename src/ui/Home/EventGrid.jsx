import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { 
  Grid,
  Typography,
  Card,
  CardActions,
  CardMedia,
  CardContent,
} from '@material-ui/core'
import { Favorite as FavoriteIcon } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { Share as ShareIcon } from '@material-ui/icons'

/* User */
import Tag from 'ui/ui-elements/Tag'
import * as eventsSelectors from 'store/selectors/events-selectors'
import { green } from 'logger'

const styles = theme => ({
  action: {
    border: 'none',
  },
  actions: {
    // alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    height: 41.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 15px 0px 15px',
  },
  card: {
    // borderRight: 'solid 1px white',
    minHeight: 0,
    minWidth: 0,
    // maxHeight: 800,
    // maxWidth: 300,
    padding: '15px 5px 0 5px',
  },
  cardContent: {
    padding: '5px 15px 5px 15px',
    borderBottom: 'solid 0.5px gray',
  },
  image: {
    margin: 'auto',
    width: '100%',
  },
  root: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: '50%',
  },
  pageMock: {
    margin: 'auto',
    // backgroundColor: 'blue',
  },
  tags: {
    // color: theme.palette.primary.contrastText,
    display: 'flex',
    flexFlow: 'row nowrap',
    overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
  },
  time: {
    overflow: 'hidden',
    paddingTop: '.4rem',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  title: {
    height: '40px',
    letterSpacing: '0px',
    lineHeight: '19px',
    margin: 0,
    overflow: 'hidden',
    paddingTop: '5px',
  },
  organization: {
    height: '33px',
    lineHeight: '16.5px',
    overflow: 'hidden',
    paddingTop: '7px',
    paddingBottom: '4px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  venue: {
    overflow: 'hidden',
    paddingTop: '7px',
    paddingBottom: '4px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  grid1111: {
    // backgroundColor: 'green',
    paddingBottom: '40px'
  },
  grid22222: {
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    // backgroundColor: 'blue',
    // margin: '30px',
    // margin: 'auto',
    // color: 'orange',
    margin: '30px',
    padding: '30px',
    // border: 'solid 3px orange'
  },
  // grid3: {
  //   // border: 'solid 1px yellow',
  //   backgroundColor: 'pink',
  //   margin: 'auto',
  // },
})

const hourAmPm = (date) => {
  const h = date.getHours()
  const m = date.getMinutes()
  // console.log('h', h)
  // console.log('m', m)
  return (h > 12)
    ? `${h-12}:${m} PM`
    : `${h}:${m} AM`
}

const formattedDate = (isoDateString) => {
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const d = new Date(isoDateString)
  const MMM = monthNames[d.getMonth()]
  const DDD = dayNames[d.getDay()]
  const dd = d.getDate()
  const hour = hourAmPm(d)
  return `${DDD}, ${MMM} ${dd} ${hour}`
}

class EventGrid extends React.Component {
  state = {
    spacing: '16'
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    })
  }

  render() {
    const { classes, events } = this.props
    // green('events', events)
    return (
      <div className={classes.pageMock}>
        <Grid container spacing={Number(8)} className={classes.grid1111} >
          {events.map(c => {
            return (
              <Grid key={c._id} item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.grid2222}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={c.imageUrl}
                    >
                  </CardMedia>
                  <CardContent className={classes.cardContent}>
                    <Typography variant='caption' component='p' noWrap className={classes.time}>
                      {formattedDate(c.startDateTime)}
                    </Typography>
                    <Typography variant='subheading' component='p' className={classes.title}>
                      {c.title}
                    </Typography>
                    <Typography variant='caption' component='p' noWrap className={classes.organization}>
                      {c.organization}
                    </Typography>
                    <Typography variant='caption' component='p' noWrap className={classes.venue}>
                      {c.venue}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.actions} disableActionSpacing>
                    <div className={classes.tags}>
                      {c.tags.map((t, index) => (
                        <Tag key={`t${index}`} label={t} />
                      ))}
                    </div>
                    <div className={classes.actions}>
                      <div className={classes.action}>
                        <IconButton aria-label='Add to favorites'>
                          <FavoriteIcon />
                        </IconButton>
                      </div>
                      <div className={classes.action}>
                        <IconButton aria-label='Share'>
                          <ShareIcon />
                        </IconButton>
                      </div>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

EventGrid.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    events: eventsSelectors.getAllEvents(state)
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(EventGrid)
