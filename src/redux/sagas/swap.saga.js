import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchOwnedSwaps() {
    try {
        const response = yield axios.get('/api/swaps/ownedswaps');
        yield put({ type: 'SET_OWNED_SWAPS', payload: response.data });
    } catch (err) {
        console.log(err);
    }
}

export default function* swapSaga() {
    yield takeLatest('FETCH_OWNED_SWAPS', fetchOwnedSwaps);
}