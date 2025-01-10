<template>
  <!-- 首页页面容器 -->
  <div class="index-page">
    <!-- 顶部导航栏 -->
    <div class="nav-bar">
      <!-- 系统标题 -->
      <div class="system-title">我的系统</div>
      <!-- 退出登录按钮 -->
      <van-button
        plain
        type="primary"
        size="small"
        @click="logout"
        class="logout-btn"
      >
        退出登录
      </van-button>
    </div>

    <!-- 主内容区域 -->
    <div class="main-container">
      <!-- 左侧导航菜单 -->
      <div class="side-nav">
        <!-- 导航标题 -->
        <div class="nav-header">功能导航</div>
        <!-- 遍历菜单项 -->
        <div
          v-for="(item, index) in menuItems"
          :key="index"
          class="menu-item"
          @click="toggleSubmenu(index)"
        >
          <!-- 菜单标题 -->
          <div class="menu-title">
            <!-- 菜单图标 -->
            <van-icon :name="item.icon" />
            <!-- 菜单文字 -->
            <span>{{ item.title }}</span>
          </div>
          <!-- 子菜单 -->
          <div class="submenu" v-show="activeIndex === index">
            <!-- 遍历子菜单项 -->
            <div
              v-for="(subItem, subIndex) in item.children"
              :key="subIndex"
              class="submenu-item"
              :class="{
                'submenu-item-active': activeSubItem === subItem.title,
              }"
              @click.stop="handleSubmenuClick(subItem)"
            >
              {{ subItem.title }}
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧内容区域 -->
      <div class="content-wrapper">
        <!-- 内容标题 -->
        <div class="content-header">
          {{ activeSubItem }}
        </div>
        <!-- 内容展示区 -->
        <div class="content-area">
          <!-- 空状态提示 -->
          <van-empty v-if="!activeSubItem" description="暂无内容" />
          <!-- 路由视图 -->
          <router-view v-else></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Index">
// 引入Vue相关依赖
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

// 获取路由实例
const router = useRouter();

// 退出登录功能
function logout() {
  router.push("/login");
}

// 菜单项数据
const menuItems = reactive([
  {
    title: "消息管理",
    icon: "chat-o",
    children: [{ title: "个人消息" }],
  },
  {
    title: "选题管理",
    icon: "notes-o",
    children: [{ title: "课题" }],
  },
  {
    title: "个人中心",
    icon: "user-o",
    children: [{ title: "个人信息" }],
  },
]);

// 当前激活的菜单索引
const activeIndex = ref(-1);

// 切换子菜单显示状态
function toggleSubmenu(index: number) {
  activeIndex.value = activeIndex.value === index ? -1 : index;
  activeSubItem.value = "";
}

// 当前激活的子菜单项
const activeSubItem = ref("");

// 处理子菜单点击事件
function handleSubmenuClick(subItem: any) {
  activeSubItem.value = subItem.title;
  // 根据子菜单项进行路由跳转
  if (subItem.title === "个人消息") {
    router.push("/index/personalmessage");
  } else if (subItem.title === "个人信息") {
    router.push("/index/userinfo");
  } else if (subItem.title === "课题") {
    router.push("/index/topiclist");
  } else {
    // 其他子菜单项不进行路由跳转
    router.push("/index");
  }
}
</script>

<style scoped>
.index-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f7f8fa;
  display: flex;
  flex-direction: column;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: #1989fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.system-title {
  font-size: 20px;
  font-weight: bold;
}

.main-container {
  flex: 1;
  display: flex;
  min-height: 0;
  width: 100%;
  background-color: #f7f8fa;
  padding-top: 56px;
}

.side-nav {
  width: 20%;
  background-color: white;
  border-right: 1px solid #ebedf0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.nav-header {
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #323233;
  border-bottom: 1px solid #ebedf0;
  background-color: #f7f8fa;
}

.menu-item {
  cursor: pointer;
}

.menu-title {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-title:hover {
  background-color: #f5f5f5;
}

.submenu-item {
  padding: 10px 16px 10px 40px;
  color: #666;
  font-size: 14px;
  margin-left: 5px;
}

.submenu-item:hover {
  background-color: #f5f5f5;
  color: #1989fa;
}

.submenu-item-active {
  color: #1989fa;
  background-color: #f5f5f5;
  font-weight: 500;
}

.content-wrapper {
  width: 80%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-header {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 16px;
  font-weight: bold;
  color: #323233;
  background-color: white;
  border-bottom: 1px solid #ebedf0;
}

.content-area {
  padding: 20px;
  overflow-y: auto;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 20px 0 20px;
  background-color: white;
}
</style>
