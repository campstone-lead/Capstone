import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel } from '@ionic/react';
import './Tab1.css';

interface IMyComponentState {
  name: string,
  password:string
}

 class Tab3Page extends React.Component<{},IMyComponentState> {
  constructor(props:any) {
    super(props);
    this.state = {
      name: '',
      password:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleChange(event: any){
    this.setState(
      {
        name: event.target.name,
        password:event.target.password
    });
    console.log('here:',this.state)
  }
  handleSubmit(event:any) {
    alert('A name was submitted: ' + this.state); //error here
    event.preventDefault();
  }
  render() {

  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>LEAD</IonTitle>
          <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/>
        </IonToolbar>
      </IonHeader>
      <IonContent>
    <form onSubmit={this.handleSubmit}>
      <IonItem>
        <IonLabel>Name</IonLabel>
        <IonInput type="text" placeholder="name" required
        value={this.state.name}
        onChange={this.handleChange}
        />

      </IonItem>


      <IonItem>
        <IonLabel>Password</IonLabel>
        <IonInput type="password" placeholder="Password" required
          value={this.state.password}
          onChange={this.handleChange}
        />

      </IonItem>
    </form>
      </IonContent>
    </IonPage>
  )
  }
};

export default Tab3Page;
