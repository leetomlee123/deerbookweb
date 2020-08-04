<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
            <a class="navbar-brand" href="/">鹿书</a>
            <button class="navbar-toggler" type="button" id="ic" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item nav-link"
                        v-for="nav in navs" :key="nav.id" @click="goTo(nav)" v-bind:class="{active:current==nav.id}">
                        {{nav.data}}
                    </li>
                    <li class="nav-item nav-link" @click="down">
                        客户端
                    </li>

                </ul>


<!--                <form class="form-inline my-2 my-lg-0">-->

<!--                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"-->
<!--                           v-model="searchWord">-->

<!--                    <button class="btn btn-outline-success my-2 my-sm-0" v-on:click="goTo()">Search</button>-->
<!--                </form>-->
<!--                <span>  </span>-->
<!--                <span class="ml-2 " v-on:click="login">-->
<!--                    <div v-if="$store.getters.getLoginState">-->
                    <!--                        <img src="https://p3.pstatp.com/origin/pgc-image/23896188b2af42cbafd00500d2755b56" alt="..."-->
                    <!--                             class="rounded-circle" style="width: 50px;height: 50px">-->
                    <!--                    </div>-->
                    <!--                    <div v-else>-->
                    <!--                               <svg class="bi bi-person"-->
                    <!--                                    width="1.5em"-->
                    <!--                                    height="1.5em"-->
                    <!--                                    viewBox="0 0 16 16"-->
                    <!--                                    fill="currentColor"-->
                    <!--                                    xmlns="http://www.w3.org/2000/svg">-->
                    <!--                        <path fill-rule="evenodd"-->
                    <!--                              d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>-->
                    <!--                    </svg>-->
                    <!--                    </div>-->
<!--             </span>-->
            </div>
        </nav>

    </div>


</template>


<script>

    export default {
        name: 'Nav',
        data() {
            return {

                navs: [],
                current: -1
                , searchWord: '',


            }
        },
        created() {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.initNav()
        },
        methods: {
            down() {
                if (this._isMobile()) {
                    document.getElementById("ic").click()
                }
                window.location.href = 'https://web.leetomlee.xyz/app.apk';

            },
            login() {

                this.$router.push({path: `/me`})

            },
            _isMobile() {
                let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
                return flag;
            },
            initNav() {
                let that = this
                this.$http.get('book/category')
                    .then(function (response) {
                        let data = response.data['data']
                        for (let i = 0; i < data.length; i++) {
                            that.navs.push({"id": i, "data": data[i]})
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }, goTo(nav) {
                // alert(nav.data)
                if (this._isMobile()) {
                    document.getElementById("ic").click()
                }

                if (nav == undefined) {
                    this.$router.push({path: `/search/${this.searchWord}`})

                } else {
                    this.current = nav.id
                    this.$router.push({path: `/book/${nav.data}`})
                }
            }
        }


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #components-layout-demo-fixed .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 24px 16px 0;
        float: left;
    }


</style>
