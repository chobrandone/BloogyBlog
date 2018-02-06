<template>
  <v-container>
    
    <v-layout row wrap>
      <v-flex xs12 sm9 offset-sm1>
        <v-card>
          <v-card-title>
            <span></span>
            <span><h4 class="accent--text">Profile</h4></span>
            
          </v-card-title>
          
          <v-card-text>
            <v-card-title>
             <span class="head primary--text title text-sm-center ">user name:</span>
               <span class="hea info--text title text-sm-center">{{user.name.split('@')[0]}}</span>
            
            
          </v-card-title>
           <br>
           <v-card-text>
            <div>
           <div><h6  class=" v success--text">Change Password</h6></div>
              
            </div>
            </v-card-text>
            <v-container>
               <v-layout row v-if="reset">
      <v-flex xs12 sm5 offset-sm3>
        <app-alert type="success" icon="done" text="Password resetted Successfully"></app-alert>
        <br><br>
      </v-flex>
    </v-layout>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert icon="priority_high" type="warning" color="warning" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <form @submit.prevent="resetPassword" clear>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords.string]"></v-text-field>

                  </v-flex>
                </v-layout>
                <v-card-actions>
                  
            <div ><span><v-btn :disabled="comparePasswords.state" type="submit" class=" c primary">Change!</v-btn></span></div>
          </v-card-actions>
    </form>
            </v-container>
            <div></div>
          </v-card-text>
          
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style scoped>

</style>
<script>
// import * as firebase from 'firebase'
export default {
  data () {
    return {
      password: '',
      confirmPassword: '',
      isReset: false
    }
  },
  computed: {
    reset () {
      return this.$store.getters.reset
    },
    user () {
      return this.$store.getters.user
    },
    comparePasswords () {
      return this.password !== this.confirmPassword ? { string: 'Passwords do not match', state: true } : { string: '', state: false }
      // ghdg
    },
    error () {
      return this.$store.getters.error
    }
  },
  methods: {
    resetPassword () {
      this.$store.dispatch('resetPassword', this.password)
    }
  }
}
</script>
<style scoped>
.hea {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  padding-left:26px;
}
.v{
  text-align:center;
}
.c{
  
margin-left:13em;
}

</style>

