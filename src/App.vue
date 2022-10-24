<template>
  <a-layout class="layout" >
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible v-if="$store.state.user">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link to="/">
            <user-outlined />
            <span>Home</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/uploads">
            <video-camera-outlined />
            <span>Uploads</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <RouterLink to="/map">
            <AimOutlined />
            <span>Map</span>
          </RouterLink>
        </a-menu-item>
        <a-menu-item key="4" @click="$store.dispatch('logout')">
          <LogoutOutlined />
          <span>Logout</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  AimOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  
} from '@ant-design/icons-vue';
import { ref } from 'vue';

const selectedKeys = ref(['1'])
const collapsed = ref(false)
</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.layout {
  min-height: 100vh;
}
</style>