<template>
  <div class="student-list">
    <!-- Tiêu đề và nút thêm sinh viên -->
    <h3 class="text-black text-left text-3xl font-bold">Danh sách sinh viên</h3>
    <div class="flex mb-4 items-center justify-between">
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

      <!-- Add Student Dialog -->
      <div v-if="showAddDialog" class="">
        <div class="dialog-content">
          <!-- Your Add Student Form goes here -->
          <add-view v-if="showAddDialog" @close="showAddDialog = false" @updateData="getStudents" />
        </div>
      </div>
    </div>

    <!-- Bảng danh sách sinh viên -->
    <div class="mt-3">
      <div class="card">
        <!-- Chọn số bản ghi trên mỗi trang và hiển thị tổng số sinh viên -->
        <div class="flex justify-between items-center p-3">
          <!-- Số bản ghi trên mỗi trang -->
          <div class="flex items-center">
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

          <!-- Tổng số sinh viên -->
          <div class="text-gray-600">
            Tổng số sinh viên: <span class="font-semibold text-black">{{ totalStudents }}</span>
          </div>
        </div>

        <!-- Bảng danh sách sinh viên -->
        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-8 py-4">STT</th>
              <th class="px-8 py-4">Mã SV</th>
              <th class="px-8 py-4">Tên</th>
              <th class="px-8 py-4">SĐT</th>
              <th class="px-8 py-4">Email</th>
              <th class="px-8 py-4">Lớp</th>
              <th class="px-8 py-4">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in paginatedStudents" :key="student.studentId">
              <td class="border px-4 py-2">{{ index + 1 }}</td>
              <td class="border px-4 py-2">{{ student.studentId }}</td>
              <td class="border px-4 py-2">{{ student.studentName }}</td>
              <td class="border px-4 py-2">{{ student.phoneNumber }}</td>
              <td class="border px-4 py-2">{{ student.email }}</td>
              <td class="border px-4 py-2">{{ student.classId }}</td>
              <td class="border px-4 py-2">
                <button
                  @click="detailStudent(student)"
                  class="text-gray-300 hover:text-blue-500 ml-2"
                >
                  <i class="ri-eye-fill"></i>
                </button>
                <button
                  @click="editStudent(student)"
                  class="text-gray-300 hover:text-blue-500 ml-2"
                >
                  <i class="ri-edit-box-fill"></i>
                </button>
                <button
                  @click="confirmDelete(student)"
                  class="text-gray-300 hover:text-red-500 ml-2"
                >
                  <i class="ri-delete-bin-6-fill"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Nút chuyển trang -->
        <div class="flex justify-end items-center p-3">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mx-1',
              { 'bg-blue-500 text-white': page === currentPage }
            ]"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>

    <!-- Chi tiết sinh viên, Dialogs, và Overlay -->
    <!-- ... -->
    <!-- Detail Student Dialog -->
    <div v-if="showDetailDialog" class="dialog">
      <div class="dialog-content">
        <h3 class="text-xl font-semibold mb-4">Chi tiết sinh viên</h3>
        <div>
          <p><strong>Mã SV:</strong> {{ selectedStudent.studentId }}</p>
          <p><strong>Tên:</strong> {{ selectedStudent.studentName }}</p>
          <p><strong>SĐT:</strong> {{ selectedStudent.phoneNumber }}</p>
          <p><strong>Email:</strong> {{ selectedStudent.email }}</p>
          <p><strong>Lớp:</strong> {{ selectedStudent.classId }}</p>
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
    <div v-if="showEditDialog" class="dialog">
      <div class="dialog-content">
        <!-- Pass currentItem to EditView -->
        <edit-view
          v-if="showEditDialog"
          :currentItem="currentItem"
          @close="showEditDialog = false"
          @updateData="getStudents"
        />
      </div>
    </div>

    <!-- Delete Student Dialog -->
    <div v-if="showDeleteDialog" class="dialog">
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
  </div>
  <!-- Lớp phủ được di chuyển ra ngoài -->
  <div
    v-if="showAddDialog || showDetailDialog || showEditDialog || showDeleteDialog"
    class="overlay"
  ></div>
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
      showAddDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
      showDetailDialog: false,
      selectedStudent: {},
      perPage: 5,
      currentPage: 1
    }
  },
  computed: {
    totalStudents() {
      return this.students.length
    },
    totalPages() {
      return Math.ceil(this.totalStudents / this.perPage)
    },
    startIndex() {
      return (this.currentPage - 1) * this.perPage
    },
    endIndex() {
      return Math.min(this.startIndex + this.perPage - 1, this.totalStudents - 1)
    },
    paginatedStudents() {
      return this.students.slice(this.startIndex, this.endIndex + 1)
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
    }
  },
  mounted() {
    this.getStudents()
  }
}
</script>

<style>
/* Your CSS styles here */
.student-list {
  margin: 0 auto;
  padding: 20px;
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

.text-left {
  text-align: left;
}

.text-black {
  color: #333;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-45%, -55%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 800px;
}

.dialog-content {
  margin-bottom: 20px;
}
.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.dialog-buttons button {
  margin-left: 10px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Màu sắc và độ trong suốt của lớp phủ */
  z-index: 999; /* Đặt z-index cao hơn so với các phần tử khác trên trang */
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 800px;
}
</style>
