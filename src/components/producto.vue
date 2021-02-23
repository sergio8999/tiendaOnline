<template>
  <section class="producto">  
    <div class="producto-imagen">
      <img class="producto-imagen-img" :src="producto.imagen" :alt="producto.nombre" id="imagenCambiante">
    </div>
    <div class="producto-inf">
      <h1 class="producto-inf-titulo">{{producto.nombre}}</h1>
      <p class="producto-inf-descripcion">{{producto.descripcion}}</p>
      <p class="producto-inf-stock">{{producto.stock}} en stock</p>
    </div>
    <div class="producto-comprar">
      <p class="producto-comprar-precio">{{producto.precio}}€</p>
      <button class="producto-comprar-btn" @click="anadirCarrito" :disabled="comprobarStock">Comprar</button>
    </div>
  </section>
</template>

<script lang="js">
import { db } from '../db.js'
import Firebase from '../db.js'

  export default  {
    name: 'producto',
    props: ["producto","authenticated"],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      anadirCarrito:function() {
        if(!this.authenticated){
          this.$notify({
          group: 'carrito',
          title: 'Error comprar',
          text: 'Debe loguearse antes de poder comprar',
          type: 'warn',
          });
        }else {
          db.collection("carrito").where("idProducto", "==", this.producto.id).where("user","==",Firebase.auth.currentUser.email)
            .get()
            .then((querySnapshot) => {
              if(querySnapshot.empty){
                db.collection('carrito').add({
                  user:Firebase.auth.currentUser.email,
                  idProducto: this.producto.id,
                  imagen:this.producto.imagen,
                  nombre:this.producto.nombre,
                  descripcion:this.producto.descripcion,
                  stock:this.producto.stock,
                  unidades:1,
                  precio:this.producto.precio, 
                  precioTotal:this.producto.precio
                })
                this.$notify({
                  group: 'carrito',
                  title: 'Producto añadido',
                  text: this.producto.nombre,
                  type: 'succes',
                  });
              }else
                querySnapshot.forEach((doc) => {
                  if(doc.data().unidades<this.producto.stock){
                    let unidadesTotales= doc.data().unidades+1;
                    let total= unidadesTotales * doc.data().precio;
                    db.collection('carrito').doc(doc.id)
                      .update({
                        unidades:unidadesTotales,
                        precioTotal:total
                      })
                      this.$notify({
                        group: 'carrito',
                        title: 'Producto añadido',
                        text: this.producto.nombre,
                         type: 'succes',
                      });
                    } else
                      this.$notify({
                        group: 'carrito',
                        title: 'Error',
                        text: "No queda mas stock disponible",
                         type: 'warn',
                      });
                  });
            }) 
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        }
      }
    },
    computed: {
      comprobarStock(){
        if(this.producto.stock==0)
          return true;
        return false;
      }
    }
}

</script>

<style scoped lang="scss">

@import "@/scss/main.scss";
  .producto {
    width: 15rem;
    height: 25rem;
    margin:2rem;
    padding: 1rem;
    transition: all 0.6s;
    
    @include flexposition;
    flex-direction: column;

    &:hover{
      box-shadow: 0px 0px 4px $color-primary;
    }

    &-imagen{
      width: 8rem;
      height: 8rem;
      @include flexposition;
      &-img{
      @extend %fullSpace;
      object-fit: cover;
      transition:all .4s;
    
      


      @include response(md){
        height: 10rem;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }
  
    &-inf {
      @include flexposition(flex-start,flex-start);
      flex-direction: column;
      height: 16rem;
      margin-top:1.5rem ;

      @include response(md){
        height: 10rem;
      }

      &-titulo {
        font-family: $font-nunito;
        font-size: 1.5rem; 
        @include tamanofuente(1rem,1rem,1rem); 
      }

      &-descripcion {
        font-size: .9rem;
        margin-top:.3rem;
        height: 5rem;
        font-family: $font-josefin;
        opacity: .6;
        @include tamanofuente(1.1rem,.9rem,0.9rem); 

        @include response(md){
            height: 5rem;
        }
      }

      &-stock {
        font-family: $font-josefin;
        font-size: 1.2rem;
        margin-left:.5rem ;
        margin-top:1rem; 
        opacity: .9;
        @include tamanofuente(1.1rem,1rem,1rem); 

         @include response(md){
             margin-top:.5rem; 
        }
      }
    }

    &-comprar{
      width: 100%;
      height: 2rem;
      @include flexposition(space-around,center);

      &-precio {
        font-size: 1.2rem;
        @include tamanofuente(1.4rem,1rem,1.4rem);
      }

      &-btn{
        @include tamanofuente(1.4rem,1rem,1.1rem);
        width: 7rem;
        height: 2rem;
        color: $color-white;
        background-color: $color-primary;
        font-family: $font-josefin;
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        border: 1px solid $color-primary;
        border-radius: 30px;
        outline: none;
        cursor: pointer;
        transition: all 0.7s;
        
        &:hover {
          color: $color-primary;
          background-color: $color-white;
        }

        &:disabled{
          opacity: .4;
        }

        &:hover:disabled{
          color: $color-white;
          background-color: $color-primary;
          opacity: .4;
        }
      }
    }
  }
</style>
