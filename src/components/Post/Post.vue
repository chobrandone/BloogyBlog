<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    
    <v-layout row wrap>
      <v-flex xs12 sm9 offset-sm1>
        <v-card class="mb-4">
          <v-card-title>
            <span></span>
            <span><h6 class="accent--text">{{post.name.split('@')[0]}}'s post</h6></span>
            <v-spacer></v-spacer>
            <span><p class="info--text">{{post.date}}</p></span>
          </v-card-title>
          <v-card-media height
            :src="post.imageUrl"
            height="550px"
          ></v-card-media>
          <v-card-text>
            <v-card-title>
             <div class="head info--text title text-sm-center">{{post.title}}</div>
            
          </v-card-title>
           <br>
           <div class=" ow fav--text">Preview</div>
           <v-card-text class="primary--text">
            <div>{{post.about}}</div>
            </v-card-text>
             <br>
            
          </v-card-text>
        </v-card>
        
      </v-flex>
    </v-layout>
   
    
    <div class="ow" id="des" v-html="post.description"></div> <br>
    <br>
    <div id="like"class="dark--text"> useful one? let's claps for this share!</div>
    <v-btn  @click="likesAdd" fab dark class="green"><v-icon >pan_tool</v-icon></v-btn>
      <div class="green--text">{{post.likes}} claps!</div>
    <v-layout v-show="userIsCreator">
      <template>
              
              <app-edit :post="post" state:true></app-edit>
            </template>
    </v-layout>
    <br><br>
  </v-container>
</template>
<script>
export default {
  props: ['id'],
  methods: {
    hi () {
      let value = this.post.description
      let div = document.getElementById('des')
      div.append(value)
    },
    likesAdd () {
      this.post.likes++
      this.$store.dispatch('addLikes', { likes: this.post.likes, id: this.id })
    }
  },
  computed: {
    post () {
      return this.$store.getters.loadedPost(this.id)
    },
    loading () {
      return this.$store.getters.loading
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.name === this.post.name
    }
  }
}
</script>
<style scoped>
.ow {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
.floating {
  margin-bottom:2em;
  position: fixed;
}
</style>
