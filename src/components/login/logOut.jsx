import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { history } from '../../helpers';
import { routesConstants } from '../../consatants';
import {authActions, userActions} from '../../actions';

class SignOutButton extends Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignOut() {
    this.props.logoutUser();
    this.props.removeAuth();
    history.push(routesConstants.LANDING);
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.handleSignOut}
      >
      Sign Out
      </button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const { logoutUser } = userActions;
  const { removeAuth } = authActions;
  return bindActionCreators({ logoutUser, removeAuth }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignOutButton);
