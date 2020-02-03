import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonItem,IonInput,IonLabel,IonButton
  } from '@ionic/react';
  import React from 'react';
  import '../../Tab1.css';
  import {connect} from 'react-redux'
  import {updatedArtist} from '../../../store/artist'
  
  interface IMyComponentState {
    type: any,
    artistTypes: {
        solo: boolean,
        dj: boolean,
        band: boolean,
    }
  }
  interface IMyComponentProps{
    putType: (artistType: any) => void,
    updateArtist: any
    
  }
  
  class ArtistType extends React.Component<IMyComponentProps,IMyComponentState>  {

    constructor(props) {
      super(props);
      this.state = {
        type: [],
        artistTypes: {
            solo: false,
            dj: false,
            band: false
        }
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
      let artist=window.localStorage.getItem('artist')
      if(artist!==null){
      artist=JSON.parse(artist||'');
      let newArtist=artist||{};
        this.setState({
          type:newArtist["type"]
        })
      }
    }
    
  
  
    handleSubmit(event) {
      event.preventDefault();
      Object.keys(this.state.artistTypes).forEach(key => {
        if(this.state.artistTypes[key])
        {
          console.log(this.state.artistTypes[key], 'key')
          this.state.type.push(key)
        }
      })
      this.props.updateArtist(this.state)
      // this.props.putType(this.state.type)
      this.setState({
          type: []
      })

    }

    handleClick(event){
      event.preventDefault();
      this.setState({
        artistTypes: {
          ...this.state.artistTypes,
          [event.target.target]: !this.state.artistTypes[event.target.target]
        }
      })
    }

    render(){
    return(<IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>ARE YOU?</IonTitle>
        </IonToolbar>
      </IonHeader>

    <IonContent>
        <form onSubmit={this.handleSubmit}>
        <IonButton color='tertiary'type="button" target="dj" onClick={this.handleClick}>DJ</IonButton>
        <IonButton color='tertiary'type="button" target="solo" onClick={this.handleClick}>SOLO</IonButton>
        <IonButton color='tertiary'type="button" target="band" onClick={this.handleClick}>IN A BAND</IonButton>
        <IonItem>
        <br></br>
        <IonButton type = "submit">Next</IonButton>
        </IonItem>

        </form>
      </IonContent>

    </IonPage>)}
  }


  const mapDispatchToProps=dispatch=>{
    return {
        updateArtist: (artistInfo) => dispatch(updatedArtist(artistInfo))
    }
  }
  export default connect(null, mapDispatchToProps)(ArtistType);
  