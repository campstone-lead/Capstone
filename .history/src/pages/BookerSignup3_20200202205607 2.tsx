import React from 'react';
import {connect} from 'react-redux'
import { IonContent, IonItem, IonLabel, IonList, IonPage, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonFabButton } from '@ionic/react';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { updateBooker } from '../store/booker'

interface IMyComponentProps{
  booker:object,
  updateBooker:any
}

interface IMyComponentState {
  photo: string
}

class BookerSignup3 extends React.Component<IMyComponentProps,IMyComponentState> {
  constructor(props) {
    super(props)
    this.state = {photo: ""}
    defineCustomElements(window)
    this.handleClick = this.handleClick.bind(this)

  }
  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      // source: CameraSource.Camera
    });
    var imageUrl = image.webPath;
    // Can be set to the src of an image now

    this.setState({
      photo: imageUrl || ''
      })
    // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  handleClick() {
    this.props.updateBooker(this.state)

  }

  render() {
    console.log(this.state)

    return (
      <IonPage>
        <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tab2" />
            </IonButtons>
          </IonToolbar>
        <IonContent className="content">
          <IonTitle>UPLOAD YOUR VENUE IMAGE</IonTitle>
          <IonFabButton color="primary" onClick={()=> this.takePicture()}>
            Take Picture
          </IonFabButton>
          <img src={this.state.photo} alt=""/>
          {/* <IonButton href="/tab2/details" routerDirection="forward" onClick={this.handleClick}> */}
          <IonButton onClick={this.handleClick}>
              <IonLabel>
                <h2>Next</h2>
              </IonLabel>
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }
};
const mapStateToProps=(state)=>({
  booker:state.booker
})

const mapDispatchToProps=(dispatch)=>({
  updateBooker: state => dispatch(updateBooker(state))
})

export default connect(mapStateToProps,mapDispatchToProps)(BookerSignup3);
