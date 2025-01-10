<template>
  <!-- 登录页面容器 -->
  <div class="login-page">
    <!-- 登录表单容器 -->
    <div class="login-container">
      <!-- 登录标题 -->
      <h2 class="login-title">欢迎登录</h2>
      <!-- 使用vant表单组件 -->
      <van-form @submit="onSubmit">
        <!-- 表单字段组 -->
        <van-cell-group inset>
          <!-- 用户名输入框 -->
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <!-- 密码输入框 -->
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <!-- 按钮组 -->
        <div class="button-group">
          <!-- 登录按钮 -->
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
          <!-- 注册按钮 -->
          <van-button
            round
            block
            type="default"
            @click="goToRegister"
            class="register-btn"
          >
            注册账号
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="Login">
// 引入Vue相关依赖
import { ref } from "vue";
import { useRouter } from "vue-router";

// 获取路由实例
const router = useRouter();
// 定义响应式数据：用户名和密码
const username = ref("");
const password = ref("");

// 表单提交处理函数
function onSubmit(values: any) {
  // 从localStorage获取用户列表
  const userList = JSON.parse(localStorage.getItem("userList") || "[]");

  // 查找匹配的用户
  const matchedUser = userList.find(
    (user: any) =>
      user.username === values.username && user.password === values.password
  );

  // 检查是否匹配到用户或管理员账号
  if (
    matchedUser ||
    (values.username === "admin" && values.password === "123456")
  ) {
    // 登录成功，跳转到首页
    router.push("/index");
  } else {
    // 登录失败，显示错误提示
    alert("用户名或密码错误");
  }
}

// 跳转到注册页面
function goToRegister() {
  router.push("/register");
}
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

.register-btn {
  margin-top: 12px;
}
</style>
