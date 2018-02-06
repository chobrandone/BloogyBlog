<template>
<v-container>
  
    <v-layout>
      
    <v-flex xs2 offset-xs10  offset-sm12 fixed >           
              <template>

        <v-speed-dial
      class="floating"
      bottom
      right
       
      transition="slide-x-transition"
    >
      <v-btn
        slot="activator"
        class="primary"
        dark
        fab
      >
        <v-icon>{{icon}}</v-icon>
       
      </v-btn>
      
<template>
  <v-layout row justify-center>

    
      <v-btn
        :to="'/editpost/'+post.id"
        fab
        dark
        hover
        small
        slot="activator"
        class="primary"
         
      >

        <v-icon>edit</v-icon>
      </v-btn>
     
       
      </v-layout>
</template>


    
    

      <template>
  <v-layout row justify-center>
    <v-btn  fab
        hover
        small
        class="primary"  dark @click.native.stop="dialog = true"> <v-icon>delete</v-icon></v-btn>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline primary--text">Verification</v-card-title>
        <v-card-text class ="info--text">Are you really want to remove this post from your account!?</v-card-text>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="green--text" flat="flat" @click.native="dialog = false">Close</v-btn>
          <v-btn class="green--text" flat="flat" @click.native="log">Yes! do it</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

    </v-speed-dial>
      </template>
    </v-flex>
    </v-layout>
     
  </v-container>
</template>

<script>
export default {
  props: ['post', 'state'],
  data () {
    return {
      icon: 'add',
      dialog: false,
      dialo: false
    }
  },
  methods: {
    log () {
      console.log('removing post', this.post)
      this.$store.dispatch('removePost', this.post.id)
      this.$router.push('/')
    }
  },
  computed: {
    route () {
      this.$router.push('/post/editpost')
    }
  }
}
</script>
<style scoped>
.floating {
  margin-bottom:3.5em;
  position:fixed;
}
</style>
