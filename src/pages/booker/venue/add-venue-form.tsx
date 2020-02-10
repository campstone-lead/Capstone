import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonButton
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux'
import { createdVenue } from '../../../store/booker'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

interface IMyComponentState {
  venue: object,
  genreTypes: object
}
interface IMyComponentProps {
  booker: any,
  createVenue: (venue: object) => void
}

class AddVenueForm extends React.Component<IMyComponentProps, IMyComponentState>  {
  constructor(props) {
    super(props);
    this.state = {
      venue: {
        latitude: 0,
        longitude: 0,
        address: '',
        imageUrl: '',
        description: '',
        capacity: '',
        genres: []
      },
      genreTypes: {
        rock: false,
        jazz: false,
        electronic: false,
        pop: false,
        hipHop: false,
        indie: false,
        country: false,
        metal: false,
        house: false,
        techno: false,
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  // componentDidMount() {
  //   let venue = window.localStorage.getItem('venue')
  //   if (venue !== null) {
  //     venue = JSON.parse(venue || '');
  //     let newVenue = venue || {};
  //     this.setState({
  //       address: newVenue["address"],
  //       latitude: newVenue["latitude"],
  //       longitude: newVenue["longitude"],
  //       imageUrl: newVenue["imageUrl"],
  //       description: newVenue["description"],
  //       capacity: newVenue["capacity"],
  //       photo: newVenue["photo"],
  //     })
  //   }
  //   console.log("this.state", this.state)
  // }
  handleChange = address => {
    this.setState({ venue: { ...this.state.venue, address } });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          venue: {
            ...this.state.venue,
            latitude: latLng.lat,
            longitude: latLng.lng,
            address
          }
        })
        console.log('Success grabbing adress!')
      })
      .catch(error => console.error('Error', error));
  };

  handleClick(event) {
    event.preventDefault();
    this.setState({
      genreTypes: {
        ...this.state.genreTypes,
        [event.target.target]: !this.state.genreTypes[event.target.target]
      }
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    const filtered = Object.keys(this.state.genreTypes).filter((key) => this.state.genreTypes[key])
    await this.setState({ venue: { ...this.state.venue, genres: filtered } })
    this.props.createVenue(this.state.venue)
  }
  render() {
    let genresArray = Object.keys(this.state.genreTypes)
    return (
      <IonPage>
        <IonHeader >
          <IonToolbar id="bar" >
            <IonTitle >Create a new venue</IonTitle>
          </IonToolbar>
        </IonHeader>


        <IonContent>
          <form onSubmit={this.handleSubmit} className='updatevenue' >

            {/* <IonCardHeader>
        <IonCardTitle>Describe the venue</IonCardTitle>
      </IonCardHeader>  */}
            <IonLabel className='venuelabel'>Venue</IonLabel>

            <PlacesAutocomplete
              value={this.state.venue["address"]}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Search Venues ...',
                      className: 'searchInput',
                    })}

                  />
                  <div className="searchInput">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';

                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <IonLabel className='venuelabel'>Describe the venue</IonLabel>
            <IonItem >
              <IonInput clearInput type="text" required
                value={this.state.venue["description"]}
                onIonChange={(e) => this.setState({ venue: { ...this.state.venue, description: (e.target as HTMLInputElement).value } })}
              />
            </IonItem>
            <IonLabel className='venuelabel'>Capacity</IonLabel>
            <IonItem >
              <IonInput clearInput type="number" min='0' required
                value={this.state.venue["capacity"]}
                onIonChange={(e) => this.setState({ venue: { ...this.state.venue, capacity: (e.target as HTMLInputElement).value } })}
              />
            </IonItem>
            <IonLabel className='venuelabel'>Genres</IonLabel>
            {genresArray.map((genre) =>
              <IonButton color={this.state.genreTypes[genre] ? 'primary' : 'secondary'} type="button" target={genre} onClick={this.handleClick}>{genre}</IonButton>
            )}

            <IonButton color='secondary' >Upload a picture</IonButton>
            <IonItem routerLink="/profile">
              <IonButton type="submit">Create</IonButton>
            </IonItem>
          </form>
        </IonContent>
      </IonPage>)
  }
}
const mapStateToProps = (state) => ({
  booker: state.booker
})
const mapDispatchToProps = dispatch => {
  return {
    createVenue: (venue) => dispatch(createdVenue(venue))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddVenueForm);
