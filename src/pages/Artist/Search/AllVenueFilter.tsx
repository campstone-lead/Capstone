import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItemGroup,
  IonContent,
} from '@ionic/react';

import React from 'react';
import { me } from '../../../store/user';
import { customedFilter } from '../../../store/filter';
import { connect } from 'react-redux';
import '../../Tab1.css';

interface IMyComponentProps {
  filterSelected: any;
  allSingleChosen: any;
  genresChosen: any;
  customedFilter: (
    mainFilters: Array<string>,
    genreFilters: Array<string>
  ) => void;
}
export class AllVenuesView extends React.Component<IMyComponentProps, {}> {
  async componentDidMount() {
    await this.props.customedFilter(
      this.props.allSingleChosen,
      this.props.genresChosen
    );
  }
  render() {
    if (!Array.isArray(this.props.filterSelected))
      return <IonCardTitle>Loading...</IonCardTitle>;
    return (
      <IonContent>
        <div className="home">
          {this.props.filterSelected.map((venue, index) => {
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
                      {venue['name']}
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
  filterSelected: state.filter.filterSelected,
  allSingleChosen: state.filter.allSingleChosen,
  genresChosen: state.filter.genresChosen,
});
const mapDispatchToProps = dispatch => ({
  customedFilter: (mainFilters, genreFilters) =>
    dispatch(customedFilter(mainFilters, genreFilters)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllVenuesView);
