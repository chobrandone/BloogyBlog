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
      <template>
  <v-progress-linear
  ></v-progress-linear>
</template>
      </v-layout v-if="!loading">
    <v-flex xs12 sm6 offset-sm4>
      <h3>All Blogs</h3>
    </v-flex>
          </v-layout>
    </v-layout v-if="!loading">
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                
                label="live search"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
            
          </v-layout>
    <v-layout v-show="!loading" row wrap  v-for="post in posts" :key="post.title" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="black">
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
                    <div class="info--text mb-0">{{post.date}}</div>
                    <div class="success--text mb-0">posted by {{post.name.split('@')[0] }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn class="light" :to="'/posts/'+post.id">
                    <v-icon left light>forward</v-icon>
                    go!
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
      post: this.$store.getters.loadedPosts
    }
  },
  created () {
    // console.log('beforeUpdate router')
    this.$store.dispatch('loadPosts')
  },
  methods: {
    hi () {
      this.$store.dispatch('setLoading', true)
      this.$store.dispatch('loadPosts')
    }
  },
  watchers: {
    '$router' (value) {
      if (value !== this.$store.getters.loadPosts) {
        this.post = this.store.getters.loadedPosts
      }
      console.log('watcher watching this in viewPost route')
    }
  },
  computed: {
    posts () {
      return this.post.filter((pos) => {
        return pos.title.match(this.title)
      })
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
