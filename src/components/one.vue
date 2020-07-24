<template>
    <div>
    <div :style="{backgroundColor:active==index?'blue':'red'}">

    </div>
</template>

<script>
export default {
    data() {
        return {
            active:0

        };
    },
    created() {

    },
    mounted() {

        this.$axios.get('https://api.it120.cc/small4/cms/news/list').then((res)=>{
            this.pick = res.data.data
            // console.log(this.pick)
        })

         this.$axios
      .get("https://api.it120.cc/small4/shop/goods/detail", {
        params: {
          id: this.id
        }
         })

         
        let arr = [120,1,1,1]
        arr.sort((a,b)=>{
          return a-b
        })
     
    },
    methods: {

    }
};
</script>

<style scoped>

</style>
