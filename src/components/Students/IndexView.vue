<template>
  <div class="student-list container mx-auto p-4">
    <!-- Tiêu đề và nút thêm sinh viên -->
    <div class="flex flex-wrap items-center justify-between mb-4">
      <h3 class="text-black text-left text-3xl font-bold">Danh sách sinh viên</h3>
      <div class="flex flex-wrap items-center">
        <input
          v-model="searchText"
          type="text"
          class="border-gray-300 rounded-md p-2 mr-2"
          placeholder="Tìm kiếm..."
        />
        <button
          @click="showAddDialog = true"
          class="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          <i class="ri-add-large-fill"></i>
        </button>
      </div>
    </div>

    <div class="flex items-center mb-2 md:mb-0">
      <span class="text-gray-600 mr-2">Lọc theo lớp:</span>
      <select
        v-model="selectedClass"
        class="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none"
      >
        <option value="" selected disabled>Chọn lớp học</option>
        <option v-for="classItem in classes" :key="classItem.classId" :value="classItem.classId">
          {{ classItem.className }}
        </option>
      </select>
    </div>

    <!-- Add Student Dialog -->
    <div v-if="showAddDialog" class="dialog-overlay">
      <div class="dialog-content">
        <add-view @close="showAddDialog = false" @updateData="getStudents" />
      </div>
    </div>

    <!-- Bảng danh sách sinh viên -->
    <div class="card mt-3">
      <!-- Chọn số bản ghi trên mỗi trang và hiển thị tổng số sinh viên -->
      <div class="flex flex-wrap justify-between items-center p-3">
        <div class="flex items-center mb-2 md:mb-0">
          <span class="text-gray-600 mr-2">Hiển thị</span>
          <select
            v-model="perPage"
            @change="handlePerPageChange"
            class="border border-gray-300 rounded-md p-2 mr-2 text-gray-800 focus:outline-none"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span class="text-gray-600">sinh viên mỗi trang</span>
        </div>
        <div class="text-gray-600">
          Tổng số sinh viên: <span class="font-semibold text-black">{{ totalStudents }}</span>
        </div>
      </div>

      <!-- Bảng danh sách sinh viên -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">STT</th>
              <th class="px-4 py-2">Mã SV</th>
              <th class="px-4 py-2">Tên</th>
              <th class="px-4 py-2">SĐT</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Lớp</th>
              <th class="px-4 py-2">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in paginatedStudents" :key="student.studentId">
              <td class="border px-4 py-2">{{ startIndex + index + 1 }}</td>
              <td class="border px-4 py-2">{{ student.studentId }}</td>
              <td class="border px-4 py-2">{{ student.studentName }}</td>
              <td class="border px-4 py-2">{{ student.phoneNumber }}</td>
              <td class="border px-4 py-2">{{ student.email }}</td>
              <td class="border px-4 py-2">{{ getClassName(student.classId) }}</td>
              <td class="border px-4 py-2 flex justify-around">
                <button @click="detailStudent(student)" class="text-gray-300 hover:text-blue-500">
                  <i class="ri-eye-fill"></i>
                </button>
                <button @click="editStudent(student)" class="text-gray-300 hover:text-blue-500">
                  <i class="ri-edit-box-fill"></i>
                </button>
                <button @click="confirmDelete(student)" class="text-gray-300 hover:text-red-500">
                  <i class="ri-delete-bin-6-fill"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Nút chuyển trang -->
      <div class="flex justify-center items-center p-3">
        <button
          @click="goToPreviousPage"
          :disabled="currentPage === 1"
          class="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mx-1 mb-2 md:mb-0 md:mx-2"
        >
          <i class="ri-arrow-left-s-line"></i>
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mx-1 mb-2 md:mb-0 md:mx-2',
            { 'bg-blue-500 text-white': page === currentPage }
          ]"
        >
          {{ page }}
        </button>
        <button
          v-if="currentPage < totalPages"
          @click="goToNextPage"
          class="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mx-1 mb-2 md:mb-0 md:mx-2"
        >
          <i class="ri-arrow-right-s-line"></i>
        </button>
      </div>
    </div>

    <!-- Chi tiết sinh viên, Dialogs, và Overlay -->
    <!-- Detail Student Dialog -->
    <div v-if="showDetailDialog" class="dialog-overlay">
      <div class="dialog-content">
        <h3 class="text-xl font-semibold mb-4">Chi tiết sinh viên</h3>
        <div>
          <p><strong>Mã SV:</strong> {{ selectedStudent.studentId }}</p>
          <p><strong>Tên:</strong> {{ selectedStudent.studentName }}</p>
          <p><strong>SĐT:</strong> {{ selectedStudent.phoneNumber }}</p>
          <p><strong>Email:</strong> {{ selectedStudent.email }}</p>
          <p><strong>Lớp:</strong> {{ getClassName(selectedStudent.classId) }}</p>
          <p><strong>Giới tính:</strong> {{ selectedStudent.sex }}</p>
          <p><strong>Ngày sinh:</strong> {{ selectedStudent.birthday }}</p>
          <p><strong>Quốc tịch:</strong> {{ selectedStudent.nationality }}</p>
          <p><strong>Nơi sinh:</strong> {{ selectedStudent.placeOfOrigin }}</p>
          <p><strong>Nơi ở:</strong> {{ selectedStudent.placeOfResidence }}</p>
          <p><strong>Ghi chú:</strong> {{ selectedStudent.note }}</p>
        </div>
        <button
          @click="showDetailDialog = false"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Đóng
        </button>
      </div>
    </div>

    <!-- Edit Student Dialog -->
    <div v-if="showEditDialog" class="dialog-overlay">
      <div class="dialog-content">
        <edit-view
          :currentItem="currentItem"
          @close="showEditDialog = false"
          @updateData="getStudents"
        />
      </div>
    </div>

    <!-- Delete Student Dialog -->
    <div v-if="showDeleteDialog" class="dialog-overlay">
      <div class="dialog-content p-4">
        <h3 class="text-xl font-semibold mb-4">Xóa sinh viên</h3>
        <p>Bạn có chắc chắn muốn xóa sinh viên này?</p>
        <div class="mt-4 flex flex-col md:flex-row gap-4">
          <button
            @click="deleteStudent"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
          >
            Đồng ý
          </button>
          <button
            @click="showDeleteDialog = false"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-full md:w-auto"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>

    <!-- Lớp phủ -->
    <div
      v-if="showAddDialog || showDetailDialog || showEditDialog || showDeleteDialog"
      class="overlay"
    ></div>
  </div>
</template>

<script>
import axios from 'axios'
import AddView from './AddView.vue'
import EditView from './EditView.vue'

export default {
  components: { AddView, EditView },
  data() {
    return {
      searchText: '',
      students: [],
      classes: [],
      selectedClass: null, // Thêm biến selectedClass để lưu trữ lớp học được chọn
      showAddDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
      showDetailDialog: false,
      selectedStudent: {},
      currentItem: {},
      perPage: 5,
      currentPage: 1
    }
  },
  computed: {
    studentsFiltered() {
      let filteredStudents = this.students

      // Lọc theo từ khóa tìm kiếm
      if (this.searchText) {
        const searchTextLowerCase = this.searchText.toLowerCase()
        filteredStudents = filteredStudents.filter(
          (student) =>
            student.studentName.toLowerCase().includes(searchTextLowerCase) ||
            student.studentId.toString().toLowerCase().includes(searchTextLowerCase)
        )
      }

      // Lọc theo lớp học được chọn
      if (this.selectedClass) {
        filteredStudents = filteredStudents.filter(
          (student) => student.classId === this.selectedClass
        )
      }

      return filteredStudents
    },

    totalStudents() {
      return this.studentsFiltered.length
    },
    totalPages() {
      return Math.ceil(this.totalStudents / this.perPage)
    },
    startIndex() {
      return (this.currentPage - 1) * this.perPage
    },
    endIndex() {
      return Math.min(this.startIndex + this.perPage, this.totalStudents)
    },
    paginatedStudents() {
      return this.studentsFiltered.slice(this.startIndex, this.endIndex)
    },
    visiblePages() {
      const totalVisible = 5
      let start = Math.max(this.currentPage - Math.floor(totalVisible / 2), 1)
      let end = Math.min(start + totalVisible - 1, this.totalPages)
      if (end - start + 1 < totalVisible) {
        start = Math.max(end - totalVisible + 1, 1)
      }
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    }
  },
  methods: {
    async getStudents() {
      try {
        const response = await axios.get('https://localhost:44356/api/Student')
        this.students = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async getClasses() {
      try {
        const response = await axios.get('https://localhost:44356/api/Class')
        this.classes = response.data
      } catch (error) {
        console.error(error)
      }
    },
    getClassName(idClass) {
      var item = this.classes.find((x) => x.classId == idClass)
      try {
        return item.className
      } catch {
        return ''
      }
    },
    addStudent() {
      this.showAddDialog = true
    },
    detailStudent(student) {
      this.selectedStudent = student
      this.showDetailDialog = true
    },
    editStudent(student) {
      this.currentItem = student
      this.showEditDialog = true
    },
    confirmDelete(student) {
      this.selectedStudent = student
      this.showDeleteDialog = true
    },
    async deleteStudent() {
      try {
        await axios.delete(`https://localhost:44356/api/Student/${this.selectedStudent.studentId}`)
        this.students = this.students.filter(
          (student) => student.studentId !== this.selectedStudent.studentId
        )
        this.showDeleteDialog = false
      } catch (error) {
        console.error(error)
      }
    },
    hideOverlay() {
      this.showAddDialog = false
      this.showDetailDialog = false
      this.showEditDialog = false
      this.showDeleteDialog = false
    },
    handlePerPageChange() {
      this.currentPage = 1
    },
    goToPage(page) {
      this.currentPage = page
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1
      }
    }
  },
  mounted() {
    this.getStudents()
    this.getClasses()
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-auto {
  width: 100%;
  border-collapse: collapse;
}

.table-auto th,
.table-auto td {
  padding: 12px;
  border: 1px solid #ddd;
}

.table-auto th {
  background-color: #f4f4f4;
}

.table-auto tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.table-auto tbody tr:hover {
  background-color: #f1f1f1;
}

.dialog-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 90%;
  max-width: 500px;
  min-width: 300px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.flex-wrap {
  flex-wrap: wrap;
}

.mb-2 {
  margin-bottom: 0.5rem;
}
</style>
