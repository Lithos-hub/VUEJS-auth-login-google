import Vue from 'vue'
import Vuex from 'vuex'

import {auth} from '@/firebase';
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myuser: {},
  },
  mutations: {
    newUser(state, payload){
      state.myuser = payload;
    }
  },
  actions: {
    setUser({commit}, user){
      const myuser = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photo: user.photoURL,
      }
      commit('newUser', myuser)

    },
    signOut({commit}) {
      auth.signOut()
      commit('newUser', null)
      router.push({name: 'account'})

    }
  },
  modules: {
  }
})
