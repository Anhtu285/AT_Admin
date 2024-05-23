<script setup lang="ts">
// import { ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
const collapsed = defineModel()
</script>
<template>
  <a-layout-header class="!bg-white flex gap-6 items-center justify-between !px-10">
    <div class="flex items-center gap-6 mb-0">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger text-xl"
        @click="() => (collapsed = !collapsed)"
      />
      <menu-fold-outlined v-else class="trigger text-xl" @click="() => (collapsed = !collapsed)" />

      <ul class="flex items-center gap-6 mb-0">
        <li>
          <router-link to="home" class="">Home</router-link>
        </li>
        <li><router-link to="aboutus" class="boder-2">About Us</router-link></li>
      </ul>
    </div>
    <div class="">
      <ul class="flex items-center gap-6 mb-0">
        <li class="nav-item dropdown">
          <a class="flex gap-2" data-toggle="dropdown" href="#">
            <i class="ri-question-answer-fill"></i>
            <span class="badge badge-danger navbar-badge">Chat</span>
          </a>
          <!-- <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <a href="#" class="dropdown-item">
              <div class="media">
                <img
                  src="../../dist/img/user1-128x128.jpg"
                  alt="User Avatar"
                  class="img-size-50 mr-3 img-circle"
                />
                <div class="media-body">
                  <h3 class="dropdown-item-title">
                    Brad Diesel
                    <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                  </h3>
                  <p class="text-sm">Call me whenever you can...</p>
                  <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                </div>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <div class="media">
                <img
                  src="../../dist/img/user8-128x128.jpg"
                  alt="User Avatar"
                  class="img-size-50 img-circle mr-3"
                />
                <div class="media-body">
                  <h3 class="dropdown-item-title">
                    John Pierce
                    <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                  </h3>
                  <p class="text-sm">I got your message bro</p>
                  <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                </div>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <div class="media">
                <img
                  src="../../dist/img/user3-128x128.jpg"
                  alt="User Avatar"
                  class="img-size-50 img-circle mr-3"
                />
                <div class="media-body">
                  <h3 class="dropdown-item-title">
                    Nora Silvester
                    <span class="float-right text-sm text-warning"
                      ><i class="fas fa-star"></i
                    ></span>
                  </h3>
                  <p class="text-sm">The subject goes here</p>
                  <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                </div>
              </div>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
          </div> -->
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#" aria-expanded="false">
            <i class="ri-bell-fill"></i>
            <span class="badge badge-warning navbar-badge">15</span>
          </a>
          <!-- <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-right"
            style="left: inherit; right: 0px"
          >
            <span class="dropdown-item dropdown-header">15 Notifications</span>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <i class="fas fa-envelope mr-2"></i> 4 new messages
              <span class="float-right text-muted text-sm">3 mins</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <i class="fas fa-users mr-2"></i> 8 friend requests
              <span class="float-right text-muted text-sm">12 hours</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <i class="fas fa-file mr-2"></i> 3 new reports
              <span class="float-right text-muted text-sm">2 days</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
          </div>-->
        </li> 
        <li>
          <router-link to="login" class="flex gap-2"><i class="ri-user-add-line"></i>Login</router-link>
        </li>
      </ul>
    </div>
  </a-layout-header>
</template>
