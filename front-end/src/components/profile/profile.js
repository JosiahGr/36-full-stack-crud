import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from '../../utils';
import ProfileForm from '../profile-form/profile-form';
import * as profileActions from '../../actions/profile';
import * as routes from '../../routes';

class Profile extends React.Component {
  constructor(props) {
    super(props);

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
    this.props.profileUpdate(profile);
    this.setState({ editing: false });
  }

  render() {
    const { profile } = this.props;

    let JSXEditing = null;
    let JSXDisplay = null;
    let JSXProfile = null;

    if (profile) {
      JSXEditing = 
        <div>
          <ProfileForm profile={profile} onComplete={this.handleUpdate}/>
          <button onClick={() => this.setState({ editing: false })}> Cancel </button>
        </div>;
      JSXDisplay = 
        <div>
          <button onClick={() => this.setState({ editing: true })}> Edit </button>
        </div>;
      JSXProfile = 
      <div>
          <p>First Name - {profile.firstName}</p>
          <p>Last Name - {profile.lastName}</p>
          <p>Phone Number - {profile.phoneNumber}</p>
          <p>Location - {profile.location}</p>
          <p>Age preference - {profile.age}</p>
          <p>Breed preference - {profile.breed}</p>
          {this.state.editing ? JSXEditing : JSXDisplay}
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

Profile.propTypes = {
  profileCreate: PropTypes.func,
  profileUpdate: PropTypes.func,
  profile: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(profileActions.createRequest(profile)),
  profileUpdate: profile => dispatch(profileActions.updateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
