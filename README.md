# redux-history-push-middleware

history.push [middleware](https://redux.js.org/docs/advanced/Middleware.html) for redux.

## Motivaton

In some react/redux applications that use a user must transition to a route after some action has been dispatched. A HTTP Post success route transition is one possible example where this need can arise. This middleware seeks to establish a clear pattern for calling `history.push(route)` in these situations.

By looking at an action.meta property we can determine if any action should cause a transition to a new route.

## Setup

Create a redux store

```js
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import createBrowserHistory from 'history/createBrowserHistory';

import reduxHistoryPushMiddleware from 'reduxHistoryPushMiddleware';

const history = createBrowserHistory()

const reduxHistoryPush = reduxHistoryPushMiddleware(history);

const store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxHistoryPush)
  )
);

export default store;
```

An action creator

```js
// By default redux-history-push-middleware looks for the meta.pushToRoute
// property on actions. See the options section for how this can be
// configured.
const createItemFulfilled = (payload) => ({
  type: 'CREATE_ITEM_FULFILLED',
  payload,
  meta: {
    pushToRoute: '/items'
  }
})
```

## history parameter

A [history](https://github.com/ReactTraining/history) object.

## Options

```js
{
  metaKey: 'pushToRoute', // if specified it will the be key on the action.meta object that's string is used as the route for calling history.push(route)
  matcher, // A string that if specified will be a regular expression for handling specific action.types
}
```

### Options description

**metaKey**

The `action.meta` property must be an object. If `metaKey` is not provided the default will be `pushToRoute`. If metaKey is provided then that value should be used as the key to hold the route string in the meta object.

Example:

Inside createStore.js

```js

const reduxHistoryPush = reduxHistoryPushMiddleware(history, { metaKey: 'someKey' });
```

actonCreator.js

```js
const createItemFulfilled = payload => ({
  type: 'CREATE_ITEM_FULFILLED',
  payload,
  meta: {
    someKey: '/item'
  }
})
```

**matcher**

A string that is used for creating a regular expression to match `action.type` against. `history.push(route)` will only be called if the `action.type` matches the regular expression and the action.meta object contains the route key.

Example:

Inside createStore.js

```js
In createStore

const reduxHistoryPush = reduxHistoryPushMiddleware(history, { matcher: '_FULFILLED$'});
```

actionCreator.js

```js
const createItemFulfilled = payload => ({
  type: 'CREATE_ITEM_FULFILLED',
  payload,
  meta: {
    pushToRoute: '/item'
  }
})
```
