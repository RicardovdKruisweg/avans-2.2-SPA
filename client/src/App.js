import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import UserList from './components/UserList';
import { Container } from 'reactstrap';

import UserModal from './components/userModal';
import { Provider } from 'react-redux';
import store from './store';

//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <UserModal />
            <UserList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
