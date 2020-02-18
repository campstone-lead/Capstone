import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonButton, IonAvatar
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux'
import { createdVenue } from '../../../store/booker'
import { firebase } from '../../config'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'


interface IMyComponentState {
  venue: object,
  genreTypes: object,
  fullAddress: string,
  selectedFile: any
}
interface IMyComponentProps {
  createVenue: (venue: object) => void,
  user: any
}

class AddVenueForm extends React.Component<IMyComponentProps, IMyComponentState>  {
  constructor(props) {
    super(props);
    this.state = {
      venue: {
        latitude: 0,
        longitude: 0,
        name: '',
        address: '',
        imageURL: 'https://www.ggcatering.com/images/venues/default_venue_2.jpg',
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
      },
      fullAddress: '',
      selectedFile: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange = address => {
    this.setState({ fullAddress: address });
  };

  handleSelect = fullAddress => {
    geocodeByAddress(fullAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        let addressArr = fullAddress.split(', ')
        let name = addressArr[0]
        if (addressArr.length > 4) addressArr.shift()
        let address = addressArr.join(', ')
        this.setState({
          fullAddress,
          venue: {
            ...this.state.venue,
            latitude: latLng.lat,
            longitude: latLng.lng,
            address,
            name
          }
        })
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
    let venue = window.localStorage.getItem('venue')
    if (venue)
      venue = JSON.parse(venue || '');
    let imageURL = venue || {}
    const filtered = Object.keys(this.state.genreTypes).filter((key) => this.state.genreTypes[key])
    await this.setState({ venue: { ...this.state.venue, genres: filtered, imageURL: imageURL['imageURL'] } })

    await this.props.createVenue(this.state.venue)
    window.localStorage.clear()
  }




  onChangeHandler = async  e => {
    e.persist()
    await this.setState({
      selectedFile: e.target.files[0]

    })
    let file = this.state.selectedFile;
    let img = document.getElementsByTagName('img')[0];
    img.src = URL.createObjectURL(file)
  }
  onClickHandler = async (e) => {
    e.preventDefault()

    let file = this.state.selectedFile;
    var metadata = { contentType: 'image/jpeg' };
    try {
      var storageRef = firebase.storage().ref(`email-${this.props.user['email']}-status${this.props.user['status']}/` + file.name)
      let task = storageRef.put(file, metadata);
      task.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          console.log('Photo uploaded')
        },
        (err) => {
          console.log(err)
        },
        () => {
          task.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            await this.setState({ venue: { ...this.state.venue, imageURL: downloadURL } })
            window.localStorage.setItem('venue', JSON.stringify({ imageURL: downloadURL }))


          })
        }
      )
    } catch (error) {
      console.log(error)
      console.log(error.message)
    }

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


        <IonContent style={{
          '--background':
            'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
        }}>


          <div>
            <div style={{ display: "flex", justifyContent: "space-around", margin: "20px", alignContent: "center", flexDirection: 'row' }}>
              <IonAvatar style={{ width: '170px', height: '170px', borderRadius: "50px" }}>
                <img src={this.state.venue['imageURL']} alt='img' />
              </IonAvatar>

            </div>



          </div>

          <form onSubmit={this.handleSubmit} className='updatevenue' >

            <IonLabel className='venuelabel'>Venue</IonLabel>
            < div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>

              <input type='file' name='file' onChange={this.onChangeHandler} placeholder="Choose picture" />
              <IonButton type="button" onClick={this.onClickHandler} size="default" >Upload a picture</IonButton>
            </div>
            <PlacesAutocomplete
              value={this.state.fullAddress}
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
            <IonLabel className='venuelabel'>Venue name</IonLabel>
            <IonItem lines="none" >
              <IonInput clearInput type="text" required
                value={this.state.venue["name"]}
                onIonChange={(e) => this.setState({ venue: { ...this.state.venue, name: (e.target as HTMLInputElement).value } })}
              />
            </IonItem>
            <IonLabel className='venuelabel'>Address</IonLabel>
            <IonItem lines="none" >
              <IonInput clearInput type="text" required
                value={this.state.venue["address"]}
                onIonChange={(e) => this.setState({ venue: { ...this.state.venue, address: (e.target as HTMLInputElement).value } })}
              />
            </IonItem>
            <IonLabel className='venuelabel'>Describe the venue</IonLabel>
            <IonItem lines="none" >
              <IonInput clearInput type="text" required
                value={this.state.venue["description"]}
                onIonChange={(e) => this.setState({ venue: { ...this.state.venue, description: (e.target as HTMLInputElement).value } })}
              />
            </IonItem>
            <IonLabel className='venuelabel'>Capacity</IonLabel>
            <IonItem lines="none" >
              <IonInput clearInput type="number" min='0' required
                value={this.state.venue["capacity"]}
                onIonChange={(e) => this.setState({ venue: { ...this.state.venue, capacity: (e.target as HTMLInputElement).value } })}
              />
            </IonItem>
            <IonLabel className='venuelabel'>Genres</IonLabel>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {genresArray.map((genre) =>
                <IonButton key={genre} color={this.state.genreTypes[genre] ? 'primary' : 'secondary'} type="button" target={genre} onClick={this.handleClick}>{genre}</IonButton>
              )}
            </div>




            <IonButton routerLink='/profile' type="submit" >Create</IonButton>

          </form>
        </IonContent>
      </IonPage>)
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
})
const mapDispatchToProps = dispatch => {
  return {
    createVenue: (venue) => dispatch(createdVenue(venue))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddVenueForm);
