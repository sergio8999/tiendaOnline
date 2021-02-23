<template lang="html">

  <section class="novedad">
      <div class="novedad-overlay">
        <h1 class="novedad-overlay-heading">{{novedad.nombre}}</h1>
        <p class="novedad-overlay-descripcion">{{novedad.descripcion}}</p>
        <p class="novedad-overlay-precio">Precio: {{novedad.precio}}€</p>
        <p class="novedad-overlay-stock">{{novedad.stock}} articulos en stock</p>
        <button type="button" class="novedad-overlay-btn" :disabled="comprobarStock" @click="anadirCarrito">Comprar</button>
      </div>
      <img :src="novedad.imagen"  :alt="novedad.nombre" class="card-img" />
  </section>

</template>

<script lang="js">
import { db } from '../db.js'
import Firebase from '../db.js'

  export default  {
    name: 'novedad',
    props: ["novedad","authenticated"],
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
          db.collection("carrito").where("idProducto", "==", this.novedad.id).where("user","==",Firebase.auth.currentUser.email)
            .get()
            .then((querySnapshot) => {
              if(querySnapshot.empty){
                db.collection('carrito').add({
                  user:Firebase.auth.currentUser.email,
                  idProducto: this.novedad.id,
                  imagen:this.novedad.imagen,
                  nombre:this.novedad.nombre,
                  descripcion:this.novedad.descripcion,
                  stock:this.novedad.stock,
                  unidades:1,
                  precio:this.novedad.precio,
                  precioTotal:this.novedad.precio 
                });
                this.$notify({
                  group: 'carrito',
                  title: 'Producto añadido',
                  text: this.novedad.nombre,
                  type: 'succes',
                });
              }else
                querySnapshot.forEach((doc) => {
                  if(doc.data().unidades<this.novedad.stock){
                    let unidadesTotales= doc.data().unidades+1;
                    let total= unidadesTotales * doc.data().precio;
                    db.collection('carrito').doc(doc.id)
                      .update({
                        unidades:unidadesTotales,
                        precioTotal:total
                      });
                      this.$notify({
                        group: 'carrito',
                        title: 'Producto añadido',
                        text: this.novedad.nombre,
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
        if(this.novedad.stock==0)
          return true;
        return false;
      }
    }
}

</script>

<style scoped lang="scss">
@import "@/scss/main.scss";
  .novedad {
    width: 90%;
    height: 35vh;
    margin: .6rem 0;
    @include flexposition;
    position: relative;
    overflow: hidden;

    @include response(sm){
      width: 90%;
      height: 40vh;
    }

    @include response(md){
      width: 35%;
      height: 25vh;
      margin: 0 .4rem;
    }

    @include response(lg){
      width: 28%;
      height: 40vh;
    }

    &:hover .novedad-overlay {
      left: 0;
    }

  &-overlay {
      position: absolute;
      top: 0;
      left: -100%;
      background-color: rgba($color-primary, .8);
      z-index: 10;
      @include flexposition;
      flex-direction: column;
      @extend %fullSpace;
      transition: left .7s;

      &-heading {
        font-family: $font-nunito;
        font-size: 1rem;
        padding-bottom:.5rem;
        @include textStyles(bold,capitalize); 
        @include tamanofuente(2rem,1rem,1.4rem);
      }

      &-precio {
        font-family: $font-josefin;
        font-size: .8rem;
        margin-bottom: 1.3rem;
        text-align: center;
        @include textStyles(capitalize); 
        @include tamanofuente(1.4rem,1rem,1rem);
      }

      &-descripcion {
        font-family: $font-josefin;
        font-size: .8rem;
        text-align: center;
        @include textStyles(capitalize); 
        @include tamanofuente(1.1rem,0.8rem,0.9rem);
      }

      &-btn {
        width: 9rem;
        height: 2rem;
        color: $color-primary;
        background-color: $color-white;
        font-family: $font-josefin;
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        border: 1px solid $color-primary;
        border-radius: 30px;
        outline: none;
        cursor: pointer;
        @include tamanofuente(1.4rem,1rem,1rem);

        @media(min-width: 768px) {
          width: 10rem;
          height: 2.5rem;
        }

        @media(min-width: 992px) {
          width: 9.4rem;
          height: 2.5rem;
        }

        &:disabled{
          opacity: .4;
        }

        &:hover:disabled{
          color: $color-primary;
          background-color: $color-white;
          opacity: .4;
        }
      }

      &-stock{
        color: $color-white;
        font-family: $font-josefin;
        font-size: .8rem;
        margin-bottom: .3rem;
        text-align: center;
        @include textStyles(capitalize); 
        @include tamanofuente(0.6rem,0.8rem,.8rem);
      }
  }
    &-img {
      @extend %fullSpace;
      object-fit: cover;
      opacity: .8;
      width: 20rem;

      @include response(md){
        width: 16rem;
      }

      @include response(lg){
        width: 30rem;
      }
  }
}
</style>
