import { IonActionSheet, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React, { Component } from 'react';
import { Plugins, CameraResultType, CameraSource} from '@capacitor/core';
const { Camera } = Plugins;
const INITIAL_STATE = {
  photo: '',
};
export class UploadPicture extends Component {
  state: any = {};
  props: any = {};
  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      camera: Camera,
      actionSheetController: IonActionSheet,
      file: File
    };
  }
  async takePicture() {
    const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
    source: CameraSource.Prompt
    })

    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    this.setState({
    photo: imageUrl
    })
  }

  render() {
    const { photo } = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonImg style={{ 'border': '1px solid black', 'minHeight': '100px' }} src={photo} ></IonImg>
          <IonFab color="primary" vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton color="primary" onClick={() => this.takePicture()}>
              <IonIcon name="add" />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage >
    );
  };
}
export default UploadPicture;
