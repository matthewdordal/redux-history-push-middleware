const reduxHistoryPushMiddleware = (
  history,
  { metaKey = 'pushToRoute', matcher } = {}
) => {
  let reMatcher
  if (matcher && typeof matcher === 'string') {
    reMatcher = new RegExp(matcher)
  }

  return store => next => action => {
    if (typeof history !== 'object' || typeof history.push !== 'function') {
      return next(action)
    }

    var hasMetaKey =
      action.meta &&
      action.meta[metaKey] &&
      typeof action.meta[metaKey] === 'string'

    if (reMatcher && reMatcher.test(action.type)) {
      if (hasMetaKey) {
        history.push(action.meta[metaKey])
        return next(action)
      }
    } else if (hasMetaKey) {
      history.push(action.meta[metaKey])
      return next(action)
    }

    return next(action)
  }
}

export default reduxHistoryPushMiddleware
