<template>
    <div>
        <tabnav :title='title'></tabnav>
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="商品"
        width="180">
      </el-table-column>
      <!-- <el-image :src="src"> -->
      <el-table-column
        prop="name"
        label="名字"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="价格">
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
import tabnav from "@/components/tab_nav"
export default {
    data() {
        return {
            title:"购物车",
            tableData: [ ]
        };
    },
    created() {

    },
    components:{
        tabnav,
    },
    mounted() {
        this.$store.state.shopcar.forEach((item)=>{
            this.tableData.unshift({
                 date: item.img,
                 name: item.name,
                 address: item.price
            })
        })
        // console.log(this.$store.state.shopcar)
    },
    methods: {

    }
};
</script>

<style scoped>

</style>
