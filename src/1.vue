<template>
  <div>
    <h1>省市区天气查询</h1>
    <select v-model="selectedProvince" @change="updateCityList">
      <option
        v-for="province in provinces"
        :key="province.province"
        :value="province.province"
      >
        {{ province.province }}
      </option>
    </select>
    <select v-model="selectedCity">
      <option v-for="city in cities" :key="city.city" :value="city.city">
        {{ city.city }}
      </option>
    </select>
    <button @click="queryWeather">查询天气</button>
    <div v-html="weatherResult"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
// 使用仅类型导入 AxiosResponse
// import type { AxiosResponse } from "axios";

// 定义省份和城市数据的类型
interface City {
  city: string;
}

interface Province {
  province: string;
  citys: City[];
}

// 定义响应式变量
const provinces = ref<Province[]>([]);
const cities = ref<City[]>([]);
const selectedProvince = ref<string>("");
const selectedCity = ref<string>("");
const weatherResult = ref<string>("");

// 获取城市列表
const getCityList = async () => {
  try {
    const result = await axios({
      url: "http://iwenwiki.com/wapicovid19/citys.php?key=171e165a7d991c5f6ecd5194c54778ef",
    });
    provinces.value = result.data.result;
  } catch (error) {
    console.error("获取城市列表失败", error);
  }
};

// 更新城市列表
const updateCityList = () => {
  const selectedProvinceData = provinces.value.find(
    (p) => p.province === selectedProvince.value
  );
  cities.value = selectedProvinceData ? selectedProvinceData.citys : [];
  selectedCity.value = "";
};

// 查询天气
const queryWeather = async () => {
  const location = selectedCity.value || selectedProvince.value;
  const key = "430fe3a256ac626d8703b3fc55b8cc8b";
  try {
    const result = await axios({
      url: "https://restapi.amap.com/v3/weather/weatherInfo",
      params: {
        key: key,
        city: location,
        output: "JSON",
        extensions: "base",
      },
    });
    if (result.data.status === "1") {
      const weatherData = result.data.lives[0];
      weatherResult.value = `
        <p>地区: ${weatherData.province} ${weatherData.city}</p>
        <p>天气状况: ${weatherData.weather}</p>
        <p>温度: ${weatherData.temperature} °C</p>
        <p>风向: ${weatherData.winddirection}</p>
        <p>风力: ${weatherData.windpower} 级</p>
        <p>湿度: ${weatherData.humidity} %</p>
        <p>发布时间: ${weatherData.reporttime}</p>
      `;
    } else {
      weatherResult.value = "<p>查询失败，请检查输入或稍后重试。</p>";
    }
  } catch (error) {
    console.error("查询天气失败", error);
    weatherResult.value = "<p>查询天气时发生错误，请稍后重试。</p>";
  }
};

// 组件挂载时获取城市列表
onMounted(() => {
  getCityList();
});
</script>

<style>
/* 整体容器样式 */
div {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
}

h1 {
  color: #1a73e8;
  text-align: center;
  margin-bottom: 20px;
}

/* 选择框和按钮容器 */
select,
button {
  padding: 8px 16px;
  margin: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
}

select {
  min-width: 200px;
}

button {
  background-color: #1a73e8;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1557b0;
}

/* 天气结果样式 */
#weatherResult {
  margin-top: 20px;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
}

#weatherResult p {
  margin: 8px 0;
  color: #333;
}

/* 响应式布局 */
@media (max-width: 600px) {
  select,
  button {
    display: block;
    width: 100%;
    margin: 8px 0;
  }
}
</style>
