import {createRouter, createWebHistory} from 'vue-router'

//引入视图组件
const Home = () => import( 'views/home/Home');
const Category = () => import('views/category/Category');
const Cart = () => import('views/cart/Cart');
const Profile = () => import('views/profile/Profile');
const Detail = () => import('views/details/Detail');

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',//首页
    component: Home
  },
  {
    path: '/category',//分类
    component: Category
  },
  {
    path: '/cart',//购物车
    component: Cart
  },
  {
    path: '/profile',//个人
    component: Profile
  },
  {
    path: '/detail/:iid',//详情页
    component: Detail
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
