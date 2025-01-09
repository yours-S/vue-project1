<template>
  <div class="register-page">
    <div class="register-container">
      <h2 class="register-title">用户注册</h2>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[
              { required: true, message: '请填写用户名' },
              {
                pattern: /^[a-zA-Z0-9]{4,12}$/,
                message: '用户名必须是4-12位字母或数字',
              },
            ]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[
              { required: true, message: '请填写密码' },
              {
                validator: (val: any) => val.length >= 6,
                message: '密码不能少于6位',
              },
            ]"
          />
          <van-field
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            label="确认密码"
            placeholder="请再次输入密码"
            :rules="[{ required: true, message: '请确认密码' }]"
          />
        </van-cell-group>
        <div class="button-group">
          <van-button round block type="primary" native-type="submit">
            注册
          </van-button>
          <van-button
            round
            block
            type="default"
            @click="goToLogin"
            class="login-btn"
          >
            返回登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="Register">
import { ref } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();
let username = ref("");
let password = ref("");
let confirmPassword = ref("");

function onSubmit() {}
function goToLogin() {
  router.push("/login");
}
</script>

<style scoped>
.register-page {
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

.register-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin: 0 20px;
}

.register-title {
  text-align: center;
  color: #323233;
  margin-bottom: 24px;
  font-size: 24px;
}

.button-group {
  margin: 16px;
}

.login-btn {
  margin-top: 12px;
}
</style>
