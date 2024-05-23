<template>
  <div class="">
    <h3 class="text-black text-left text-3xl font-bold">Danh sách sinh viên</h3>
    <div class="flex mb-4 items-center justify-between">
      <input
        v-model="searchText"
        type="text"
        class="border-gray-300 rounded-md p-2 mr-2"
        placeholder="Tìm kiếm..."
      />
      <button
        @click="addStudent"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Thêm sinh viên
      </button>
    </div>

    <v-row class="mt-3">
      <v-col>
        <card>
          <table class="table-auto">
            <thead>
              <tr>
                <th class="px-8 py-4">STT</th>
                <th class="px-8 py-4">Mã SV</th>
                <th class="px-8 py-4">Tên</th>
                <th class="px-8 py-4">SĐT</th>
                <th class="px-8 py-4">Lớp</th>
                <th class="px-8 py-4">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, index) in students" :key="index">
                <td class="border px-4 py-2">{{ index + 1 }}</td>
                <td class="border px-4 py-2">{{ student.studentId }}</td>
                <td class="border px-4 py-2">{{ student.studentName }}</td>
                <td class="border px-4 py-2">{{ student.phoneNumber }}</td>
                <td class="border px-4 py-2">{{ student.classId }}</td>
              </tr>
            </tbody>
          </table>
        </card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const searchText = ref('')
const students = ref([])
const router = useRouter()
const getStudents = async () => {
  try {
    const response = await axios.get('https://localhost:44356/api/Student')
    students.value = response.data
  } catch (error) {
    console.error(error)
  }
}

// async getStudents()

// const filteredStudents = computed(() => {
//   return students.value.filter((student) => {
//     return (
//       student.StudentId.toLowerCase().includes(searchText.value.toLowerCase()) ||
//       student.StudentName.toLowerCase().includes(searchText.value.toLowerCase()) ||
//       student.PhoneNumber.toLowerCase().includes(searchText.value.toLowerCase()) ||
//       student.ClassId.toLowerCase().includes(searchText.value.toLowerCase()) ||
//       student.FacultyId.toLowerCase().includes(searchText.value.toLowerCase())
//     )
//   })
// })

const addStudent = () => {
  // Code để thêm sinh viên
  router.push('/Addstudent')
}

onMounted(() => {
  getStudents()
})
</script>

<style>
/* Thêm các kiểu CSS cần thiết tại đây */
</style>
