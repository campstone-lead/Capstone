import axios from 'axios'
import { iceCream } from 'ionicons/icons'
// import history from '../pages/history'

/**
 * ACTION TYPES
 */
const GET_ARTISTS = 'GET_ARTISTS'
const PUT_PERSONAL_INFO = 'PUT_PERSONAL_INFO'
const PUT_ARTIST_NAME = 'PUT_ARTIST_NAME'
const PUT_ZIP_CODE = 'PUT_ZIP_CODE'
const PUT_GENRE = 'PUT_GENRE'
const UPDATE_ARTIST = 'UPDATE_ARTIST'
const PUT_TYPE = 'PUT_TYPE'
const PUT_BIO = 'PUT_BIO'

/**
 * INITIAL STATE
 */
const defaultArtist = {
  // firstName: '',
  // lastName: '',
  // artistName: '',
  // genres: [],
  // imageUrl: '',
  // zipCode: '',
  // instagramUrl: '',
  // spotifyUrl: '',
  // facebookUrl: '',
  // type: '',
  // phone: '',
  // email: '',
  // password: '',
}

/**
 * ACTION CREATORS
 */

export const getArtists = artists => ({ type: GET_ARTISTS, artists })
export const putPersonalInfo = (info) => ({ type: PUT_PERSONAL_INFO, info })
export const putArtistName = (name) => ({ type: PUT_ARTIST_NAME, name })
export const putZipCode = (zipcode) => ({ type: PUT_ZIP_CODE, zipcode })
export const putGenre = (genre) => ({ type: PUT_GENRE, genre })
export const updateArtist = newArtistData => ({ type: UPDATE_ARTIST, newArtistData })
export const putType = (artistType) => ({ type: PUT_TYPE, artistType })
export const putBio = (artistBio) => ({ type: PUT_BIO, artistBio })

/**
 * THUNK CREATORS
 */

export const getRocommendedArtists = (id) => async dispatch => {
  try {
    const res = await axios({
      method: "get",
      baseURL: "http://localhost:8080/api/",
      url: `/artists/distance/${id}`
    })

    dispatch(getArtists(res.data))
  } catch (err) {
    console.log(err)
  }
}

export const fetchArtists = () => async dispatch => {
  try {

    const res = await axios({
      method: "get",
      baseURL: "http://localhost:8080/api/",
      url: "/artists"
    })

    dispatch(getArtists(res.data || defaultArtist))
  } catch (err) {
    console.error(err)
  }
}
export const updatedArtist = (artistInfo) => async dispatch => {
  try {

    let artist = window.localStorage.getItem('artistInfo')
    let password = artistInfo.password
    let newArtist;

    if (password === undefined) {
      if (artist === null) {
        window.localStorage.setItem('artistInfo', JSON.stringify(artistInfo))
      } else {
        artist = JSON.parse(artist || '')
        newArtist = artist || {};


        newArtist = { ...newArtist, ...artistInfo };

        window.localStorage.setItem('artistInfo', JSON.stringify(newArtist))

      }
    }

    if (password !== undefined) {

      artist = JSON.parse(artist || '')
      newArtist = artist || {};
      let sendArtist = {
        firstName: newArtist["firstName"],
        lastName: newArtist["lastName"],
        artistName: newArtist["artistName"],
        genres: newArtist['genres'],
        bio: newArtist['bio'],
        imageUrl: newArtist['imageUrl'],
        zipCode: newArtist["zipCode"],
        instagramUrl: newArtist["instagramUrl"],
        spotifyUrl: newArtist["spotifyUrl"],
        facebookUrl: newArtist["facebookUrl"],
        type: newArtist["type"],
        phone: newArtist['phone'],
        email: newArtist["email"],
        password: password

      }
      console.log(sendArtist, 'SENDARTIST')

      await axios({
        method: "post",
        baseURL: "http://localhost:8080/api/",
        url: "/artists/",
        data: sendArtist
      })
      window.localStorage.clear()
      dispatch(updateArtist(sendArtist))
    }

  } catch (err) {
    console.error(err)
  }
}


/**
 * REDUCER
 */
export default function (state = defaultArtist, action) {
  switch (action.type) {
    case GET_ARTISTS:
      return action.artist

    case PUT_PERSONAL_INFO:
      return {
        ...state,
        firstName: action.info.firstName,
        lastName: action.info.lastName,
        phone: action.info.phone,
        email: action.info.email,

      }

    case PUT_ARTIST_NAME:
      return { ...state, artistName: action.name }
    case PUT_ZIP_CODE:
      return { ...state, zipCode: action.zipcode }
    case PUT_GENRE:
      return { ...state, genres: action.genre }

    case UPDATE_ARTIST:
      window.localStorage.setItem('artist', JSON.stringify(action.newArtistData))
      return { ...state, ...action.newArtistData }
    case PUT_TYPE:
      return { ...state, type: action.artistType }
    case PUT_BIO:
      return { ...state, bio: action.artistBio }
    default:
      return state
  }
}
