import React, { Fragment } from 'react'
import {
  Route,
  Switch ,
  withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { parse } from '../../api/cookie-parser'
import jwt from 'jsonwebtoken'

// User
import * as authActions from 'store/actions/auth-actions'
import { userValidateRequestKey } from 'store/actions/auth-actions'
import * as pageMessageActions from 'store/actions/page-message-actions'
import * as requestSelectors from 'store/selectors/request-selectors'

import Breakpoints from 'ui/ui-elements/Breakpoints'
import Hero from 'ui/Hero'
import LoginForm from 'ui/Auth/LoginForm'
import PageMessage from 'ui/ui-elements/PageMessage'
import Palette from 'ui/ui-design/Palette'
import PrivateRoute from 'ui/PrivateRoute'
import RegisterForm from 'ui/Auth/RegisterForm'
// import RouteNotfound from 'ui/RouteNotFound'
// import SearchEvents from 'ui/SearchEvents'
import SettingsForm from 'ui/Auth/SettingsForm'
import TypographyGuide from 'ui/ui-design/TypographyGuide'
import withRoot from 'ui/withRoot'
import AppBar from 'ui/AppBar'
import Snackbars from 'ui/Snackbars'
import AppDrawer from 'ui/AppDrawer'
import EventsController from 'ui/EventsController'

// eslint-disable-next-line
import { green, yellow } from 'logger'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasCookie: false,
      mountDone: false,
    }
  }

  async componentDidMount() {
    const { userValidateRequest } = this.props
    let user
    if (document.cookie) {
      const tokenObj = parse(document.cookie)
      const decoded = jwt.decode(tokenObj.token, { complete: true })
      user = {
        id: decoded.payload.id,
        email: decoded.payload.email,
        token: tokenObj.token
      }
      await userValidateRequest(user)
    }
    this.setState({ mountDone: true })
  }

  render() {
    const { classes } = this.props
    return (
        <Fragment>
          <AppBar />

          <div className={classes.wrapper}>
            <div className={classes.body}>
              <EventsController />
              <Switch>
                <Route exact path='/login' component={LoginForm} />
                <Route exact path='/register' component={RegisterForm} />
              </Switch>
            </div>
          </div>
        </Fragment>
    )
  }
}
/*
<Breakpoints />
            <PageMessage></PageMessage>
            <Hero />
                            <Route exact path='/palette' component={Palette} />

                <PrivateRoute exact path='/settings' component={SettingsForm} />
                <Route exact path='/typography' component={TypographyGuide} />
*/
// <Route exact path='/search-events/:searchValue' component={SearchEvents} />
/* <Route exact path='/events' component={EventsController} />
<PrivateRoute exact path='/event-details/:id' component={EventsController} />
<PrivateRoute exact path='/my-events' component={EventsController} />
<Route exact path='/new-event' component={EventsController} />
<Route exact path='/edit-event/:id' component={EventsController} />
<Route exact path='/' component={EventsController} /> */
const mapStateToProps = (state) => {
  return {
    userValidateRequestStatus:  requestSelectors.getRequest(state, userValidateRequestKey)
  }
}

const styles = theme => ({
  wrapper: {
    marginTop: 60,
  },
  body: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

})

const actions = { ...authActions, ...pageMessageActions}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, actions),
  withRoot
)(App)



