<template>
    <div>
        <UserHeader 
          :user="user"
        >
        </UserHeader>

        <div class="container-fluid">
          <b-form  @submit.stop.prevent>
              <label for="feedback-user">ツイート内容</label>
              <b-form-input v-model="input.content" style="width:100%;height:60px;">
                ツイート内容を入力する
              </b-form-input>
              <!-- 
              <b-form-invalid-feedback :state="validation">
              ユーザー名....
              </b-form-invalid-feedback> 
              -->

              <!--
              <b-form-valid-feedback :state="validation">
              Looks Good.
              </b-form-valid-feedback>
              -->
            <b-button 
              :disabled="input.content == ''" variant="success" style="width:100%;" v-on:click="onPostTweet()">
              ツイート
            </b-button>
          </b-form>

          <TweetTree 
            ref="Tree"
            style="width:100%;"
            :tweets="tweets"
          >
          </TweetTree>
      </div>
    </div>
</template>

<script>
import UserHeader from "../components/Common/UserHeader.vue";
import TweetTree from "../components/Tweet/TweetTree.vue";

export default {
  components: {
    UserHeader,
    TweetTree,
  },
  created() {
    var token = this.$cookies.get("access-token");
    if (this.$cookies.isKey("access-token") === false || token == "undefined") {
      console.log("tokenが存在しません");
      this.transitionRoot();
    }

    this.onGetTweets();
  },
  data() {
    return {
      input: {
        content: "",
      },
      user: {
        id: 1,
        name: "ユーザー名",
        description: "プロフィールです",
      },
      tweets: [
        {
          id: 1,
          user_id: 1,
          content: "message",
          profile: {
            id: 100,
            name: "テスト1",
            description: "テスト1のプロフィールです",
          },
          comments: [
            {
              id: 1,
              user_id: 3,
              comment: "comment2",
            },
          ],
          likes: [
            {
              id: 1,
              user_id: 2,
            },
            {
              id: 2,
              user_id: 3,
            },
          ],
        },
      ],
    };
  },
  props: {},
  methods: {
    // ツイートを行う処理
    onPostTweet: function () {
      this.axios
        .post("http://localhost:3002/tweets", {
          content: this.input.content,
          headers: {
            uid: this.$cookies.get("uid"),
            "access-token": this.$cookies.get("access-token"),
            client: this.$cookies.get("client"),
          },
        })
        .then((response) => {
          // var payload = response.data;
          console.log(response.data);

          var token = response.headers["access-token"];
          var uid = response.headers["uid"];
          var client = response.headers["client"];

          this.$cookies.set("access-token", token, { expires: 5 });
          this.$cookies.set("uid", uid, { expires: 5 });
          this.$cookies.set("client", client, { expires: 5 });
        })
        .catch((e) => {
          alert(e);
        });
    },

    // ツイートの取得を行う
    onGetTweets: async function () {
      var tweets = [];
      var params = {
        headers: {
          uid: this.$cookies.get("uid"),
          "access-token": this.$cookies.get("access-token"),
          client: this.$cookies.get("client"),
        },
      };
      console.log(params);
      await this.axios
        .get("http://localhost:3002/tweets", {
          headers: {
            uid: this.$cookies.get("uid"),
            "access-token": this.$cookies.get("access-token"),
            client: this.$cookies.get("client"),
          },
        })
        .then((response) => {
          tweets = response.data;
          console.log(response.data);

          var token = response.headers["access-token"];
          var uid = response.headers["uid"];
          var client = response.headers["client"];

          this.$cookies.set("access-token", token, { expires: 5 });
          this.$cookies.set("uid", uid, { expires: 5 });
          this.$cookies.set("client", client, { expires: 5 });
        })
        .catch((e) => {
          alert(e);
        });

      var tweetUseIds = tweets.map((tweet) => tweet.user_id);
      var tweetIds = tweets.map((tweet) => tweet.id);

      // User一覧
      await this.axios
        .get("http://localhost:3002/user_profiles", {
          params: {
            user_ids: tweetUseIds,
          },
          headers: {
            uid: this.$cookies.get("uid"),
            "access-token": this.$cookies.get("access-token"),
            client: this.$cookies.get("client"),
          },
        })
        .then((response) => {
          var profiles = response.data;

          var token = response.headers["access-token"];
          var uid = response.headers["uid"];
          var client = response.headers["client"];

          this.$cookies.set("access-token", token, { expires: 5 });
          this.$cookies.set("uid", uid, { expires: 5 });
          this.$cookies.set("client", client, { expires: 5 });

          tweets.map((tweet) => {
            tweet.profile = profiles.find((f) => f.id == tweet.user_id);
          });
        })
        .catch((e) => {
          alert(e);
        });

      if (tweetIds.length !== 0) {
        // Tweetの情報
        await this.axios
          .get("http://localhost:3002/comments", {
            tweet_ids: tweetIds,
            headers: {
              uid: this.$cookies.get("uid"),
              "access-token": this.$cookies.get("access-token"),
              client: this.$cookies.get("client"),
            },
          })
          .then((response) => {
            var comments = response.data;

            var token = response.headers["access-token"];
            var uid = response.headers["uid"];
            var client = response.headers["client"];

            this.$cookies.set("access-token", token, { expires: 5 });
            this.$cookies.set("uid", uid, { expires: 5 });
            this.$cookies.set("client", client, { expires: 5 });

            tweets.map((tweet) => {
              tweet.comments = comments.filter((f) => f.tweet_id == tweet.id);
            });
          })
          .catch((e) => {
            alert(e);
          });

        // likes
        await this.axios
          .get("http://localhost:3002/likes", {
            tweet_ids: tweetIds,
            headers: {
              uid: this.$cookies.get("uid"),
              "access-token": this.$cookies.get("access-token"),
              client: this.$cookies.get("client"),
            },
          })
          .then((response) => {
            var likes = response.data;

            var token = response.headers["access-token"];
            var uid = response.headers["uid"];
            var client = response.headers["client"];

            this.$cookies.set("access-token", token, { expires: 5 });
            this.$cookies.set("uid", uid, { expires: 5 });
            this.$cookies.set("client", client, { expires: 5 });

            tweets.map((tweet) => {
              tweet.likes = likes.filter((f) => f.tweet_id == tweet.id);
            });
          })
          .catch((e) => {
            alert(e);
          });
      }

      this.tweets = tweets;
    },

    transitionRoot: function () {
      this.$router.push("/");
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
