<template>
  <div class="w-auto p-3">
    <div class="row">
      <label class="text-left">
        UserName:xxxx
      </label>
      <label class="text-right">
        プロフィール
      </label>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  props: {
    loginToken: String,
    user: Object,
  },
  mounted() {},
  data() {
    return {
      images: {
        like: require("@/assets/like_32.png"),
        comment: require("@/assets/comment_32.png"),
      },
    };
  },
  methods: {
    // プロフィール
    onClickProfile: function () {
      console.log(`Profile Request : ${this.tweet.id}`);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
