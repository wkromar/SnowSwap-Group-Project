import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { AccordionSummary } from "@material-ui/core";

function* fetchGear() {
  try {
    const response = yield axios.get("/api/item");
    yield put({ type: "SET_GEAR", payload: response.data });
  } catch (err) {
    console.log(`error in fetching gear ${err}`);
  }
}

function* fetchGearToAdd(action) {
  try {
    const response = yield axios.get(
      `/api/item/availableGear/${action.payload}`
    );
    yield put({ type: "SET_GEAR", payload: response.data });
  } catch (err) {
    console.log(`error in fetching gear ${err}`);
  }
}

function* addGear(action) {
  try {
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
    const favoriteID = action.payload[0].favorites_id;
    yield axios.delete(`/api/item/deleteFav/${favoriteID}`);
    yield put({ type: "FETCH_SWAP_ITEMS", payload: action.payload[1] });
  } catch (err) {
    console.log(`error in removing favorite: ${err}`);
  }
}
function* changeGear(action) {
  try {
    yield axios.put(`api/item/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_GEAR" });
  } catch (err) {
    console.log(err);
  }
}

function* favoriteItem(action) {
  try {
    yield axios.post("/api/item/addToFav", action.payload[0]);
    yield put({ type: "FETCH_SWAP_ITEMS", payload: action.payload[1] });
  } catch (error) {
    console.log(error);
  }
}

function* unfavoriteFromFavorites(action) {
  try {
    const favoriteID = action.payload.favorites_id;
    yield axios.delete(`/api/item/deleteFav/${favoriteID}`);
    yield put({ type: "FETCH_FAVORITES" });
  } catch (err) {
    console.log(`error in removing favorite: ${err}`);
  }
}

function* deleteGear(action) {
  try {
    console.log("deleting item", action.payload);
    yield axios.delete(`api/item/${action.payload}`);
  } catch (err) {
    console.log(err);
  }
}

function* gearSaga() {
  yield takeLatest("FETCH_GEAR", fetchGear);
  yield takeLatest("ADD_GEAR", addGear);
  yield takeLatest("FETCH_FAVORITES", fetchFavorites);
  yield takeLatest("UNFAVORITE_ITEM", unFavoriteItem);
  yield takeLatest("FAVORITE_ITEM", favoriteItem);
  yield takeLatest("CHANGE_GEAR", changeGear);
  yield takeLatest("UNFAVORITE_FROM_FAVORITES", unfavoriteFromFavorites);
  yield takeLatest("FETCH_GEAR_TO_ADD", fetchGearToAdd);
  yield takeLatest("DELETE_ITEM", deleteGear);
}

export default gearSaga;
