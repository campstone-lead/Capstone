/* eslint-disable array-callback-return */
import {
  IonPage,
  IonContent,
  IonHeader,
  IonIcon,
  // IonFab,
  // IonFabButton,
  IonItem,
  IonChip,
  IonLabel,
  // IonList,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  // IonTextarea,
  IonBackButton,
  IonCard,
  // IonAlert,
} from '@ionic/react';
import React from 'react';
import { connect } from 'react-redux';
import { closeCircle } from 'ionicons/icons';
import {
  chooseGenres,
  deleteFilter,
  chooseAllSingle,
  getState,
} from '../../../store/filter';

interface IMyComponentProps {
  chosen: Array<string>;
  allSingle: { value: string; isChecked: boolean }[];
  genres: { value: string; isChecked: boolean }[];
  deleteFilter: (filter: string) => void;
  chooseGenres: (genres: any) => void;
  chooseAllSingle: (allSingle: any) => void;
  getState: (filter: any) => void;
}

interface IMyComponentState {
  genres: any;
  checkedGenres: any;
  allSingle: any;
}
export class Filter extends React.Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      checkedGenres: [],
      allSingle: [],
    };
    this.genresOnClick = this.genresOnClick.bind(this);
    this.mainOnClick = this.mainOnClick.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);
  }
  async componentDidMount() {
    let filter = await window.localStorage.getItem('filter');
    let value: any;
    if (filter !== null) {
      value = JSON.parse(filter || '');
      await this.props.getState(value);
      this.setState({
        genres: value.genres,
        allSingle: value.allSingle,
      });
    } else {
      let checkedGenresCopy: any = [];
      this.props.genres.map(genre => {
        if (genre.isChecked) checkedGenresCopy.push(genre.value);
      });
      this.setState({
        checkedGenres: checkedGenresCopy || [],
        genres: this.props.genres,
        allSingle: this.props.allSingle,
      });
    }
  }
  async genresOnClick(event) {
    this.setState({
      ...this.state,
      checkedGenres: event.target.value,
    });
    await this.props.chooseGenres(event.target.value);
  }
  async mainOnClick(event) {
    const val = event.target.value;
    if (event.target.value) {
      await this.props.chooseAllSingle(event.target.value);
      this.setState({
        ...this.state,
        allSingle: val,
      });
    }
  }
  async deleteOnClick(event) {
    this.setState({
      allSingle: this.props.allSingle,
      genres: this.props.genres,
    });
    await this.props.deleteFilter(event.target.title);
  }
  render() {
    return (
      <IonPage >
        <IonContent style={{
          display: 'flex',
          '--background':
            'url(https://media.idownloadblog.com/wp-content/uploads/2015/06/iTunes-El-Capitan-Wallaper-iPad-Blank-By-Jason-Zigrino.png)',
        }}>
          <IonBackButton
            defaultHref="/home/"
            mode="ios"
            text=" Apply filters "
            color="dark"
            className="backBtn"
            style={{
              '--background': 'none',

            }}
          />
          <IonHeader
            style={{
              marginLeft: '0px',
              marginTop: '50px',

            }}
          >
            <h2
              style={{
                marginLeft: '25px',
                fontSize: '30px',
              }}
            >
              Filters
            </h2>
          </IonHeader>


          <IonCard style={{
            '--background':
              'url(https://wallpaperaccess.com/full/851202.jpg)',
            padding: '10px'
          }}>
            <IonItem style={{
              '--background':
                'none',
            }} color='#383544' lines="none">
              <h3
                style={{
                  fontSize: '18px',

                }}
              >
                {(this.props.chosen.length === 0) ? 'No filters added yet....' : 'All filters'}
              </h3>
            </IonItem>

            <IonItem style={{
              '--background':
                'none',
            }} color='#383544' lines="none">
              <div>
                {this.props.chosen.map((item, indx) => (
                  <IonChip key={indx} title={item} onClick={this.deleteOnClick}>
                    <IonLabel>{item}</IonLabel>
                    <IonIcon title={item} icon={closeCircle} />
                  </IonChip>
                ))}
              </div>
            </IonItem>

          </IonCard>

          <IonCard style={{
            '--background':
              'url(https://wallpaperaccess.com/full/851202.jpg)',
            padding: '10px'
          }}>
            <IonItem style={{
              '--background':
                'none',
            }} lines="none"
              color='#383544'
            >
              <h3
                style={{

                  fontSize: '22px',
                }}
              >
                Main category
              </h3>
            </IonItem >
            <div>
              {this.props.allSingle.map((filter, indx) => (
                <IonItem color='#383544' key={indx} style={{
                  '--background':
                    'none',
                }}>
                  <IonLabel>{filter.value}</IonLabel>
                  <IonCheckbox
                    value={filter.value}
                    onClick={this.mainOnClick}
                    disabled={
                      !filter.isChecked &&
                      this.props.allSingle.some(i => i.isChecked)
                    }
                    checked={filter.isChecked}
                    style={{
                      '--background':
                        '#d7c1de',
                    }}
                  />
                </IonItem>
              ))}
            </div>
            <IonItem style={{
              '--background':
                'none',
            }} lines="none">
              <IonLabel
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                Filter by genres
              </IonLabel>

              <IonSelect
                multiple={true}
                cancelText="Cancel"
                okText="Save"
                onIonChange={this.genresOnClick}
                style={{
                  '--background':
                    'none',
                }}
              >
                {this.props.genres.map((genre, indx) => (
                  <IonSelectOption
                    key={indx}
                    value={genre.value}
                    selected={genre.isChecked}
                    style={{
                      '--background':
                        'none',
                    }}
                  >
                    {genre.value}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCard>

        </IonContent>
      </IonPage >
    );
  }
}

const mapStateToProps = state => ({
  chosen: state.filter.chosen,
  allSingle: state.filter.allSingle,
  genres: state.filter.genres,
});

const mapDispatchToProps = dispatch => ({
  deleteFilter: filter => dispatch(deleteFilter(filter)),
  chooseGenres: genres => dispatch(chooseGenres(genres)),
  chooseAllSingle: allSingle => dispatch(chooseAllSingle(allSingle)),
  getState: filter => dispatch(getState(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
