<template >

  <section class="anadir">
    
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
  <div class="botones">
    <button @click="cancelar">Cancelar</button>
    <button @click="subir">Añadir</button>
  </div>
  
</form>
  </section>

</template>

<script lang="js">
import {storage} from '../db' 
import { db } from '../db.js'

  export default  {
    name: 'anadir',
    props: [],
    mounted () {

    },
    data () {
      return {
        novedad:false,
        imageData: null,
        img1: null,
        nombre:"",
        descripcion:"",
        stock:"",
        precio:""
      }
    },
    methods: {
       previewImage: function(event){   
        this.uploadValue=0;      
        this.imageData = event.target.files[0];
      },
      subir(){
        const storageRef=storage.ref(this.imageData.name).put(this.imageData);
          
        storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log(this.uploadValue)
          }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                db.collection("productos").add({
                  nombre:this.nombre,
                  descripcion:this.descripcion,
                  precio:this.precio,
                  stock:this.stock,
                  novedad:this.novedad,
                  imagen:url
                })
                this.$notify({
                  group: 'anadido',
                  title: 'Se ha subido el producto',
                  type: 'success',
                  text: 'El producto se ha subido correctamente'
                });
                this.borrarCampos();
                this.$router.push("/administrador").catch(()=>{});
              });
            }      
          ); 
        },
        borrarCampos: function () {
          this.nombre = "";
          this.descripcion="";
          this.precio="";
          this.stock="";
        },
        cancelar:function () {
          this.borrarCampos;
          this.$router.push("/administrador").catch(()=>{});
        }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
@import "@/scss/main.scss";

  .anadir {
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
