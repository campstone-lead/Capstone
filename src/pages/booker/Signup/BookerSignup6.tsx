import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux';
import { signUpVenue } from '../../../store/booker';

interface IMyComponentState {
  genreTypes: {
    rock: boolean;
    jazz: boolean;
    electronic: boolean;
    pop: boolean;
    hipHop: boolean;
    indie: boolean;
    country: boolean;
    metal: boolean;
    house: boolean;
    techno: boolean;
  };
}
interface IMyComponentProps {
  signUpVenue: any;
}

class VenueGenres extends React.Component<
  IMyComponentProps,
  IMyComponentState
  > {
  constructor(props) {
    super(props);
    this.state = {
      genreTypes: {
        rock: false,
        jazz: false,
        electronic: false,
        pop: false,
        hipHop: false,
        indie: false,
        country: false,
        metal: false,
        house: false,
        techno: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      genreTypes: {
        ...this.state.genreTypes,
        [event.target.target]: !this.state.genreTypes[event.target.target],
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const obj = this.state.genreTypes;
    const keys = Object.keys(obj);
    const filtered = keys.filter(key => obj[key]);
    this.props.signUpVenue({
      genres: filtered,
    });
  }

  render() {
    return (<IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Choose Genres</IonTitle>
          <IonItem>
            <IonLabel> <h3>Pick at least one</h3></IonLabel>
          </IonItem>
        </IonToolbar>
      </IonHeader>


      <IonContent>
        <div className="welcome-card">
          <form onSubmit={this.handleSubmit} className="genres">
            <IonButton color={this.state.genreTypes.rock ? 'primary' : 'secondary'} type="button" target="rock" onClick={this.handleClick}>ROCK</IonButton>
            <IonButton color={this.state.genreTypes.jazz ? 'primary' : 'secondary'} type="button" target="jazz" onClick={this.handleClick}>JAZZ</IonButton>
            <IonButton color={this.state.genreTypes.electronic ? 'primary' : 'secondary'} type="button" target="electronic" onClick={this.handleClick}>ELECTRONIC</IonButton>
            <IonButton color={this.state.genreTypes.pop ? 'primary' : 'secondary'} type="button" target="pop" onClick={this.handleClick}>POP</IonButton>
            <IonButton color={this.state.genreTypes.hipHop ? 'primary' : 'secondary'} type="button" target="hipHop" onClick={this.handleClick}>HIP-HOP</IonButton>
            <IonButton color={this.state.genreTypes.indie ? 'primary' : 'secondary'} type="button" target="indie" onClick={this.handleClick}>INDIE</IonButton>
            <IonButton color={this.state.genreTypes.country ? 'primary' : 'secondary'} type="button" target="country" onClick={this.handleClick}>COUNTRY</IonButton>
            <IonButton color={this.state.genreTypes.metal ? 'primary' : 'secondary'} type="button" target="metal" onClick={this.handleClick}>METAL</IonButton>
            <IonButton color={this.state.genreTypes.house ? 'primary' : 'secondary'} type="button" target="house" onClick={this.handleClick}>HOUSE</IonButton>
            <IonButton color={this.state.genreTypes.techno ? 'primary' : 'secondary'} type="button" target="techno" onClick={this.handleClick}>TECHNO</IonButton>

            <div>

              <IonButton
                type="submit"
                disabled={Object.keys(this.state.genreTypes).every(
                  key => !this.state.genreTypes[key]
                )}
                routerLink="/signup/booker/7"
              >
                Next
              </IonButton>

            </div>
          </form>
        </div>
      </IonContent>


    </IonPage>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUpVenue: artistInfo => dispatch(signUpVenue(artistInfo)),
  };
};
export default connect(null, mapDispatchToProps)(VenueGenres);
