<template>
  <div>
    <div class="container-fluid">
      <b-col cols="3">
        <p>
          <!-- <div class="form-login-id"> -->
            <label for="id">ログインID</label>
            <input type="text" v-model="register.id"/>
          <!-- </div> -->
        <br>
          <label for="password">ログインパスワード</label>
          <input type="text" v-model="register.password" />
        <br>
        <!-- タイトルだけは必須入力 -->
        <b-button :disabled="register.id == '' || register.password == ''" variant="success" style="width:100%;" v-on:click="onAccountRegister()">
          登録する
        </b-button>
        </p>
      </b-col>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      register: {
        id: "",
        password: "",
        name: undefined,
        token: undefined,
      },
    };
  },
  props: {},
  methods: {
    // アカウントの登録処理
    onAccountRegister: function () {
      var p = {
        email: this.register.id,
        password: this.register.password,
      };

      this.axios
        .post("http://localhost:3002/v1/auth", p)
        .then((response) => {
          // var payload = response.data;

          var token = response.headers["access-token"];
          var uid = response.headers["uid"];
          var client = response.headers["client"];

          this.$cookies.set("access-token", token, { expires: 5 });
          this.$cookies.set("uid", uid, { expires: 5 });
          this.$cookies.set("client", client, { expires: 5 });

          this.transitionTopPage();
        })
        .catch((e) => {
          alert(e);
        });
    },

    transitionTopPage() {
      this.$router.push("/top");
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
