import {
  IonChip,
  IonIcon,
  IonLabel,
  IonItem,
  IonButton,
  IonContent,
} from '@ionic/react';
import { closeCircle, switcher } from 'ionicons/icons';
import React from 'react';
// import { auth, me } from '../store/user';
import { connect } from 'react-redux';
import { deleteFilter, getState } from '../../../store/filter';
import { filterVenues } from '../../../store/venue';
import AllVenuesView from './AllVenueFilter';

interface IMyComponentProps {
  filters: Array<string>;
  allSingleChosen: any;
  genresChosen: any;
  deleteFilter: (filter: string) => void;
  getState: (filter: any) => void;
  filterVenues: (
    mainFilters: Array<string>,
    genreFilters: Array<string>
  ) => void;
}

export class SearchBar extends React.Component<IMyComponentProps, {}> {
  constructor(props) {
    super(props);
    this.deleteOnClick = this.deleteOnClick.bind(this);
  }
  componentDidMount() {
    let filter = window.localStorage.getItem('filter');
    let value: any;
    if (filter !== null) {
      value = JSON.parse(filter || '');
      this.props.getState(value);
    }
  }
  async deleteOnClick(event) {
    await this.props.deleteFilter(event.target.title);
    this.props.filterVenues(
      this.props.allSingleChosen,
      this.props.genresChosen
    );
    this.setState({
      filters: this.props.filters,
    });
  }
  render() {
    return (
      <IonContent>
        <IonItem>
          <div>
            {this.props.filters.map((item, indx) => (
              <IonChip key={indx} id={item} onClick={this.deleteOnClick}>
                <IonLabel>{item}</IonLabel>
                <IonIcon title={item} icon={closeCircle} />
              </IonChip>
            ))}
          </div>

          <IonButton
            color="light"
            size="small"
            slot="end"
            mode="ios"
            href="/filter"
          >
            Filters
            <IonIcon icon={switcher} />
          </IonButton>
        </IonItem>
        {this.props.filters.length === 0 ? '' : <AllVenuesView />}
      </IonContent>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filter.chosen,
  allSingleChosen: state.filter.allSingleChosen,
  genresChosen: state.filter.genresChosen,
});

const mapDispatchToProps = dispatch => ({
  deleteFilter: filter => dispatch(deleteFilter(filter)),
  getState: filter => dispatch(getState(filter)),
  filterVenues: (mainFilters, genreFilters) =>
    dispatch(filterVenues(mainFilters, genreFilters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
