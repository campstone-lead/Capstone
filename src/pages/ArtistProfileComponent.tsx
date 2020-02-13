
import React from 'react';
import {
  IonItem,
  IonLabel,
  IonList,
  IonCardContent,
  IonCardSubtitle,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/react';
import {
  logoInstagram,
  logoFacebook,
  call,
  mailOpen,
  musicalNote,
  microphone,
  musicalNotes,
} from 'ionicons/icons';
import './Tab1.css';
interface IMyComponentProps {
  genres: Array<string>,
  artist: object,
}
interface IMyComponentState {
  status: any,
}
class ArtistProfileComponent extends React.Component<IMyComponentProps, IMyComponentState> {
  render() {
    let genres = '';
    if (this.props.genres) {
      this.props.genres.forEach((el, index) => {
        if (index !== this.props.genres.length - 1) {
          genres += el + ', ';
        } else genres += el;
      });
    }
    return (
      <>
        <img
          src={this.props.artist['imageURL']}
          alt={this.props.artist['firstName']}
          className="profileImage"
        />

        <IonCardContent style={{
          '--background':
            'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
        }} >
          <IonCardSubtitle style={{ color: 'black', fontSize: '15.5px' }}>
            {this.props.artist['bio']}
          </IonCardSubtitle>
          <br></br>
          <IonList lines="inset" className="ion-item-border ">
            <IonItem>
              <IonIcon slot="start" color="medium" icon={musicalNotes} />
              <IonLabel style={{ padding: '5px' }}>
                {' '}
                {this.props.artist['type']}{' '}
              </IonLabel>
            </IonItem>

            <IonItem >
              <IonIcon slot="start" color="medium" icon={microphone} />
              <IonLabel style={{ padding: '5px' }}>
                {' '}
                My genres are: {genres}{' '}
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon slot="start" color="medium" icon={mailOpen} />
              <IonLabel style={{ padding: '5px' }}>
                {this.props.artist['email']}{' '}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon slot="start" color="medium" icon={call} />
              <IonLabel style={{ padding: '5px' }}>
                {' '}
                {this.props.artist['phone']}{' '}
              </IonLabel>
            </IonItem>
          </IonList>
          <div className="profileTab">
            <IonTabBar slot="bottom" color="none" >
              <IonTabButton tab="tab2" onClick={() => window.open(this.props.artist['instagramUrl'], '_system', 'location=yes')} color="none" >
                <IonItem color="none">
                  <IonIcon icon={logoInstagram} />
                </IonItem>
                <IonLabel>Instagram</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab2" onClick={() => window.open(this.props.artist['spotifyUrl'], '_system', 'location=yes')} color="none">
                <IonItem color="none" >
                  <IonIcon icon={musicalNote} />
                </IonItem>
                <IonLabel>Spotify</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab2" onClick={() => window.open(this.props.artist['facebookUrl'], '_system', 'location=yes')} color="white">
                <IonItem color="none">
                  <IonIcon icon={logoFacebook} />
                </IonItem>
                <IonLabel>Facebook</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </div>
        </IonCardContent>
      </>
    )
  }
}


export default ArtistProfileComponent
