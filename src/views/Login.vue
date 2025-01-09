<template>
  <div class="login-page">
    <div class="login-container">
      <h2 class="login-title">欢迎登录</h2>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div class="button-group">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
          <!-- <van-button
            round
            block
            type="default"
            @click="goToRegister"
            class="register-btn"
          >
            注册账号
          </van-button> -->
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

function onSubmit(values: any) {
  if (values.username === "admin" && values.password === "123456") {
    router.push("/index");
  } else {
    alert("用户名或密码错误");
  }
}
// function goToRegister() {
//   router.push("/register");
// }
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  width: 100%;
  background-image: url(/public/gpg2r2n7.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin: 0 20px;
}

.login-title {
  text-align: center;
  color: #323233;
  margin-bottom: 24px;
  font-size: 24px;
}

.button-group {
  margin: 16px;
}

/* .register-btn {
  margin-top: 12px;
} */
</style>
