<template>
  <!-- 注册页面容器 -->
  <div class="register-page">
    <!-- 注册表单容器 -->
    <div class="register-container">
      <!-- 注册标题 -->
      <h2 class="register-title">用户注册</h2>
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
            :rules="[
              { required: true, message: '请填写用户名' },
              {
                pattern: /^[a-zA-Z0-9]{4,12}$/,
                message: '用户名必须是4-12位字母或数字',
              },
            ]"
          />
          <!-- 密码输入框 -->
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
          <!-- 确认密码输入框 -->
          <van-field
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            label="确认密码"
            placeholder="请再次输入密码"
            :rules="[{ required: true, message: '请确认密码' }]"
          />
        </van-cell-group>
        <!-- 按钮组 -->
        <div class="button-group">
          <!-- 注册按钮 -->
          <van-button round block type="primary" native-type="submit">
            注册
          </van-button>
          <!-- 返回登录按钮 -->
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
// 引入Vue相关依赖
import { ref } from "vue";
import { useRouter } from "vue-router";

// 获取路由实例
const router = useRouter();
// 定义响应式数据：用户名、密码和确认密码
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

// 表单提交处理函数
function onSubmit() {
  // 验证两次输入的密码是否一致
  if (password.value !== confirmPassword.value) {
    alert("两次输入的密码不一致，请重新输入");
    return;
  }

  // 获取已存储的用户列表
  const userList = JSON.parse(localStorage.getItem("userList") || "[]");

  // 检查用户名是否已存在
  const isUserExist = userList.some(
    (user: any) => user.username === username.value
  );
  if (isUserExist) {
    alert("该用户名已被注册，请使用其他用户名");
    return;
  }

  // 添加新用户
  userList.push({
    username: username.value,
    password: password.value,
  });

  // 更新localStorage中的用户列表
  localStorage.setItem("userList", JSON.stringify(userList));

  // 注册成功后跳转到登录页面，并携带注册信息
  router.push({
    path: "/login",
    query: {
      username: username.value,
      password: password.value,
    },
  });
}

// 跳转到登录页面
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
