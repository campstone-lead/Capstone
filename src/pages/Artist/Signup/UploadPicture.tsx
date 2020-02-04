import { IonActionSheet, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React, { Component } from 'react';
import { Capacitor, Plugins, CameraResultType, CameraSource, FilesystemDirectory } from '@capacitor/core';
const { Camera, Filesystem } = Plugins;
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
  // pickImage(sourceType) {
  //   const options= {
  //     quality: 100,
  //     sourceType: sourceType,
  //     destinationType: this.state.camera.DestinationType.FILE_URI,
  //     encodingType: this.state.camera.EncodingType.JPEG,
  //     mediaType: this.state.camera.MediaType.PICTURE
  //   }
  //   this.state.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     // let base64Image = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     // Handle error
  //   });
  // }

  // async selectImage() {
  //   const actionSheet = await this.state.actionSheetController.create({
  //     header: "Select Image source",
  //     buttons: [{
  //       text: 'Load from Library',
  //       handler: () => {
  //         this.pickImage(this.state.camera.PictureSourceType.PHOTOLIBRARY);
  //       }
  //     },
  //     {
  //       text: 'Use Camera',
  //       handler: () => {
  //         this.pickImage(this.state.camera.PictureSourceType.CAMERA);
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //       role: 'cancel'
  //     }
  //     ]
  //   });
  //   await actionSheet.present();
  // }
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
