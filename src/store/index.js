import Vue from 'vue'
import Vuex from 'vuex'

import {auth} from '@/firebase';
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myuser: {},
    userlogged: false,
  },
  mutations: {
    newUser(state, payload){
      state.myuser = payload;
    },
    userState(state, payload){
      state.userlogged = payload
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
      commit('userState', true)
      console.log(myuser)

    },
    signOut({commit}) {
      auth.signOut()
      commit('newUser', null)
      commit('userState', false)
      router.push("/account")

    }
  },
  modules: {
  }
})
