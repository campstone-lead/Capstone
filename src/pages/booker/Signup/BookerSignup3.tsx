import React from 'react';
import { connect } from 'react-redux';
import {
  IonContent,
  IonItem,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonFabButton,
  IonHeader,
} from '@ionic/react';
import { Plugins, CameraResultType } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { signUpVenue } from '../../../store/booker';

interface IMyComponentProps {
  booker: object;
  signUpVenue: any;
}

interface IMyComponentState {
  photo: string;
}

class BookerSignup3 extends React.Component<
  IMyComponentProps,
  IMyComponentState
> {
  constructor(props) {
    super(props);
    this.state = { photo: '' };
    defineCustomElements(window);
    this.handleClick = this.handleClick.bind(this);
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
      photo: imageUrl || '',
    });
    // this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  handleClick() {
    this.props.signUpVenue(this.state);
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
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
          <IonFabButton color="primary" onClick={() => this.takePicture()}>
            Take Picture
          </IonFabButton>
          <img src={this.state.photo} alt="" />
          <IonItem>
            <br></br>

            <IonButton
              size="small"
              className="next"
              onClick={this.handleClick}
              disabled={this.state.photo.length === 0}
              routerLink="/signup/booker/4"
            >
              Next
            </IonButton>
          </IonItem>
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
