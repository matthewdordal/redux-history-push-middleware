# redux-history-push-middleware

history.push [middleware](https://redux.js.org/docs/advanced/Middleware.html) for redux.

## Install

```js
npm install --save redux-history-push-middleware
```

```js
yarn add redux-history-push-middlware
```

## Motivaton

In some react/redux applications a transition to a route after some action has been dispatched must occur. This middleware seeks to establish a clear pattern for calling `history.push(route)` in these situations.

By using the optional `meta` property described by [Flux Standard Actions](https://github.com/acdlite/flux-standard-action#actions) redux middleware can determine if any action should cause a transition to a new route.

## `reduxHistoryPushMiddleware(history, [options])`

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
// By default redux-history-push-middleware looks for the action.meta.pushToRoute property on actions.
const createItemFulfilled = (payload) => ({
  type: 'CREATE_ITEM_FULFILLED',
  payload,
  meta: {
    pushToRoute: '/items'
  }
})
```

## history parameter

A [history](https://github.com/ReactTraining/history) object with a `push` method.

## Options

```js
{
  metaKey: 'pushToRoute', // if specified it will the be key on the action.meta object that's string is used as the route for calling history.push(route)
  matcher, // A string that if specified will be a regular expression for handling specific action.types
}
```

### Options description

**metaKey**

The property to search for in the `action.meta` object of actions. It's value should be a string that matches a route. Defaults to `pushToRoute`.

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

A string that is used for creating a regular expression to match `action.type` against. `history.push(route)` will only be called if the `action.type` matches the regular expression and the `action.meta` object contains the key metaKey.

Example:

Inside createStore.js

```js
const reduxHistoryPush = reduxHistoryPushMiddleware(history, { matcher: '_FULFILLED$' });
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
