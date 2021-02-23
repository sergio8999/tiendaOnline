<template >

  <section class="cabecera">

  <b-navbar toggleable="lg" type="light" variant="primary">
    <router-link to="/" tag="b-navbar-brand"><img src="../images/logo.png" alt="Logo" class="logo"></router-link>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav rigth>
          <router-link v-if="!authenticated" to="/login" id="login" tag="b-nav-item">Login</router-link>
          <router-link v-if="!authenticated" to="/registro" tag="b-nav-item">Registro</router-link>
          <b-nav-item v-if="authenticated">Bienvenido {{firstName}}!</b-nav-item>
          <router-link v-if="administrador" to="/administrador" tag="b-nav-item">Administrador</router-link>
          <b-nav-item v-if="authenticated" @click="logout">Cerrar cesion</b-nav-item>
          <router-link to="/carrito" tag="b-nav-item" v-if="!authenticated"><font-awesome-icon icon="shopping-cart"/></router-link>
          <router-link to="/carrito" tag="b-nav-item" v-if="authenticated"><font-awesome-icon icon="shopping-cart"/>({{obtenerProductosCarrito}}) - {{obtenerTotal}}€</router-link>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  </section>
</template>

<script lang="js">
import Firebase from '../db.js'
import { db } from '../db.js'


export default  {
  name: 'cabecera',
  props: ["authenticated","firstName"],

  data () {
    return {
      listaCarrito:" ",
        user: {
      loggedIn: false,
      data: {}
    }
    }
  },
  methods: {
    logout:function ()
    {
      this.$router.push("/").catch(()=>{});
      Firebase.logout();
    } 
  },
  computed: {
    obtenerProductosCarrito(){
      let suma=0;
      this.listaCarrito.forEach(producto => {
        suma += producto.unidades;
      });
        return suma;
    },
    obtenerTotal(){
      let suma=0;
      this.listaCarrito.forEach(producto => {
          suma += producto.precioTotal;
      });
        // Redondear a 2 decimales
        return Number(suma).toFixed(2);  
    },
    administrador(){
        return this.user.data.email =="administrador@email.com";
    }
  },
  firestore:
  { 
    listaCarrito: db.collection('carrito').where("user","==", Firebase.auth.currentUser ? Firebase.auth.currentUser.email:" ")
  },
  mounted:function() {
    Firebase.auth.onAuthStateChanged( user => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
        this.$bind('listaCarrito',db.collection('carrito').where("user","==", Firebase.auth.currentUser.email));
      }
      else {
        this.user.loggedIn = false;
        this.user.data = {};
        this.listaCarrito=null;
      }
    })
  }
}


</script>

<style scoped lang="scss">
@import "@/scss/main.scss";
   $primary: $color-primary; 

.cabecera{
  .logo{
    width: 10rem;
    margin-left: 1rem;
    cursor: pointer;
  }

  svg{
    font-size: 1.8rem;
  }

  .nav-item{
    @include response(lg){
      font-size: 1.2rem;
    }
  }
  .navbar{
    padding: 1rem 1rem!important;
  }
}

@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import 'node_modules/bootstrap-vue/src/index.scss'; 
</style>
