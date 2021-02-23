<template lang="html">
  <section class="registro">
    <h1>Registro</h1>
    <div class="form">
      <div class="redesSociales">
        <button @click="login"><font-awesome-icon :icon="['fab', 'google-plus']" /> Entrar con Google</button>
        <button><font-awesome-icon :icon="['fab', 'facebook']" /> Entrar con facebook</button>
        <button>Entrar con otra</button>
      </div>
    <form action="">
      <div class="email">
        <label class="email-label" for="email" >Email:</label>
        <input class="email-input" id="email" type="text" v-model="datoEmail">
      </div>
      <div class="contrasena">
        <label class="contrasena-label" for="contrasena">Contraseña: </label>
        <input class="contrasena-input" id="contrasena" type="password" v-model="datoContrasena">
        <label class="contrasena-label" for="contrasena2">Repite contraseña: </label>
        <input class="contrasena-input" id="contrasena2" type="password" v-model="datoContrasena2">
      </div>
      <button class="registrar" @click="crearUsuario">Registrar</button>
    </form>
    </div>
  </section>
</template>

<script lang="js">
import Firebase from '../db.js'

  export default  {
    name: 'registro',
    props: [],
    mounted () {
      Firebase.auth.onAuthStateChanged( user => {
        if (user) {
         this.user.loggedIn = true;
         this.user.data = user;
         this.$router.push("/").catch(()=>{});
        }else {
          this.user.loggedIn = false;
          this.user.data = {};
        }
      })
    },
    data () {
      return {
        user: {
          loggedIn: false,
          data: {},
        },
        datoEmail:"",
        datoContrasena:"",
        datoContrasena2:""
      }
   },
  methods: {
    login:function() {
      Firebase.login();
    },
    crearUsuario:function(){
      if(this.datoContrasena == this.datoContrasena2){
        Firebase.crearUsuario(this.datoEmail,this.datoContrasena)
        Firebase.comprobarUsuario(this.datoEmail,this.datoContrasena);
        if(Firebase.auth.currentUser==null)
          this.$notify({
          group: 'login',
          title: 'Error',
          text: "la contraseña debe ser mayor de 6 o el correo no es válido",
          type: 'warn',
          });
      }else if(Firebase.auth.currentUser==null)
        this.$notify({
          group: 'login',
          title: 'Error',
          text: "las contraseñas no coinciden",
          type: 'error',
        });
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
  .registro {
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

      .registrar{
        @include response(xl){
          width: 18rem;
          height: 3rem;
        } 
      }
    }
  }
}
</style>
