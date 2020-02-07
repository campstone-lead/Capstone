import { IonChip, IonIcon, IonLabel, IonItem, IonButton } from '@ionic/react';
import { closeCircle, switcher } from 'ionicons/icons';
import React from 'react';
// import { auth, me } from '../store/user';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { deleteFilter, getState } from '../../../store/filter';

interface IMyComponentProps {
  filters: Array<string>;
  deleteFilter: (filter: string) => void;
  getState: (filter: any) => void;
}

export class SearchBar extends React.Component<IMyComponentProps, {}> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let filter = window.localStorage.getItem('filter');
    let value: any;
    if (filter !== null) {
      value = JSON.parse(filter || '');
      this.props.getState(value);
    }
  }
  render() {
    return (
      <IonItem>
        {this.props.filters.map((item, indx) => (
          <IonChip
            key={indx}
            id={item}
            onClick={() => {
              this.props.deleteFilter(item);
            }}
          >
            <IonLabel>{item}</IonLabel>
            <IonIcon icon={closeCircle} />
          </IonChip>
        ))}

        <IonButton
          color="light"
          size="small"
          slot="end"
          mode="ios"
          href="/filter"
        >
          Filters
          <IonIcon
            icon={switcher}
            // onClick={() => <link href="/filter"/>}
          />
        </IonButton>
      </IonItem>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filter.chosen,
});

const mapDispatchToProps = dispatch => ({
  deleteFilter: filter => dispatch(deleteFilter(filter)),
  getState: filter => dispatch(getState(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
