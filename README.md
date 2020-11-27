# vuex-jsonschema-validation

A vuex state validation plugin on change state.

## usage

```shell
npm install --save vuex-jsonschema-validation
```

create vuex store and json schema.

```js
// schema.json

{
  "type": "object",
  "properties": {
    "todos": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "text": {
            "type": "string"
          },
          "done": {
            "type": "boolean"
          }
        }
      }
    }
  },
  "additionalProperties": false
}
```

```js
// store.js

import Vue from 'vue'
import Vuex from 'vuex'
import VuexJsonSceham from 'vuex-jsonschema-validation'
import schema from './schema.json'
const plugin = VuexJsonSceham(schema)

Vue.use(Vuex)


const state = {
  todos: [
    { id: 1, text: 'taskA', done: true },
    { id: 2, text: 'taskB', done: false }
  ]  
}

const actions = {}

const mutations = {
  change(state, { id, done }) {
    const target = state.todos.find(todo => todo.id === id)
    if (target) {
      target.done = done
    }
  },
  add(state, { text }) {
    const lastId = state.todos.slice(-1)[0].id
    state.todos.push({
      id: lastId + 1,
      text,
      done: false
    })
  },
  other() {
    state.abc = 'd'
  }
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [plugin],
  state,
  actions,
  mutations
})

export default store
```

