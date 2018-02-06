<template>
<form @submit.prevent="onCreatePost">
  <v-container>
    <v-layout row>
     
      <v-flex xs6 sm6 offset-sm1 offset-xs0>
              <v-btn
                class="black"
                @click="back"
                type="submit">
                <v-icon dark>skip_previous</v-icon>
                </v-btn>
            </v-flex>
      <v-flex xs6 sm6 offset-sm1 offset-xs1>
        
        <h4>Edit blog</h4>
      </v-flex>
      
            <v-flex xs6 sm6 offset-sm1 offset-xs1>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">updae blog</v-btn>
            </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
  
          
           
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title=post.title"
                required></v-text-field>
            </v-flex>
            
          </v-layout>
          
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
             
                name="about"
                label="About Blog"
                id="about"
                v-model="about=post.about"
                required></v-text-field>
            </v-flex>
          </v-layout>
          
         <v-card color="grey lighten-4" flat>
      <v-card-text>
        <v-subheader>Write a blog</v-subheader>
        <v-container>
          <v-layout row>
            <v-flex xs12>
             
<v-divider class="info"></v-divider>
              
              <v-text-field 
              :full-width="true"
                rows="48"
                cols="110"
            
                id="descrip"
              
                
                color="primary"
                placeholder="start here"
                textarea
                v-model="description=post.description"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
          
        
      </v-flex>
      
      </v-layout>
  
  </v-container>
  </form>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
        isBold: false,
        isItalized: false,
        title: '',
        about: '',
        description: ''
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.about !== '' &&
          this.description !== ''
      },
      post () {
        console.log('loadedpost')
        return this.$store.getters.loadedPost(this.id)
      }
    },
    methods: {
      onCreatePost () {
        if (!this.formIsValid) {
          return
        }
        let m = document.getElementById('descrip').value.replace(/\n/g, '<br />')
        const meetupData = {
          title: this.title,
          about: this.about,
          description: m,
          id: this.id
        }
        this.$store.dispatch('updatePost', meetupData)
        console.log('fasd')
        this.$router.push('/posts/' + this.id)
        // console.log(this.description)
      },
      back () {
        this.$router.push('/posts/' + this.id)
      }
    }
  }
</script>
<style scoped>
.bold {
  color:yellow
}

</style>
