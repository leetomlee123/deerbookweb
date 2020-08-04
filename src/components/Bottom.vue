<template>
    <div class="row">
        <div class="footer col-12 " v-bind:class="{'fixed-bottom':this.$store.getters.getFixBottomState}">
            <div class="box-center cf">
                <div class="footer-text"><p>上海网警提示：网络刷单是违法 切莫轻信有返利，网上交友套路多 卖惨要钱需当心，电子红包莫轻点 个人信息勿填写，仿冒客服来行骗 官方核实最重要，招工诈骗有套路
                    预交费用需谨慎，低价充值莫轻信 莫因游戏陷套路，连接WIFI要规范 确认安全再连接，抢购车票有章法 确认订单再付款，白条赊购慎使用 提升额度莫轻信，网购预付有风险 正规渠道很重要
                    如网民接到962110电话，请立即接听。</p></div>
                <div class="friend-link">
                    <a v-for="friend in friends" :key="friend.name" :href="friend.link" target="_blank">{{friend.name}}</a>
                    <!--                <a href="http://chuangshi.qq.com" target="_blank">创世中文网</a>-->
                    <!--                <a href="http://yunqi.qq.com" target="_blank">云起书院</a>-->
                    <!--                <a href="http://www.rongshuxia.com" target="_blank">榕树下</a>-->

                    <!--                <a href="http://www.xxsy.net" target="_blank">潇湘书院</a>-->
                    <!--                <a href="http://www.tingbook.com" target="_blank">天方听书网</a>-->
                    <!--                <a href="http://www.lrts.me" target="_blank">懒人听书</a>-->
                    <!--                <a href="http://yuedu.yuewen.com" target="_blank">阅文悦读</a>-->


                </div>
                <!--            <div class="footer-menu dib-wrap"><a href="//www.qidian.com/about/intro" target="_blank">关于起点</a><a-->
                <!--                    href="//www.qidian.com/about/contact" target="_blank">联系我们</a><a href="//join.yuewen.com"-->
                <!--                                                                                     target="_blank">加入我们</a><a-->
                <!--                    href="//www.qidian.com/help/index/2" target="_blank">帮助中心</a><a-->
                <!--                    href="http://123.206.70.240/online/?cid=0&amp;uid=10&amp;code=0" class="advice"-->
                <!--                    target="_blank">提交建议</a>&lt;!&ndash;<a href="http://bbs.qidian.com" target="_blank">起点论坛</a>&ndash;&gt;-->
                <!--                &lt;!&ndash;<a href="http://comic.qidian.com" target="_blank">动漫频道</a>&ndash;&gt;<a href="//jubao.yuewen.com"-->
                <!--                                                                                    target="_blank">举报中心</a></div>-->
                <!--            <div class="copy-right"><p><span>Copyright © 2002-2020 www.qidian.com All Rights Reserved</span>版权所有-->
                <!--                上海玄霆娱乐信息科技有限公司</p>-->
                <!--                <p><a target="_blank"-->
                <!--                      href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011502001275"><img-->
                <!--                        src="https://imgservices-1252317822.image.myqcloud.com/image/20191223/o5lajshfcw.png"><span>沪公网安备 31011502001275号</span></a>网站备案/许可证号：<a-->
                <!--                        href="http://beian.miit.gov.cn" target="_blank">沪B2-20080046-1</a>&nbsp;出版经营许可证：新出发沪批字第 U3718 号&nbsp;网络文化经营许可证：沪网文[2015]0081-031-->
                <!--                    新出网证（沪）字 010</p>-->
                <!--                <p>请所有作者发布作品时务必遵守国家互联网信息管理办法规定，我们拒绝任何色情小说，一经发现，即作删除！举报电话：010-59357051</p>-->
                <!--                <p>本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p>-->
                <!--                <p>联系方式 总机 021-61870500 地址：中国（上海）自由贸易试验区碧波路690号6号楼101、201室</p></div>-->
                <div class="safety-box">
                    <div class="safety-img dib-wrap"><a class="site1"
                                                        href="http://103.21.140.216:86/Welcome.Asp?Id=3101151112"
                                                        target="_blank"></a><a class="site2"
                                                                               href="http://scjgj.sh.gov.cn/lz/licenseLink.do?method=licenceView&amp;entyId=20111011181417625"
                                                                               target="_blank"></a><a class="site3"
                                                                                                      href="http://www.cyberpolice.cn/wfjb"
                                                                                                      target="_blank"></a><a
                            class="site4"
                            href="https://ss.knet.cn/verifyseal.dll?sn=e18013031011571840mt51000000&amp;pa=111332"
                            target="_blank"></a><a class="site5" href="http://www.shjbzx.cn" target="_blank"></a><a
                            class="site6" href="http://www.12377.cn/" target="_blank"></a><a class="site7"
                                                                                             href="http://www.12377.cn/node_548446.htm"
                                                                                             target="_blank"></a></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "bottom",
        data() {
            return {
                friends: [
                    {name: '创世中文网', link: 'http://chuangshi.qq.com'},
                    {name: '云起书院', link: 'http://chuangshi.qq.com'},
                    {name: '榕树下', link: 'http://chuangshi.qq.com'},
                    {name: '潇湘书院', link: 'http://chuangshi.qq.com'},
                    {name: '天方听书网', link: 'http://chuangshi.qq.com'},
                    {name: '懒人听书', link: 'http://chuangshi.qq.com'},
                    {name: '阅文悦读', link: 'http://chuangshi.qq.com'},
                ],
            };
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                let that = this
                this.$http.get('/friends')
                    .then(function (response) {
                        let data = response.data['data']
                        that.friends = data
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>

    .footer {
        text-align: center;
        background: #fafafa;
    }

    .footer .box-center {
        background: #fafafa;
    }

    .cf {
        zoom: 1;
    }

    .box-center {
        width: 1200px;
        margin-right: auto;
        margin-left: auto;
    }

    .footer .footer-text {
        padding: 20px 26px 0;
    }

    .footer .footer-text p {
        font-family: PingFangSC-Regular, '-apple-system', Simsun;
        font-size: 12px;
        line-height: 20px;
        text-align: left;
        color: #1a1a1a;
        word-break: break-all;
    }

    .footer .friend-link {
        font-size: 0;
        overflow: hidden;
    }

    .footer .footer-menu {
        padding: 0 0 4px;
    }

    .footer .footer-menu a:hover, .footer .friend-link a:hover {
        color: #ed4259;
    }

    .footer .footer-menu a, .footer .friend-link a {
        font-family: PingFangSC-Regular, '-apple-system', Simsun;
        font-size: 12px;
        line-height: 27px;
        margin-right: 16px;
        color: #1a1a1a;
    }

    .footer .copy-right {
        padding-bottom: 16px;
    }

    .footer .safety-img a {
        width: 140px;
        height: 52px;
        margin-right: 14px;
        border: 1px solid #ededed;
        background-image: url('https://qidian.gtimg.com/qd/images/foot_site.c7a69.png?max_age=31536000');

    }

    .dib-wrap a, .dib-wrap span {
        display: inline-block;
        vertical-align: middle;
        letter-spacing: normal;
        word-spacing: normal;
    }

    .site1 {
        background-position: 0 0;
    }

    .site2 {
        background-position: 0 -52px;
    }

    .site3 {
        background-position: 0 -104px;
    }

    .site4 {
        background-position: 0 -156px;
    }

    .site5 {
        background-position: 0 -208px;
    }

    .site6 {
        background: #fff url('https://imgservices-1252317822.image.myqcloud.com/image/20200518/telnfnyzvk.png') no-repeat 50% 50%;
    }

    .site7 {
        background-position: 0 -312px;
    }
</style>
