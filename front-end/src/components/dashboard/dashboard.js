import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DogForm from './../dog-form/dog-form';
import * as dogActions from '../../actions/dog-actions';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dogsFetch();
  }

  render() {
    const { dogs, dogCreate, dogDelete } = this.props;
    return (
      <div className="dashboard">
        <h2>Puppy Pound Alert</h2>
        <DogForm 
          onComplete={dogCreate}
          buttonText="Create New Dog"
        />
        {
          dogs.map((dog) => {
            return (
              <div key={dog._id}>
                <p>{dog.name}</p>
                <p>{dog.breed}</p>
                <p>{dog.age}</p>
                <p>{dog.location}</p>
                <p>{dog.details}</p>
                <button onClick={() => dogDelete(dog)}>X</button>
              </div>
            );
          })
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  dogsFetch: PropTypes.func,
  dogCreate: PropTypes.func,
  dogDelete: PropTypes.func,
  dogs: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs,
  };
};

const mapDispatchToProps = dispatch => ({
  dogsFetch: () => dispatch(dogActions.dogsFetchRequest()),
  dogCreate: dog => dispatch(dogActions.dogCreateRequest(dog)),
  dogDelete: dog => dispatch(dogActions.dogDeleteRequest(dog)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
