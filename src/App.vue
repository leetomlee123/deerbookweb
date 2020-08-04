<template>
    <div id="app" >
        <Nav/>
        <!--        <router-link to="/product">Product</router-link>-->
        <div class="container">
            <div style="margin-bottom: 80px"></div>
            <router-view></router-view>
        </div>
<!--        <Bottom></Bottom>-->

        <!--        <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">-->

        <!--                        <a-breadcrumb :style="{ margin: '16px 0' }">-->
        <!--&lt;!&ndash;                <a-breadcrumb-item>Home</a-breadcrumb-item>&ndash;&gt;-->
        <!--&lt;!&ndash;                <a-breadcrumb-item>List</a-breadcrumb-item>&ndash;&gt;-->
        <!--&lt;!&ndash;                <a-breadcrumb-item>App</a-breadcrumb-item>&ndash;&gt;-->
        <!--            </a-breadcrumb>-->
        <!--            <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">-->
        <!--                <router-view></router-view>-->

        <!--            </div>-->
        <!--        </a-layout-content>-->

        <!--        <a-layout-footer :style="{ textAlign: 'center' }">-->
        <!--            CopyRight ©2020 Created by mindLee-->
        <!--        </a-layout-footer>-->
    </div>
</template>

<script>
    import Nav from './components/Nav.vue'

    export default {
        name: 'App',

        components: {
            Nav,
        },
        created() {
//在页面加载时读取sessionStorage里的状态信息
            if (sessionStorage.getItem("store")) {
                this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
            }

//在页面刷新时将vuex里的信息保存到sessionStorage里
            window.addEventListener("beforeunload", () => {
                sessionStorage.setItem("store", JSON.stringify(this.$store.state))
            })
        }
    }
</script>

<style>
    a, blockquote, body, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, input, li, ol, p, pre, td, textarea, th, ul {
        margin: 0;
        padding: 0;
    }

    body a:hover {
        color: #ed4259;
    }


</style>
