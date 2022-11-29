import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      customerName:""

    },
    hotelName:"aaa",
    //订单模块
    order:{
      // hotelName:state.hotelName,
      hotelName:"",
      roomType:"",
      start:"",
      end:""


    },
    position: "findroom",
    searchSet: {},
    // searchTime: {
    //   inTime: '',
    //   leaveTime: '',
    // },
		bookstat: {
			roomType: '',
			roomid: '',
			inTime: '',
			leaveTime: '',
		}
  },
  mutations: {
    // //根据入住时段搜索room
    // setRoomInfo(state, data){
    //   state.searchSet = data
    // },
    
    //设置order的start和end
    setDate(state, [start, end]){
      state.order.start = start;
      state.order.end = end;
    },
    setOrder(state, [hotel_name, room_type, start, end]){
      console.log("in setorder")
      state.order.hotelName = hotel_name;
      state.order.roomType = room_type;
      console.log(room_type)
      console.log(state.order.roomType)
      state.order.start = start;
      state.order.end = end;
    },
    setHotelName(state, name){
      state.hotelName = name
    },
    setFind(state) {
      state.position = "findroom";
    },
    setRes(state) {
      state.position = "resveration";
    },
    setMine(state) {
      state.position = "mine";
    }
  },
  actions: {
  },
  modules: {
  }
})
