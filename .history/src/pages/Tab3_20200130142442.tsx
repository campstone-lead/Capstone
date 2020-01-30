import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel } from '@ionic/react';
import './Tab1.css';
class Tab3Page{
  constructor(){

  }

  render(){
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
          <IonInput>
            </IonInput>
        </IonItem>
      </form>
        </IonContent>
      </IonPage>
    );
  }

};

export default Tab3Page;
