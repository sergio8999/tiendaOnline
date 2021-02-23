<template>

  <section class="carrito">
    <div class="articulos">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody v-if="listaCarrito">
          <tr v-for="articulo in listaCarrito" :key="articulo.id">
            <td>{{articulo.nombre}}</td>
            <td>{{articulo.precio}}€</td>
            <td><input class="input" type="number" name="unidades" :id="articulo.id" min="1" :max="articulo.stock" step="1" :value="articulo.unidades" @change="cambiarUnidades"></td>
            <td>{{articulo.precioTotal}}€</td>
            <td>
              <font-awesome-icon icon="trash" @click="borrarProductos" :id="articulo.id"/>
            </td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td>Precio Total:</td>
            <td v-if="listaCarrito">{{obtenerTotal}} €</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div class="botones">
        <router-link to="/" tag="button">Seguir comprando</router-link>
        <button @click="comprar">Comprar</button>
      </div>
    </div>
  </section>
</template>

<script lang="js">
import { db } from '../db.js'
import Firebase from '../db.js'

export default  {
  name: 'carrito',
  props: [],
  data () {
    return {
      listaCarrito:null,
      user: {
        loggedIn: false,
        data: {}
      }
    }
  },
  methods: {
    cambiarUnidades: function (e) {
      let articulo = this.listaCarrito.filter((producto)=>{
        return producto.id== e.target.id;
      });
      let total = Number(articulo[0].precio * e.target.value).toFixed(2);
      db.collection('carrito').doc(e.target.id).
        update({
          unidades: e.target.value,
          precioTotal: total
        })
    },
    comprar:function () {
      this.listaCarrito.forEach(producto => {
        db.collection("carrito").doc(producto.id).delete();
      });
    },
    borrarProductos:function (e) {
      //Esto es porque al aplicarle id al font-awesome si pinchas sobre path lo detecta como id vacio
      if(e.target.id !="")
        db.collection('carrito').doc(e.target.id).delete();
      else
        db.collection('carrito').doc(e.target.parentElement.id).delete();
    }
  },
  computed: {
    obtenerTotal(){
      if(this.listaCarrito!=null){
        let suma=0;
        this.listaCarrito.forEach(producto => {
          suma += producto.precioTotal;
        });
        return Number(suma).toFixed(2);
      }
      return 0;
    }
  },
  firestore:
  { 
    listaCarrito: db.collection('carrito').where("user","==", Firebase.auth.currentUser ? Firebase.auth.currentUser.email:"")
  } ,
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
        this.$router.push("/").catch(()=>{});
      }
    })
  }
}


</script>

<style scoped lang="scss">
@import "@/scss/main.scss";
  .carrito {
    width: 100%;
    @include flexposition(flex-start,center);
    flex-direction: column;
    font-size: .8rem;
    @include tamanofuente(1.4rem,1.4rem,1.4rem);

    .articulos {
      margin-top: 4rem;
      width:100%;

      @include response(lg){
        width:80%;
      }

      svg{
        color: $color-red;
      }

      .input{
        width: 50%;
        margin-left: .2rem;
      }

      .botones{
        width: 100%;
        @include flexposition;
        flex-direction:column;

        @include response(md){
          @include flexposition(space-around,center);
          flex-direction:row;
          width:100%;
        } 

        @include response(lg){
          @include flexposition(space-between,center);
          flex-direction:row;
          width:80%;
        } 

      button{
        width: 8rem;
        height: 3rem;
        border: 2px solid $color-primary;
        border-radius: 10px;
        margin: 1rem;
        color: $color-white;
        background-color: $color-primary;
        transition: all 0.7s;
        font-size: .9rem;
        @include tamanofuente(1.2rem,1.3rem,1.6rem);

        @include response(md){
          width: 12rem;
          margin: 2rem;
          } 

         @include response(xl){
            width: 16rem;
            margin: 2rem;
        } 

        &:hover {
          color: $color-primary;
          background-color:$color-white;
        }
      }  
    }
  }
}
</style>
