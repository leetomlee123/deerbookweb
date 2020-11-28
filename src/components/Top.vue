<template>
  <div>
    <div v-if="ok">
      <div class="d-flex justify-content-center" style="text-align: center">
        <div class="spinner-border text-info" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <h3 class="rank-head"><span>男生榜</span></h3>
    <div class="row">
      <div
        class="rank-list col-12 col-md-3"
        v-for="(key, idx) in words"
        :key="key"
      >
        <h3 class="wrap-title lang">
          {{ key }}
        </h3>
        <i>
          <div class="book-list">
            <ul>
              <li v-for="(k, i) in values[idx]" :key="k + i">
                <div class="num-box">
                  <span v-bind:class="colors[i > 3 ? 3 : i]">{{ i + 1 }}</span>
                </div>
                <div class="name-box">
                  <a v-on:click="goto(k.name, k.author)">{{ k.name }}</a>
                </div>
              </li>
            </ul>
          </div>
        </i>
      </div>
    </div>
    <h3 class="rank-head"><span>女生榜</span></h3>
    <div class="row">
      <div
        class="rank-list col-12 col-md-3"
        v-for="(key, idx) in gwords"
        :key="key"
      >
        <h3 class="wrap-title lang">
          {{ key }}
        </h3>
        <i>
          <div class="book-list">
            <ul>
              <li v-for="(k, i) in gvalues[idx]" :key="k + i">
                <div class="num-box">
                  <span v-bind:class="colors[i > 3 ? 3 : i]">{{ i + 1 }}</span>
                </div>
                <div class="name-box">
                  <a v-on:click="goto(k.name, k.author)">{{ k.name }}</a>
                </div>
              </li>
            </ul>
          </div>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
String.prototype.replaceAll = function (s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
};
export default {
  name: "Top",
  data() {
    return {
      type: [1, 2],
      words: [],
      gwords: [],
      values: [],
      gvalues: [],
      
      colors: ["ss1", "ss2", "ss3", "ss4"],
      ok: true,
      date: new Date().format("yyyy-MM-dd"),
    };
  },

  created() {
    this.getRank(1);
    this.getRank(2);
  },

  methods: {
    goto(name, author) {
      let that = this;

      this.$http.get("/book/two/" + name + "/" + author).then(function (res) {
        that.bid = res["data"]["data"]["Id"];
              that.$router.push({ path: `/chapters/${res["data"]["data"]["Id"]}` });

      });
      
    },
    getContent(id, name) {
      this.$router.push({ path: `/book/read/${id}/${name}` });
    },
    isContains(str, substr) {
      return new RegExp(substr).test(str);
    },
    getRank(type) {
      let that = this;
      return this.$http.get("/book/rank/" + type).then(function (res) {
        that.ok = false;
        // that.info = res.data.data
        let map = res.data.data;

        for (let key in map) {
          if (type == 1) {
            that.words.push(key);

            that.values.push(map[key]);
          } else {
            that.gwords.push(key);

            that.gvalues.push(map[key]);
          }

          // for (var k in a) {
          //     // log(k+'---'+a[k]);
          //     console.log(k, a[k])
          // }
        }
        let len = 0;
        if (type == 1) {
          len = that.values.length;
        } else {
          len = that.gvalues.length;
        }
        for (let i = 0; i < len; i++) {
          if (type == 1) {
            that.values[i] = that.values[i].splice(0, 10);
          } else {
            that.gvalues[i] = that.gvalues[i].splice(0, 10);
          }
        }
        // let parse = JSON.parse(JSON.stringify(map));
        // console.log(parse.keys())
        // that.words = that.words.splice( 10)
        // that.values = that.values.splice( 10)
      });
    },
    getChapters() {
      let that = this;

      return this.$http
        .get("/book/chapters/" + this.id + "/" + 0)
        .then(function (res) {
          that.cps = res.data.data;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ss1 {
  color: #fff;
  background: #bf2c24;
}

.ss2 {
  color: #fff;
  background: #e67225;
}

.ss3 {
  color: #fff;
  background: #e6bf25;
}

.ss4 {
  color: #666;
  background: #ededed;
}

h3.wrap-title {
  border-bottom: 1px solid #666;
}

.lang {
  font-family: FZZCYSK;
  font-weight: 400;
}

.rank-list .book-list li .num-box {
  float: left;
  width: 28px;
  height: 38px;
}

.rank-list {
  position: relative;
  z-index: 1;
  float: left;

  /*margin-right: 30px;*/
  /*margin-bottom: 10px;*/
}

.wrap-title {
  font-size: 18px;
  font-weight: 400;
  line-height: 25px;
  overflow: hidden;
  height: 24px;
  padding-bottom: 4px;
  color: #1a1a1a;
}

.rank-list .book-list li {
  clear: both;
  height: 31px;
}

li,
ol,
ul {
  list-style: none outside none;
}

.rank-list .book-list li .num-box span {
  font: 700 14px/16px Arial;
  display: block;
  overflow: hidden;
  width: 16px;
  height: 16px;
  margin-top: 8px;
  text-align: center;
  letter-spacing: -1px;
}

.rank-list .book-list li .name-box {
  position: relative;
  float: left;
  height: 40px;
}

.rank-list .book-list li .name-box a {
  overflow: hidden;
  height: 31px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #1a1a1a;
}

.rank-list .book-list li .name-box a {
  font: 14px/31px PingFangSC-Regular, "-apple-system", Simsun;
  float: left;
  width: 116px;
}

ul {
  list-style: none;
}

li {
  clear: both;
  height: 31px;
}

li > div {
  float: left;
}

.book-info div {
  margin-bottom: 10px;
}

p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

p {
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}

/*#xinfo {*/
/*    height: 120px;*/
/*}*/

p {
  height: 25px;
  line-height: 25px;
  padding-top: 2px;

  margin: auto;
  margin-top: 10px;
  overflow: hidden;
  float: left;
}
</style>
