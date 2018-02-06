import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Posts from '@/components/Post/ViewPosts'
import AuthGuard from './auth-guard'
import AddPost from '@/components/Post/AddPost'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Post from '@/components/Post/Post'
import MyPosts from '@/components/Post/Myposts.vue'
import EditPost from '@/components/Post/updatePost.vue'
Vue.use(Router)
export default new Router({
  routes: [
    { path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts/:id',
      name: 'Post',
      props: true,
      component: Post,
      beforeEnter: AuthGuard
    },
    {
      path: '/myposts',
      name: 'Myposts',
      props: true,
      component: MyPosts,
      beforeEnter: AuthGuard
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts,
      beforeEnter: AuthGuard
    },
    {
      path: '/post/newpost',
      name: 'AddPost',
      component: AddPost,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/editpost/:id',
      name: 'EditPost',
      props: true,
      component: EditPost,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
