<template>
    <div>

        <div id="head" class="row">
            <div id="fmimg" class="col-md-2 col-sm-2" >
                <img :src="info.Img" style="width: 120px;height: 150px" id="icm">
            </div>
            <div id="info" class="col-md-10 col-sm-6">
                <div id="xinfo" class="row">
                    <h4 class="col-12">{{info.Name}}</h4>
                    <p class="col-md-6 col-sm-12">作者: {{info.Author}}</p>
                    <p class="col-md-6 col-sm-12">动 作：加入书架, 投推荐票, 直达底部</p>
                    <p class="col-md-6 col-sm-12"><span v-if="isContains(info.LastChapter,'最后')">最后更新:</span>{{info.LastTime}}</p>
                    <p class="col-md-6 col-sm-12">最新章节: {{info.LastChapter}}
                    </p>
                </div>
                <div>
                    <p style="overflow: hidden;padding-top: 10px;height: 80px" class="col-md-12 col-sm-12">
                        {{info.Desc}}</p>
                </div>

            </div>
        </div>
        <hr/>
        <div id="body">
            <div class="row">
                <div class="col-md-4 col-sm-12" v-for="(data) in cps" :key="data.id" style="margin-bottom: 10px">
                    <a v-on:click="getContent(data.id)"> {{data.name}}</a>
                </div>

            </div>
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
                cps: '',
                content: '',
                chapterName: '',
                id: this.$route.params.id
            };
        },

        created() {
            this.getBookInfo()
            this.getChapters()
        },

        methods: {
            getContent(id) {
                let that = this;
                this.$http.get('/book/chapter/' + id).then(function (res) {
                    that.content = res.data.data.content.replaceAll('\n', '<br/><br/>')
                });
                this.showContent = true
            },
            isContains(str, substr) {
                return new RegExp(substr).test(str);
            },
            getBookInfo() {
                let that = this;
                return this.$http.get('/book/detail/' + this.id).then(function (res) {
                    that.info = res.data.data
                    console.log(that.info)
                });
            },
            getChapters() {
                let that = this;
                return this.$http.get('/book/chapters/' + this.id + '/' + 0).then(function (res) {
                    that.cps = res.data.data
                    console.log(that.cps)
                });
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
    #head  div {
        float: left;
    }



    #head {
        height: 200px;
    }

    #fmimg {
        width: 180px;
        height: 200px;
    }



    #icm {
        width: 100%;
        height: 100%;
        transition: transform .3s ease-out;
        color: #fcfcfa;
        border-radius: 5px;
        box-shadow: 0 0 1px #000 inset;
    }




    p {
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
    }

    /*#xinfo {*/
    /*    height: 120px;*/
    /*}*/

    #xinfo p {
        height: 25px;
        line-height: 25px;
        padding-top: 2px;

        margin: auto;
        margin-top: 10px;
        overflow: hidden;
        float: left;
    }

    a:hover {
        color: #ed4259;
    }
</style>
