import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton,IonCard } from '@ionic/react';
import './BookerSignup2.css';
import {connect} from 'react-redux'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import history from '../history'

interface IMyComponentState {
location:Object,
address:String
}
interface IMyComponentProps{
  user:object,
  history:object
}
 class Login extends React.Component<IMyComponentProps,IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
    location:{
      latitude:null,
      longitude:null
    },
    address:''
    }
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({location:{
          latitude:latLng.lat,
          longitude:latLng.lng
        },
        address
      })
        console.log('Success grabbing adress!')
      })
      .catch(error => console.error('Error', error));
  };

  render() {
console.log(this.state)
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>

<IonContent>
      <IonCard className="welcome-card">

    <PlacesAutocomplete

        value={this.state.address}
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

    <IonButton size="small" className="next" href='/booker/signup/4'onClick={()=>{
      console.log(this.state)
    }} >Next</IonButton>

      </IonCard>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  user:state.user
})
export default connect(mapStateToProps)(Login);
