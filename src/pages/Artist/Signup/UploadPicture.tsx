import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonAvatar,
  IonLabel,
  IonCardHeader,
} from '@ionic/react';
import React, { Component } from 'react';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { updatedArtist, signUpArtistWithGoogle } from '../../../store/artist';
import { connect } from 'react-redux';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { add, camera } from 'ionicons/icons';
import axios from 'axios';
import { firebase_storage_api } from '../../../store/secrets'
import firebase from '../../config'
const entryURL = (process.env.NODE_ENV === 'production' ? 'https://harmonious-capstone.herokuapp.com/' : 'http://localhost:8080/')

axios.defaults.withCredentials = true;
const { Camera } = Plugins;

const DEFAULT_PIC =
  'https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button-by-vexels.png';
interface IMyComponentProps {
  updateArtist: any;
  signUpArtistWithGoogle: any;
}

interface IMyComponentState {
  isGoogleOauth: boolean;
  imageURL: string;
  selectedFile: any;
}
export class UploadPicture extends Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props: any) {
    super(props);
    this.state = {
      isGoogleOauth: false,
      imageURL: DEFAULT_PIC,
      selectedFile: null,
    };
    defineCustomElements(window);
  }

  onChangeHandler = async event => {
    event.persist();
    let artist = window.localStorage.getItem('artistInfo');
    if (artist === null) {
      artist = window.localStorage.getItem('google')
    }
    artist = JSON.parse(artist || '')
    let newArtist = artist || {}
    await this.setState({
      selectedFile: event.target.files[0],
    });
    let file = this.state.selectedFile
    const imageURL = `https://firebasestorage.googleapis.com/v0/b/${firebase_storage_api}/o/email-${newArtist['email']}-statusartist%2F${file.name}?alt=media&token=${process.env.FIREBASE_IMAGE_TOKEN}`
    await this.setState({ imageURL: imageURL });
  };
  onClickHandler = async e => {
    e.preventDefault(); // <-- missing this


    let artist = window.localStorage.getItem('artistInfo');
    if (artist === null) {
      artist = window.localStorage.getItem('google')
    }
    artist = JSON.parse(artist || '')
    let newArtist = artist || {}
    let file = this.state.selectedFile;
    var metadata = { contentType: 'image/jpeg' };
    try {
      var storageRef = firebase.storage().ref(`email-${newArtist['email']}-statusartist/` + file.name)
      let task = storageRef.put(file, metadata);

    } catch (error) {
      console.log(error)
      console.log(error.message)
    }


    const imageURL = `https://firebasestorage.googleapis.com/v0/b/${firebase_storage_api}/o/email-${newArtist['email']}-statusartist%2F${file.name}?alt=media&token=${process.env.FIREBASE_IMAGE_TOKEN}`

    if (this.state.isGoogleOauth)
      await this.props.signUpArtistWithGoogle({
        imageURL: imageURL,
        selectedFile: this.state.selectedFile,
      });
    else
      await this.props.updateArtist({
        imageURL: imageURL,
        selectedFile: this.state.selectedFile,
      });
    // await this.props.updateArtist(this.state);
  };
  async componentDidMount() {
    let artist = window.localStorage.getItem('artistInfo');
    let artistGoogle = window.localStorage.getItem('google');
    if (artist !== null) {
      artist = JSON.parse(artist || '');
      let artistInfo = artist || {};
      if (artistInfo['imageURL'] !== undefined) {
        this.setState({
          imageURL: artistInfo['imageURL'],
        });
      }
    } else if (artistGoogle !== null) {
      artistGoogle = JSON.parse(artistGoogle || '');
      let newArtist = artistGoogle || {};
      if (newArtist['imageURL'] !== undefined)
        this.setState({
          imageURL: newArtist['imageURL'],
          isGoogleOauth: true,
        });
      else
        this.setState({
          imageURL: newArtist['imageURL'],
          isGoogleOauth: true,
        });
    }
  }
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    var imageURL = image.webPath;
    // Can be set to the src of an image now
    this.setState({
      imageURL: imageURL || DEFAULT_PIC,
    });

    if (this.state.isGoogleOauth)
      await this.props.signUpArtistWithGoogle({
        imageURL: this.state.imageURL,
        selectedFile: this.state.selectedFile,
      });
    else
      await this.props.updateArtist({
        imageURL: this.state.imageURL,
        selectedFile: this.state.selectedFile,
      });
    // this.props.updateArtist(this.state);
  }

  render() {
    const { imageURL } = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Upload a picture</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCardHeader>Current Picture</IonCardHeader>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '20px',
              alignContent: 'center',
            }}
          >
            <IonAvatar
              style={{ width: '370px', height: '370px', borderRadius: '50px' }}
            >
              <img src={imageURL} alt="img" />
            </IonAvatar>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '20px',
            }}
          >
            <input
              type="file"
              name="file"
              onChange={this.onChangeHandler}
              placeholder="Choose picture"
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '20px',
              alignContent: 'center',
            }}
          >
            <IonButton onClick={this.onClickHandler}>
              <IonIcon icon={add}></IonIcon>
              <IonLabel>Upload picture</IonLabel>
            </IonButton>

            <IonButton onClick={() => this.takePicture()}>
              <IonIcon icon={camera}></IonIcon>
              <IonLabel>Take picture</IonLabel>
            </IonButton>
            <IonButton
              disabled={this.state.imageURL === DEFAULT_PIC ? true : false}
              routerLink={'/artistpassword'}
              type="submit"
            >
              <IonLabel>NEXT</IonLabel>
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateArtist: artistInfo => dispatch(updatedArtist(artistInfo)),
    signUpArtistWithGoogle: artistInfo =>
      dispatch(signUpArtistWithGoogle(artistInfo)),
  };
};
export default connect(null, mapDispatchToProps)(UploadPicture);
