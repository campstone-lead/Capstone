import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonCard,
  IonList,
  IonItemGroup,
  IonCardHeader,
  IonIcon,
} from '@ionic/react';
import {
  call,
  mailOpen,
} from 'ionicons/icons';
import './Tab1.css';
import { connect } from 'react-redux';
import { getOneBooker } from '../store/booker';
import { me } from '../store/user';
import ArtistProfileComponent from './ArtistProfileComponent';
interface IMyComponentProps {
  user: object;
  genres: Array<string>;
  getOneBooker: any;
  me: any;
  booker: object;
  venues: Array<object>;
}
class Profile extends React.Component<IMyComponentProps, {}> {
  async componentDidMount() {
    await this.props.me();
    if (this.props.user['status'] === 'booker') {
      const id = this.props.user['id'];
      await this.props.getOneBooker(id);

    }
  }
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar mode="ios" style={{ '--background': "#fcbcdb" }}>
            <div className="tabHeader" >
              <img
                src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png"
                alt="logo.png"
                className="logo"
              />
              <h3 style={{ textAlign: "center" }}>
                {this.props.user['name']}
              </h3>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{
          '--background':
            'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
        }} >
          {this.props.user['status'] === 'artist' ? (
            <div className="profile" >
              <ArtistProfileComponent
                genres={this.props.genres}
                artist={this.props.user}
                history={this.props['history']}
              />
              <IonButton routerLink="/artists/update">Update profile</IonButton>
            </div>
          ) : (
              <div className="profile">
                <img
                  src={this.props.user['imageURL']}
                  alt={this.props.user['firstName']}
                  className="bookerImage"
                />
                <IonCardHeader style={{ '--background': 'none' }}>
                  <h1 style={{ color: 'black', }}>
                    {this.props.user['firstName']} {this.props.user['lastName']}
                  </h1>
                </IonCardHeader>
                <IonCard style={{
                  '--background': 'url(https://wallpaperaccess.com/full/851202.jpg)',
                  float: 'center',
                  width: '80%'
                }} >
                  <IonList lines="inset">
                    <IonItem >
                      <IonIcon slot="start" color="medium" icon={mailOpen} />
                      <IonLabel style={{ padding: '5px' }}>
                        {this.props.user['email']}{' '}
                      </IonLabel>
                    </IonItem>

                    <IonItem>
                      <IonIcon slot="start" color="medium" icon={call} />
                      <IonLabel style={{ padding: '5px' }}>
                        {' '}
                        {this.props.user['phone']}{' '}
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonCard>
                <IonButton size='default' routerLink={`/bookers/update`}>Update profile</IonButton>
                <div style={{ display: 'flex' }}>
                  <IonButton

                    href="/addvenue"
                    size='default'
                  >
                    Add a venue
                  </IonButton>

                  <IonButton
                    size='default'
                    href="/addevent"

                  >
                    Create an event
                  </IonButton>
                </div>

                {this.props.venues &&
                  this.props.venues.length > 0 ? (
                    <div>
                      <IonCardHeader style={{
                        '--background': 'none',
                      }}>
                        You manage the following venues:
                  </IonCardHeader>

                      {this.props.venues.map(venue => (
                        <IonCard
                          key={venue['id']}
                          href={`/allVenues/${venue['id']}`}
                          className="profile"
                          style={{ width: '300px', '--background': 'url(https://wallpaperaccess.com/full/851202.jpg)' }}
                          mode="ios"
                        >
                          <IonCardHeader className="items">
                            <IonItemGroup>
                              <img src={venue['imageURL']} alt={venue['name']} />
                            </IonItemGroup>
                            <IonItemGroup>
                              <h4
                                style={{ textAlign: 'center', color: 'black', fontSize: '20px' }}
                                className="venueBoxText"

                              >{venue['name']}</h4>
                              <h4 style={{ textAlign: 'center', color: 'gray', fontSize: '14px' }}>{venue['address']}</h4>
                            </IonItemGroup>
                          </IonCardHeader>
                        </IonCard>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <IonCardHeader>
                        You do not currently manage any venues.
                  </IonCardHeader>
                    </div>
                  )}

              </div>
            )}
        </IonContent>
      </IonPage>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  genres: state.user.genres,
  venues: state.booker.venues,
});
const mapDispatchToProps = dispatch => ({
  getOneBooker: id => dispatch(getOneBooker(id)),
  me: () => dispatch(me()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
