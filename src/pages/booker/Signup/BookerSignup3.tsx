import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { IonContent, IonIcon, IonLabel, IonCardHeader, IonPage, IonAvatar, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonHeader } from '@ionic/react';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { add } from 'ionicons/icons';
import { signUpVenue } from '../../../store/booker'
import { firebase_storage_api } from '../../../store/secrets'
import firebase from '../../config'
const entryURL = (process.env.NODE_ENV === 'production' ? 'https://harmonious-capstone.herokuapp.com/' : 'http://localhost:8080/')

axios.defaults.withCredentials = true;
interface IMyComponentProps {
  booker: object;
  signUpVenue: any;
}

interface IMyComponentState {
  photo: string,
  selectedFile: any,
  loaded: number,
  url: any
}

class BookerSignup3 extends React.Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props) {
    super(props)
    this.state = {
      photo: 'https://www.ggcatering.com/images/venues/default_venue_2.jpg',
      loaded: 0,
      selectedFile: null,
      url: {}
    }
    defineCustomElements(window)
    this.handleClick = this.handleClick.bind(this)

  }
  onChangeHandler = async  event => {
    event.persist()
    await this.setState({
      selectedFile: event.target.files[0],
    })
    let artist = window.localStorage.getItem('booker');
    artist = JSON.parse(artist || '')
    let newArtist = artist || {}
    let file = this.state.selectedFile;
    const imageURL = `https://firebasestorage.googleapis.com/v0/b/${firebase_storage_api}/o/email-${newArtist['email']}-statusbooker%2F${file.name}?alt=media&token=${process.env.FIREBASE_IMAGE_TOKEN}`

    await this.setState({ photo: imageURL })
  }
  onClickHandler = async (e) => {
    e.preventDefault(); // <-- missing this
    let artist = window.localStorage.getItem('booker');
    artist = JSON.parse(artist || '')
    let newArtist = artist || {}
    let file = this.state.selectedFile;
    var metadata = { contentType: 'image/jpeg' };
    try {
      var storageRef = firebase.storage().ref(`email-${newArtist['email']}-statusbooker/` + file.name)
      let task = storageRef.put(file, metadata);

    } catch (error) {
      console.log(error)
      console.log(error.message)
    }


    const imageURL = `https://firebasestorage.googleapis.com/v0/b/${firebase_storage_api}/o/email-${newArtist['email']}-statusbooker%2F${file.name}?alt=media&token=${process.env.FIREBASE_IMAGE_TOKEN}`

    await this.setState({ photo: imageURL })
    await this.props.signUpVenue(this.state)

  }
  componentDidMount() {
    let venue = window.localStorage.getItem('venue');
    venue = JSON.parse(venue || '');
    let newVenue = venue || {};
    if (newVenue['photo'] !== undefined) {
      this.setState({
        photo: newVenue['photo'],
      });
    }
  }

  handleClick() {
    this.props.signUpVenue(this.state);
  }

  render() {
    const imageURL = this.state.photo;
    return (
      <IonPage>

        <IonHeader>
          <IonToolbar>
            <IonTitle>Upload a venue image</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tab2" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonToolbar>


        </IonToolbar>
        <IonContent >
          <IonCardHeader>
            Current Picture
          </IonCardHeader>
          <div style={{ display: "flex", justifyContent: "space-around", margin: "20px", alignContent: "center" }}>
            <IonAvatar style={{ width: '370px', height: '370px', borderRadius: "50px" }}>
              <img src={imageURL} alt='img' />
            </IonAvatar>
          </div>

          < div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
            <input type='file' name='file' onChange={this.onChangeHandler} placeholder="Choose picture" />
          </div>

          <div style={{ display: "flex", justifyContent: "space-around", margin: "20px", alignContent: "center" }}>

            <IonButton type="button" onClick={this.onClickHandler} >

              <IonIcon icon={add}></IonIcon>
              <IonLabel>Upload picture</IonLabel>

            </IonButton>




            <IonButton
              size="small"
              className="next"
              onClick={this.handleClick}
              disabled={this.state.photo.length === 0}
              routerLink="/signup/booker/4"
            >
              <IonLabel>NEXT</IonLabel>
            </IonButton>

          </div>

        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = state => ({
  booker: state.booker,
});

const mapDispatchToProps = dispatch => ({
  signUpVenue: state => dispatch(signUpVenue(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookerSignup3);
