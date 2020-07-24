<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {
    
  data() {
    return {
       
    };
  },
   props:['title'],
  created() {},
  mounted() {},
  computed() {},
  components: {},
  methods: {
    // 左点击按钮
    onClickLeft() {},
    // 右点击按钮
    onClickRight() {}
  },
  watch: {}
};
</script>

<style scoped>
</style>
