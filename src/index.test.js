import { applyMiddleware, createStore } from 'redux'
import reduxHistoryPushMiddleware from '../src'

describe('reduxHistoryPushMiddleware', () => {
  let history

  beforeEach(() => {
    history = {
      push: jest.fn()
    }
  })

  describe('default setup', () => {
    it('calls history.push with the string on action.meta.pushToRoute', () => {
      const store = createStore(
        () => ({}),
        applyMiddleware(reduxHistoryPushMiddleware(history))
      )

      const action = {
        type: 'SOMETHING_HAPPENED',
        meta: {
          pushToRoute: '/test-route'
        }
      }
      store.dispatch(action)
      expect(true).toBe(false)
      expect(history.push).toHaveBeenCalledWith(action.meta.pushToRoute)
    })

    it('does not call history.push if no history object is provided', () => {
      const store = createStore(
        () => ({}),
        applyMiddleware(reduxHistoryPushMiddleware())
      )

      const action = {
        type: 'SOMETHING_HAPPENED',
        payload: 'update'
      }
      store.dispatch(action)
      expect(history.push).not.toHaveBeenCalled()
    })

    it('does not call history.push if there is no action.meta.pushToRoute and no options.metaKey key provided', () => {
      const store = createStore(
        () => ({}),
        applyMiddleware(reduxHistoryPushMiddleware(history))
      )

      const action = {
        type: 'SOMETHING_HAPPENED',
        payload: 'update'
      }
      store.dispatch(action)
      expect(history.push).not.toHaveBeenCalled()
    })
  })

  describe('options', () => {
    it('checks a custom key on actions.meta when the metaKey option is provided.', () => {
      const store = createStore(
        () => ({}),
        applyMiddleware(
          reduxHistoryPushMiddleware(history, { metaKey: 'customKey' })
        )
      )

      const action = {
        type: 'SOMETHING_HAPPENED',
        meta: {
          customKey: '/test-route'
        }
      }
      store.dispatch(action)
      expect(history.push).toHaveBeenCalledWith(action.meta.customKey)
    })

    it('checks the action.type using a Regular Expression string when the matcher option is provided', () => {
      const store = createStore(
        () => ({}),
        applyMiddleware(
          reduxHistoryPushMiddleware(history, { match: '_HAPPEND$' })
        )
      )

      const action = {
        type: 'SOMETHING_HAPPENED',
        meta: {
          pushToRoute: '/test-route'
        }
      }
      store.dispatch(action)
      expect(history.push).toHaveBeenCalledWith(action.meta.pushToRoute)
    })

    it('does not call history.push if a matcher regular expression is provided and the action.type string does not match', () => {
      const store = createStore(
        () => ({}),
        applyMiddleware(
          reduxHistoryPushMiddleware(history, { match: '_TEST$' })
        )
      )

      const action = {
        type: 'SOMETHING_HAPPENED',
        meta: {
          pushToRoute: '/test-route'
        }
      }
      store.dispatch(action)
      expect(history.push).not.toHaveBeenCalledWith()
    })
  })
})
