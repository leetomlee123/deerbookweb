<template>
    <div class="main-text-wrap ">
        <div class="text-head">
            <h3>
                <span>{{this.cp.name}}</span>
            </h3>
        </div>
        <div v-if="ok">
            <div class="d-flex justify-content-center" style="text-align: center">
                <div class="spinner-border text-info" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
        <span v-html="content" style="font-size: 20px" class="content">
        </span>
        <div class="chapter-control dib-wrap">
            <a v-on:click="changeCp(-1)" v-bind:class="{disabled:idx-1<0}">上一章</a>
            <span>|</span>
            <a v-on:click="chapters()">目录</a>
            <span>|</span>
            <a v-on:click="changeCp(1)" v-bind:class="{disabled:idx+1>=this.$store.getters.getLen}">下一章</a>
        </div>
    </div>


</template>


<script>
    String.prototype.replaceAll = function (s1, s2) {
        return this.replace(new RegExp(s1, "gm"), s2);
    }
    export default {
        name: "Read",
        data() {
            return {

                idx: this.$route.query.idx,
                bid: this.$route.query.bid,
                cp: '',
                content: '',
                ok: true
            };
        },

        created() {

            this.cp = this.$store.getters.getCp(this.idx)

            this.getContent()

        },

        methods: {
            getContent() {
                let that = this;
                console.log(this.cp)
                this.$http.get('/book/chapter/' + that.cp.id).then(function (res) {
                    that.ok = false
                    that.content = "&nbsp;&nbsp;&nbsp;&nbsp;" + res.data.data.content.replaceAll('\n', '<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;')
                });

            },
            changeCp(i) {
                let tem_idx = this.idx + i
                if (tem_idx < 0 || tem_idx > this.$store.getters.getLen) {
                    return
                }
                this.content = ''
                this.idx = tem_idx
                this.cp = this.$store.getters.getCp(tem_idx)
                this.ok = true
                this.getContent()
            }
            , chapters() {

                this.$router.push({path: `/chapters/${this.bid}`})
            }

        }
    }
    ;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main-text-wrap {
        background: #ede7da url('https://qidian.gtimg.com/qd/images/read.qidian.com/body_base_bg.5988a.png') repeat;
        font-family: 'Microsoft YaHei', PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', sans-serif;
    }

    .chapter-control {
        height: 70px;
        margin-bottom: 24px;
        text-align: center;
        border: 1px solid #d8d8d8;
    }

    .chapter-control a {
        font: 18px/70px PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', 'Microsoft YaHei', sans-serif;
        width: 30%;
        display: inline-block;
        vertical-align: middle;
        letter-spacing: normal;
        word-spacing: normal;
    }

    .chapter-control a:hover {
        color: #1a1a1a;
        background: #ede9e1;
        background: rgba(0, 0, 0, .03);
    }


    .text-head {
        position: relative;
        z-index: 5;
        margin-bottom: 12px;
    }

    h3 {
        font: 24px/32px PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', 'Microsoft YaHei', sans-serif;
        overflow: hidden;
        height: 32px;
        margin-bottom: 12px;
    }

    .main-text-wrap.font-family01 {
        font-family: 'Microsoft YaHei', PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', sans-serif;
    }

    .content {
        line-height: 1.8;
        overflow: hidden;

    }
</style>
