import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Button from 'ui/elements/Button'
import CancelIcon from '@material-ui/icons/Cancel'
/* Dev */
// eslint-disable-next-line
import { green, purple } from 'logger'
import { logRender } from 'logging'

export class SearchBox extends React.Component {
  state = {
    showSearchIcon: true,
    searchString: '',
  }

  handleChange = (e) => {
    this.setState({
      searchString: e.target.value
    })
  }

  clearSearchResults = () => {
    this.setState((prevState, props) => ({
      showSearchIcon: !prevState.showSearchIcon,
      searchString: ''
    }))
    this.props.eventsReadRequest()
  }

  render() {

    logRender && purple('SearchBox - render')

    const { classes } = this.props
    const { searchString, showSearchIcon } = this.state
    return (
      <Paper
        id='SearchBox'
        className={classes.wrapper}
      >
        <Input className={classes.input} value={this.state.searchString} onChange={this.handleChange} />
        {showSearchIcon
          ?
          <Link
            to={{
              pathname: '/search-events/',
              search: `?searchString=${searchString}`,
            }}
            className={classes.link}
          >
            <Button
              color='primary'
              disabled={searchString.length < 3}
            >
              Search
            </Button>
          </Link>
          :
          <CancelIcon
            className={classes.cancelIcon}
            onClick={this.clearSearchResults}
          />
        }
      </Paper>
    )
  }

}

const styles = theme => ({
  wrapper: {
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: theme.spacing.unit,
  },
  input: {
    color: 'white',
  },
  link: {
    textDecoration: 'none'
  }
})

export default withStyles(styles)(SearchBox)
