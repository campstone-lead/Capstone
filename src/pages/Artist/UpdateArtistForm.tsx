import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonButton, IonIcon, IonAvatar, IonBackButton,
} from '@ionic/react';
import React from 'react';
import axios from 'axios'
import '../Tab1.css';
import { connect } from 'react-redux'
import { me } from '../../store/user';
import { editArtist } from '../../store/artist';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

import { headset, mailOpen, call, book, home, logoInstagram, logoFacebook, musicalNote, person, add, camera } from 'ionicons/icons';
import { firebase } from '../config'

axios.defaults.withCredentials = true;
const { Camera } = Plugins;


interface IMyComponentState {
  artist: object;
  selectedFile: any;
  photo: string
}

interface IMyComponentProps {
  editArtist: any,
  user: object;
  me: any;
}

class UpdateArtistForm extends React.Component<IMyComponentProps, IMyComponentState>  {
  constructor(props) {
    super(props);
    this.state = {
      artist: {
        firstName: "",
        lastName: "",
        name: "",
        email: "",
        genres: "",
        phone: "",
        zipCode: "",
        type: "",
        bio: "",
        imageURL: "",
        instagramUrl: "",
        spotifyUrl: "",
        facebookUrl: ""
      },
      selectedFile: null,
      photo: 'https://www.ggcatering.com/images/venues/default_venue_2.jpg',
    }
    defineCustomElements(window);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.me();
    if (this.props.user && this.props.user['status'] === 'artist') {
      this.setState({ artist: this.props.user })
      let artist = window.localStorage.getItem('artist')
      if (artist) {

        artist = JSON.parse(artist || '');
        let newArtist = artist || {};
        this.setState({ artist: newArtist })
      } else {
        window.localStorage.setItem('artist', JSON.stringify(this.state.artist))

      }
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
    await this.setState({
      artist: { ...this.state.artist, imageURL: imageURL || '', }

    });
    let obj = this.state.artist
    window.localStorage.setItem('artist', JSON.stringify(obj))
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.props.editArtist(this.state.artist)
    window.localStorage.clear();
  }
  onChangeHandler = async  event => {
    event.persist()
    await this.setState({
      selectedFile: event.target.files[0],
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
            await this.setState({ artist: { ...this.state.artist, imageURL: downloadURL } })
          })
        }
      )



    } catch (error) {
      console.log(error)
      console.log(error.message)
    }
    window.localStorage.setItem('artist', JSON.stringify(this.state))
  }
  handleFormChange = (e) => {
    this.setState({
      artist: { ...this.state.artist, [e.target.name]: (e.target as HTMLInputElement).value }
    })
  }
  render() {
    return (
      <IonPage>
        <IonHeader >
          <IonToolbar id="bar" style={{ '--background': 'url(https://wallpaperaccess.com/full/851202.jpg)' }}>
            <IonTitle >Update Your Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{
          '--background':
            'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
        }}>
          <IonBackButton mode="ios"
            text=" Back "
            color="dark"
            className="backBtn"
            defaultHref={'/profile'}
          />

          <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px", alignContent: "center" }}>
            <IonAvatar style={{ width: '170px', height: '170px', marginTop: '20px', borderRadius: "50px" }}>
              <img src={this.state.artist["imageURL"]} alt='img' />
            </IonAvatar>
          </div>

          < div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
            <input type='file' name='file' onChange={this.onChangeHandler} placeholder="Choose picture" style={{ backgroundColor: 'white', borderRadius: '25px' }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-around", margin: "20px", alignContent: "center" }}>
            <IonButton onClick={this.onClickHandler} disabled={

              (this.state.selectedFile === null) ? true : false
            }>
              <IonIcon color="black" icon={add}></IonIcon>
              <IonLabel>Upload picture</IonLabel>
            </IonButton>

            <IonButton onClick={() => this.takePicture()}>
              <IonIcon icon={camera}></IonIcon>
              <IonLabel>Take picture</IonLabel>
            </IonButton>
          </div>



          <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "column", alignContent: "center" }}>


            <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} >

              <IonItem lines="inset" style={{ '--background': 'none' }}>
                <IonIcon mode="ios" slot="start" color="black" icon={person} />
                <IonInput clearInput type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={this.state.artist["firstName"]}
                  style={{ width: "250px" }}
                  onIonChange={(e) => this.handleFormChange(e)}

                />

                <IonInput clearInput type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={this.state.artist["lastName"]}
                  style={{ width: "250px" }}
                  onIonChange={(e) => this.handleFormChange(e)}
                />
              </IonItem>

              <IonItem lines="inset" style={{ '--background': 'none' }}>
                <IonIcon mode="ios" slot="start" color="black" icon={headset} />
                <IonInput clearInput type="text"
                  name="name"
                  placeholder="Artist Name"
                  value={this.state.artist["name"]}
                  style={{ width: "250px" }}
                  onIonChange={(e) => this.handleFormChange(e)}
                />
              </IonItem>

              <IonItem lines="inset" style={{ '--background': 'none' }}>
                <IonIcon mode="ios" slot="start" color="black" icon={mailOpen} />
                <IonInput clearInput type="text"
                  name="email"
                  placeholder="email@email.com"
                  value={this.state.artist["email"]}
                  style={{ width: "250px" }}
                  onIonChange={(e) => this.handleFormChange(e)}
                />
              </IonItem>

              {/* <IonLabel className='venuelabel'>Genres</IonLabel>
                  <IonItem lines="inset" style={{ '--background': 'none' }}>
                    <IonIcon mode="ios" slot="start" color="black" icon={headset} />
                    <IonInput clearInput type="text"
                      name={genres}
                      value={this.state.artist[genres]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem> */}

              <IonItem lines="inset" style={{ '--background': 'none' }}>
                <IonIcon mode="ios" slot="start" color="black" icon={call} />
                <IonInput clearInput type="text"
                  name="phone"
                  placeholder="Phone"
                  value={this.state.artist["phone"]}
                  style={{ width: "250px" }}
                  onIonChange={(e) => this.handleFormChange(e)}
                />
              </IonItem>

              <IonItem lines="inset" style={{ '--background': 'none' }}>
                <IonIcon mode="ios" slot="start" color="black" icon={home} />
                <IonInput clearInput type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={this.state.artist["zipCode"]}
                  style={{ width: "250px" }}
                  onIonChange={(e) => this.handleFormChange(e)}
                />
              </IonItem>

              {/* <IonLabel className='venuelabel'>Type</IonLabel>
                  <IonItem lines="inset" style={{ '--background': 'none' }}>
                    <IonIcon mode="ios" slot="start" color="black" icon={headset} />
                    <IonInput clearInput type="text"
                      name={type}
                      value={this.state.artist[type]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem> */}

              <IonItem lines="inset" style={{ '--background': 'none' }}>
                <IonIcon mode="ios" slot="start" color="black" icon={book} />
                <IonInput clearInput type="text"
                  name="bio"
                  placeholder="Bio"
                  value={this.state.artist["bio"]}
                  style={{ width: "250px" }}
                  onIonChange={(e) => this.handleFormChange(e)}
                />
              </IonItem>

              {/* <IonLabel className='venuelabel'>ImageURL</IonLabel>
                  <IonItem lines="inset" style={{ '--background': 'none' }}>
                    <IonIcon mode="ios" slot="start" color="black" icon={headset} />
                    <IonInput clearInput type="text"
                      name="imageURL"
                      value={this.state.artist["imageURL"]}
                      style={{ width: "250px" }}
                      onIonChange={(e) => this.handleFormChange(e)}
                    />
                  </IonItem> */}

              <IonItem lines="inset" style={{ '--background': 'none' }}>
                <IonIcon mode="ios" slot="start" color="black" icon={logoInstagram} />
                <IonInput clearInput type="text"
                  name="instagramUrl"
                  placeholder="Instagram Url"
                  value={this.state.artist["instagramUrl"]}
                  style={{ width: "250px" }}
                  onIonChange={(e) => this.handleFormChange(e)}
                />
              </IonItem>

              <IonItem lines="inset" style={{ '--background': 'none' }}>
                <IonIcon mode="ios" slot="start" color="black" icon={musicalNote} />
                <IonInput clearInput type="text"
                  name="spotifyUrl"
                  placeholder="Spotify Url"
                  value={this.state.artist["spotifyUrl"]}
                  style={{ width: "250px" }}
                  onIonChange={(e) => this.handleFormChange(e)}
                />
              </IonItem>

              <IonItem lines="inset" style={{ '--background': 'none', marginBottom: '20px' }}>
                <IonIcon mode="ios" slot="start" color="black" icon={logoFacebook} />
                <IonInput clearInput type="text"
                  name="facebookUrl"
                  placeholder="Facebook Url"
                  value={this.state.artist["facebookUrl"]}
                  style={{ width: "250px" }}
                  onIonChange={(e) => this.handleFormChange(e)}
                />
              </IonItem>


              <IonButton
                routerLink="/profile"
                type="submit"
                size="default"
                disabled={!(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.artist["zipCode"]))}
                //  || !(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/.test(this.state.artist["email"]))}
                style={{
                  marginBottom: '20px',
                  width: '100px',
                  float: 'center'
                }}
              >Update</IonButton>

            </form>
          </div>
        </IonContent>
      </IonPage >)
  }
}
const mapStateToProps = (state) => ({
  // booker: state.booker,
  user: state.user,
  // venues: state.booker.venues
})
const mapDispatchToProps = dispatch => {
  return {
    me: () => dispatch(me()),
    editArtist: (artist) => dispatch(editArtist(artist)),
    // fetchVenues: id => dispatch(getOneBooker(id)),
    // createEvent: (event) => dispatch(createdEvent(event))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateArtistForm);
