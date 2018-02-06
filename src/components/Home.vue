<template>

  <v-container class="app">
    <v-layout row wrap v-if="!userIsAuthenticated">
      <v-flex xs12 sm >

<div style="text-align:center">
  <h2 class="primary--text">Bloogy Blog </h2>
<blockquote class="mt-1">
      share your information to  your coworkers and friends and eveyone</blockquote>
    </div>
    <br>
    <br>
    
    <v-layout>
      <v-flex xs12 sm8>

    
    <span>
        <h4>At work</h4>
        <ul>
            <li>Enhance your power of brain</li>
            <li>Share  for Improvement</li>
        </ul>
    </span>
<br><br>
    <span>
        <h4>With Your Friends</h4>
        <ul>
            <li>Improve your friendship by sharing your thougts and information for improvement</li>
            
        </ul>
        </span>
    </v-flex>
    </v-layout>
<br><br>
<div class="row">
    <div class="col-md-12">
        &nbsp;
<router-link to="/signup" tag="span" class="info--text" style="font-weight:bold">Register</router-link> | <router-link tag="span" style="font-weight: bold" class="info--text" to="/signin" >Login</router-link>    </div>
</div>
        
      </v-flex>
    </v-layout>






    <v-layout row wrap v-if="userIsAuthenticated">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
      
        <header class="headline">
               <span class="w">w</span>
          <span class="e">e</span>
          <span class="l">l</span>
          <span class="c">c</span>
          <span class="o">o</span>
          <span class="m">m</span>
          <span class="e">e</span>
        <span class="w">!</span>
        <br>
        <span class="accent--text head"> {{user.name.split('@')[0]}}</span>
        
          </header>
      </v-flex>
      <v-layout>
      <v-flex  offset-xs12 class="text--center">
        <v-progress-circular
          indeterminate
          class="info--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    </v-layout>
    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex xs12>
        <h4 v-show="userIsAuthenticated">Recent  Blogs </h4>
        <v-carousel delimiter-icon="stop" v-if="userIsAuthenticated">
          <v-carousel-item
            v-for="post in posts"
            :src="post.imageUrl"
            :key="post.id"
             @click="onLoadPost(post.id)"
            >
            <div class="title">
              {{ post.title }}
            </div>
            
          </v-carousel-item>
          
          
        </v-carousel>
        <br>
       <div v-show="userIsAuthenticated"><i> <blockquote class="info--text">let's share some Knowledge </blockquote></i>
      </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <p></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    methods: {
      onLoadPost (id) {
        this.$router.push('/posts/' + id)
      }
    },
    computed: {
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      posts () {
        return this.$store.getters.featuredPosts
      },
      loading () {
        return this.$store.getters.loading
      },
      user () {
        return this.$store.getters.user
      }
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    top:50px;
    background-color: rgba(1,0,0,0.5);
    border-radius: 50%;
    color:aqua;
    font-size: 4em;
    padding: 20px;
  }
  .headline {
    color:black;
  }
  .w{
    color:blueviolet;
  }
  .e{
    color:red;
  }
  .l{
    color:black;
  }
  .c{
    color:turquoise;
  }
  .o{
    color:yellowgreen;
  }
  .m{
    color:green;
  }
  .e{
    color:blue;
  }
  .head {
    
    padding-left: 15px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-decoration: none;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  }


</style>
