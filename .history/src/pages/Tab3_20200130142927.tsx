import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonSearchbar,IonItem,IonInput,IonLabel } from '@ionic/react';
import './Tab1.css';
const Tab3Page: React.FC = () => {
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
        <IonInput type="text">
          </IonInput>
      </IonItem>


      <IonItem>
        <IonLabel>Password</IonLabel>
        <IonInput type="password">
          </IonInput>
      </IonItem>
    </form>
      </IonContent>
    </IonPage>
  );
};

export default Tab3Page;
