<template>
    <div id="dissection">
        <div class="row">
            <div class="col-md-4 col-sm-12 book_item" v-for="data in list" :key="data.id">

                <div class="row">
                    <div class=" col-4"><a>
                        <img :src="data.cover" v-on:click="goTo(data.id)" class="book-img">
                    </a></div>
                    <div class="book-info col-8"><h5 v-on:click="goTo(data.id)">{{data.bookName}}</h5>
                        <p>{{data.BookDesc}}</p>
                        <p>{{data.author}}</p></div>
                </div>

            </div>
        </div>

    </div>


</template>

<!--<template>-->
<!--    <div>-->

<!--        <a-row>-->
<!--            <a-col :md="8" :xs="24" v-for="data in list" :key="data.id">-->
<!--                &lt;!&ndash;                <div class="book-img "><a>&ndash;&gt;-->
<!--                &lt;!&ndash;                    <img :src="data.cover" v-on:click="goTo(data.id)">&ndash;&gt;-->
<!--                &lt;!&ndash;                </a></div>&ndash;&gt;-->
<!--                &lt;!&ndash;                <div class="book-info "><h5 v-on:click="goTo(data.id)">{{data.bookName}}</h5>&ndash;&gt;-->
<!--                &lt;!&ndash;                    <p>{{data.BookDesc}}</p>&ndash;&gt;-->
<!--                &lt;!&ndash;                    <p>{{data.author}}</p></div>&ndash;&gt;-->
<!--                <a-row>-->
<!--                    <a-col :md="5" :xs="9"><img class="book-img" :src="data.cover" v-on:click="goTo(data.id)"></a-col>-->
<!--                    <a-col :md="19" :xs="15"><h2 v-on:click="goTo(data.id)">{{data.bookName}}</h2>-->
<!--                        <p>{{data.BookDesc}}</p>-->
<!--                        <p>{{data.author}}</p>-->
<!--                    </a-col>-->
<!--                </a-row>-->

<!--            </a-col>-->

<!--        </a-row>-->
<!--        <div>-->
<!--            <a-back-top />-->
<!--            Scroll down to see the bottom-right-->
<!--            <strong style="color: rgba(64, 64, 64, 0.6)"> gray </strong>-->
<!--            button.-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<script>

    export default {
        name: "Books",
        data() {
            return {
                list: [],
                page: 1,
                size: 21,
                loading: false,
                finished: false

            };
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            "$route": "clear",

        },
        created() {
            this.fetchData()
        },
        mounted() {
            window.addEventListener('scroll', this.pageScroll);
        },
        methods: {
            getScrollTop() {
                var scrollTop = 0;
                if (document.documentElement && document.documentElement.scrollTop) {
                    scrollTop = document.documentElement.scrollTop;
                } else if (document.body) {
                    scrollTop = document.body.scrollTop;
                }
                return scrollTop;
            }, getClientHeight() {
                var clientHeight = 0;
                if (document.body.clientHeight && document.documentElement.clientHeight) {
                    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
                } else {
                    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
                }
                return clientHeight;
            }, getScrollHeight() {
                return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            },
            pageScroll() {
                if (this.loading) {
                    return
                }
                // let scrollTop = dom.scrollTop;
                // let domHeight = dom.offsetHeight;
                // let scrollHeight = dom.scrollHeight;
                let that = this

                if (this.getScrollTop() + this.getClientHeight() + 10 > this.getScrollHeight()) {
                    that.page += 1

                    that.fetchData();
                    //此处发起AJAX请求
                }
                // if (scrollTop + seeHeight == totalHeight) {
                //     that.page += 1
                //
                //     that.fetchData();
                //
                // }

            },
            goTo(id) {
                this.$router.push({path: `/chapters/${id}`})
            },
            clear() {
                this.list = []
                this.page = 1
                this.fetchData()
            },
            fetchData() {
                if (this.loading) {
                    return
                }
                this.loading = true;
                let that = this
                if (this.$route.name == 'book') {
                    let category = this.$route.params.category
                    this.$http.get('/book/category/' + category + '/' + this.page + '/' + this.size)
                        .then(function (response) {
                            let data = response.data['data']
                            that.list = that.list.concat(data)
                            that.loading = false;
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                } else {
                    let searchWord = this.$route.params.searchWord
                    this.$http.get('/book/search?key=' + searchWord + '&' + this.page + '&' + this.size)
                        .then(function (response) {
                            let data = response.data['data']
                            console.log(data)
                            that.list = that.list.concat(data)
                            that.loading = false;
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                }
            },
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
    .book-img {
        width: 80px;
        height: 110px;
        border-radius: 5px;
        margin-bottom: 10px;
        position: absolute;
        /*top: 50%;*/
        left: 30%;
    }

    h5:hover {
        color: #ed4259;
    }

    .book-img:hover {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }


    .book_item > div {
        float: left;
    }


    p {
        font: 12px/20px PingFangSC-Regular, '-apple-system', Simsun;
        overflow: hidden;
        height: 40px;
        margin-bottom: 10px;
        color: #666;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
