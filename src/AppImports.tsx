import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, contact, logOut, logIn, notifications } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab4 from './pages/Tab4';
import LandingPage from './pages/landingPage';
import PersonalInfo from './pages/Artist/Signup/PersonalInfo';
import ZipCodeForm from './pages/Artist/Signup/ZipCodeForm';
import ArtistNameForm from './pages/Artist/Signup/ArtistNameForm';
import ArtistBioForm from './pages/Artist/Signup/ArtistBioForm';
import Genres from './pages/Artist/Signup/Genres';
import ArtistType from './pages/Artist/Signup/ArtistType';
import UploadPicture from './pages/Artist/Signup/UploadPicture';
import ArtistPassword from './pages/Artist/Signup/ArtistPassword';
import SignUpSignIn from './pages/SignUpSignIn';
import SignUpZero from './pages/SignUp0';
import BookerSignup1 from './pages/booker/Signup/BookerSignup1';
import BookerSignup2 from './pages/booker/Signup/BookerSignup2';
import BookerSignup3 from './pages/booker/Signup/BookerSignup3';
import BookerSignup4 from './pages/booker/Signup/BookerSignup4';
import BookerSignup5 from './pages/booker/Signup/BookerSignup5';
import BookerSignup6 from './pages/booker/Signup/BookerSignup6';
import BookerSignup7 from './pages/booker/Signup/BookerSignup7';
import AllArtistView from './pages/AllArtistView';
import ArtistSinglePage from './pages/ArtistSinglePage';
import VenueForm from './pages/booker/venue/add-venue-form';
import EventForm from './pages/booker/event/add-event-form';
import EventSinglePage from './pages/booker/event/EventSinglePage';
import Profile from './pages/Profile';
import Filter from './pages/Artist/Search/Filter';
import SearchBar from './pages/Artist/Search/SearchBar';
import { connect } from 'react-redux';
import NotificationWall from './pages/NotificationWall'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import { me, logout } from './store/user';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import history from './history';
/* Theme variables */
import './theme/variables.css';
import { render } from '@testing-library/react';
import Tab3 from './pages/Tab3';
import AllVenuesView from './pages/Artist/Search/AllVenueFilter';
export {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  Redirect,
  Route,
  React,
  IonReactRouter,
  home,
  me,
  logout,
  contact,
  logOut,
  logIn,
  Tab1,
  Tab2,
  LandingPage,
  PersonalInfo,
  ZipCodeForm,
  ArtistNameForm,
  ArtistBioForm,
  Genres,
  ArtistType,
  UploadPicture,
  ArtistPassword,
  SignUpSignIn,
  SignUpZero,
  BookerSignup1,
  BookerSignup2,
  BookerSignup3,
  BookerSignup4,
  BookerSignup5,
  BookerSignup6,
  BookerSignup7,
  AllArtistView,
  ArtistSinglePage,
  VenueForm,
  EventForm,
  EventSinglePage,
  Profile,
  Filter,
  SearchBar,
  connect,
  history,
  render,
  Tab3,
  AllVenuesView,
  NotificationWall,
  notifications,
  Tab4
};
