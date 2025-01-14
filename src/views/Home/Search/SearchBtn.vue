<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索内容"
      show-action
      @search="handleSearch"
    >
      <template #action>
        <van-button type="primary" size="small" @click="handleSearch"
          >搜索</van-button
        >
      </template>
    </van-search>

    <!-- 搜索记录 -->
    <div class="search-history" v-if="searchHistory.length > 0">
      <hr />
      <div class="history-title">搜索记录</div>
      <div class="history-clear" @click="historyClear">
        <van-icon name="delete" />
      </div>
      <div class="history-list">
        <div
          class="history-item"
          v-for="(item, index) in searchHistory.slice(
            0,
            showAllHistory ? searchHistory.length : 10
          )"
          :key="index"
          @click="handleHistoryClick(item)"
        >
          {{ item }}
          <van-icon
            class="delete-icon"
            name="close"
            @click.stop="removeHistory(index)"
          />
        </div>
        <div class="isExpand" v-if="searchHistory.length > 10">
          <van-icon
            :name="showAllHistory ? 'arrow-up' : 'arrow-down'"
            @click="toggleShowAllHistory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Search">
import { ref } from "vue";

// 搜索值
const searchValue = ref("");
// 搜索记录
const searchHistory = ref<string[]>([]);
// 是否显示全部历史记录
const showAllHistory = ref(false);

// 处理搜索
function handleSearch() {
  if (searchValue.value.trim()) {
    // 添加到搜索记录
    searchHistory.value.unshift(searchValue.value);
    // 去重记录
    searchHistory.value = [...new Set(searchHistory.value)];
    // 清空输入框
    searchValue.value = "";
  }
}

// 清空历史记录
function historyClear() {
  searchHistory.value = [];
}

// 点击历史记录
function handleHistoryClick(value: string) {
  searchValue.value = value;
  handleSearch();
}

// 删除历史记录
function removeHistory(index: number) {
  searchHistory.value.splice(index, 1);
}

// 切换显示全部历史记录
function toggleShowAllHistory() {
  showAllHistory.value = !showAllHistory.value;
}
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 50vw;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: auto;
}

.van-search {
  width: 100%;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  background: #f5f5f5;
  z-index: 1;
}

.search-history {
  width: 100%;
  margin-top: 20px;
}

.history-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  position: sticky;
  top: 60px;
  background: #f5f5f5;
  z-index: 1;
  padding: 10px 0;
  display: inline-block;
  width: calc(100% - 40px);
}

.history-clear {
  display: inline-block;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  margin-bottom: 10px;
  text-align: right;
  width: 40px;
}

.history-clear:hover {
  color: #1989fa;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.history-item {
  display: inline-block;
  padding: 4px 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
}

.delete-icon {
  position: absolute;
  top: -8px;
  right: -8px;
  font-size: 12px;
  color: #999;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  padding: 2px;
}

.delete-icon:hover {
  color: #ff4444;
}

.isExpand {
  display: inline-block;
  padding: 4px 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
}
</style>
