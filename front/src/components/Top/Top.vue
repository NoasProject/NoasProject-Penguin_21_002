<template>
    <div>
        <b-form  @submit.stop.prevent>
            <label for="feedback-user">User ID</label>
            <b-form-input v-model="Tweet" :state="validation"></b-form-input>
            <b-form-invalid-feedback :state="validation">
            ユーザー名....
            </b-form-invalid-feedback>

            <!--
            <b-form-valid-feedback :state="validation">
            Looks Good.
            </b-form-valid-feedback>
            -->
        </b-form>
    </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      input: {
        content: "",
      },
      login: {
        id: "",
        password: "",
        name: undefined,
        token: undefined,
      },
    };
  },
  props: {},
  methods: {
    // ログイン処理
    onLogin: function () {
      var p = {
        name: this.login.name,
        login_id: this.login.id,
        login_password: this.login.password,
      };

      this.axios
        .post("http://localhost:3000/users/login", p)
        .then((response) => {
          var payload = response.data;
          console.log(payload);
          this.login.token = payload.login_token;
          if (this.login.token == "" || this.login.token == undefined) {
            return;
          }
          this.$cookies.set("login-token", this.login.token, { expires: 5 });
          this.toTodos();
        })
        .catch((e) => {
          alert(e);
        });
    },

    // TODOページへ遷移を行う
    toTodos: function () {
      this.$router.push("/todos");
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
