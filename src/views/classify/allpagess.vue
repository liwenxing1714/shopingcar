<template>
    <div>
    <tabnav :title='title'></tabnav>
    </div>
</template>

<script>
import tabnav from "@/components/tab_nav"
import storage from "@/utils/storage"

export default {
    data() {
        return {
            title:'分类'
        };
    },
    created() {

    },
    components:{
        tabnav,
    },
    mounted() {
        console.log(this.$store.state.arr)
        storage.set("arrr",["rtrete"],true)
        let a = storage.get("arrr",true)
        console.log(JSON.stringify(a))
},
    methods: {

    }
};
</script>

<style scoped>

</style>
