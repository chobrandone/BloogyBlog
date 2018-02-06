<template>
<form @submit.prevent="onCreatePost">
  <v-container>
    <v-layout row>
     
      
      <v-flex xs6 sm6 offset-sm3>
        
        <h4>Post a new blog</h4>
      </v-flex>
      <v-flex xs8 sm6 offset-sm1 offset-xs0>

              <v-btn
                class="green"
                dark
                :disabled="!formIsValid"
                type="submit">
                <v-icon dark>add</v-icon>
                Post a new blog
                
                </v-btn>
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
                v-model="title"
                required></v-text-field>
            </v-flex>
            
          </v-layout>
          
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
             
                name="about"
                label="About Blog"
                id="about"
                v-model="about"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class=" primary" @click="onPickFile">add image</v-btn>
              <input type="file" style="display:none" ref="fileInput" accept="image/*"
              @change="onFilePicked"
              required
              />required*
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
         <v-card color="grey lighten-4" flat>
      <v-card-text>
        <v-subheader>Write a blog</v-subheader>
        
      </v-card-text>
    </v-card>
          
        
      </v-flex>
      
      </v-layout>
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
                v-model="description"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
  </v-container>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        isBold: false,
        isItalized: false,
        title: '',
        about: '',
        imageUrl: '',
        description: '',
        image: null
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.about !== '' &&
          this.imageUrl !== '' &&
          this.description !== ''
      }
    },
    methods: {
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('enter valid file')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onCreatePost () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        var today = new Date()
        var dd = today.getDate()
        var mm = today.getMonth() + 1
        var yyyy = today.getFullYear()
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        } // WQO
        today = mm + '/' + dd + '/' + yyyy
        console.log(today)
        let m = document.getElementById('descrip').value.replace(/\n/g, '<br />')
        console.log(m)
        const meetupData = {
          title: this.title,
          about: this.about,
          image: this.image,
          imageUrl: this.imageUrl,
          description: m,
          date: today
        }
        this.$store.dispatch('createPost', meetupData)
        this.$router.push('/')
        // console.log(this.description)
      }
    }
  }
</script>
<style scoped>
.bold {
  color:yellow
}

</style>
