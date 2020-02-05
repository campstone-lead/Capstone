import { IonActionSheet, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFab, IonFabButton, IonIcon, IonItem, IonButton, IonAvatar} from '@ionic/react';
import React, { Component } from 'react';
import { Plugins, CameraResultType, CameraSource} from '@capacitor/core';
import {updatedArtist} from '../../../store/artist'
import {connect} from 'react-redux'
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { add } from 'ionicons/icons'
const { Camera } = Plugins;

const DEFAULT_PIC='https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button-by-vexels.png'
interface IMyComponentProps{
  updateArtist:any
}

interface IMyComponentState {
  photo: string
}
export class UploadPicture extends Component <IMyComponentProps,IMyComponentState>  {
  constructor(props: any) {
    super(props)
    this.state = {photo: DEFAULT_PIC}
    defineCustomElements(window)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // componentDidMount(){
  //   let artist=window.localStorage.getItem('artist')
  //   artist=JSON.parse(artist||'');
  //   let newArtist=artist||{};
  //   if(newArtist["photo"]!==undefined){
  //     this.setState({
  //       photo:newArtist["photo"]
  //     })
  //   }
  // }
  async takePicture() {
    const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri,
    source: CameraSource.Photos
    })

    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    this.setState({
    photo: imageUrl || DEFAULT_PIC
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateArtist(this.state);
  }

  render() {
    const { photo } = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Upload a picture</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <form onSubmit={this.handleSubmit}>
          {/* <IonButton type='button'onClick={() => this.takePicture()}> add picture</IonButton> */}
          <IonAvatar style={{'width':'370px','height':'370px',}} >\
          <IonItem>
            <img src={photo}/>
            <IonFab  vertical="bottom" horizontal="end" >
            <IonFabButton  onClick={() => this.takePicture()}>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
            </IonFab></IonItem>
          </IonAvatar>
          <IonItem routerLink = {'/home'}>
            <IonButton disabled = {this.state.photo===DEFAULT_PIC? true: false} onClick={()=>{window.localStorage.clear()}} type ="submit">done
            </IonButton>
          </IonItem>
          </form>
        </IonContent>
      </IonPage >
    );
  };
}

const mapDispatchToProps=dispatch=>{
  return {
      updateArtist: (photo) => dispatch(updatedArtist(photo))
  }
}
export default connect(null, mapDispatchToProps)(UploadPicture);
