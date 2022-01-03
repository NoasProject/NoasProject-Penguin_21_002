<template>
  <div>
    <b-table
      :fields="fields"
      :items="todos">

      <!-- タイトル -->
      <template v-slot:cell(title)="data">
        <div @click="edit_id.title = data.item.id">
          <p v-if="edit_id.title == data.item.id">
            {{ data.item.title }}
          </p>
          <p v-else>
            {{ data.item.title }}
          </p>
        </div>
      </template>

      <!-- 説明文 -->
      <template v-slot:cell(description)="data">
        <div @click="onClickDescription(data.item.id)">
          <p v-if="edit_id.description == data.item.id">
            <input type="text" v-model="task.description" />
          </p>
          <p v-else>
            {{ data.item.description }}
          </p>
        </div>
      </template>

      <!-- 状態 -->
      <template v-slot:cell(state)="data">
        <p>
          {{ state.names[data.item.state] }}
        </p>
      </template>

      <!-- 操作 -->
      <template v-slot:cell(operation)="data">
        <div v-if="data.item.state < state.complete">
          <b-button size="sm" @click="updateTodo(data.item.id, data.item.state + 1)" class="mr-1" variant="success">
            {{ state.names[data.item.state + 1] }}
          </b-button>
        </div>
        <div v-else>
          <b-button size="sm" disabled @click="updateTodo(data.item.id, data.item.state + 1)" class="mr-1" variant="success">
            ---
          </b-button>
        </div>
      </template>

      <!-- 削除 -->
      <template v-slot:cell(destroy)="data">
        <b-button size="sm" @click="destroyTodo(data.item.id)" class="mr-1" variant="danger">
          削除
        </b-button>
      </template>

    </b-table>
  </div>
</template>

<script>
export default {
  created() {},
  props: {
    loginToken: String,
    state: Object,
    propTweet: Any,
  },
  mounted() {
    this.tweet = this.propTweet;
  },
  data() {
    return {
      input: {
        comment: "",
      },
      tweet: this.propTweet,
    };
  },
  methods: {
    // お気に入り登録
    onReply: function (id) {},
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
