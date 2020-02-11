import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonItemGroup,
  IonContent,
} from '@ionic/react';

import React from 'react';
// import { me } from '../../../store/user';
import { customedFilter } from '../../../store/filter';
import { connect } from 'react-redux';
import '../../Tab1.css';

interface IMyComponentProps {
  filterSelected: any;
  allSingleChosen: any;
  genresChosen: any;
  word: string;
  customedFilter: (
    mainFilters: Array<string>,
    genreFilters: Array<string>,
    input: string
  ) => void;
}
export class AllVenuesView extends React.Component<IMyComponentProps, {}> {
  async componentDidMount() {
    await this.props.customedFilter(
      this.props.allSingleChosen,
      this.props.genresChosen,
      this.props.word
    );
  }
  render() {
    if (!Array.isArray(this.props.filterSelected))
      return <IonCardTitle>Loading...</IonCardTitle>;
    return (
      <IonContent
        style={{
          '--background':
            'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
        }}
      >
        <div className="home" style={{ paddingBottom: '140px' }}>
          {this.props.filterSelected.map((venue, index) => {
            let genres = '';
            venue['genres'].forEach((el, index) => {
              genres += el + ' ';
            });
            return (
              <IonCard
                href={`/all${venue.tableName}s/${venue.id}`}
                key={index}
                className="profile"
                style={{
                  '--background':
                    'url(https://wallpaperaccess.com/full/851202.jpg)',
                  width: '250px',
                }}
                // style={{ width: '250px' }}
                mode="ios"
              >
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: 'black',
                  }}
                  className="artistBox"
                >
                  {venue.tableName}
                  <img src={venue['imageURL']} alt="img.jpg" />

                  <IonItemGroup style={{ margin: '20px' }}>
                    <IonCardTitle
                      style={{ textAlign: 'center' }}
                      className="artistBoxText"
                    >
                      {venue.tableName === 'Artist' && venue.artistName
                        ? venue.artistName
                        : venue['name']}
                    </IonCardTitle>
                    <IonCardSubtitle
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '15px',
                      }}
                    >
                      Genres:
                    </IonCardSubtitle>
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
  word: state.filter.word,
});
const mapDispatchToProps = dispatch => ({
  customedFilter: (mainFilters, genreFilters, input) =>
    dispatch(customedFilter(mainFilters, genreFilters, input)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllVenuesView);
