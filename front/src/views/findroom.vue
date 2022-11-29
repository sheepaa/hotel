<template>
  <div>
    <el-container class="wrapper">
      <!-- <el-header class="header">找房</el-header> -->
      <el-main class="section">
        <div class="bg-header"></div>
        <el-card class="box-card pb-1">
          <div class="text item">
            <el-row>
              <el-col :span="16">
                <p class="text-left">
                  <i class="el-icon-location-outline"></i>
                  {{ $store.state.hotelName }}
                </p>
              </el-col>
              <!-- 回到findhotel -->
              <el-col :span="8">
                <p class="text-right">
                  选择位置<i class="el-icon-arrow-right"></i>
                </p>
              </el-col>
            </el-row>

            <el-form ref="form" :model="form">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="入住时间">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.comedate"
                      style="width: 100%"
                      :options="$datePickerOptions"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="离店时间">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.leavedate"
                      style="width: 100%"
                      :options="$datePickerOptions"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  class="btn-block"
                  @click="searchBtn"
                  >查找空余房间
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <el-row class="mt-1">
          <el-card class="mb-1 ml-1 mr-1">
            <div class="text item">
              <el-button type="primary" @click="unity"
                >点击查看客房模型</el-button
              >
            </div>
          </el-card>

          <!-- TODO: 调整显示格式 -->
          <el-col
            :span="22"
            v-for="(room, index) in listdata"
            :key="index"
            :offset="1"
            class="mb-1"
          >
            <el-card :body-style="{ padding: '0px' }">
              <el-row>
                <el-col :span="8">
                  <img :src="room.coverImage" class="image" />
                </el-col>
                <el-col :span="8">
                  <div style="padding: 14px" class="text-left room">
                    <p class="room-title">
                      {{ room.room_type }}
                    </p>
                    <!-- <p class="room-intro">{{ room.intro }}</p> -->
                    <p class="room-price">￥{{ room.price }}</p>
                  </div>
                </el-col>
                <el-col :span="8" style="margin-bottom: 5px">
                  <el-row align="center">
                    <el-button
                      type="primary"
                      plain
                      @click="clickDisplayInfo(room)"
                      >查看详情</el-button
                    >
                  </el-row>
                  <el-row>
                    <el-button type="primary" plain @click="toOrder(room)"
                      >订房</el-button
                    >
                  </el-row>

                  <!-- <el-button type="primary" plain>主要按钮</el-button> -->
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer class="footer">
        <footbar></footbar>
      </el-footer>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="95%">
        <span>您还没有选择完整的时间段！</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确定</el-button
          >
        </span>
      </el-dialog>

      <el-dialog
        title="房间详情"
        :visible.sync="dialogVisibleInfo"
        width="30%"
        :before-close="handleClose"
      >
        <el-row type="flex">
          <el-col :span="12">Square:{{ displayInfo.Square }}</el-col>
          <el-col :span="12">Floor:{{ displayInfo.Floor }}</el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="8">WIFI:{{ displayInfo.WIFI }}</el-col>
          <el-col :span="8">Window:{{ displayInfo.Window }}</el-col>
          <el-col :span="8">Smoking:{{ displayInfo.Smoking }}</el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisibleInfo = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import footbar from "@/components/footbar.vue";
import { clearScreenDown } from "readline";
import store from "./../store";

export default {
  data() {
    return {
      // hotel_name = this.$route.query.
      dialogVisible: false,
      dialogVisibleInfo: false, //查看详情
      today: "",
      tomorrow: "",
      displayInfo: {
        Square: "",
        Floor: "",
        WIFI: "",
        Window: "",
        Smoking: "",
      },
      form: {
        comedate: "",
        leavedate: "",
        currentDate: new Date(),
      },
      listdata: [
        {
          room_type: "大床房",
          // intro: "good",
          price: 1000,
          Intro: {
            Square: "1",
            Floor: "2",
            WIFI: "3",
            Window: "4",
            Smoking: "5",
          },
        },
        {
          room_type: "双床房",
          // intro: "good",
          price: 100,
          Intro: {
            Square: "2",
            Floor: "3",
            WIFI: "4",
            Window: "5",
            Smoking: "6",
          },
        },
      ],
    };
  },
  components: {
    footbar,
  },

  methods: {
    clickDisplayInfo(room) {
      console.log(room.Intro.Square);
      this.dialogVisibleInfo = true;
      // console.log("we")
      this.displayInfo = room.Intro;
    },
    // showroom() {
    //   console.log(123);
    //   this.roomVisible = true;
    // },
    searchBtn() {
      console.log(this.changeTimeStr(this.form.comedate));
      if (this.form.comedate == "" || this.form.leavedate == "") {
        this.dialogVisible = true;
        return;
      }
      this.$store.commit("setDate", [this.form.comedate, this.form.leavedate]);

      this.$axios
        .post("http://localhost:9091/customer/select4", {
          hotel_name: this.$store.state.hotelName,
          start: this.changeTimeStr(this.form.comedate),
          end: this.changeTimeStr(this.form.leavedate),
        })

        .then((res) => {
          this.listdata = res.data;
        })
        .catch(() => {
          console.log("error");
        });
    },
    //日期 -> 字符串
    changeTimeStr(str) {
      str = str.toString();
      str = str.replace(/ GMT.+$/, ""); // Or str = str.substring(0, 24)
      let d = new Date(str);
      let a = [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
      ];
      for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] < 10) {
          a[i] = "0" + a[i];
        }
      }
      str = a[0] + "-" + a[1] + "-" + a[2] + " " + a[3] + ":" + a[4];
      return str;
    },
    getDate: function () {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      this.today = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf;
      this.tomorrow = yy + "-" + mm + "-" + (dd + 1) + " " + hh + ":" + mf;
    },
    // 保存信息并且跳转到订房
    toOrder(room) {
      console.log("in")
      let hotel_name = this.$store.state.hotelName;
      let room_type = room.room_type;
      let start = this.form.comedate;
      let end = this.form.leavedate;
      this.$store.commit("setOrder",[hotel_name, room_type,start,end])
      console.log(this.$store.state.order.roomType)
      this.$router.push("/reservation-c");
    },
    // unity() {
    //   this.$axios
    //     .get("http://localhost:9091/customer/view/1")
    //     .then(
    //       (res) => {
    //         this.listdata = res.data;
    //         console.log(this.listdata);
    //         alert("wow");
    //       },
    //       (error) => {
    //         console.log("fail", error);
    //       }
    //     )
    //     .catch((res) => {
    //       console.log(res);
    //     });
    // },
  },

  mounted() {
    this.getDate();

    this.$store.commit("setDate", [this.today, this.tomorrow]);
    console.log(this.$store.state.order.start);
    console.log(this.$store.state.order.end);
    console.log("end");
    this.$axios
      .post("http://localhost:9091/customer/select4", {
        hotel_name: this.$store.state.hotelName,
        start: this.today,
        end: this.tomorrow,
      })
      .then(
        (res) => {
          this.listdata = res.data;
        },
        (error) => {
          console.log("fail", error);
        }
      )
      .catch((res) => {
        console.log(res);
      });
  },
};
</script>

<style scoped="scoped">
.box-card {
  height: 30vh;
  margin: -7rem 1rem 0;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

/* .image {
  width: 80%;
  display: block;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 20px;
} */

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.room p {
  margin-bottom: 0.25rem;
  margin-top: 0;
}

.room-title {
  font-size: 1.2rem;
  font-weight: bolder;
  color: #303133;
}

.room-intro {
  font-size: 0.9rem;
  color: #606266;
}

.room-price {
  font-size: 1.2rem;
  color: #f56c6c;
}

.room-comment {
  font-size: 0.8rem;
  color: #909399;
}

.black {
  color: #303133;
}
</style>
