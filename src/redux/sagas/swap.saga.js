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

function* fetchSwapItems(action) {

    try {
        // yield console.log('action!!!', action.payload.id);
        const response = yield axios.get(`/api/swaps/swapItems/${action.payload}`);
        console.log('!!!!!!!!!!', response);
        yield put({ type: 'SET_SWAP_ITEMS', payload: response.data });
    } catch (err) {
        console.log(err);
    }
}

function* fetchAllSwaps() {
    try {
        const response = yield axios.get('/api/swaps');
        yield put({ type: 'SET_ALL_SWAPS', payload: response.data });
        const joinedResponse = yield axios.get('/api/swaps/swapsJoined');
        yield put({ type: 'SET_JOINED_SWAPS', payload: joinedResponse.data });
    } catch (err) {
        console.log(err);
    }
}

function* createSwap(action) {
    try {
        yield axios.post('/api/swaps/', action.payload);
        yield put({ type: 'FETCH_ALL_SWAPS' });
    } catch (err) {
        console.log(err);
    }
}

function* addSelectedToSwap(action) {
    try {
        console.log('!!!!!', action.payload.gearToAdd)
        yield axios.post('api/swaps/addToSwap', action.payload);
        yield put({ type: 'FETCH_SWAP_ITEMS', payload: action.payload.id})
    } catch (err) {
        console.log(err);
    }
}

function* editSwap(action) {
    try {
        yield axios.put(`/api/swaps/edit/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_ALL_SWAPS' });
    } catch (err) {
        console.log(err);
    }
}

function* removeFromSwap(action) {
    try {
        console.log(`action.payload.swap_id`, action.payload.swap_id);
        yield axios.delete(`/api/swaps/removeFromSwap/${action.payload.swap_item_id}`);
        yield put({ type: 'FETCH_SWAP_ITEMS', payload: action.payload.swap_id });
    } catch (err) {
        console.log(err);
    }
}

function* fetchSelectedSwap(action) {
    try {
        // yield console.log('action!!!', action.payload.id);
        const response = yield axios.get(`/api/swaps/selectedswap/${action.payload}`);
        console.log('response', response);
        yield put({ type: 'SET_SELECTED_SWAP', payload: response.data });
    } catch (err) {
        console.log(err);
    }
}

export default function* swapSaga() {
    yield takeLatest('FETCH_OWNED_SWAPS', fetchOwnedSwaps);
    yield takeLatest('FETCH_SWAP_ITEMS', fetchSwapItems);
    yield takeLatest('FETCH_ALL_SWAPS', fetchAllSwaps);
    yield takeLatest('CREATE_SWAP', createSwap);
    yield takeLatest('ADD_SELECTED_TO_SWAP', addSelectedToSwap)
    yield takeLatest('EDIT_SWAP', editSwap);
    yield takeLatest('REMOVE_FROM_SWAP', removeFromSwap);
    yield takeLatest('FETCH_SELECTED_SWAP', fetchSelectedSwap);
}