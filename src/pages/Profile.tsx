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

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar id="bar">
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {this.props.user['status'] === 'artist' ? (
            <div className="profile">
              <ArtistProfileComponent
                genres={this.props.genres}
                artist={this.props.user}
              />
              <IonButton>Update profile</IonButton>
            </div>
          ) : (
              <div className="profile">
                <img
                  src={this.props.user['imageURL']}
                  alt={this.props.user['firstName']}
                  className="bookerImage"
                />
                <IonCardHeader>
                  <IonCardTitle>
                    {this.props.user['firstName']} {this.props.user['lastName']}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList lines="inset">
                    <IonItem>
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
                <IonButton>Update profile</IonButton>
                <br></br>
                {this.props.venues &&
                  this.props.venues.length > 0 ? (
                    <div>
                      <IonCardHeader>
                        You manage the following venues:
                  </IonCardHeader>

                      {this.props.venues.map(venue => (
                        <IonCard
                          key={venue['id']}
                          href={`/allVenues/${venue['id']}`}
                          className="profile"
                          style={{ width: '300px' }}
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
                  color="rgb(153, 178, 189);"
                >
                  Add a venue
                  </IonButton>

                <IonButton
                  mode="ios"
                  href="/addevent"
                  className="homeBtn"
                  color="rgb(153, 178, 189);"
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
