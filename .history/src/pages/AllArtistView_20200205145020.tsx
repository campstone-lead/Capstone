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
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonContent,
  IonBackButton

} from '@ionic/react';

import React from 'react';
import {me} from '../store/user'
import {fetchArtists} from '../store/artist'
import {connect} from 'react-redux'
import './Tab1.css';


interface IMyComponentProps{
  artists:object,
  me:any,
  fetchArtists:any
}
class AllArtistView extends React.Component <IMyComponentProps,{}> {

  async componentDidMount(){
    await this.props.fetchArtists()
  }

  render(){

if(!Array.isArray(this.props.artists)) return <IonCardTitle>Loading...</IonCardTitle>
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


<div className="home">

<IonCardHeader className="home" mode="ios">

<IonBackButton defaultHref="/home" mode="ios"
text=" Back "
color="dark"
className="backBtn"
/>
<IonCardTitle className="textBox">Here is a list with all artist registered on our platform</IonCardTitle>
</IonCardHeader>

{/* this is where artists go */}
{(this.props.artists.map((artist,index)=>
  {
    let genres=''
    artist['genres'].forEach((el,index)=>{
       genres+=el+' '
    })

  console.log(artist,index)
  return (<IonCard  key={index} className='profile' style={{ "width":"auto"}} mode="ios">
  <div className='artistBox' >

      <img  src={artist['imageUrl']} alt="img.jpg"/>

    <IonItemGroup  style={{"margin":"20px"}}>
    <IonCardTitle style={{"textAlign":"center","display":"flex","flex-wrap":"wrap"}}>{artist['artistName']}</IonCardTitle>
    <IonCardSubtitle style={{"textAlign":"center"}}>{genres}</IonCardSubtitle>
    </IonItemGroup>
  </div>
</IonCard>)}

  ))}


</div>


      </IonContent>
    </IonPage>
  );
  }
};
const mapStateToProps=(state)=>({
  artists:state.artist,
  user:state.user
})
const mapDispatchToProps=(dispatch)=>({
  me:()=>dispatch(me()),
  fetchArtists:()=>dispatch(fetchArtists())
})
export default connect(mapStateToProps,mapDispatchToProps)(AllArtistView);
