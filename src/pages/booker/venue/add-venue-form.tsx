import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem,IonInput,IonLabel,IonButton, IonCardHeader, IonCardTitle
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import {connect} from 'react-redux'
import {createdVenue} from '../../../store/booker'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
// import './venue-form.css'

interface IMyComponentState {
  latitude:Number,
  longitude:Number,
  address:String,
  imageUrl:string,
  description:string,
  capacity:string,
  photo: string
}
interface IMyComponentProps{
  booker:any,
  createVenue: (bookerId: number, venue: object) => void
}

class PersonalInfoForm extends React.Component<IMyComponentProps,IMyComponentState>  {
  constructor(props) {
    super(props);
    this.state = {
      latitude:0,
      longitude:0,
      address:'',
      imageUrl:'',
      description:'',
      capacity: '',
      photo: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    let venue=window.localStorage.getItem('venue')
    if(venue!==null){
      venue=JSON.parse(venue||'');
    let newVenue=venue||{};
      this.setState({
        address: newVenue["address"],
        latitude: newVenue["latitude"],
        longitude: newVenue["longitude"],
        imageUrl: newVenue["imageUrl"],
        description: newVenue["description"],
        capacity: newVenue["capacity"],
        photo: newVenue["photo"],
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.createVenue(this.props.booker.id, this.state)
  }
  render(){
  return(<IonPage>
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
        <IonLabel className='venuelabel'>Describe the venue</IonLabel>
      <IonItem >
      <IonInput clearInput  type="text" required
        value={this.state.description}
        onIonChange={(e) => this.setState({description:(e.target as HTMLInputElement).value})}
      />
      </IonItem>
        <IonLabel className='venuelabel'>Capacity</IonLabel>
      <IonItem >
      <IonInput clearInput type="number" min='0' required
        value={this.state.capacity}
        onIonChange={(e) => this.setState({capacity:(e.target as HTMLInputElement).value})}
      />
      </IonItem>
      <IonButton color='secondary' >Upload a picture</IonButton>
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

      <IonButton type="submit">create</IonButton>

      </form>
    </IonContent>
  </IonPage>)}
}
const mapStateToProps=(state)=>({
  booker:state.booker
})
const mapDispatchToProps=dispatch=>{
  return {
    createVenue: (bookerId, venue) => dispatch(createdVenue(bookerId, venue))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoForm);
