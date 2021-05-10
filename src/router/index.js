import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "../App";
import Home from "../components/Home";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import Board from "../components/Board";
import Card from "../components/Card";

const requireAuto = (to ,from , next) => {
  const isAuth = localStorage.getItem('token')
  const loginPath = `/login??rPath=${encodeURIComponent(to.path)}`
  isAuth ? next() : next(loginPath)
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home, beforeEnter : requireAuto},
    {path: '/login', component: Login},
    {
      path: '/b/:bid', component: Board, beforeEnter : requireAuto, children: [
        {path: 'c/:cid', component: Card, beforeEnter : requireAuto}
      ]
    },
    {path: '*', component: NotFound}
  ]
})

export default router
