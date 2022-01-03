<template>
  <div class="border border-primary">
    <div class="container-fluid mt-3">
    <p>{{ tweet.user.name }}({{ tweet.user.id }})</p>
    </div>
    <label>{{ tweet.content }}</label>
    <br>
    <label>{{ tweet.created_at }}</label>
    <b-row>
        <div class="d-inline p-2 bg-primary text-white">
            <b-img src=images.comment></b-img>
            <label>{{ tweet.comments.length }}</label>
        </div>
        <div class="d-inline p-2 bg-primary text-white">
            <b-img src=images.like v-on:click="onClickFav()"></b-img>
            <label v-on:click="onClickFavDescription()">{{ tweet.likes.length }}</label>
        </div>
    </b-row>
  </div>
</template>

<script>
export default {
  created() {},
  props: {
    loginToken: String,
    tweet: Object,
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
    // お気に入り登録
    onClickLike: function () {
      var p = {
        tweet_id: this.tweet.id,
      };

      this.axios
        .post("http://localhost:3000/like", p)
        .then((response) => {
          var payload = response.data;
        })
        .catch((e) => {
          alert(e);
        });
      console.log(`Fav Request : ${this.tweet.id}`);
    },

    // 詳細画面
    onClickDescription: function () {
      console.log(`Description Request : ${this.tweet.id}`);
    },

    // いいねの詳細情報
    onClickFavDescription: function () {
      console.log(`onClickFavDescription Request : ${this.tweet.id}`);
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
