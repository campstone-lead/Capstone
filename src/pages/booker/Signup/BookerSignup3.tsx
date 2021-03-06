import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { IonContent, IonIcon, IonLabel, IonCardHeader, IonPage, IonAvatar, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonHeader } from '@ionic/react';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { add } from 'ionicons/icons';
import { signUpVenue } from '../../../store/booker'
import { firebase, } from '../../config'

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
    let file = this.state.selectedFile;
    let img = document.getElementsByTagName('img')[0];
    img.src = URL.createObjectURL(file)
  }
  onClickHandler = async (e) => {
    e.preventDefault(); // <-- missing this
    let artist = window.localStorage.getItem('booker');
    if (artist === null) {
      artist = window.localStorage.getItem('google')
    }
    artist = JSON.parse(artist || '')
    let newArtist = artist || {}
    let file = this.state.selectedFile;
    var metadata = { contentType: 'image/jpeg' };
    try {
      var storageRef = firebase.storage().ref(`email-${newArtist['email']}-statusbooker/` + file.name)
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
            await this.setState({ photo: downloadURL })
            await this.props.signUpVenue(this.state)
          })
        }
      )


    } catch (error) {
      console.log(error)
      console.log(error.message)
    }



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
