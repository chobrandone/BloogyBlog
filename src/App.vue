<template>
<div class="app">
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile  v-for="(menu,index) in menus" :key="index" :to="menu.link">
          <v-list-tile-action>
            <v-icon>{{menu.icon}}</v-icon></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{menu.title}}</v-list-tile-content>
        </v-list-tile> 

        <v-list-tile v-if="userIsAuthenticated"
        @click="onLogout">
          
          <v-list-tile-action>
            <v-icon>forward</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>LogOut</v-list-tile-content>
        </v-list-tile> 
        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="fav" fixed>
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">BloogyBlog</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" >
        <v-btn flat
        v-for="(menu,index) in menus" :key="index"
        :to="menu.link"
        >
          <v-icon left dark>{{menu.icon}}</v-icon>
          {{menu.title}}
        </v-btn>
<v-btn 
v-if="userIsAuthenticated"
flat
@click="onLogout"
>
          <v-icon left dark>forward</v-icon>
          Logout
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>
    <main>
       <transition name="fade" mode="out-in">
<router-view></router-view>
       </transition>
    </main>
    <br>
     <v-footer class="info footer" light fixed>
    <v-spacer></v-spacer>
    <div> © {{ new Date().getFullYear() }} VinSL Datum Inc.</div>
  </v-footer>
  </v-app>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menus () {
        let menus = [
          {icon: 'assignment_ind', title: 'Signup', link: '/signup'},
          {icon: 'lock_open', title: 'Signin', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menus = [
            {icon: 'rowing', title: 'my blogs', link: '/myposts'},
            {icon: 'note', title: 'view blogs', link: '/posts'},
            {icon: 'attachment', title: 'Post new blog', link: '/post/newpost'},
            {icon: 'settings', title: 'Settings', link: '/profile'}
          ]
        }
        return menus
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      user () {
        return this.$store.getters.user
      }
    },
    updated () {
      console.log('UPDATAED')
      this.$store.dispatch('loadPosts')
    },
    created () {
      console.log('CREATED')
      this.$store.dispatch('loadPosts')
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/signin')
      }
    }
  }
</script>
<style scoped>
.footer {
  color:blanchedalmond;
  overflow-x: wrap;
}
.app {
  overflow-x:hidden;  
}
.fade-enter-active{
  animation:fade-in 600ms ease-out forwards;

}
.fade-leave-active{
  animation:fade-out 650ms ease-out forwards;

}
@keyframes fade-in{
  from {
   transform:translateX(-30px);
   opacity:0;
  }
  to{
transform: translateX(0);
opacity: 1;
  }
}
@keyframes fade-out{
  from {
   transform: translateX(0);
opacity: 1;
  }
  to{
    transform:translateX(-30px);
   opacity:0;

  }
}

</style>
<style lang="stylus">
  @import './stylus/main'
</style>
