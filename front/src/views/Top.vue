<template>
    <div>
        <UserHeader 
          ref="Header"
          style="width:100%;"
          :user="user"
        >
        </UserHeader>

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
          :tweets="tweetInfo.list"
        >
        </TweetTree>
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
  created() {},
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
      tweetInfo: {
        list: [
          {
            id: 1,
            content: "message",
            user: {
              id: 100,
              name: "テスト1",
              description: "テスト1のプロフィールです",
            },
            comments: [
              {
                id: 1,
                user_id: 3,
                comment: "comment",
              },
            ],
            likes: [
              {
                id: 1,
                user_id: 2,
              },
            ],
          },
          {
            id: 2,
            content: "message-2",
            user: {
              id: 101,
              name: "テスト2",
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
        updateCount: 0,
      },
    };
  },
  props: {},
  methods: {
    // ログイン処理
    onLogin: function () {},

    // ツイートを行う処理
    onPostTweet: function () {},

    // ツイートの取得を行う
    onGetTweets: function () {},
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
