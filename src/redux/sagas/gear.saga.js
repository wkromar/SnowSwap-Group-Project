import { put, takeLatest } from "redux-saga/effects";
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
    yield put({ type: "SET_GEAR" });
  } catch (error) {
    console.log(error);
  }
}

function* gearSaga() {
  yield takeLatest("FETCH_GEAR", fetchGear);
  yield addGear("ADD_GEAR", addGear);
}

export default gearSaga;
