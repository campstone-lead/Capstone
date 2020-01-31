import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonItem,IonInput,IonLabel,IonButton
  } from '@ionic/react';
  import React from 'react';
  import '../../Tab1.css';
  import {connect} from 'react-redux'
  import {putZipCode} from '../../../store/artist'
  
  
  interface IMyComponentState {
    zipCode: string,
  }
  interface IMyComponentProps{
    putZipCode: (zipCode: string) => void
  }
  
  class ZipCodeForm extends React.Component<IMyComponentProps,IMyComponentState>  {
    constructor(props) {
      super(props);
      this.state = {
        zipCode: '',
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
  
    handleSubmit(event) {
      event.preventDefault();
      this.props.putZipCode(this.state.zipCode)
      this.setState({
        zipCode: '',
      })
  
    }
    render(){
    return(<IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>Let us help to find the right venue for you</IonTitle>
          <IonItem>
            <IonLabel> <h3>Enter your zip code</h3></IonLabel>
          </IonItem>
        </IonToolbar>
      </IonHeader>
  
  
    <IonContent>
    <form onSubmit={this.handleSubmit}>
  
      <IonItem>
        <IonInput type="text" placeholder="ZipCode" required
        value={this.state.zipCode}
        onIonChange={(e) => this.setState({zipCode:(e.target as HTMLInputElement).value})}
        />
  
      </IonItem>
  
        <IonButton type="submit">next</IonButton>
        </form>
      </IonContent>
    </IonPage>)}
  }
  const mapDispatchToProps=dispatch=>{
    return {
      putZipCode: (zipcode) => dispatch(putZipCode(zipcode))
    }
  }
  export default connect(null, mapDispatchToProps)(ZipCodeForm);
  