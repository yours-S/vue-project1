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
      <div class="history-title-container">
        <div class="history-title">搜索记录</div>
        <div class="history-clear" @click="historyClear">
          <van-icon name="delete" />
        </div>
      </div>
      <div class="history-list">
        <div
          class="history-item"
          v-for="(item, index) in visibleHistoryItems"
          :key="index"
          @click="handleHistoryClick(item)"
          :ref="(el) => setHistoryItemRef(el, index)"
        >
          {{ item }}
          <van-icon
            class="delete-icon"
            name="close"
            @click.stop="removeHistory(index)"
          />
        </div>
        <div class="isExpand" v-if="shouldShowExpandButton">
          <van-icon
            :name="showAllHistory ? 'arrow-up' : 'arrow-down'"
            @click="toggleShowAllHistory"
          />
        </div>
      </div>
    </div>
    <div v-else>
      当前没有搜索记录
      <!-- 调试信息 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, computed } from "vue";

const searchValue = ref("");
const searchHistory = ref<string[]>([]);
const showAllHistory = ref(false);
const historyItemRefs = ref<HTMLElement[]>([]);
const maxHistoryHeight = ref<number | null>(null);
let firstDiffOffsetTop: number | null = null;
let firstOffsetTop: number | null = null;

// 从本地存储中读取搜索历史记录
const loadSearchHistoryFromLocalStorage = () => {
  const storedHistory = localStorage.getItem("searchHistory");
  if (storedHistory) {
    searchHistory.value = JSON.parse(storedHistory);
  }
};

// 将搜索历史记录存储到本地存储
const saveSearchHistoryToLocalStorage = () => {
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory.value));
};

// 处理搜索操作
const handleSearch = () => {
  if (searchValue.value) {
    searchHistory.value.unshift(searchValue.value);
    searchHistory.value = [...new Set(searchHistory.value)];
    searchValue.value = "";
    nextTick(() => {
      updateMaxHistoryHeight();
      saveSearchHistoryToLocalStorage();
    });
  }
};

// 清除搜索历史记录
const historyClear = () => {
  searchHistory.value = [];
  historyItemRefs.value = [];
  maxHistoryHeight.value = null;
  firstDiffOffsetTop = null;
  firstOffsetTop = null;
  localStorage.removeItem("searchHistory");
};

// 处理历史记录项点击事件
const handleHistoryClick = (item: string) => {
  searchValue.value = item;
};

// 移除历史记录项
const removeHistory = (index: number) => {
  searchHistory.value.splice(index, 1);
  historyItemRefs.value.splice(index, 1);
  nextTick(() => {
    updateMaxHistoryHeight();
    saveSearchHistoryToLocalStorage();
  });
};

// 设置历史记录项的元素引用
const setHistoryItemRef = (el: HTMLElement | any, index: number) => {
  if (el) {
    historyItemRefs.value[index] = el;
  }
};

// 计算是否需要显示展开/收起按钮
const shouldShowExpandButton = computed(() => {
  if (!maxHistoryHeight.value) return false;
  if (!showAllHistory.value) {
    for (let i = 0; i < historyItemRefs.value.length; i++) {
      const el = historyItemRefs.value[i];
      if (el && el.offsetTop > maxHistoryHeight.value) {
        return true;
      }
    }
  } else {
    for (let i = 0; i < historyItemRefs.value.length; i++) {
      const el = historyItemRefs.value[i];
      if (el && el.offsetTop > maxHistoryHeight.value) {
        return true;
      }
    }
  }
  return false;
});

// 切换显示全部历史记录
const toggleShowAllHistory = () => {
  showAllHistory.value = !showAllHistory.value;
};

// 计算可见的历史记录项
const visibleHistoryItems = computed(() => {
  if (!maxHistoryHeight.value) return searchHistory.value;
  if (showAllHistory.value) {
    return searchHistory.value;
  }

  const visibleItems: string[] = [];
  for (let i = 0; i < searchHistory.value.length; i++) {
    const el = historyItemRefs.value[i];
    if (el) {
      if (el.offsetTop <= maxHistoryHeight.value) {
        visibleItems.push(searchHistory.value[i]);
      } else if (
        shouldShowExpandButton.value &&
        i === searchHistory.value.length - 1
      ) {
        // 当需要显示展开按钮且是最后一项时，隐藏前一项
        if (visibleItems.length > 0) {
          visibleItems.pop();
        }
        break;
      }
    } else {
      visibleItems.push(searchHistory.value[i]);
    }
  }
  return visibleItems;
});

// 更新 maxHistoryHeight
const updateMaxHistoryHeight = () => {
  let diffCount = 0;
  for (let i = 0; i < historyItemRefs.value.length; i++) {
    const el = historyItemRefs.value[i];
    if (el) {
      if (!firstOffsetTop) {
        firstOffsetTop = el.offsetTop;
      }
      if (el.offsetTop !== firstOffsetTop) {
        if (!firstDiffOffsetTop) {
          firstDiffOffsetTop = el.offsetTop;
        } else {
          maxHistoryHeight.value = el.offsetTop;
          return;
        }
        diffCount++;
      }
    }
  }
  if (diffCount === 1 && firstDiffOffsetTop) {
    maxHistoryHeight.value = firstDiffOffsetTop;
  }
};

// 在组件挂载后计算高度
onMounted(async () => {
  await nextTick();
  loadSearchHistoryFromLocalStorage();
  nextTick(() => {
    updateMaxHistoryHeight();
  });
});

watch(
  searchHistory,
  async () => {
    await nextTick();
    updateMaxHistoryHeight();
  },
  { deep: true }
);
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

.history-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  position: sticky;
  top: 60px;
  background: #f5f5f5;
  z-index: 1;
  padding: 10px 0;
}

.history-title {
  display: inline-block;
}

.history-clear {
  display: inline-block;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  text-align: right;
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
