<template>
  <v-container>
     <v-layout row>
       
        <v-layout v-if="loading">
      <v-flex  offset-xs12 class="text--center">
        <v-progress-circular
          indeterminate
          class="info--text"
          :width="7"
          :size="70"
          ></v-progress-circular>
      </v-flex>
    </v-layout v-if="!loading">
    <v-flex xs12 sm6 offset-sm4>
      <h3>MyPosts</h3>
    </v-flex>
          </v-layout>
         
    <v-layout v-if="!loading" row wrap  v-for="post in posts" :key="post.title" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="primary">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="post.imageUrl"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{post.title}}</h5>
                    <div class="yellow--text mb-0"> you posted this on</div>
                    <div class="dark--text mb-0">{{post.date}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn class="black" flat :to="'/posts/'+post.id">
                    <v-icon  class="white--text" light>navigate_next</v-icon>
                    <span class="white--text">go!</span>
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      title: '',
      posts: this.$store.getters.loadedUserPosts
    }
  },
  mounted () {
    // console.log('beforeMount viewPost')
    this.$store.dispatch('loadPosts')
  },
  computed: {
    /* posts () {
      return this.post.filter((pos) => {
        return pos.title.match(this.title)
      })
    }, */
    loading () {
      return this.$store.getters.loading
    },
    check () {
      if (this.post === undefined || this.post === null || this.post === [] || this.post === {}) {
        return false
      }
    }
  }
}
</script>
