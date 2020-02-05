import React from 'react';
import {connect} from 'react-redux'
import { IonContent, IonItem, IonLabel, IonList, IonPage, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonFabButton,IonHeader } from '@ionic/react';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { updatedVenue } from '../store/booker'

interface IMyComponentProps{
  booker:object,
  updateVenue:any
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
  componentDidMount(){
    let booker=window.localStorage.getItem('booker')
    booker=JSON.parse(booker||'');
    let newBooker=booker||{};
    if(newBooker["venue"]["photo"]!==undefined){
      this.setState({
        photo:newBooker["venue"].photo
      })
    }
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
    this.props.updateVenue(this.state)

  }

  render() {
    console.log(this.state)

    return (
      <IonPage>

      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Venue Image</IonTitle>
          {/* <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/> */}
        </IonToolbar>
      </IonHeader>
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
      <IonItem routerLink="/signup/booker/3">
<br></br>

<IonButton size="small" className="next"
onClick={this.handleClick}
    disabled={(this.state.photo.length===0)}
    >Next</IonButton>

</IonItem>

        </IonContent>
      </IonPage>
    );
  }
};
const mapStateToProps=(state)=>({
  booker:state.booker
})

const mapDispatchToProps=(dispatch)=>({
  updateVenue: state => dispatch(updatedVenue(state))
})

export default connect(mapStateToProps,mapDispatchToProps)(BookerSignup3);
