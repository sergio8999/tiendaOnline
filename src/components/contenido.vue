<template>
<div v-if="listaProductos">
    <section class="contenido">
    <h1 class="titulo">Novedades</h1>
      <section class="novedades">
        <div class="novedades-wrapper">
          <novedad
            v-for="novedad in novedades"
            :key="novedad.id"
            :novedad="novedad"
            :authenticated="authenticated"
           />
        </div>
      </section>
    <h1 class="titulo">Productos</h1>
    <section class="productos">
      <producto 
        v-for="producto in productos"
        :key="producto.id"
        :producto="producto"
        :authenticated="authenticated"
      />
    </section>
  </section>
  <div v-if="!listaProductos" class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
  
</template>

<script lang="js">
import { db } from '../db.js'
import novedad from './novedad.vue'
import producto from './producto.vue'

  export default  {
    name: 'contenido',
    components: {
      novedad,
      producto 
    },
    props: ["authenticated"],
    mounted () {

    },
    data () {
      return {
        listaProductos: null
      }
    },
    methods: {
        
    },
    computed: {
      novedades() {
        let listaNovedades = this.listaProductos.filter((producto)=>{
          return producto.novedad;
        })
        return listaNovedades;
      },
      productos() {
        let totalProductos = this.listaProductos.filter((producto)=>{
          return !producto.novedad;
        })
        return totalProductos;
      }
    },
    firestore:
  { 
    listaProductos: db.collection('productos')
  }
}


</script>

<style scoped lang="scss">
@import "@/scss/main.scss";
  .contenido {
    @include flexposition;
    flex-direction: column;
    .titulo{
      text-align: center;
      margin:2rem;
    }

    .productos {
      @include flexposition;
      width: 100%;
      flex-flow: row wrap;

      @include response(md){
        width: 90%;
      }

      @include response(lg){
        width: 80%;
      }

      @include response(xl){
        width: 70%;
      }
    }

  .novedades {
    @include flexposition;
    flex-direction: column;
    width: 100%;

    .novedades-wrapper {
      display: flex;
      @include flexposition;
      flex-flow: row wrap;
    }
  }
}
</style>

