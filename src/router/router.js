import Vue from 'vue'
import Router from 'vue-router'


import Nav from "../components/Nav";
import Top from "../components/Top";
import Books from "../components/Books";
import Chapters from "../components/Chapters";
import Read from "../components/Read";
import Search from "../components/Search";
import Me from "../components/Me";


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Top',
            component: Top
        },
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
            path: '/search/:searchWord',
            name: 'search',
            component: Search,

        },
        {
            path: '/read',
            name: 'read',
            component: Read,

        },
        {
            path: '/me',
            name: 'me',
            component: Me,

        },
        {
            path: '/chapters/:id',
            name: 'chapters',
            component: Chapters,

        },

    ]
})
