import client from '../../helpers/ApiClient';
import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  LOAD, LOAD_SUCCESS, LOAD_FAIL,
} from '../reducers/schedule.js';

// SUBROUTINES

function* load(action) {
  try {
    const result = yield call(client.get, '/schedule.json');

    yield put({ ...action, type: LOAD_SUCCESS, result });
  }
  catch (e) {
    if (e instanceof Error) throw e;
    yield put({ ...action, type: LOAD_FAIL, error: e.resource });
  }
}


// WATCHERS

function* watchLoad() {
  yield* takeLatest(LOAD, load);
}

export default function* watchPreview() {
  yield [
    fork(watchLoad),
  ]
}
