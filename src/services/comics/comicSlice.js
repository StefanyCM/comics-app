import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  comics: {
    newComics: [], reviewComics: [], approvedComics: []
  },
  loading: false,
  error: null,
  idBuscado: null,
  comicSelected: null,
  newComics: [],
}

const comicSlice = createSlice({
  name: "comic",
  initialState,
  reducers: {
    getComics() { },
    setComics(state, { payload }) {
      state.comics = payload
      state.loading = false
    },
    getComicsFail(state, { payload }) {
      state.error = payload
      state.loading = false
    },
    addComic(state, { payload }) {
      state.comics.newComics = [payload, ...state.comics.newComics]
    }
  }
})

const comicActions = comicSlice.actions
const comicReducer = comicSlice.reducer

export { comicActions, comicReducer }


// import * as ComicTypes from './comicTypes';

// const initialState = {
//   comics: [],
//   loading: false,
//   error: null,
//   idBuscado: null,
//   comicSelected: null,
//   newComics: [],
// };

// const ComicReducer = (state = initialState, action) => {
//   const { type, payload, error } = action;
//   switch (type) {
//     case ComicTypes.GET_COMICS:
//       console.log(action);
//       return {...state, loading: true};

//     case ComicTypes.GET_COMICS_BY_ID:
//       return { ...state, idBuscado: payload.id };

//     case ComicTypes.GET_COMICS_SUCCESS:
//       return { ...state, comics: payload.comics, loading: false };

//     case ComicTypes.GET_COMICS_FAIL:
//       return { ...state, error, loading: false };

//     case ComicTypes.SELECT_COMIC:
//       return { ...state, comicSelected: payload.comic }

//     case ComicTypes.ADD_COMIC:
//       return {...state, newComics: [...state.newComics, payload.comic]}

//     default:
//       return state;
//   }
// }

// export default ComicReducer;