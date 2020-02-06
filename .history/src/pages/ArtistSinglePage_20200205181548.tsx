import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonCard, IonList, IonItemGroup, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonTabBar, IonTabButton, IonIcon } from '@ionic/react';
import { logoInstagram, logoFacebook, call, mailOpen, musicalNote, microphone } from 'ionicons/icons'
import './Tab1.css';
import { connect } from 'react-redux'
import { getOneBooker } from '../store/booker'
import { me } from '../store/user'
interface IMyComponentProps {
  user: object,
  genres: Array<string>,
  getOneBooker: any,
  me: any,
  booker: object,
  venues: Array<object>,
}
class ArtistSinglePage extends React.Component<IMyComponentProps, {}> {



  async componentDidMount() {
    await this.props.me()
  }
  render() {
    let genres = ''
    if (this.props.genres !== undefined) {
      this.props.genres.forEach((el, index) => {
        if (index !== this.props.genres.length - 1) {
          genres += el + ', '
        }
        else genres += el;
      })
    }
    return (

      <IonPage>
        <IonHeader >
          <IonToolbar id="bar" >
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="profile">
            <img src={this.props.user['imageUrl']} alt={this.props.user['firstName']} className="profileImage" />
            <IonCardHeader>
              <IonCardTitle>{this.props.user['artistName']}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>

              <IonCardSubtitle style={{ "color": "black", "fontSize": "15.5px" }}>{this.props.user['bio']}</IonCardSubtitle>
              <br></br>
              <IonList lines="inset">
                <IonItem>
                  <IonIcon slot="start" color="medium" icon={microphone} />
                  <IonLabel style={{ "padding": "5px" }}>  My genres are: {genres} </IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon slot="start" color="medium" icon={mailOpen} />
                  <IonLabel style={{ "padding": "5px" }}>{this.props.user['email']} </IonLabel>

                </IonItem>
                <IonItem>
                  <IonIcon slot="start" color="medium" icon={call} />
                  <IonLabel style={{ "padding": "5px" }}>  {this.props.user['phone']} </IonLabel>
                </IonItem>
              </IonList>

              <IonTabBar slot="bottom" >

                <IonTabButton tab="tab2" >
                  <IonItem href={this.props.user['instagramUrl']}>
                    <IonIcon icon={logoInstagram} />
                  </IonItem>
                  <IonLabel>Instagram</IonLabel>
                </IonTabButton>


                <IonTabButton tab="tab2" >
                  <IonItem href={this.props.user['spotifyUrl']}>
                    <IonIcon icon={musicalNote} />
                  </IonItem>
                  <IonLabel>Spotify</IonLabel>
                </IonTabButton>




                <IonTabButton tab="tab2">
                  <IonItem href={this.props.user['facebookUrl']}>
                    <IonIcon icon={logoFacebook} />
                  </IonItem>
                  <IonLabel>Facebook</IonLabel>
                </IonTabButton>


              </IonTabBar>
            </IonCardContent>
            <IonButton>Update profile</IonButton>

          </div>



        </IonContent>
      </IonPage>
    )
  }
};
const mapStateToProps = (state) => ({
  user: state.user
})
const mapDispatchToProps = (dispatch) => ({
  me: () => dispatch(me()),
})
export default connect(mapStateToProps, mapDispatchToProps)(ArtistSinglePage);
