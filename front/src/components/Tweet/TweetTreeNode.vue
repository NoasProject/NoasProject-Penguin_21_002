<template>
  <div class="border border-primary">
    <p>{{ tweet.profile ? tweet.profile.name : "NoName" }}({{ tweet.user_id }})</p>
    <label>{{ tweet.content }}</label>
    <br>
    <label>{{ tweet.created_at }}</label>
    <b-row>
        <div class="d-inline p-2 bg-primary text-white">
            <b-img :src=images.comment></b-img>
            <label>{{ tweet.comments.length }}</label>
        </div>
        <div class="d-inline p-2 bg-primary text-white">
            <b-img :src=images.like v-on:click="onClickLike()"></b-img>
            <label data-bs-toggle="modal" data-bs-target="#exampleModal">{{ tweet.likes.length }}</label>
        </div>
    </b-row>

  </div>


</template>

<script>
export default {
  created() {
    this.isLike = false;
    // tweet.likes.find((f) => f.user_id == this.user_id) != undefined;
  },
  props: {
    loginToken: String,
    tweet: Object,
  },
  mounted() {},
  data() {
    return {
      isLike: false,
      user_id: this.$cookies.isKey("user_id"),
      images: {
        like: require("@/assets/like_32.png"),
        // どっちかはbootstrapのアイコンを使う
        comment: require("@/assets/comment_32.png"),
      },
    };
  },
  methods: {
    // お気に入り登録
    onClickLike: function () {
      // いいね済みの場合
      if (this.isLike) {
        // 解除する
        this.axios
          .delete("http://localhost:3002/likes", {
            params: {
              tweet_id: this.tweet.id,
            },
            headers: {
              uid: this.$cookies.get("uid"),
              "access-token": this.$cookies.get("access-token"),
              client: this.$cookies.get("client"),
            },
          })
          .then(() => {
            // var payload = response.data;
          })
          .catch((e) => {
            alert(e);
          });
      } else {
        // 登録する
        this.axios
          .post("http://localhost:3002/likes", {
            params: {
              tweet_id: this.tweet.id,
            },
            headers: {
              uid: this.$cookies.get("uid"),
              "access-token": this.$cookies.get("access-token"),
              client: this.$cookies.get("client"),
            },
          })
          .then(() => {
            // var payload = response.data;
          })
          .catch((e) => {
            alert(e);
          });
      }

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
