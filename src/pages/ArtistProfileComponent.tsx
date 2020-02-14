import React from 'react';
import {
  IonItem,
  IonList,
  IonCardContent,
  IonCardSubtitle,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonCard,
  IonLabel,
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
  genres: Array<string>;
  artist: object;
  history: object;
}
interface IMyComponentState {
  status: any;
}
class ArtistProfileComponent extends React.Component<
  IMyComponentProps,
  IMyComponentState
  >{
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
          className="profilIMG"

        />
        <IonCardContent>
          <h4 style={{ color: 'black', fontSize: '15.5px' }}>
            {this.props.artist['bio']}
          </h4>
        </IonCardContent>

        <IonCard style={{
          '--background': 'url(https://wallpaperaccess.com/full/851202.jpg)',
          float: 'center',
          width: '80%'
        }} >
          <IonList lines="inset" style={{ '--background': 'none' }} >
            <IonItem>
              <IonIcon slot="start" color="black" icon={musicalNotes} />
              <h6 style={{ padding: '5px' }}>
                {' '}
                {this.props.artist['type']}{' '}
              </h6>
            </IonItem>

            <IonItem lines={(this.props.history['location'].pathname === '/profile') ? 'inset' : 'none'}>
              <IonIcon slot="start" color="black" icon={microphone} />
              <h6 style={{ padding: '5px' }}>
                {' '}
                My genres are: {genres}{' '}
              </h6>
            </IonItem>
            {
              (this.props.history['location'].pathname === '/profile') &&
              (
                <div>
                  <IonItem>
                    <IonIcon slot="start" color="black" icon={mailOpen} />
                    <h6 style={{ padding: '5px' }}>
                      {this.props.artist['email']}{' '}
                    </h6>
                  </IonItem>
                  <IonItem lines="none">
                    <IonIcon slot="start" color="black" icon={call} />
                    <h6 style={{ padding: '5px' }}>
                      {' '}
                      {this.props.artist['phone']}{' '}
                    </h6>
                  </IonItem>
                </div>
              )
            }

          </IonList>
          <div className="profileTab">
            <IonTabBar slot="bottom" color="none"  >
              <IonTabButton
                tab="tab2"
                onClick={() =>
                  window.open(
                    this.props.artist['instagramUrl'],
                    '_system',
                    'location=yes'
                  )
                }
                color="none"
              >
                <IonItem color="none" >
                  <IonIcon icon={logoInstagram} />
                </IonItem>
                <IonLabel>Instagram</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="tab2"
                onClick={() =>
                  window.open(
                    this.props.artist['spotifyUrl'],
                    '_system',
                    'location=yes'
                  )
                }
                color="none"
              >
                <IonItem color="none">
                  <IonIcon icon={musicalNote} />
                </IonItem>
                <IonLabel>Spotify</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="tab2"
                onClick={() =>
                  window.open(
                    this.props.artist['facebookUrl'],
                    '_system',
                    'location=yes'
                  )
                }
                color="white"
              >
                <IonItem color="none">
                  <IonIcon icon={logoFacebook} />
                </IonItem>
                <IonLabel>Facebook</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </div>
        </IonCard>
      </>
    );
  }
}

export default ArtistProfileComponent;
