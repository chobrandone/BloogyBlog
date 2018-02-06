import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedPosts: [],
    user: null,
    loading: false,
    error: null,
    isReset: false
  },
  mutations: {
    setLoadedPosts (state, payload) {
      state.loadedPosts = payload
    },
    createPost (state, payload) {
      state.loadedPosts.push(payload)
    },
    SetReset (state, payload) {
      state.isReset = payload
    },
    signUserIn (state, payload) {
      state.user = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    signUserUp (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    clearError (state) {
      state.error = null
    },
    clearReset (state) {
      state.isReset = false
    },
    setError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    resetPassword ({commit}, payload) {
      var user = firebase.auth().currentUser
      var newPassword = payload
      user.updatePassword(newPassword).then(() => {
        console.log('fda')
        commit('SetReset', true)
        commit('setError', null)
      }).catch(function (error) {
        console.log(error)
        commit('SetReset', false)
        commit('setError', error)
      })
    },
    loadPosts ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('posts').on('value', (data) => {
        const posts = []
        const obj = data.val()
        for (let key in obj) {
          var likes = parseInt(obj[key].likes)
          // console.log(likes)
          posts.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            about: obj[key].about,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            name: obj[key].name,
            likes: likes
          })
        }
        console.log(posts.likes)
        commit('setLoading', false)
        commit('setLoadedPosts', posts)
      })
      /* catch (error) {
        (error) => {
          console.log(error)
          commit('setLoading', false)
        }
      } */
    },
    removePost ({commit}, payload) {
      firebase.database().ref('posts').child(payload).remove().then(() => {
        console.log('removed')
      }).catch(() => {
        console.log('error in remove post')
      })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('setError', null)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
        (user) => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            name: user.email,
            likedPosts: []
          }
          commit('signUserIn', newUser)
        }
      ).catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    setfirst ({commit}) {
      commit('setError', null)
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('setError', null)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
        (user) => {
          commit('setLoading', false)
          commit('loading', false)
          console.log(user.email)
          const newUser = {
            id: user.uid,
            name: user.email,
            likedPosts: []
          }
          commit('signUserUp', newUser)
        }
      ).catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    updatePost ({commit}, payload) {
      commit('setLoading', true)
      const updatedObj = {
        title: payload.title,
        about: payload.about,
        description: payload.description
      }
      firebase.database().ref('posts').child(payload.id).update(updatedObj).then(() => {
        commit('setLoading', false)
        console.log('podu thakida thakida')
      }).catch((error) => {
        commit('setLoading', false)
        console.log(error + ' firebase s*cks')
      })
    },
    addLikes ({commit}, payload) {
      // console.log(payload)
      const likeObj = {
        likes: payload.likes
      }
      firebase.database().ref('posts').child(payload.id).update(likeObj)
    },
    createPost ({commit, getters}, payload) {
      commit('setLoading', true)
      const obj = {
        title: payload.title,
        about: payload.about,
        description: payload.description,
        date: payload.date,
        name: getters.user.name,
        likes: 0
      }
      let imageUrl
      let key
      firebase.database().ref('posts').push(obj)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('posts/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('posts').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createPost', {
            ...obj,
            imageUrl: imageUrl,
            id: key
          })
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
      // Reach out to firebase and store it
    },
    setError ({commit}, payload) {
      commit('setError', payload)
    },
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, likedPosts: [], name: payload.email})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      commit('SetReset', false)
      commit('setError', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    reset (state) {
      return state.isReset
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    user (state) {
      return state.user
    },
    loadedPosts (state) {
      return state.loadedPosts.sort((postA, postB) => {
        return postA.date < postB.date
      })
    },
    loadedUserPosts (state) {
      const posts = state.loadedPosts.filter((post) => {
        return post.name === state.user.name
      })
      // console.log(posts)
      return posts
    },
    featuredPosts (state, getters) {
      return getters.loadedPosts.slice(0, 5)
    },
    loadedPost (state) {
      return (postId) => {
        return state.loadedPosts.find((post) => {
          return post.id === postId
        })
      }
    }
  }
})
