import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonButton,
  IonAvatar,
  IonInput,
  IonLabel,
  IonCard,
  IonCardHeader,
} from '@ionic/react';
import React, { Component } from 'react';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { updatedArtist } from '../../../store/artist';
import { connect } from 'react-redux';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { add, camera } from 'ionicons/icons';
import axios from 'axios'
axios.defaults.withCredentials = true;
const { Camera } = Plugins;

const DEFAULT_PIC =
  'https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button-by-vexels.png';
interface IMyComponentProps {
  updateArtist: any;
}

interface IMyComponentState {
  imageURL: string;
  selectedFile: any
}
export class UploadPicture extends Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props: any) {
    super(props);
    this.state = { imageURL: DEFAULT_PIC, selectedFile: null, };
    defineCustomElements(window);

  }

  onChangeHandler = async  event => {
    event.persist()
    await this.setState({
      selectedFile: event.target.files[0],
    })

    await this.setState({ imageURL: this.state.selectedFile.name })
  }
  onClickHandler = async (e) => {
    e.preventDefault() // <-- missing this
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
    const res = await axios({
      method: "post",
      baseURL: "http://localhost:8080/",
      url: `/upload`,
      data: formData
    })
    await this.props.updateArtist(this.state);
    console.log(res.data)

  }
  async componentDidMount() {
    let artist = window.localStorage.getItem('artistInfo')
    artist = JSON.parse(artist || '');
    let artistInfo = artist || {};
    if (artistInfo['imageURL'] !== undefined) {
      this.setState({
        imageURL: artistInfo['imageURL']
      })
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
    this.props.updateArtist(this.state);
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
  };
};
export default connect(null, mapDispatchToProps)(UploadPicture);
