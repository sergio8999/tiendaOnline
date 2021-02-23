<template lang="html">
  <section class="pie">
      <div class="pie-redes-sociales">
        <ul class="redes-sociales">
          <li class="redes-sociales-item">
            <a href="#" class="redes-sociales-link">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
          </li>
          <li class="redes-sociales-item">
            <a href="#" class="redes-sociales-link">
              <font-awesome-icon :icon="['fab', 'facebook-square']" />
            </a>
          </li>
          <li class="redes-sociales-item">
            <a href="#" class="redes-sociales-link">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
          </li>
          <li class="redes-sociales-item">
            <a href="#" class="redes-sociales-link">
              <font-awesome-icon :icon="['fab', 'github']" />
            </a>
          </li>
        </ul>
      </div>
      <div class="pie-informacion">
        <ul class="informacion">
          <li class="informacion-item">
            <a href="#" class="informacion-link">
              <p>Sobre Nosotros</p>
            </a>
          </li>
          <li class="informacion-item">
            <a href="#" class="informacion-link">
              <p>Contacto</p>
            </a>
          </li>
          <li class="informacion-item">
            <a href="#" class="informacion-link">
              <p>Envio</p>
            </a>
          </li>
          <li class="informacion-item">
            <a href="#" class="informacion-link">
              <p class="informacion-parrafo">Privacidad</p>
            </a>
          </li>
        </ul>
      </div>
      <div class="pie-copyright">
        <p class="pie-copyright-parrafo">
          &copy; Copyright. Tienda "Sergio". All Rights Reserved
        </p>
      </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'pie',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
@import "@/scss/main.scss";
  .pie {
    width: 100%;
    padding: 1.5rem 0;
    background-color:$color-black;
    color: $color-white; 
    @include flexposition;
    flex-direction: column;

    &-informacion{
      width: 100%;

      @include response(md){
        width: 80%;
      }

      @include response(md){
        width: 60%;
      }
    }
    
    .redes-sociales {
      display: flex;
      width:15rem;
      justify-content: space-between;
      margin-bottom: 4.4px;

      @include response(md){
        width: 18.5rem;
        margin-bottom: 2.5rem;
      }

      @include response(lg){
        width: 30rem;
        margin-bottom: 2.5rem;
      }

      &-item {
        list-style: none;
      }

      &-link {
        text-decoration: none;
        font-size: 3rem;
        color: $color-secondary;
        transition: color .7s;
        @include tamanofuente(1.2rem,1.5rem,1.8rem); 

        svg{
          font-size: 2rem;
          @include response(md){
          font-size: 3rem;
          }
        }
           
        &:hover {
          color: $color-primary;
        }
      }
    }

    .informacion {
      @include flexposition(space-around,center);
      flex-direction: column;
      width:100;
      margin-bottom: 1rem;

      @include response(md){
        flex-direction: row;
        margin-bottom: 2.5rem;
      }

      &-item {
        margin-bottom: .5rem;
        list-style: none;
      }

      &-link {
        text-decoration: none;
        font-size: 1.2rem;
        color: $color-secondary;
        transition: color .7s;
        @include tamanofuente(1.2rem,1.4rem,1.6rem);
       
        &:hover {
          color: $color-primary;
        }
      }
    }

    &-copyright-parrafo{
      font-family: $font-josefin;
      font-size: .6rem;
      margin-top: .3rem;
      color: $color-secondary;
      @include textStyles(capitalize);

      @include response(sm){
        font-size: 1rem;
      }

      @include response(md){
        margin: auto;
        text-align: center;
      }
    }
}
</style>
