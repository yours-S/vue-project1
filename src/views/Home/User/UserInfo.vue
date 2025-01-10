<template>
  <!-- 用户信息展示和编辑容器 -->
  <div class="user-info">
    <!-- 使用vant的表单组件 -->
    <van-form>
      <!-- 表单字段组 -->
      <van-cell-group>
        <!-- 姓名输入框 -->
        <van-field
          v-model="userInfo.name"
          label="姓名"
          placeholder="请输入姓名"
          :readonly="!isEditing"
        />
        <!-- 性别输入框 -->
        <van-field
          v-model="userInfo.gender"
          label="性别"
          placeholder="请输入性别"
          :readonly="!isEditing"
        />
        <!-- 年龄输入框 -->
        <van-field
          v-model="userInfo.age"
          label="年龄"
          placeholder="请输入年龄"
          :readonly="!isEditing"
        />
        <!-- 电话号码输入框 -->
        <van-field
          v-model="userInfo.phone"
          label="电话号码"
          placeholder="请输入电话号码"
          :readonly="!isEditing"
        />
        <!-- 地址输入框 -->
        <van-field
          v-model="userInfo.address"
          label="地址"
          placeholder="请输入地址"
          :readonly="!isEditing"
        />
        <!-- 简介输入框 -->
        <van-field
          v-model="userInfo.introduction"
          label="简介"
          placeholder="请输入简介"
          :readonly="!isEditing"
        />
      </van-cell-group>
    </van-form>

    <!-- 操作按钮组 -->
    <div class="button-group">
      <!-- 编辑按钮（非编辑状态显示） -->
      <van-button v-if="!isEditing" type="primary" block @click="startEdit">
        修改信息
      </van-button>
      <!-- 保存按钮（编辑状态显示） -->
      <van-button v-else type="primary" block @click="saveInfo">
        保存
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="UserInfo">
import { ref, onMounted, watch, onUnmounted } from "vue";

/**
 * 从本地存储加载用户信息
 * @returns {Object} 用户信息对象
 */
const loadUserInfo = () => {
  const storedInfo = localStorage.getItem("userInfo");
  return storedInfo
    ? JSON.parse(storedInfo)
    : {
        name: "",
        gender: "",
        age: "",
        phone: "",
        address: "",
        introduction: "",
      };
};

/**
 * 保存用户信息到本地存储
 */
const saveUserInfo = () => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
};

// 是否处于编辑状态
const isEditing = ref(false);
// 用户信息响应式数据
const userInfo = ref(loadUserInfo());

// 监听用户信息变化，自动保存
watch(userInfo, saveUserInfo, { deep: true });

// 组件挂载时加载用户信息
onMounted(() => {
  userInfo.value = loadUserInfo();
});

/**
 * 开始编辑用户信息
 */
function startEdit() {
  isEditing.value = true;
}

/**
 * 保存用户信息
 */
function saveInfo() {
  alert("保存成功");
  isEditing.value = false;
}
</script>

<style scoped>
.user-info {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.van-field) {
  padding: 14px 16px;
}

:deep(.van-cell-group) {
  margin: 16px;
}

.button-group {
  padding: 16px;
}

:deep(.van-button) {
  height: 40px;
}
</style>
