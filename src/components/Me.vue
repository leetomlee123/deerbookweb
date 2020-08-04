<template>
    <div>
        <div v-if="isLogin">
            <div style="text-align: center;"><h4>书架</h4></div>
           <div class="row">
               <div class="book-information col-12" v-for="bk in bks" :key="bk.Id">
                   <div class="book-img">
                       <img :src="bk.Img" id="icm" @click="detail(bk.Id)">
                   </div>
                   <div class="book-info">
                       <h1><em @click="detail(bk.Id)">{{bk.Name}}</em><span>
                {{bk.Author}}  著
            </span></h1>
                       <p class="tag">
                           <span>{{bk.BookStatus}}</span>
                           <span>签约</span>
                           <span>VIP</span>
                           <span>{{bk.CName}}</span>
                       </p>
                       <p></p>
                       <p class="intro">{{bk.Desc}}</p>
                       <p></p>
                       <!--                    <p class="book-bottom-p">-->
                       <!--                        <span class="read" v-on:click="getContent(0)">免费试读</span>-->
                       <!--                        <span>加入书架</span>-->
                       <!--                        <span class="app"> <a href="https://web.leetomlee.xyz/app.apk">手机App阅读</a></span>-->
                       <!--                        <span class="app"> <a href="https://www.leetomlee.xyz/">神秘链接</a></span>-->
                       <!--                    </p>-->
                       <!--            <p><span v-if="isContains(info.LastChapter,'最后')">最后更新: </span>{{info.LastTime}}</p>-->

                   </div>
                   <div class="comment-wrap">
                       <h4>{{bk.Rate}}</h4>
                   </div>

               </div>
           </div>
        </div>
        <div v-else>
            <div class="login-box">
                <div style="text-align: center;" class="mb-2"><h4>用户登陆</h4></div>
                <dl>
                    <dd><em class="iconfont">

                        </em><input type="text" tabindex="1" v-model="name" placeholder="手机/邮箱/用户名"
                                     id="username">
                    </dd>
                    <dd><em class="iconfont">
                        </em><input type="password" tabindex="2" v-model="pwd" placeholder="密码"
                                     id="password">
                    </dd>

                </dl>
                <div class="auto-login-box cf">
                    <div style="text-align: center">{{msg}}</div>
                    <!--                    <div class="link fr">-->
                    <!--                        <a href="https://aq.yuewen.com/welcome/validateuser" target="_blank"-->
                    <!--                           id="forgetPsw">忘记密码</a>-->
                    <!--                    </div>-->
                    <!--                    <div class="link ">-->
                    <!--                        <a href="https://aq.yuewen.com/welcome/validateuser" target="_blank"-->
                    <!--                           id="register">免费注册</a>-->
                    <!--                    </div>-->

                    <a class="red-btn go-login btnLogin login-button mt-2" href="javascript:"
                       v-on:click="login">登 录</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from "../store";

    export default {
        name: "Me",
        data() {
            return {
                msg: '',
                name: '',
                pwd: '',
                isLogin: false,
                bks: []
            }
        },
        created() {
            this.isLogin = this.$store.getters.getLoginState
            // this.login()
            if (this.isLogin) {
                this.shelf()
            }
        },
        methods: {
            detail(id) {
                this.$router.push({path: `/chapters/${id}`})
            },
            shelf() {
                let that = this
                this.$http.get('book/shelf', {
                    headers: {
                        "auth": that.$store.getters.getToken
                    }
                })
                    .then(function (response) {
                        that.bks = response.data['data']
                        store.commit('fixBottom', false)
                        let ids = []

                        for (let i = 0; i < that.bks.length; i++) {
                            ids.push(that.bks[i]['Id'])
                        }
                        console.log(ids)
                        store.commit('setIds', ids)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            login() {
                let that = this
                this.$http.post('login', {
                    "name": this.name,
                    "password": this.pwd
                })
                    .then(function (response) {
                        let data = response.data
                        console.log(data['code'])
                        if (data['code'] != 201) {
                            that.msg = data['msg']
                        } else if (data['code'] == 201) {
                            that.isLogin = true
                            console.log(data['data']['token'])
                            that.$store.commit('setToken', data['data']['token'])
                            that.$store.commit('setLoginState', true)
                            that.shelf()
                        }

                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>

    em {
        font-style: normal;
    }

    .book-information {
        position: relative;
        z-index: 2;
        margin-bottom: 30px;
        padding-bottom: 20px;
        background: #fff;
        height: 162px;
    }

    .book-img {
        float: left;
        width: 120px;
        height: 162px;
        margin: 20px 20px 0;
    }

    .book-img > img {
        width: 100%;
        height: 100%;
    }

    .book-info {
        float: left;
        margin-top: 20px;
        display: block;
        width: 900px;
    }

    h1 {
        font: 700 28px/38px PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', 'Microsoft YaHei', sans-serif;
        overflow: hidden;
        height: 38px;
        margin-bottom: 12px;
    }

    h1 span {
        font: 14px/20px PingFangSC-Regular, '-apple-system', Simsun;
        margin-left: 20px;

    }

    .intro {
        font: 14px/20px PingFangSC-Regular, '-apple-system', Simsun;
        overflow: hidden;
        height: 60px;
        margin-bottom: 11px;
        word-break: break-all;
    }

    .book-bottom-p > span {
        font: 14px/34px PingFangSC-Regular, '-apple-system', Simsun;
        display: inline-block;
        width: 102px;
        height: 34px;
        margin-right: 15px;
        text-align: center;
        vertical-align: middle;
        border-width: 1px;
        border-style: solid;
    }

    .read {
        position: relative;
        z-index: 1;
        text-align: center;
        color: #fff;
        border-color: #bf2c24;
        background: #bf2c24;
    }

    .tag {
        margin-bottom: 11px;
    }

    .tag > span {
        color: #3f5a93;
        border-color: #9fadc9;
        font: 12px/22px PingFangSC-Regular, '-apple-system', Simsun;
        display: inline-block;
        overflow: hidden;
        height: 22px;
        margin-right: 12px;
        padding: 0 10px;
        text-align: center;
        vertical-align: middle;
        border-width: 1px;
        border-style: solid;
        border-radius: 15px;
    }

    .comment-wrap {
        position: absolute;
        top: 0;
        right: 0;
        overflow: hidden;
        max-width: 204px;
        height: 166px;
        margin-top: 20px;
        padding-right: 32px;
        text-align: right;
    }

    dl {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }

    dd {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 42px;
        border: 1px solid #E6E6E6;
        margin-top: 16px;
        *vertical-align: bottom;
        *zoom: 1;
    }

    .red-btn:hover {
        border-color: #ED4259;
        background: #ED4259;
        color: white;
    }

    .go-login {
        display: block;
        border-radius: 2px;
        margin-bottom: 6px;
        height: 40px;
        line-height: 38px;
        width: 100%;
    }


    .login-box {
        margin: 0 auto;
        width: 500px;
        position: relative;
        z-index: 1;
        padding: 2px 38px 0;
    }

    a:hover {
        color: #ED4259;
    }

    .red-btn {
        position: relative;
        z-index: 1;
        border-color: #BF2C24;
        background: #BF2C24;
        color: white;
        text-align: center;
        text-decoration: none;
    }

    a {
        outline: none;
        text-decoration: none;
        color: #262626;
        transition: color .3s, background-color .3s;
    }

    dd em {
        float: left;
        width: 42px;
        height: 42px;
        font-size: 16px;
        line-height: 42px;
        text-align: center;
        color: #A6A6A6;
    }

    .iconfont {
        font-family: "qd_iconfont" !important;
        font-size: 24px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.1px;
        -moz-osx-font-smoothing: grayscale;
    }

    .auto-login-box {
        margin-bottom: 14px;
        margin-left: -4px;
    }

    .cf {
        zoom: 1;
    }

    .fr {
        float: right;
    }

    .auto-login-box .link a, .login-common-wrap .auto-login-box .link em {
        display: inline-block;
        vertical-align: middle;
    }

    .auto-login-box .link a {
        font: 12px/16px "PingFangSC-Regular", "-apple-system", Simsun;
    }

    .auto-login-box label + label {
        color: #666;
    }

    .auto-login-box label {
        font: 12px/16px "PingFangSC-Regular", "-apple-system", Simsun;
        vertical-align: middle;
    }

    label {
        cursor: pointer;
    }

    a {
        outline: none;
        text-decoration: none;
        color: #262626;
        transition: color .3s, background-color .3s;
    }

    dd input {
        width: 280px;
        height: 40px;
        *width: 270px;
    }

    dd input {
        *border: none;
        *background: none;
        float: left;
        padding: 7px 0;
        font: 14px/28px "PingFangSC-Regular", "-apple-system", Simsun;
    }

    dd input, button {
        border: none;
        outline: none;
        font-family: "PingFangSC-Regular", "HelveticaNeue-Light", "Helvetica Neue Light", "Microsoft YaHei", "sans-serif";
    }
</style>
