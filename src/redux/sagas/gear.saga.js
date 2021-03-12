import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchGear() {
  try {
    const response = yield axios.get("/api/item");
    yield put({ type: "SET_GEAR", payload: response.data });
  } catch (err) {
    console.log(`error in fetching gear ${err}`);
  }
}

function* addGear(action) {
  try {
    console.log(action.payload);
    yield axios.post("/api/item", action.payload);
    yield put({ type: "FETCH_GEAR" });
  } catch (error) {
    console.log(error);
  }
}

function* fetchFavorites() {
  try {
    const response = yield axios.get("/api/item/favorites");
    yield put({ type: "SET_FAVORITES", payload: response.data });
  } catch (err) {
    console.log(`error in fetching favorites ${err}`);
  }
}

function* unFavoriteItem(action) {
  try {
    const favoriteID = action.payload.favorites_id;
    console.log("removing favorite with id:", favoriteID);
    console.log("******** payload: ", favoriteID);
    yield axios.delete(`/api/item/deleteFav/${favoriteID}`);
    yield put({ type: "FETCH_FAVORITES" });
  } catch (err) {
    console.log(`error in removing favorite: ${err}`);
  }
}
// function* editGear(action) {
//   try {
//     yield axios.put(`api/item/${action.payload.id}`, action.payload);
//     yield put({ type: "FETCH_GEAR" });
//   } catch (err) {
//     console.log(err);
//   }
// }

function* favoriteItem(action) {
  try {
    console.log('action.payload in favoriteItem', action.payload);
    yield axios.post("/api/item/addToFav", action.payload.id);
  } catch (error) {
    console.log(error);
  }
}

function* gearSaga() {
  yield takeLatest("FETCH_GEAR", fetchGear);
  yield takeLatest("ADD_GEAR", addGear);
  yield takeLatest("FETCH_FAVORITES", fetchFavorites);
  yield takeLatest("UNFAVORITE_ITEM", unFavoriteItem);
  yield takeLatest("FAVORITE_ITEM", favoriteItem);
}

export default gearSaga;
