<template>
  <div class="user-info">
    <van-form>
      <van-cell-group>
        <van-field
          v-model="userInfo.name"
          label="姓名"
          placeholder="请输入姓名"
          :readonly="!isEditing"
        />
        <van-field
          v-model="userInfo.gender"
          label="性别"
          placeholder="请输入性别"
          :readonly="!isEditing"
        />
        <van-field
          v-model="userInfo.age"
          label="年龄"
          placeholder="请输入年龄"
          :readonly="!isEditing"
        />
        <van-field
          v-model="userInfo.phone"
          label="电话号码"
          placeholder="请输入电话号码"
          :readonly="!isEditing"
        />
        <van-field
          v-model="userInfo.address"
          label="地址"
          placeholder="请输入地址"
          :readonly="!isEditing"
        />
        <van-field
          v-model="userInfo.introduction"
          label="简介"
          placeholder="请输入简介"
          :readonly="!isEditing"
        />
      </van-cell-group>
    </van-form>

    <div class="button-group">
      <van-button v-if="!isEditing" type="primary" block @click="startEdit">
        修改信息
      </van-button>
      <van-button v-else type="primary" block @click="saveInfo">
        保存
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="UserInfo">
import { ref, onMounted, watch, onUnmounted } from "vue";

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

const saveUserInfo = () => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
};

const isEditing = ref(false);
let userInfo = ref(loadUserInfo());

const stopWatch = watch(userInfo, saveUserInfo, { deep: true });

onMounted(() => {
  userInfo.value = loadUserInfo();
});

onUnmounted(() => {
  stopWatch();
});

function startEdit() {
  isEditing.value = true;
}

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
