import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonButton
} from '@ionic/react';
import React from 'react';
import '../../Tab1.css';
import { connect } from 'react-redux'
import { updatedArtist } from '../../../store/artist'

interface IMyComponentState {
  type: any,
  artistTypes: any
}
interface IMyComponentProps {
  putType: (artistType: any) => void,
  updateArtist: any

}

class ArtistType extends React.Component<IMyComponentProps, IMyComponentState>  {

  constructor(props) {
    super(props);
    this.state = {
      type: '',
      artistTypes: {
        solo: false,
        dj: false,
        band: false
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.updateArtist({
      type: this.state.type
    })

  }

  handleClick(event) {
    event.preventDefault();
    let currentType
    if (this.state.type)
      currentType = this.state.type
    this.setState({
      type: event.target.target
    })
    if (currentType)
      this.setState({
        artistTypes: {
          [currentType]: false,
          [event.target.target]: true
        }
      })
    else this.setState({
      artistTypes: {
        [event.target.target]: true
      }
    })
  }

  render() {
    return (<IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>ARE YOU?</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={this.handleSubmit}>
          <IonButton color={this.state.artistTypes.dj ? 'primary' : 'secondary'} type="button" target="dj" onClick={this.handleClick}>DJ</IonButton>
          <IonButton color={this.state.artistTypes.solo ? 'primary' : 'secondary'} type="button" target="solo" onClick={this.handleClick}>SOLO</IonButton>
          <IonButton color={this.state.artistTypes.band ? 'primary' : 'secondary'} type="button" target="band" onClick={this.handleClick}>IN A BAND</IonButton>
          <IonItem>
            <br></br>
            <IonItem routerLink={'/uploadpicture'}>
              <IonButton type="submit">Next</IonButton>
            </IonItem>
          </IonItem>

        </form>
      </IonContent>

    </IonPage>)
  }
}


const mapDispatchToProps = dispatch => {
  return {
    updateArtist: (artistInfo) => dispatch(updatedArtist(artistInfo))
  }
}
export default connect(null, mapDispatchToProps)(ArtistType);
