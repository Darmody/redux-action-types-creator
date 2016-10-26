import test from 'tape'
import actionTypeCreator, { SYNC, ASYNC } from '../src'

test('should define types according to definition', (t) => {
  t.plan(1)

  const actionType = actionTypeCreator('TEST/APP', {
    asyncSuffix: [
      'START', 'SUCCESS', 'FAIL',
    ]
  })

  const TODO_TYPES = actionType({
    TODO: {
      CREATE: SYNC,
      UPDATE: SYNC,
      FETCH: ASYNC,
      USER: {
        FETCH: ASYNC,
        DELETE: SYNC,
      }
    }
  })

  t.deepEqual(TODO_TYPES, {
    TODO: {
      CREATE: '@@TEST/APP/TODO/CREATE',
      UPDATE: '@@TEST/APP/TODO/UPDATE',
      FETCH: {
        START: '@@TEST/APP/TODO/FETCH/START',
        SUCCESS: '@@TEST/APP/TODO/FETCH/SUCCESS',
        FAIL: '@@TEST/APP/TODO/FETCH/FAIL',
      },
      USER: {
        FETCH: {
          START: '@@TEST/APP/TODO/USER/FETCH/START',
          SUCCESS: '@@TEST/APP/TODO/USER/FETCH/SUCCESS',
          FAIL: '@@TEST/APP/TODO/USER/FETCH/FAIL',
        },
        DELETE: '@@TEST/APP/TODO/USER/DELETE',
      }
    }
  })
})
