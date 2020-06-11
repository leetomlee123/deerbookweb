import Vue from 'vue'
import Router from 'vue-router'

import Product from "../components/Product";
import Nav from "../components/Nav";
import Books from "../components/Books";
import Chapters from "../components/Chapters";
import Read from "../components/Read";


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/nav',
            name: 'Nav',
            component: Nav
        },
        {
            path: '/book/:category',
            name: 'book',
            component: Books,

        },
        {
            path: '/book/read/:id/:name',
            name: 'read',
            component: Read,

        },
        {
            path: '/chapters/:id',
            name: 'chapters',
            component: Chapters,

        },
        {
            path: '/product',
            name: 'Product',
            component: Product
        }
    ]
})
