<template>
  <div style="height:100%;background-color: rgb(206, 205, 205);">
    <div class="all_warp">
      <header>
        <ul>
          <li>{{ name }}</li>
          <li @click='denglu'>{{ goin }}</li>
          
            <router-link to='/shop_select' tag='li'>
                <i class="el-icon-shopping-cart-full"></i>
            </router-link>
            
          
        </ul>
      </header>
      <div class="cont-warp">
        <header>
          <ul>
            <li>admin</li>
            <li>logout</li>
            <li>
              <i class="el-icon-d-caret" @click="iconShow=1" v-show="iconShow==0"></i>
              <i class="el-icon-caret-top" @click="iconShow=2" v-show="iconShow==1"></i>
              <i class="el-icon-caret-bottom" @click="iconShow=1" v-show="iconShow==2"></i>
            </li>
          </ul>
        </header>
        <section>
          <div class="k-warp">
            <ul class="select-option">
              <li
                v-for="(item,index) in parctry"
                :key="index"
                @click="option_index(index)"
              >{{ item }}</li>
            </ul>
          </div>

          <div class="shop-warp">
            <div class="option" v-for="(item,index) in goodslist" :key="index">
              <ul>
                <li>
                  <img :src="'../../static/imgs/'+item.productImage" />
                </li>
                <li class="center-cont">
                  <p>{{ item.productName }}</p>
                  <p>￥{{ item.salePrice }}</p>
                </li>
                <li>
                  <el-button type="text" @click="dialogVisiblec(index)">加入购物车</el-button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>{{ str }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblef">取 消</el-button>
        <el-button type="primary" @click="dialogVisiblet">确 定</el-button>
      </span>
    </el-dialog>
    <van-dialog v-model="show" title="标题" show-cancel-button :showConfirmButton="false" :showCancelButton="false">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @click='btn'>提交</van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      name:'admin',
      goin:"logout",
      username:'',
      password:'',
      loading: false,
      dialogVisible: false,
      iconShow: 0,
      str: "",
      parctry: [
        "all",
        "0.00~100.00",
        "100.00~500.00",
        "500.00~1000.00",
        "1000.00~2000.00"
      ],
      arr: [],
      optionIndex: 0,
      page: 0,
      shopingcar:[]
    };
  },
  computed: {
    goodslist() {
      let shuju = this.arr;
      if (this.iconShow == 1) {
        shuju.sort((a, b) => {
          return a.salePrice - b.salePrice;
        });
      }
      if (this.iconShow == 2) {
        shuju.sort((a, b) => {
          return b.salePrice - a.salePrice;
        });
      }
      return shuju;
    }
  },
  created() {},
  mounted() {
    this.$axios.get("../../static/data2.json").then(res => {
      this.arr = res.data.result.list;
    });

    this.$axios.get("../../static/data.json").then(res => {
      this.arr.push(...res.data.result.list);
      window.localStorage.setItem("shuju", JSON.stringify(this.arr));
    });
    // window.localStorage.setItem("user", JSON.stringify("ererer"));
    window.addEventListener("scroll", this.getMore);
    // json请求
  },
  methods: {
    dialogVisiblec(i) {
      this.dialogVisible = true;
      let user = localStorage.getItem("user");
      if (user) {
        this.str = "加入成功";
        let obj = {
          img:this.arr[i].productImage,
          name:this.arr[i].productName,
          price:this.arr[i].salePrice
        }
        this.shopingcar=obj
      } else {
        this.str = "请先登录";
      }
    },
    dialogVisiblef() {
      this.dialogVisible = false;
    },
    dialogVisiblet() {
      this.dialogVisible = false;
    },
    option_index(i) {
      if (i == 0) {
        let arr = localStorage.getItem("shuju");
        let shuju = JSON.parse(arr);
        this.arr = shuju;
      }
      if (i != 0) {
        this.optionIndex = i;
        let paricty = this.parctry[i];
        let min = paricty.split("~")[0];
        let max = paricty.split("~")[1];
        let arr = localStorage.getItem("shuju");
        let shuju = JSON.parse(arr);
        this.arr = shuju.filter(item => {
          return item.salePrice >= min && item.salePrice <= max;
        });
      }
    },

    getMore() {
      if (this.page < 3) {
        this.$toast.loading("加载中");
        setTimeout(() => {
          this.$axios.get("../../static/data3.json").then(res => {
            this.arr.push(...res.data.result.list);
            console.log(res)
          });
        }, 1000);
        this.page++;
      } else {
        return false;
      }
    },
  denglu(){
    this.show=true
  },
  btn(){
    let obj = {
      name : this.username,
      pwd : this.password
    }
    window.localStorage.setItem("user",JSON.stringify(obj))
    this.$toast.success('添加成功');
    this.name=this.username
    this.goin=this.password
    this.show=false
  }
  },
  watch: {
    shopingcar:{
      handler(){
        this.$store.commit('addCont',this.shopingcar)
      },
      deep:true
    }
  }
};
</script>

<style lang='scss' scoped>
body {
  background-color: rgb(206, 205, 205);
}
.all_warp {
  width: 100%;
  background-color: rgb(206, 205, 205);
  > header {
    width: 80%;
    height: 8%;
    margin: 0 auto;
    background-color: #fff;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    > ul {
      width: 30%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      text-align: center;
      align-items: center;
    }
  }
  .cont-warp {
    width: 80%;
    // height: 90%;
    // background: rgb(189, 228, 238);
    margin: 0 auto;
    padding-top: 30px;
    > header {
      width: 100%;
      height: 50px;
      margin: 0 auto;
      background-color: #fff;
      text-align: right;
      display: flex;
      justify-content: flex-end;
      > ul {
        width: 30%;
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    > section {
      width: 100%;
      // margin-top: 20px;
      display: flex;
      justify-content: space-around;
      > .k-warp {
        > ul {
          width: 30%;
          // height: 100%;
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }

      > .shop-warp {
        width: 70%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        > .option {
          width: 130px;
          padding: 5px;
          > ul {
            width: 100%;
            border: 5px solid rgba(255, 255, 255, 0);
            display: flex;
            flex-direction: column;
            > li {
              width: 100%;

              text-align: center;
              > img {
                width: 100% !important;
                height: 40% ;
              }
              > .el-button {
                width: 80%;
                text-align: center;
              }
            }

            > .center-cont {
              width: 100%;
              height: 30%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
          }
          > ul:hover {
            border: 2px solid rgb(255, 196, 0);
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .k-warp {
    display: none;
  }
   .shop-warp {
    width: 100%;
    > .option {
      width: 400px !important;
      > ul {
        display: flex;
        flex-direction: row !important;
        >li{
          >img{
            width: 100% !important;
            height: 100% !important;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 750px) {
  .k-warp {
    display: block;
  }
 
}
</style>
