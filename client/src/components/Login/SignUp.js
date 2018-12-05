import React, { Component } from 'react';
import 'whatwg-fetch';

class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        token: '',
        signUpError: '',
        signInError: '',
        signInEmail: '',
        signInPassword: '',
        signUpEmail: '',
        signUpPassword: '',
      };
    }
}