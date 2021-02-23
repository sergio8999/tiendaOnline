<template>
  <section class="login">
    <h1>Login</h1>
    <div class="form">
      <div class="redesSociales">
        <button @click="login" id="google"><font-awesome-icon :icon="['fab', 'google-plus']" /> Entrar con Google</button>
        <button  @click="login" id="twiiter"><font-awesome-icon :icon="['fab', 'twitter']" /> Entrar con twiiter</button>
        <button @click="login" id="github"><font-awesome-icon :icon="['fab', 'github']" /> Git hub</button>
      </div>
    <form action="">
      <div class="email">
        <label class="email-label" for="email">Email:</label>
        <input class="email-input" id="email" type="text" v-model="datoEmail">
      </div>
      <div class="contrasena">
        <label class="contrasena-label" for="contrasena">Contraseña: </label>
        <input class="contrasena-input" id="contrasena" type="password" v-model="datoContrasena">
      </div>
      <button class="enviar" @click="comprobarUsuario">Login</button>
    </form>
    </div>
  </section>
</template>

<script lang="js">
import Firebase from '../db.js'

  export default  {
    name: 'login',
    props: [],
    mounted () {
      Firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
          this.$router.push("/").catch(()=>{});
        }
        else {
          this.user.loggedIn = false;
          this.user.data = {};
        }
      })
    },
    data () {
      return {
        user: {
          loggedIn: false,
          data: {}
        },
        datoEmail:"",
        datoContrasena:"",
      }
    },
    methods: {
      login:function(e) {
        Firebase.login(e.target.id);
      },
      comprobarUsuario:function(){
        Firebase.comprobarUsuario(this.datoEmail,this.datoContrasena);
      }
    },
    computed: {
      authenticated(){
        return this.user.loggedIn
      },
      firstName(){
        if (this.user.data.displayName) {
          return this.user.data.displayName.split(' ')[0]
        }
        return null
      }
    }
}


</script>

<style scoped lang="scss">
@import "@/scss/main.scss";
  .login {
    width: 100%;
    h1 {
      text-align: center;
      margin-top: 2rem;
    }

    button{
      width: 18rem;
      height: 3rem;
      border: 2px solid $color-primary;
      border-radius: 50px;
      margin: 1rem;
      color: $color-white;
      background-color: $color-primary;
      transition: all 0.7s;

      @include response(xl){
        width: 30rem;
        margin: 2rem;
      } 

      &:hover {
        color: $color-primary;
        background-color:$color-white;
      }        
    }

  .form{
    width: 100%;
    margin: 0;
    @include flexposition(center,center);
    flex-direction: column;

    @include response(xl){
      width: 100%;
      height: 90%;
      @include flexposition(center,center);
      flex-direction: row;
    } 

    @include response(xl){
      width: 90%;
    }

    .redesSociales {
      width: 90%;
      margin-bottom: 2rem;
      @include flexposition;
      flex-direction: column;
      border-bottom:1px dotted black;

      @include response(md){
         margin: 2rem 0;
      }

      @include response(xl){
        border-right:1px dotted black;
        border-bottom:0;
      }
    }

    form {
      width: 100%;
      @include flexposition;
      flex-direction: column;

      .email {
        width: 100%;
        @include flexposition(space-between,center);
        flex-direction: column;
      
      }
    
    .contrasena {
      width: 100%;
      margin-top: 2rem;
      @include flexposition(space-between,center);
      flex-direction: column;      
    }

    input {
      width: 75%;
      height: 2rem;
      margin-left: 0.4rem;
      border-radius: 10px 10px;
      font-size: 1rem;
      @include tamanofuente(1.2rem,1.3rem,1.4rem);

      @include response(lg){
        width: 50%;
        height: 2.5rem;
      } 
    }

    label{
      font-size: 1rem;
      @include tamanofuente(1.2rem,1.3rem,1.4rem);
    }

      .enviar{
        @include response(xl){
            width: 18rem;
          height: 3rem;
        } 
      }
    }
  }
}
</style>
