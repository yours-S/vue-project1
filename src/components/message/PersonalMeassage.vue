<template>
  <div class="message-list">
    <div class="message-containter">
      <van-cell-group
        inset
        v-for="(message, index) in messages"
        :key="index"
        class="message-item"
      >
        <div class="message-content">
          <div class="message-header">
            <div class="message-info">
              <div class="message-title">{{ message.title }}</div>
              <div class="message-time">{{ message.time }}</div>
            </div>
            <van-tag :type="message.read ? 'success' : 'warning'">
              {{ message.read ? "已读" : "未读" }}
            </van-tag>
          </div>
          <div class="message-body">{{ message.content }}</div>
          <div class="message-footer">
            <van-button
              v-if="!message.read"
              size="small"
              type="primary"
              @click="markAsRead(index)"
            >
              标记已读
            </van-button>
            <van-button
              size="small"
              type="danger"
              @click="deleteMessage(index)"
            >
              删除
            </van-button>
          </div>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts" name="PersonalMeassage">
import { ref, onMounted, onUnmounted, watch } from "vue";

// 从本地存储获取消息数据
const loadMessages = () => {
  const storedMessages = localStorage.getItem("personalMessages");
  return storedMessages
    ? JSON.parse(storedMessages)
    : [
        {
          title: "选题通知",
          content:
            "您的课题《数学建模在工程中的应用》已被导师批准。请及时与导师联系，讨论后续工作安排。",
          time: "2024-03-20 14:30",
          read: false,
        },
        {
          title: "系统通知",
          content:
            "请在本周五之前完善您的个人信息，包括联系方式和个人简介等内容。这些信息对于选题开展很重要。",
          time: "2024-03-19 10:15",
          read: false,
        },
        {
          title: "开题报告提醒",
          content:
            "您的开题报告需要在下周三之前提交，请注意按照模板要求认真撰写，并与导师进行充分沟通。",
          time: "2024-03-18 16:45",
          read: false,
        },
        {
          title: "答辩安排通知",
          content:
            "您的毕业答辩安排在4月15日上午10点，地点：主教学楼302。请提前准备答辩材料，并做好PPT演示。",
          time: "2024-03-17 09:20",
          read: false,
        },
        {
          title: "学术讲座通知",
          content:
            '本周五下午2点将在图书馆报告厅举办"人工智能与未来发展"主题讲座，欢迎参加。',
          time: "2024-03-16 11:00",
          read: false,
        },
      ];
};

let messages = ref(loadMessages());

// 保存消息到本地存储
const saveMessages = () => {
  localStorage.setItem("personalMessages", JSON.stringify(messages.value));
};

// 监听messages变化并保存
const stopWatch = watch(messages, saveMessages, { deep: true });

// 组件挂载时加载数据
onMounted(() => {
  messages.value = loadMessages();
});

// 组件卸载时停止监听
onUnmounted(() => {
  stopWatch();
});

function markAsRead(index: number) {
  messages.value[index].read = true;
}

function deleteMessage(index: number) {
  messages.value.splice(index, 1);
}
</script>

<style scoped>
.message-list {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
}

.messages-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.message-content {
  padding: 16px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.message-title {
  font-size: 16px;
  font-weight: bold;
  color: #323233;
  margin-bottom: 4px;
}

.message-time {
  font-size: 12px;
  color: #969799;
}

.message-body {
  font-size: 14px;
  color: #646566;
  margin: 8px 0;
  line-height: 1.5;
}

.message-footer {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

:deep(.van-tag) {
  padding: 0 8px;
}

:deep(.van-button) {
  height: 32px;
  padding: 0 16px;
}
</style>
