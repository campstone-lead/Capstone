import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonTitle

} from '@ionic/react';
import { book, build, colorFill, grid } from 'ionicons/icons';
import React from 'react';
import  './logo.png'
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
       <IonHeader >
        <IonToolbar id="bar" >
          <img src="./" alt="logo.png"/>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonList lines="inset">
          <IonListHeader>
            <IonLabel>Resources</IonLabel>
          </IonListHeader>
          <IonItem href="https://ionicframework.com/docs/" target="_blank">
            <IonIcon slot="start" color="medium" icon={book} />
            <IonLabel>Ionic Documentation</IonLabel>
          </IonItem>
          <IonItem href="https://ionicframework.com/docs/building/scaffolding" target="_blank">
            <IonIcon slot="start" color="medium" icon={build} />
            <IonLabel>Scaffold Out Your App</IonLabel>
          </IonItem>
          <IonItem href="https://ionicframework.com/docs/layout/structure" target="_blank">
            <IonIcon slot="start" color="medium" icon={grid} />
            <IonLabel>Change Your App Layout</IonLabel>
          </IonItem>
          <IonItem href="https://ionicframework.com/docs/theming/basics" target="_blank">
            <IonIcon slot="start" color="medium" icon={colorFill} />
            <IonLabel>Theme Your App</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
