<template lang="html">

  <section class="administrador">
    <router-link tag="button" to="/anadir">Añadir Producto</router-link>
    <div class="articulos">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col"></th>
          </tr>
         </thead>
        <tbody >
          <tr v-for="producto in listaProductos" :key="producto.id">
            <td>{{producto.nombre}}</td>
            <td>{{producto.descripcion}}</td>
            <td><font-awesome-icon id="show-btn"  @click="editarProducto(producto)" icon="edit"/></td>
            <td><font-awesome-icon id="trash"  @click="borrarProducto(producto.id)" icon="trash"/></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <b-modal id="bv-modal-example" hide-footer>
        <template #modal-title>
          Editar articulo
        </template>
        <div class="d-block text-center">
          <div class="editar">
            <form>
              <div class="form-nombre">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" v-model="nombre">
              </div>
              <div class="form-descripcion">
                <label for="descipcion">Descripción:</label>
                <textarea class="" id="descipcion" rows="3" v-model="descripcion"></textarea>
              </div>
              <div class="form-row">
                <div class="form-row-stock">
                  <label for="stock">Stock:</label>
                  <input type="number" id="stock" v-model="stock">
                </div>
                <div class="form-row-precio">
                  <label for="precio">Precio:</label>
                  <input type="number" id="precio" v-model="precio">
                </div>
              </div>
              <div class="form-novedad">
                <label for="novedad">Novedad</label>
                <input v-model="novedad" type="checkbox">
              </div>
              <div class="form-imagen">
                <label for="imagen">Imagen:</label>
                <input type="file" id="imagen" @change="previewImage" >
              </div>    
            </form>
          </div>
        </div>
        <b-button class="mt-3" block @click="subir">Guardar</b-button>
      </b-modal>
    </div>
  </section>
</template>

<script lang="js">
import { db } from '../db.js'
import {storage} from '../db' 

  export default  {
    name: 'administrador',
    props: [],
    mounted () {

    },
    data () {
      return {
        listaProductos:null,
        productoEditar:null,
        novedad:false,
        imageData: null,
        img1: null,
        nombre:"",
        descripcion:"",
        stock:"",
        precio:"",
        imagen:"",
        producto:null
      }
    },
    methods: {
        borrarProducto:function(id){
            db.collection('productos').doc(id).delete();
        },
        editarProducto:function (producto) {
          this.$bvModal.show('bv-modal-example')
          this.nombre=producto.nombre;
          this.descripcion=producto.descripcion;
          this.stock=producto.stock;
          this.precio=producto.precio; 
          this.producto = producto;         
          },
        previewImage: function(event){   
           this.uploadValue=0;      
          this.imageData = event.target.files[0];
      },
      subir:function () {
        if(this.imageData==null)
        this.$notify({
                group: 'anadido',
                title: 'Error',
                type: 'error',
                text: 'Debe subir una foto'
              });
        else{
          const storageRef=storage.ref(this.imageData.name).put(this.imageData);
          storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log(this.uploadValue)
            }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
              storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                  db.collection("productos").doc(this.producto.id)
                  .update({
                    nombre:this.nombre,
                    descripcion:this.descripcion,
                    stock:this.stock,
                    precio:this.precio,
                    imagen:url,
                    novedades:this.novedad 
                  });
              this.$bvModal.hide('bv-modal-example');
              this.$notify({
                group: 'anadido',
                title: 'Se ha subido el producto',
                type: 'success',
                text: 'El producto se ha subido correctamente'
              });
                });
              }      
            );
        } 
        },
        borrarCampos: function () {
          this.nombre = "";
          this.descripcion="";
          this.precio="";
          this.stock="";
        },
    },
    computed: {
      
    },
    firestore:
  { 
    listaProductos: db.collection('productos')
  }
}


</script>

<style scoped lang="scss">
@import "@/scss/main.scss";
  .administrador {
    @include flexposition;
    flex-direction: column; 

    .articulos{
      width: 90%;

      th{
        padding: 0;
      }

      td{
        padding: 0.4rem;
      }

      #trash{
        color:$color-red;
      }
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

  .editar {
    @include flexposition;

    form{
      width:90%;
      margin: 1rem 0;

      @include response(lg){
        width:80%;
      }
      .form{
        &-nombre{
          label{
            width: 100%;
          }

          input{
            width: 100%;
            margin-top: .3rem;
          }
        }

        &-descripcion{
          label{
            width: 100%;
          }

          textarea{
            width: 100%;
          }
        }

        &-row{
        @include flexposition(space-between,center);
        flex-direction: column;
        padding: .1rem;
        
        @include response(md){
            margin-top: .4rem;
        }

        @include response(lg){
          @include flexposition(space-around,center);
            flex-direction: row;
            width: 100%;
        }

        &-precio{
          width: 100%;
          margin-top: .5rem;

        @include response(lg){
          width: 40%;
        }

        input{
          margin-left: .4rem;
            
          @include response(lg){
            margin-left: 1rem;
            width: 40%;
          }
        }
      }

      &-stock{
        width: 100%;

        @include response(lg){
          width: 40%;
        }

        input{
          margin-left: .7rem;
          margin-top: .4rem;

          @include response(lg){
            margin-left: 1rem;
            width: 40%;
          }
        }  
      }
    }
    &-novedad{
      margin-top: .6rem;

      input{
        width: 1.2rem;
        height: 1.2rem;
        margin-left: .5rem;
      }
    }

    &.imagen{
      width: 80%;
      font-size: .9rem;
      @include tamanofuente(1.2rem,1.3rem,1.6rem);

      input{
        width: 80%;
      }
    }
  }
      
}
  .botones{
    margin-top:1.5rem;
    @include flexposition(space-between,center);
      
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
</style>