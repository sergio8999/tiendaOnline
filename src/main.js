import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { firestorePlugin } from 'vuefire'
import Notifications from 'vue-notification'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart,faTrashAlt,faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'
import { faGooglePlus,faTwitter,faFacebookSquare,faInstagram,faGithub,faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingCart,faTrashAlt,faTrash,faEdit,faGooglePlus,faTwitter,faFacebook,faFacebookSquare,faInstagram,faGithub)
Vue.component('font-awesome-icon', FontAwesomeIcon)

 
Vue.use(Notifications)

Vue.use(firestorePlugin)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(BootstrapVue)


Vue.config.productionTip = false

import cabecera from './components/cabecera.vue'
Vue.component(cabecera)
import contenido from './components/contenido.vue'
Vue.component(contenido)
import carrito from './components/carrito.vue'
Vue.component(carrito)
import login from './components/login.vue'
Vue.component(login)
import registro from './components/registro.vue'
Vue.component(registro)
import administrador from './components/administrador.vue'
Vue.component(administrador)
import anadir from './components/anadir.vue'
Vue.component(anadir)


const routes = [
  { path: '/', component: contenido },
  { path: '/contenido', component: contenido },
  { path: '/carrito', component: carrito },
  { path: '/login', component: login },
  { path: '/registro', component: registro },
  { path: "/administrador", component: administrador, meta: { requiresAuth: true} },
  { path: "/anadir", component: anadir, meta: { requiresAuth: true} }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

import Firebase from "./db.js"
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if(Firebase.auth.currentUser.email != "administrador@email.com") {
            next("/");
        } else {
            next();
        }
    } else {
        next();
    }
}) 

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
