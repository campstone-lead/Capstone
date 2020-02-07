import {
    IonButton,
    IonItem,
    IonContent,
    IonCard,
    IonHeader,
    IonToolbar
} from '@ionic/react';

import React from 'react';
import './Tab1.css';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const LandingPage: React.FC = () => {

    return (

        <IonContent >
            <div className="landingPage">

                <IonHeader >

                    <IonToolbar className="tabHeader" >
                        <div className="tabHeader">
                            <img
                                src="https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png"
                                alt="logo.png"
                                className="logo"
                            />
                            <h3> Discover. Book .Connect.</h3>
                        </div>
                    </IonToolbar>


                </IonHeader>

                <AutoplaySlider
                    play={true}
                    cancelOnInteraction={true}
                    interval={4000}
                >
                    <div data-src="https://www.6amgroup.com/wp-content/uploads/2017/01/vashtie-dj-recrop.jpg" />
                    <div data-src="https://www.elsewherebrooklyn.com/cache/8a/2e/8a2e0720006f4165aae3811fbe2bbd0d.jpg" />
                    <div data-src="https://www.pngitem.com/pimgs/m/134-1345781_pop-artists-pop-music-artists-collage-hd-png.png" />
                </AutoplaySlider>
                <IonCard className="profile" mode='ios'>
                    <h3 style={{ "padding": "31px" }}>LEAD streamlines the booking process between an artist and a booker. </h3>
                    <p style={{ "fontSize": "15.5px", "margin": "10px" }}>
                        Bookers can quickly discover and connect with artists through our recommendation engine, finding artists by distance and artistic style. Artists can also discover venues and the bookers to connect with instead of needlessly scouring the web. LEAD's job board for musicians is a simple and effective solution towards making everyone's life easier.
                    </p>
                </IonCard>
                <IonItem routerLink={'/login'} lines='none' >
                    <IonButton>Get Started</IonButton>
                </IonItem>


            </div>
        </IonContent>

    )
}

export default LandingPage;
