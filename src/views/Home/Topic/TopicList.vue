<template>
  <div class="topic-list">
    <div class="header">
      <van-button
        type="primary"
        size="small"
        icon="plus"
        @click="showAddDialog = true"
      >
        增加课题
      </van-button>
    </div>

    <div class="topics-container">
      <van-cell-group
        inset
        v-for="topic in topics"
        key="topic.name"
        class="topic-item"
      >
        <div class="topic-content">
          <div class="topic-header">
            <div class="topic-info">
              <div class="topic-row">
                <span class="label">课题名称: </span>
                <span class="value">{{ topic.name }}</span>
              </div>
              <div class="topic-row">
                <span class="label">所属专业: </span>
                <span class="value">{{ topic.major }}</span>
              </div>
              <div class="topic-row">
                <span class="label">指导老师: </span>
                <span class="value">{{ topic.teacher }}</span>
              </div>
            </div>
            <div class="button-group">
              <van-button
                type="primary"
                size="small"
                @click="handleView(topic)"
              >
                查看
              </van-button>
              <van-button
                type="warning"
                size="small"
                @click="handleEdit(topic)"
              >
                修改
              </van-button>
              <van-button
                type="danger"
                size="small"
                @click="handleDelete(topic)"
              >
                删除
              </van-button>
            </div>
          </div>
        </div>
      </van-cell-group>
    </div>

    <!-- 添加课题弹窗 -->
    <van-dialog
      v-model:show="showAddDialog"
      title="添加课题"
      show-cancel-button
      @confirm="handleAddTopic"
      @cancel="resetForm"
    >
      <van-form @submit.prevent>
        <van-cell-group inset>
          <van-field
            v-model="newTopic.name"
            label="课题名称"
            placeholder="请输入课题名称"
            :rules="[{ required: true, message: '请输入课题名称' }]"
          />
          <van-field
            v-model="newTopic.major"
            label="所属专业"
            placeholder="请输入所属专业"
            :rules="[{ required: true, message: '请输入所属专业' }]"
          />
          <van-field
            v-model="newTopic.teacher"
            label="指导老师"
            placeholder="请输入指导老师"
            :rules="[{ required: true, message: '请输入指导老师' }]"
          />
        </van-cell-group>
      </van-form>
    </van-dialog>

    <!-- 查看 -->
    <van-dialog
      v-model:show="showViewDialog"
      title="课题详情"
      :show-confirm-button="false"
      class="view-dialog"
    >
      <van-icon
        name="cross"
        class="close-icon"
        @click="showViewDialog = false"
      />
      <div class="detail-content">
        <div class="detail-item">
          <van-icon name="bookmark-o" class="detail-icon" />
          <div class="detail-row">
            <span class="detail-label">课题名称：</span>
            <span class="detail-value">{{ currentTopic.name }}</span>
          </div>
        </div>
        <div class="detail-item">
          <van-icon name="cluster-o" class="detail-icon" />
          <div class="detail-row">
            <span class="detail-label">所属专业：</span>
            <span class="detail-value">{{ currentTopic.major }}</span>
          </div>
        </div>
        <div class="detail-item">
          <van-icon name="manager-o" class="detail-icon" />
          <div class="detail-row">
            <span class="detail-label">指导老师：</span>
            <span class="detail-value">{{ currentTopic.teacher }}</span>
          </div>
        </div>
      </div>
    </van-dialog>

    <!-- 修改 -->
    <van-dialog
      v-model:show="showEditDialog"
      title="修改课题"
      show-cancel-button
      @confirm="confirmEdit"
      class="edit-dialog"
    >
      <van-form>
        <van-cell-group inset>
          <van-field
            v-model="editingTopic.name"
            label="课题名称"
            placeholder="请输入课题名称"
            :rules="[{ required: true, message: '请填写课题名称' }]"
          />
          <van-field
            v-model="editingTopic.major"
            label="所属专业"
            placeholder="请输入所属专业"
            :rules="[{ required: true, message: '请填写所属专业' }]"
          />
          <van-field
            v-model="editingTopic.teacher"
            label="指导老师"
            placeholder="请输入指导老师"
            :rules="[{ required: true, message: '请填写指导老师' }]"
          />
        </van-cell-group>
      </van-form>
    </van-dialog>
  </div>
</template>

<script setup lang="ts" name="TopicList">
import { ref, onMounted, onUnmounted, watch } from "vue";

const showAddDialog = ref(false);
const newTopic = ref({
  name: "",
  major: "",
  teacher: "",
});

function handleAddTopic() {
  if (
    !newTopic.value.name ||
    !newTopic.value.major ||
    !newTopic.value.teacher
  ) {
    alert("请填写完整信息");
    return;
  }
  topics.value.push({
    name: newTopic.value.name,
    major: newTopic.value.major,
    teacher: newTopic.value.teacher,
  });
  newTopic.value = {
    name: "",
    major: "",
    teacher: "",
  };
}
function resetForm() {
  newTopic.value = {
    name: "",
    major: "",
    teacher: "",
  };
}

const loadTopics = () => {
  const storedTopics = localStorage.getItem("topics");
  return storedTopics
    ? JSON.parse(storedTopics)
    : [
        {
          name: "英语课题",
          major: "英语专业",
          teacher: "张三",
        },
        {
          name: "语文课题",
          major: "语文专业",
          teacher: "李四",
        },
        {
          name: "数学课题",
          major: "数学专业",
          teacher: "王五",
        },
      ];
};
const topics = ref(loadTopics());

const saveTopics = () => {
  localStorage.setItem("topics", JSON.stringify(topics.value));
};

watch(topics, saveTopics, { deep: true });

onMounted(() => {
  topics.value = loadTopics();
});

const showViewDialog = ref(false);
const currentTopic = ref({
  name: "",
  major: "",
  teacher: "",
});

const showEditDialog = ref(false);
const editingTopic = ref({
  name: "",
  major: "",
  teacher: "",
});
const editingIndex = ref(-1);

function handleView(topic: any) {
  currentTopic.value = { ...topic };
  showViewDialog.value = true;
}
function handleDelete(topic: any) {
  const index = topics.value.indexOf(topic);
  topics.value.splice(index, 1);
}

function handleEdit(topic: any) {
  editingTopic.value = { ...topic };
  editingIndex.value = topics.value.indexOf(topic);
  showEditDialog.value = true;
}

function confirmEdit() {
  if (editingIndex.value > -1) {
    topics.value[editingIndex.value] = { ...editingTopic.value };
  }
}
</script>

<style scoped>
.topic-list {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
}

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
}

.topics-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.topic-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.topic-content {
  padding: 16px;
}

.topic-row {
  display: flex;
  margin-bottom: 8px;
}

.topic-row:last-child {
  margin-bottom: 0;
}

.label {
  color: #646566;
  width: 80px;
  flex-shrink: 0;
  font-size: 15px;
}

.value {
  color: #323233;
  flex: 1;
  font-size: 15px;
}

:deep(.van-cell-group__inset) {
  margin: 0;
}

.topic-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.topic-info {
  flex: 1;
}

:deep(.van-button--danger) {
  height: 32px;
  padding: 0 16px;
}

:deep(.custom-toast) {
  min-width: 120px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
}

.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

:deep(.van-pagination) {
  height: 40px;
}

:deep(.van-pagination__item) {
  min-width: 36px;
  height: 36px;
  line-height: 36px;
}

:deep(.van-pagination__item--active) {
  background-color: #1989fa;
  color: white;
}

.button-group {
  display: flex;
  gap: 8px;
}

.detail-content {
  padding: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.detail-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-icon {
  font-size: 24px;
  color: #1989fa;
  margin-right: 12px;
}

.detail-row {
  flex: 1;
}

.detail-label {
  color: #666;
  font-size: 14px;
  margin-right: 8px;
}

.detail-value {
  color: #333;
  font-size: 15px;
  font-weight: 500;
}

:deep(.view-dialog .van-dialog) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.view-dialog .van-dialog__header) {
  padding: 20px 24px;
  font-size: 18px;
  font-weight: 600;
  color: #1989fa;
  border-bottom: 1px solid #ebedf0;
}
.close-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  padding: 4px;
  transition: all 0.3s ease;
}

.close-icon:hover {
  color: #1989fa;
  transform: rotate(90deg);
}
</style>
