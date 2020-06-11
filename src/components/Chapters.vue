<template>
    <div id="dissection">
        <div class="row" style="padding-top: 80px">
            <div class="col-4" v-for="data in list" :key="data.id" style="margin-bottom: 10px">

                <div class="book-img"><a>
                    <img :src="data.cover">
                </a></div>
                <div class="book-info"><h5>{{data.bookName}}</h5>
                    <p>{{data.BookDesc}}</p>
                    <p>{{data.author}}</p></div>

            </div>
        </div>

    </div>


</template>


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

                let category = this.$route.params.category
                this.$http.get('/book/category/' + category + '/' + this.page + '/' + this.size)
                    .then(function (response) {
                        let data = response.data['data']
                        that.list = that.list.concat(data)
                        console.log(that.list)
                        that.loading = false;
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
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
        width: 72px;
        height: 96px;
        margin-right: 12px;
    }

    .book-img a img:hover {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }

    .book-img > a > img {
        width: 100%;
        height: 100%;
        transition: transform .3s ease-out;
        color: #fcfcfa;
        border-radius: 5px;
        box-shadow: 0 0 1px #000 inset;
    }

    .col-4 > div {
        float: left;
    }

    .book-info {
        width: 256px;
    }

    .book-info p {
        font: 12px/20px PingFangSC-Regular, '-apple-system', Simsun;
        overflow: hidden;
        height: 40px;
        margin-bottom: 10px;
        color: #666;
    }

    p {
        word-wrap: break-word;
        word-break: break-all;
    }
</style>
