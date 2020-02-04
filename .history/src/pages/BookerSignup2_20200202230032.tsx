import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton,IonCard } from '@ionic/react';
import './BookerSignup2.css';
import {connect} from 'react-redux'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import {updatedVenue} from '../store/booker'

interface IMyComponentState {
latitude:Number,
longitude:Number,
address:String,
on:boolean
}
interface IMyComponentProps{
  booker:object,
  updateVenue:any

}

 class Login extends React.Component<IMyComponentProps,IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
    latitude:0,
    longitude:0,
    address:'',
    on:false
    }
  }
componentDidMount(){
  let booker=window.localStorage.getItem('booker')
  booker=JSON.parse(booker||'');
  let newBooker=booker||{};
  if(newBooker['venue']!==undefined){
    this.setState({
      address: newBooker['venue'].address,
      latitude: newBooker['venue'].latitude,
      longitude: newBooker['venue'].longitude
    })
  }
}
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
        latitude:latLng.lat,
        longitude:latLng.lng,
        address
      })
        console.log('Success grabbing adress!')
      })
      .catch(error => console.error('Error', error));
  };
  render() {
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

    <IonButton size="small" className="next" onClick={()=>{
      return this.props.updateVenue(this.state)
    }} >Submit</IonButton>

    <IonButton href={'/signup/booker/3'} disabled={(this.state.address.length===0||this.state.latitude===0)?true:false} >Next</IonButton>

      </IonCard>
      </IonContent>
    </IonPage>
  )
  }
};
const mapStateToProps=(state)=>({
  booker:state.booker
})
const mapDispatchToProps=(dispatch)=>({
  updateVenue:(data)=>dispatch(updatedVenue(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);