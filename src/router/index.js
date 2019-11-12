import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/clientes',
    name: 'clients',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "clients" */ '../views/Clients.vue')
  },
  {
    path: '/cliente/crear',
    name: 'createClient',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "createClient" */ '../views/createClient.vue')
  },
  {
    path: '/cliente/listar',
    name: 'listClients',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "listClients" */ '../views/listClients.vue')
  },
  {
    path: '/Reserva/listar',
    name: 'listReservations',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "listReservations" */ '../views/listReservations.vue')
  },
  {
    path: '/Reserva/crear',
    name: 'createReservation',
    component: () => import(/* webpackChunkName: "createReservation" */ '../views/createReservation.vue')
  },
  {
    path: '/Reserva/Libro',
    name: 'bookingCode',
    component: () => import(/* webpackChunkName: "bookingCode" */ '../views/bookingCode.vue')
  },
  {
    path: '/grid',
    name: 'grid',
    component: () => import(/* webpackChunkName: "grid" */ '../views/Grid.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
