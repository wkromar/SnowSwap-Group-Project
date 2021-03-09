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


function* gearSaga() {
    yield takeLatest('FETCH_GEAR', fetchGear)
}

export default gearSaga;