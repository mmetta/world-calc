import Vue from 'vue'
import Vuex from 'vuex'
import modProduto from './modProduto'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    modProduto
  }
})
