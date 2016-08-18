import { takeLatest } from 'redux-saga';
import { put, fork } from 'redux-saga/effects';
import {
  LOAD, LOAD_SUCCESS, LOAD_FAIL,
} from '../reducers/schedule.js';
import json from '../../static/schedule.json';

const normalize = (_data) => {
  const byDays = _data.days.reduce((daysAcc, day) => {
    daysAcc[day.name] = day.stages.reduce((stagesAcc, stage) => {
      stage.sessions.forEach(session => {
        const hour = Number(session.time_start) / 100;
        stagesAcc[hour] = [
          ...(stagesAcc[hour] || []),
          {
            ...session,
            id: String(session.id),
            image: session.speaker.image
                      ? `http://abstractions.io/images/speakers/${session.speaker.image}`
                      : session.speaker.external_image,
            time_start: Number(session.time_start),
            time_end: Number(session.time_end),
            stage: stage.name.split(' ')[0],
          }
        ]
      })
      return stagesAcc;
    }, {});
    return daysAcc;
  }, {});
  return byDays;
};

// SUBROUTINES

function* load(action) {
  try {
    const result = yield json;

    yield put({ ...action, type: LOAD_SUCCESS, result: normalize(result) });
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
