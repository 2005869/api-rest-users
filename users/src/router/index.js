import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import SuccessView from '../views/SuccessView.vue'
import LoginView from '../views/LoginView.vue'
import UsersView from '../views/UsersView.vue'
import EditView from '../views/EditView.vue'
import axios from 'axios';

function adminAuth(to, from, next){
  if (localStorage.getItem('token') != undefined){
    const token = 'Bearer ' + localStorage.getItem('token');
    const email = localStorage.getItem('email');

    const req = {
      headers: {
        Authorization: token,
        email
      }
    }
    
    axios.post('http://localhost:8686/validate', {}, req).then(res => {
      console.log(res);
      next();
    }).catch(err => {
      console.log(err.response);
      next('/login');
    });
  }else{
    next('/login');
  }
}
  


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/success',
    name: 'Success',
    component: SuccessView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/admin/users',
    name: 'UsersView',
    component: UsersView,
    beforeEnter: adminAuth
  },
  {
    path: '/admin/users/edit/:id',
    name: 'EditView',
    component: EditView,
    beforeEnter: adminAuth
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
