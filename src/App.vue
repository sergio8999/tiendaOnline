<template>
  <div id="app">
        <notifications position='top center' width="500"  group="carrito" />
    <notifications position='top center' width="500"  group="login" />
    <notifications position='top center' width="500"  group="anadido" />
    <cabecera 
    :authenticated="authenticated"
    :firstName="firstName"
    />

    <router-view 
    :authenticated="authenticated"
    ></router-view>
    <pie/> 
  </div>
</template>

<script>
import cabecera from './components/cabecera.vue'
import pie from './components/pie.vue' 
import Firebase from './db.js'


export default {
  name: 'App',
  components: {
    cabecera,
    pie
  },
  mounted () {
        Firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
          console.log("autentificado ")
          if(this.user.email != "administrador@email.com")
            this.$router.push("/").catch(()=>{});
        }
        else {
          console.log("no autentificado")
          this.user.loggedIn = false;
          this.user.data = {};
          this.$router.push("/").catch(()=>{});
        }
      })
    },
     data () {
      return {
          user: {
          loggedIn: false,
          data: {}
        },
        
      }
    },
    methods: {
      logout:function ()
      {
        Firebase.logout()
      },
/*       obtenerAministrador: function(params) {
        this.administrador=params;
      } */
    },
    computed: {
        authenticated(){
          return this.user.loggedIn
        },
        firstName(){
          if (this.user.data.displayName) {
            return this.user.data.displayName.split(' ')[0]
          }else if(this.user.data.email) {
            return this.user.data.email.split('@')[0]
          }
          return null
        },
    },
}
</script>

<style scoped lang="scss">
/* @import "@/scss/_variables.scss";
@import "@/scss/_mixins.scss";
@import "@/scss/_base.scss"; */
@import "@/scss/main.scss";
  #app {
      min-height: 100vh;
      display: grid;
      grid-template-rows: max-content 1fr max-content; 
}
</style>
