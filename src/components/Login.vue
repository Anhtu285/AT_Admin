<template>
    <section
      class="bg-gray-200 w-full h-screen font-sans flex items-center justify-center"
    >
      <div
        class="w-full max-w-[500px] bg-white rounded-[10px] p-6 xl:p-8 mx-4 flex flex-col items-center gap-2"
      >
        <img :src="img" alt="" class="w-[100px] object-cover" />
  
        <h1 class="font-bold text-2xl">Đăng Nhập</h1>
  
        <form action="" method="post" class="sm:w-3/5 w-full">
          <div class="flex justify-between items-center mb-4 border-1">
            <select
              class="border border-solid border-[rgb(179,185,194)] w-full px-3 py-[0.32rem] rounded-[4px]"
            >
              <option value="">Sinh viên</option>
              <option value="">Giảng viên</option>
              <option value="">Quản trị viên</option>
            </select>
          </div>
          <div
            class="relative mb-3"
            data-twe-input-wrapper-init
            data-twe-class-notch-leading-normal="border-secondary-500 dark:border-neutral-400 group-data-[twe-input-focused]:border-primary"
            data-twe-class-notch-middle-normal="border-secondary-500 dark:border-neutral-400 group-data-[twe-input-focused]:border-primary"
            data-twe-class-notch-trailing-normal="border-secondary-500 dark:border-neutral-400 group-data-[twe-input-focused]:border-primary"
          >
            <input
              type="text"
              class="peer block min-h-[auto] overflow-hidden w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput1"
              placeholder="Username"
            />
            <label
              for="exampleFormControlInput1"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
              ><i class="ri-user-line"></i> Username
            </label>
          </div>
  
          <div
            class="relative mb-3"
            data-twe-input-wrapper-init
            data-twe-class-notch-leading-normal="border-secondary-500 dark:border-neutral-400 group-data-[twe-input-focused]:border-primary"
            data-twe-class-notch-middle-normal="border-secondary-500 dark:border-neutral-400 group-data-[twe-input-focused]:border-primary"
            data-twe-class-notch-trailing-normal="border-secondary-500 dark:border-neutral-400 group-data-[twe-input-focused]:border-primary"
          >
            <input
              :type="passwordType ? 'password' : 'text'"
              class="peer block min-h-[auto] overflow-hidden w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput1"
              placeholder="Password"
            />
            <label
              for="exampleFormControlInput1"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
              ><i class="ri-key-fill"></i> Password
            </label>
  
            <button
              type="button"
              class="absolute top-2 right-3"
              @click="passwordType = !passwordType"
            >
              <i
                class="ri-eye-close-line"
                v-if="passwordType == false ? '' : 'hidden'"
              ></i>
              <i class="ri-eye-2-line" v-if="passwordType ? '' : 'hidden'"></i>
            </button>
          </div>
  
          <div class="flex justify-between items-center mb-4">
            <a href="#" class="text-blue-500 hover:underline">Forgot Password?</a>
          </div>
          <div class="flex justify-between items-center mb-4">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
            <button
              type="submit"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              <nuxt-link to="/">Exit</nuxt-link>
            </button>
          </div>
        </form>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import img from "@/assets/images/_636903097234341637.png";
//   definePageMeta({
//     layout: "login",
//   });
//   const passwordType = ref(true);
  
//   onMounted(async () => {
//     const { Input, initTWE } = await import("tw-elements");
  
//     initTWE({ Input });
//   });
  </script>
  
  <style></style>
  