import Vue from 'vue'
import Vuex from 'vuex'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import https from 'https'
import xml2js from 'xml2js'

import App from './App'
import routes from './routes'

import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(Vuex)
Vue.config.debug = true

/* eslint-disable no-new */

// Setup the router
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  // Enabling history mode seems to break live-reload due to a
  // content security policy error. Why is this happening?
  // mode: 'history',
  routes
})

// Setup the shared Vuex store. In a more complex app this could be broken
// up into separate modules for Actions, Mutations, etc.
const store = new Vuex.Store({
  // Attributes in state should be referenced in components as computed
  // properties, since they are really functions that check the current
  // state of that property in real time.
  state: {
    books: []
  },
  // Mutations are synchronous
  mutations: {
    updateBooks (state, books) {
      state.books = books
    }
  },
  // Actions can be asynchronous, as below
  actions: {
    fetchBooksFromOPDS (context, url) {
      let parser = new xml2js.Parser({
        mergeAttrs: true,
        explicitArray: false
      })

      https.get(url, (response) => {
        let body = ''
        let newBooks = []
        response.on('data', function (d) { body += d })
        response.on('end', () => {
          parser.parseString(body, (err, result) => {
            if (err) { console.log(err) }
            result.feed.entry.forEach((item, index) => {
              item.id = item.id.split('/').pop() + '-' + index
              newBooks.push(item)
            })
            context.commit('updateBooks', newBooks)
            console.log('Books updated')
          })
        })
      })
    }
  }
})

// Setup the vue instance, using the Router and Store defined above.
new Vue({
  router,
  ...App,
  store,
  created: function () {
    // This is how you dispatch an action from elsewhere in the app
    store.dispatch(
      'fetchBooksFromOPDS',
      'https://standardebooks.org/opds/all'
    )
  }
}).$mount('#app')
