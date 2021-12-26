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
    onLogin: function () {},
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
