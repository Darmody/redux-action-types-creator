import _ from 'lodash/fp'
import merge from 'lodash/merge'
import {
  SYNC,
  ASYNC,
  ALL_IN_ASYNC,
  ASYNC_TYPES_DEFAULT_SUFFIX
} from './constants'

const destructPath = _.compose(_.drop(1), _.split('/'))
const mergeObjects = (objects) => merge({}, ...objects)

export {
  SYNC,
  ASYNC,
}

export default (namespace, options = {}) => (definition) => {
  const APP_NAMESPACE = `@@${namespace}`
  const ASYNC_TYPES_SUFFIX = options.asyncSuffix ? options.asyncSuffix : ASYNC_TYPES_DEFAULT_SUFFIX

  const createActionType = (typeDefine, path = '') => {
    const constructSyncType = _.assocPath(_.__, `${APP_NAMESPACE}${path}`, {})

    const constructAsyncType = (objectPath) => _.compose(
      _.concat(_, _.assocPath(
        [...objectPath, ALL_IN_ASYNC],
        _.map(suffix => `${APP_NAMESPACE}${path}/${suffix}`)(ASYNC_TYPES_SUFFIX),
        {},
      )),
      _.map((action) => _.assocPath(
        [...objectPath, action],
        `${APP_NAMESPACE}${path}/${action}`,
        {},
      )),
    )(ASYNC_TYPES_SUFFIX)

    const generateTypeForKeys = _.map(key => createActionType(typeDefine[key], `${path}/${key}`))

    const generateSyncType = _.compose(
      constructSyncType,
      destructPath,
    )

    const generateAsyncType = _.compose(
      mergeObjects,
      constructAsyncType,
      destructPath,
    )

    const generateTypeForTypeDefine = _.compose(
      mergeObjects,
      generateTypeForKeys,
      _.keys
    )

    return _.cond([
      [_.equals(SYNC), () => generateSyncType(path)],
      [_.equals(ASYNC), () => generateAsyncType(path)],
      [_.T, generateTypeForTypeDefine],
    ])(typeDefine)
  }

  return createActionType(definition)
}
