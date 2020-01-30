import React,{useState} from 'react';
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
  }


  // handleInputChange=(e: { target: { name: any; value: any; }; }) =>{
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }


  render() {
    console.log(this.props,this.state.name)
  return (

    <IonPage>
      <IonHeader >
        <IonToolbar id="bar" >
          <IonTitle>LEAD</IonTitle>
          <IonSearchbar className="search" placeholder="Search for venue..."  color="red"/>
        </IonToolbar>
      </IonHeader>
      <IonContent>
    <form>
      <IonItem>
        <IonLabel>Name</IonLabel>
        <IonInput type="text" placeholder="name" required
  value={this.state.name}

        />

      </IonItem>


      <IonItem>
        <IonLabel>Password</IonLabel>
        <IonInput type="password" placeholder="Password" required
          value={this.state.password}


        />

      </IonItem>
    </form>
      </IonContent>
    </IonPage>
  )
  }
};

export default Tab3Page;
