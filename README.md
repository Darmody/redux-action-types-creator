# redux-action-types-creator

[![build status][travis-image]][travis-url]

A simple lib help your define `redux action type` in easy way.

## Installation

```
  yarn add redux-action-types-creator
```

Or

```
  npm install redux-action-types-creator --save
```

## Usage

```js
  import actionTypeCreator, { SYNC, ASYNC } from 'redux-action-types-creator'

  const actionType = actionTypeCreator('APP')

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

  /**

  {
    TODO: {
      CREATE: '@@APP/TODO/CREATE',
      UPDATE: '@@APP/TODO/UPDATE',
      FETCH: {
        START: '@@APP/TODO/FETCH/REQUEST',
        SUCCESS: '@@APP/TODO/FETCH/SUCCESS',
        FAIL: '@@APP/TODO/FETCH/FAILURE',
      },
      USER: {
        FETCH: {
          START: '@@APP/TODO/USER/FETCH/REQUEST',
          SUCCESS: '@@APP/TODO/USER/FETCH/SUCCESS',
          FAIL: '@@APP/TODO/USER/FETCH/FAILURE',
        },
        DELETE: '@@APP/TODO/USER/DELETE',
      }
    }
  }

  */
```

**SYNC**: generate a single normal type.  
**ASYNC**: generate three types for async operation.

You can define your own async types suffix by:
```js
  actionTypeCreator('namespace', {
    asyncSuffix: [
     'START', 'SUCCESS', 'FAIL',  // default value is: ['REQUEST', 'SUCCESS', 'FAILURE']
    ]
  })
```

[travis-image]: https://img.shields.io/travis/Darmody/redux-action-types-creator/master.svg
[travis-url]: https://travis-ci.org/Darmody/redux-action-types-creator
