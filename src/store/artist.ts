import axios from 'axios';

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
};

/**
 * ACTION CREATORS
 */

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
      baseURL: 'http://localhost:8080/',
      url: '/api/events/connection',
      data: { artistId, venueId },
    });
    dispatch(bookArtist(res.data));
  } catch (err) {
    console.log(err);
  }
};
export const sendRequest = request => async dispatch => {
  try {
    const res = await axios({
      method: 'post',
      baseURL: 'http://localhost:8080/api/',
      url: `/events/connection/`,
      data: request,
    });
    dispatch(bookArtist(res.data));
  } catch (err) {
    console.log(err);
  }
};
export const sendResponse = data => async dispatch => {
  try {
    const res = await axios({
      method: 'put',
      baseURL: 'http://localhost:8080/api/',
      url: `/events/connection/update`,
      data: data,
    });
    console.log('got one event->>>>', res.data);
    dispatch(bookArtist(res.data));
  } catch (err) {
    console.log(err);
  }
};
export const getRecommendedArtists = id => async dispatch => {
  try {
    const res = await axios({
      method: 'get',
      baseURL: 'http://localhost:8080/api/',
      url: `/artists/distance/${id}`,
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
      baseURL: 'http://localhost:8080/api/',
      url: '/artists',
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
      baseURL: 'http://localhost:8080/api/',
      url: `/artists/${id}`,
    });
    console.log('here', res.data.artist);
    dispatch(getOneArtist(res.data || defaultArtist));
  } catch (err) {
    console.error(err);
  }
};
export const updatedArtist = incomingArtist => async dispatch => {
  try {
    let currentArtist = window.localStorage.getItem('artistInfo');
    console.log('currentArtist:', currentArtist)

    let newArtist;

    console.log('incomingArtist:', incomingArtist)
    if (incomingArtist.password === undefined) {
      if (currentArtist === null) {
        window.localStorage.setItem('artistInfo', JSON.stringify(incomingArtist));
      } else {
        currentArtist = JSON.parse(currentArtist || '');
        let formerArtist = currentArtist || {};

        newArtist = { ...formerArtist, ...incomingArtist };

        window.localStorage.setItem('artistInfo', JSON.stringify(newArtist));
      }
    } else {
      currentArtist = JSON.parse(currentArtist || '');
      let formerArtist = currentArtist || {};
      newArtist = { ...formerArtist, ...incomingArtist }
      await axios({
        method: 'post',
        baseURL: 'http://localhost:8080/api/',
        url: '/artists/',
        data: newArtist,
      });
      window.localStorage.setItem(
        'email',
        JSON.stringify(newArtist.email)
      );
      dispatch(updateArtist(newArtist));
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = defaultArtist, action) {
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

    default:
      return state;
  }
}
