<template>


    <div class="row">
        <div class="col-md-4 col-sm-12 book_item" v-for="data in list" :key="data.Id">
            <div class="book-img">
                <img :src="data.Img" v-on:click="goTo(data.Id)" class="book-img">
            </div>
            <div class="book-info">
                <h4 v-on:click="goTo(data.Id)">{{data.Name}}</h4>
                <p>
                    {{data.Desc}}
                </p>
                <p>{{data.Author}}</p>
            </div>
        </div>
    </div>
</template>


<script>

    export default {
        name: "Search",
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
                console.log(id)
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

                let searchWord = this.$route.params.searchWord
                this.$http2.get('/book/search/ ' + searchWord + ' /' + this.page)
                    .then(function (response) {
                        let data = response.data['data']
                        that.list = that.list.concat(data)
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

    .book_item > div {
        float: left;
    }

    .book-info {
        width: 216px;
    }

    h4 {
        font: 16px/21px PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', 'Microsoft YaHei', sans-serif;
        overflow: hidden;
        height: 21px;


        font-weight: bold;

    }

    .book-info p {
        font: 12px/20px PingFangSC-Regular, '-apple-system', Simsun;
        overflow: hidden;
        height: 40px;
        margin-bottom: 10px;
        color: #666;

        word-wrap: break-word;
        word-break: break-all;

    }

    .book-img img {
        position: relative;
        display: block;
        overflow: hidden;
        box-shadow: 0 1px 6px rgba(0, 0, 0, .35), 0 0 5px #f9f2e9 inset;
    }


    .book-img:hover {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }

</style>
