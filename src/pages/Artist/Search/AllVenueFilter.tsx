import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  // IonIcon,
  // IonItem,
  // IonLabel,
  IonItemGroup,
  // IonListHeader,
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonContent,
  IonBackButton,
} from '@ionic/react';

import React from 'react';
import { me } from '../../../store/user';
import { getAllVenues } from '../../../store/venue';
import { connect } from 'react-redux';
import '../../Tab1.css';

interface IMyComponentProps {
  venues: object;
  me: object;
  getAllVenues: () => void;
}
class AllVenuesView extends React.Component<IMyComponentProps, {}> {
  async componentDidMount() {
    await this.props.getAllVenues();
  }

  render() {
    if (!Array.isArray(this.props.venues))
      return <IonCardTitle>Loading...</IonCardTitle>;
    return (
      <IonContent>
        <div className="home">
          {this.props.venues.map((venue, index) => {
            let genres = '';
            venue['genres'].forEach((el, index) => {
              genres += el + ' ';
            });

            return (
              <IonCard
                href={`/allVenues/${venue.id}`}
                key={index}
                className="profile"
                style={{ width: '250px' }}
                mode="ios"
              >
                <div className="artistBox">
                  <img src={venue['imageURL']} alt="img.jpg" />

                  <IonItemGroup style={{ margin: '20px' }}>
                    <IonCardTitle
                      style={{ textAlign: 'center' }}
                      className="artistBoxText"
                    >
                      {venue['artistName']}
                    </IonCardTitle>
                    <IonCardSubtitle style={{ textAlign: 'center' }}>
                      {genres}
                    </IonCardSubtitle>
                  </IonItemGroup>
                </div>
              </IonCard>
            );
          })}
        </div>
      </IonContent>
    );
  }
}
const mapStateToProps = state => ({
  venues: state.venue.all,
  user: state.user,
});
const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me()),
  getAllVenues: () => dispatch(getAllVenues()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllVenuesView);
