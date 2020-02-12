import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonCard,
  IonList,
  IonItemGroup,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
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
    console.log('this.props.user', this.props.user['id'])
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>Profile</IonTitle>
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
              />
              {/* <IonButton>Update profile</IonButton> */}
            </div>
          ) : (
              <div className="profile">
                <img
                  src={this.props.user['imageURL']}
                  alt={this.props.user['firstName']}
                  className="bookerImage"
                />
                <IonCardHeader style={{ '--background': 'none' }}>
                  <IonCardTitle >
                    {this.props.user['firstName']} {this.props.user['lastName']}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent >
                  <IonList lines="inset" className="ion-item-border ">
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
                </IonCardContent>
                <IonButton routerLink={`/bookers/${this.props.user['id']}/update`}>Update profile</IonButton>
                <br></br>
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
                              <IonCardTitle>{venue['name']}</IonCardTitle>
                              <IonCardSubtitle>{venue['address']}</IonCardSubtitle>
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
                <IonButton
                  mode="ios"
                  href="/addvenue"
                  className="homeBtn"

                >
                  Add a venue
                  </IonButton>

                <IonButton
                  mode="ios"
                  href="/addevent"
                  className="homeBtn"

                >
                  Create an event
                  </IonButton>
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
