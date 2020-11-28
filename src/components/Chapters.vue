<template>
    <div class="row">


            <!--<div class="col-2 col">-->
            <!--    <img :src="info.Img">-->
            <!--</div>-->
            <div class="col-12">
                <h1><em>{{info.Name}}</em><span>
                {{info.Author}}  著
            </span></h1>
                <p class="tag">
                    <span>{{info.BookStatus}}</span>
                    <span>签约</span>
                    <span>VIP</span>
                    <span>{{info.CName}}</span>
                    <span>评分{{info.Rate}}</span>
                </p>
                <p></p>
                <div class="col-12 intro">{{info.Desc}}</div>
                <p></p>

                <!--            <p><span v-if="isContains(info.LastChapter,'最后')">最后更新: </span>{{info.LastTime}}</p>-->

            </div>




        <div class="col-12 volume">
            <div class="cover"></div>
            <h3>正文卷
                <svg class="bi bi-dot" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                </svg>
                共{{info.Count}}章
            </h3>
            <ul class="cf">
                <div class="row">
                    <div class="col-12 col-md-4" v-for="(data,idx) in cps" :key="data.id">
                        <li><a v-on:click="getContent(idx)"> {{data.name}}</a></li>
                    </div>
                </div>
            </ul>
        </div>

    </div>


</template>

<script>
    String.prototype.replaceAll = function (s1, s2) {
        return this.replace(new RegExp(s1, "gm"), s2);
    }
    export default {
        name: "Chapters",
        data() {
            return {
                showContent: false,
                info: '',
                cps: [],
                content: '',
                chapterName: '',
                id: this.$route.params.id,
                ok: true,
                inShelf: '加入书架'
            };
        },

        created() {
            if (this.contains(this.$store.getters.getIds, this.id)) {
                this.inShelf = '移除书架'
            }
            this.getBookInfo()
            this.getChapters()
        },

        methods: {

            contains(arr, obj) {
                let i = arr.length;
                while (i--) {
                    if (arr[i] === obj) {
                        return true;
                    }
                }
                return false;
            }
            ,
            addToShelf() {
                let that = this
                let action = 'add'
                if (that.inShelf == '移除书架') {
                    action = 'del'
                }
                if (this.$store.getters.getLoginState) {
                    return this.$http.get('/book/action/' + this.id + '/' + action, {
                        headers: {'auth': this.$store.getters.getToken}
                    }).then(function () {
                        if (action == 'add') {
                            that.inShelf = '移除书架'

                        } else {
                            that.inShelf = '加入书架'

                        }
                    });
                } else {
                    this.$router.push({path: `/me`})
                }

            }
            ,
            getContent(idx
            ) {
                let id = this.$route.params.id
                this.$router.push({path: `/read`, query: {idx: idx, bid: id}})
            }
            ,
            isContains(str, substr) {
                return new RegExp(substr).test(str);
            }
            ,
            getBookInfo() {
                let that = this;
                return this.$http.get('/book/detail/' + this.id).then(function (res) {
                    that.info = res.data.data
                });
            }
            ,
            getChapters() {
              console.log(this.id)
                let that = this;
                return this.$http.get('/book/chapters/' + this.id + '/' + 0).then(function (res) {
                    that.ok = false
                    that.cps = res.data.data
                    that.$store.commit('setCps', that.cps)

                });
            }
            ,

            pageChange(i) {

                switch (i) {
                    case -1:
                        this.page -= 1
                        this.fetchData()
                        break
                    case 0:
                        this.page += 1
                        this.fetchData()
                        break
                    default:
                        this.page = i
                        this.fetchData()
                        break
                }
                if (this.page > 1) {
                    this.can_pre = true
                }
            }

        }
    }
    ;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

        margin: 20px 20px 0;
    }

    .book-img > img {
        width: 124px;
        height: 172px;
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
        /*word-wrap:break-word;*/
        /*word-break:break-all;*/
        /*overflow: hidden;*/
    }

    .book-bottom-p > div {
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

    .volume {
        /*position: relative;*/
        /*z-index: 1;*/
        overflow: hidden;
        margin-top: 10px;
        /*width: 1050px;*/

    }

    .volume h3 {
        font: 700 18px/24px PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', 'Microsoft YaHei', sans-serif;
        overflow: hidden;
        height: 24px;
        padding-bottom: 11px;
        border-bottom: 1px solid #666;
    }


    .cover {
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #fff;
        display: block;
    }

    .cf {
        overflow: hidden;
        width: 1050px;
        zoom: 1;

        list-style: none outside none;

    }

    .volume ul {
        overflow: hidden;
        width: 1050px;
    }

    .volume li {
        font: 14px/40px PingFangSC-Regular, '-apple-system', Simsun;
        float: left;
        overflow: hidden;
        width: 350px;
        height: 40px;
        padding-right: 60px;
        display: list-item;
        text-align: -webkit-match-parent;
        list-style: none outside none;
        border-bottom: 1px solid #ebebeb;
    }

    .volume li a {
        float: left;
        overflow: hidden;
        max-width: 240px;
        white-space: nowrap;
        text-overflow: ellipsis;
        transition: color .3s, background-color .3s;
        text-decoration: none;
        color: #262626;
        outline: 0;
    }

    li a:hover {
        color: #ed4259;
    }

    .app a {
        text-decoration: none;
    }
</style>
