import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/react';
import './BookerSignup2.css';
import { connect } from 'react-redux';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { signUpVenue } from '../../../store/booker';

interface IMyComponentState {
  latitude: Number;
  longitude: Number;
  name: string;
  address: string;
  fullAddress: string;
  on: boolean;
}
interface IMyComponentProps {
  booker: object;
  signUpVenue: any;
}

class Login extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      name: '',
      address: '',
      fullAddress: '',
      on: false,
    };
  }
  componentDidMount() {
    let venue = window.localStorage.getItem('venue');
    if (venue) {
      venue = JSON.parse(venue || '');
      let newVenue = venue || {};
      if (newVenue !== undefined) {
        this.setState({
          address: newVenue['address'],
          latitude: newVenue['latitude'],
          longitude: newVenue['longitude'],
        });
      }
    }
  }
  handleChange = address => {
    this.setState({ fullAddress: address });
  };

  handleSelect = fullAddress => {
    geocodeByAddress(fullAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        let addressArr = fullAddress.split(', ');
        let name = addressArr[0];
        if (addressArr.length > 4) addressArr.shift();
        let address = addressArr.join(', ');
        this.setState({
          latitude: latLng.lat,
          longitude: latLng.lng,
          fullAddress,
          address,
          name,
        });
        console.log('Success grabbing adress!');
      })
      .catch(error => console.error('Error', error));
  };
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>Venue location</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard className="welcome-card">
            <PlacesAutocomplete
              value={this.state.fullAddress}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
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

            <IonLabel className="venuelabel">Venue name</IonLabel>
            <IonItem>
              <IonInput
                clearInput
                type="text"
                required
                value={this.state.name}
                onIonChange={e =>
                  this.setState({ name: (e.target as HTMLInputElement).value })
                }
              />
            </IonItem>
            <IonLabel className="venuelabel">Address</IonLabel>
            <IonItem>
              <IonInput
                clearInput
                type="text"
                required
                value={this.state.address}
                onIonChange={e =>
                  this.setState({
                    address: (e.target as HTMLInputElement).value,
                  })
                }
              />
            </IonItem>
            <IonItem>
              <br></br>

              <IonButton
                size="small"
                className="next"
                onClick={() => {
                  return this.props.signUpVenue(this.state);
                }}
                disabled={
                  this.state.address.length === 0 || this.state.latitude === 0
                }
                routerLink="/signup/booker/3"
              >
                Next
              </IonButton>
            </IonItem>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = state => ({
  booker: state.booker,
});
const mapDispatchToProps = dispatch => ({
  signUpVenue: data => dispatch(signUpVenue(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
