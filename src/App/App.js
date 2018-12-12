import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { Jumbotron, Container } from 'reactstrap';

// Pages
import { Home } from '../Home';
import { Login } from '../Login';
import { Register } from '../Register';
import { Room } from '../Room';

// Components
import { AppNavbar } from '../_components';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
          <div>
            <AppNavbar />
            <Jumbotron fluid> 
              <Container>
                {alert.message &&
                  <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                  <div>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/group/:id" component={Room} />
                  </div>
                </Router>
              </Container>
            </Jumbotron>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 