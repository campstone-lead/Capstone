import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    // IonIcon,
    // IonItem,
    // IonLabel,
    IonItemGroup,
    // IonListHeader,
    IonButton,
    IonItem,
    IonPage,
    IonHeader,
    IonToolbar,
    IonSearchbar,
    IonContent,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    IonTitle

} from '@ionic/react';

import React from 'react';
import './Tab1.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';


const LandingPage: React.FC = () => {

    return (
        <IonPage>
            <IonHeader mode="ios"  >
                <IonToolbar mode="ios" >
                    <div className="tabHeader">
                        <img src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png" alt="logo.png" className="logo" />
                        <IonSearchbar
                            mode="ios"
                            className="searchBar"
                            animated
                            showCancelButton="focus"
                            cancelButtonText='x'
                        >
                        </IonSearchbar>
                    </div>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <h1>Discover. Book. Connect.</h1>
                <AwesomeSlider>
                    <div data-src="https://www.6amgroup.com/wp-content/uploads/2017/01/vashtie-dj-recrop.jpg" />
                    <div data-src="https://www.elsewherebrooklyn.com/cache/8a/2e/8a2e0720006f4165aae3811fbe2bbd0d.jpg" />
                    <div data-src="https://www.pngitem.com/pimgs/m/134-1345781_pop-artists-pop-music-artists-collage-hd-png.png" />
                </AwesomeSlider>
                {/* <img src="https://www.pngitem.com/pimgs/m/134-1345781_pop-artists-pop-music-artists-collage-hd-png.png" /> */}
            </IonContent>
            <h3>LEAD streamlines the booking process between an artist and a booker. </h3>
            <p>Bookers can quickly discover and connect with artists through our recommendation engine, finding artists by distance and artistic style. Artists can also discover venues and the bookers to connect with instead of needlessly scouring the web. LEAD's job board for musicians is a simple and effective solution towards making everyone's life easier.</p>
            <IonItem routerLink={'/login'}>
                <IonButton>Get Started</IonButton>
            </IonItem>
        </IonPage>
    )
}

export default LandingPage;


// class LandingPage extends React.Component<IMyComponentProps, IMyComponentState> {
//     constructor(props) {
//         super(props)
//     }

//     render() {
//         return (
//             <IonPage>
//                 <IonHeader mode="ios"  >
//                     <IonToolbar mode="ios" >
//                         <div className="tabHeader">
//                             <img src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png" alt="logo.png" className="logo" />
//                             <IonSearchbar
//                                 mode="ios"
//                                 className="searchBar"
//                                 animated
//                                 showCancelButton="focus"
//                                 cancelButtonText='x'
//                             >
//                             </IonSearchbar>
//                         </div>
//                     </IonToolbar>
//                 </IonHeader>

//                 <IonContent>

//                 </IonContent>
//             </IonPage>
//         )
//     }
// }