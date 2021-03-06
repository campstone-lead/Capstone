import axios from 'axios';
import socket from '../socket';

const entryURL = (process.env.NODE_ENV === 'production' ? 'https://harmonious-capstone.herokuapp.com/' : 'http://localhost:8080/')

/**
 * ACTION TYPES
 */
const GET_ARTISTS = 'GET_ARTISTS';
const UPDATE_ARTIST = 'UPDATE_ARTIST';
const GET_ONE_ARTIST = 'GET_ONE_ARTIST';
const BOOK_ARTIST = 'BOOK_ARTIST';

/**
 * INITIAL STATE
 */
const defaultArtist = {
  allArtists: [],
  artist: {},
  booked: {},
  status: '',
  allReq: [],
};

/**
 * ACTION CREATORS
 */
export const getReq = req => ({ type: 'GET_REQUEST', req });
export const getArtists = artists => ({ type: GET_ARTISTS, artists });
export const bookArtist = info => ({ type: BOOK_ARTIST, info });
export const getOneArtist = artist => ({ type: GET_ONE_ARTIST, artist });
export const updateArtist = newArtistData => ({
  type: UPDATE_ARTIST,
  newArtistData,
});

/**
 * THUNK CREATORS
 */
export const createConnection = (artistId, venueId) => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: entryURL,
      url: '/api/events/connection',
      data: { artistId, venueId },
    });
    dispatch(bookArtist(res.data));
  } catch (err) {
    console.log(err);
  }
};
export const sendRequest = request1 => async dispatch => {
  try {
    const res = await axios({
      method: 'post',
      baseURL: entryURL,
      url: `/api/events/connection/`,
      data: request1,
    });
    const request = res.data;
    dispatch(bookArtist(request));
    socket.emit('send-request', request);
  } catch (err) {
    console.log(err);
  }
};
export const sendResponse = data => async dispatch => {
  try {
    const res = await axios({
      method: 'put',
      baseURL: entryURL,
      url: `/api/events/connection/update`,
      data: data,
    });

    dispatch(bookArtist(res.data));
    const response = res.data;

    socket.emit('send-response', response);
  } catch (err) {
    console.log(err);
  }
};
export const getRecommendedArtists = id => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: entryURL,
      url: `/api/artists/distance/${id}`,
    });

    dispatch(getArtists(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const fetchArtists = () => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: entryURL,
      url: '/api/artists',
    });

    dispatch(getArtists(res.data || defaultArtist));
  } catch (err) {
    console.error(err);
  }
};

export const fetchOneArtists = id => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: entryURL,
      url: `/api/artists/${id}`,
    });

    dispatch(getOneArtist(res.data || defaultArtist));
  } catch (err) {
    console.error(err);
  }
};
export const updatedArtist = incomingArtist => async dispatch => {
  try {
    let currentArtist = window.localStorage.getItem('artistInfo');

    let newArtist;

    if (incomingArtist.password === undefined) {
      if (currentArtist === null) {
        window.localStorage.setItem(
          'artistInfo',
          JSON.stringify(incomingArtist)
        );
      } else {
        currentArtist = JSON.parse(currentArtist || '');
        let formerArtist = currentArtist || {};

        newArtist = { ...formerArtist, ...incomingArtist };

        window.localStorage.setItem('artistInfo', JSON.stringify(newArtist));
      }
    } else {
      currentArtist = JSON.parse(currentArtist || '');
      let formerArtist = currentArtist || {};
      newArtist = { ...formerArtist, ...incomingArtist };
      await axios({
        method: 'post',
        baseURL: entryURL,
        url: '/api/artists/',
        data: newArtist,
      });
      await window.localStorage.setItem(
        'email',
        JSON.stringify(newArtist.email)
      );
      dispatch(updateArtist(newArtist));
    }
  } catch (err) {
    console.error(err);
  }
};

export const signUpArtistWithGoogle = incomingArtist => async dispatch => {
  try {
    let currentArtist = window.localStorage.getItem('google');

    let newArtist;

    if (incomingArtist.phone === undefined) {
      if (currentArtist === null) {
        window.localStorage.setItem('google', JSON.stringify(incomingArtist));
      } else {
        currentArtist = JSON.parse(currentArtist || '');
        let formerArtist = currentArtist || {};

        newArtist = { ...formerArtist, ...incomingArtist };

        window.localStorage.setItem('google', JSON.stringify(newArtist));
      }
    } else {
      currentArtist = JSON.parse(currentArtist || '');
      let formerArtist = currentArtist || {};
      newArtist = { ...formerArtist, ...incomingArtist };
      await axios({
        method: 'post',
        baseURL: entryURL,
        url: '/api/artists/',
        data: newArtist,
      });
      window.localStorage.setItem(
        'googleId',
        JSON.stringify(newArtist.googleId)
      );
      dispatch(updateArtist(newArtist));
    }
  } catch (err) {
    console.error(err);
  }
};
export const editArtist = artist => async dispatch => {
  try {
    const newArtist = await axios({
      method: 'put',
      baseURL: entryURL,
      url: '/api/artists/',
      data: artist
    });

    dispatch(updateArtist(newArtist));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultArtist, action) {
  switch (action.type) {
    case GET_ARTISTS:
      return { ...state, allArtists: action.artists };
    case BOOK_ARTIST:
      return {
        ...state,
        booked: {
          venueId: action.info.venueId,
          artistId: action.info.artistId,
          status: action.info.status,
          bookerId: action.info.bookerId,
        },
      };
    case GET_ONE_ARTIST:
      return {
        ...state,
        artist: action.artist.artist,
        status: action.artist.status,
      };

    case UPDATE_ARTIST:
      return { ...state, ...action.newArtistData };
    case 'GET_REQUEST':
      return { ...state, allReq: [...state.allReq, action.req] };

    default:
      return state;
  }
}
