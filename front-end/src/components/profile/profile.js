import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from '../../utils';

import * as clientProfileActions from '../../actions/client-profile';
import * as routes from '../../routes';

// TODO: This page probably has a lot of bugs. Compare to lecture code

class Profile extends React.Component {
  constructor(props) {
    super(props);

    // UI state
    this.state = {
      editing: false,
    };

    autoBind.call(this, Profile);
  }

  handleCreate(profile) {
    this.props.profileCreate(profile)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      });
  }

  handleUpdate(profile) {
    // TODO: add validation for error handling (catch blocks)
    this.props.profileUpdate(profile);
    this.setState({ editing: false });
  }

  render() {
    const {
      profile,
    } = this.props;

    const JSXEditing = null;
    const JSXDisplay = null;
    const JSXProfile = null;

    if (profile) {
      JSXEditing = 
        <div>
          <ProfileForm profile={profile} onComplete={this.handleUpdate}/>
          <button onClick={() => this.setState({ editing: false })}> Cancel </button>
        </div>;
      JSXDisplay = 
        <div>
          <p>{profile.bio}</p>
          <button onClick={() => this.setState({ editing: true })}> Edit </button>
        </div>;
      JSXProfile = 
        <div>
          <h2> {profile.username} </h2>
          <h3> {profile.email} </h3>
          {this.setState.editing ? JSXEditing : JSXDisplay}
        </div>;
    }
    return (
      <div>
        <h1>PROFILE</h1>
        { profile ? JSXProfile : <ProfileForm onComplete={this.handleCreate}/> }
      </div>
    );
  }
}

Profile.PropTypes = {
  profileCreate: PropTypes.func,
  profileUpdate: PropTypes.func,
  profile: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.clientProfile,

});

const mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(clientProfileActions.createRequest(profile)),
  profileUpdate: profile => dispatch(clientProfileActions.updateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
