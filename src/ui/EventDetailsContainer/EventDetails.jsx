import React from 'react'
import { Paper, Chip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import DateRangeIcon from '@material-ui/icons/DateRange'
import LocationIcon from '@material-ui/icons/LocationOn'
import BusinessIcon from '@material-ui/icons/Business'
import LinkIcon from '@material-ui/icons/Link'
import LabelIcon from '@material-ui/icons/Label'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import A from 'ui/ui-elements/A'
import Title from 'ui/ui-elements/typography/Title'
import Body1 from 'ui/ui-elements/typography/Body1'
import Subheading from 'ui/ui-elements/typography/Subheading'
import ResponsiveImage from 'ui/ui-elements/ResponsiveImage'

/* Dev */
// eslint-disable-next-line
import { green } from 'logger'

const hourAmPm = (date) => {
  const h = date.getHours()
  const tempMin = date.getMinutes()
  const m = (tempMin < 10) ? `0${tempMin}` : tempMin
  return (h > 12)
    ? `${h - 12}:${m} PM`
    : `${h}:${m} AM`
}

const formattedDate = (isoDateString) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const d = new Date(isoDateString)
  const MMM = monthNames[d.getMonth()]
  const DDD = dayNames[d.getDay()]
  const dd = d.getDate()
  const hour = hourAmPm(d)
  return `${DDD}, ${MMM} ${dd} ${hour}`
}

const EventDetails = ({ classes, event }) => {
  const price = event.price ? `$${event.price}` : 'Free'

  return (
    <div id='EventDetails'>
      <Paper className={classes.wrapper}>
        <div className={classes.picDatePrice}>
          <div className={classes.image}>
            <ResponsiveImage src={event.imageUrl} />
          </div>
          <div className={classes.datePrice}>
            <Title>{formattedDate(event.dates.startDateTime)}</Title>
            <Subheading>{price}</Subheading>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>
            <DateRangeIcon
            />
            <Subheading>Start Time</Subheading>
            <Body1>{formattedDate(event.dates.startDateTime)}</Body1>
            <Subheading>End Time</Subheading>
            <Body1>{formattedDate(event.dates.endDateTime)}</Body1>
          </div>
          <div className={classes.cell}>
            <LocationIcon
            />
            <Body1>{event.venueName}</Body1>
            <Body1>{event.location.cityName}</Body1>
            <Body1>{event.location.stateCode}</Body1>
            <Body1>{event.location.postalCode}</Body1>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>
            <BusinessIcon
            />
            <Body1>{event.organization}</Body1>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>
            <LinkIcon
            />
            <A>{event.linkToUrl}</A>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.cell}>
            <LabelIcon
            />
            <div className={classes.cell}>
              {event.tags.map((t, index) => {
                return (
                  <Chip className={classes.chip} key={`t${index}`} label={`#${t}`} />
                )
              })
              }
            </div>
          </div>
        </div>
      </Paper>
    </div>
  )

}

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '60%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1em',
  },
  topRow: {
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },
  picDatePrice: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  image: {
    flexBasis: '50%',
  },
  datePrice: {
    flexBasis: '50%',
  },
  cell: {
    width: '100%',
  },
  cellRight: {
    width: '40%',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  }
})

export default withStyles(styles)(EventDetails)
