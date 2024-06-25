import Vue from 'vue'
import Vuex from 'vuex'
import modLogin from './modLogin'
import modUser from './modUser'
import modProduto from './modProduto'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    modLogin,
    modUser,
    modProduto
  }
})
