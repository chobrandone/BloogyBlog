<template class="com">
<html class="com">
  <v-container>
       <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert icon="priority_high" type="warning" color="warning" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="card">
            <v-card-title class="primary--text sign">Sign In</v-card-title>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
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
                  <v-flex xs12>
                   <div class="cen"> <v-btn  class="primary" type="submit" @click.native="loader = 'loading'">Let me in!<span  class="info--text"slot="loader">Loading........</span></v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-4">
                  <v-flex xs12 sm6 offset-sm2>
                  <br>
                    <div class="cen"><div class="beforefoot">coded with love<br> by</div>
                    <div class="foot">V I N O D</div>
                    </div>
                    </div>
                  </v-flex>
                </v-layout>
  </v-container>
  </html>
  
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    created () {
      this.$store.dispatch('setfirst')
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
<style scoped>
.card {
 background-color:hsl(60, 100%, 99%);
}
.cen{
  text-align: center;
  
}
html {
  height:90vh;
  background-color:#d4d3ca;
}
.foot {
  text-align: center;
  color:#0f0f0f;
  opacity: 0.5;
  font-weight:300; 

  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  word-spacing: .3em;
}
.beforefoot {
  color:#2096da;
  text-align: center;
 
  margin-bottom: 0.4em;
  font-family:monospace;
}
.sec {
  text-align: center;
}
.q{
  color:blue;

}
.w{
   color: rgb(41, 41, 150);
}
.e{
   color: rgb(41, 41, 150);
}
.v{
   color: rgb(41, 41, 150);
}
.i{
   color: rgb(41, 41, 150);
}
.n{
   color: rgb(41, 41, 150);
}
.o{
   color: rgb(41, 41, 150);
}
.d{
   color: rgb(41, 41, 150);
}
</style>
