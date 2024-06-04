<template>
    <div class="familyst-list container mx-auto p-4">
      <!-- Tiêu đề và nút thêm gia đình sinh viên -->
      <div class="flex flex-wrap items-center justify-between mb-4">
        <h3 class="text-black text-left text-3xl font-bold">Danh sách thông tin gia đình sinh viên</h3>
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
  
      <!-- Add FamilySt Dialog -->
      <div v-if="showAddDialog" class="dialog-overlay">
        <div class="dialog-content">
          <add-view @close="showAddDialog = false" @updateData="getFamilySts" />
        </div>
      </div>
  
      <!-- Bảng danh sách sinh viên -->
      <div class="card mt-3">
        <!-- Chọn số bản ghi trên mỗi trang và hiển thị tổng số family sinh viên -->
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
            <span class="text-gray-600">family sinh viên mỗi trang</span>
          </div>
          <div class="text-gray-600">
            Tổng số sinh viên: <span class="font-semibold text-black">{{ totalfamilysts }}</span>
          </div>
        </div>
  
        <!-- Bảng danh sách sinh viên -->
        <div class="overflow-x-auto">
          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="px-4 py-2">STT</th>
                <th class="px-4 py-2">Mã Family</th>
                <th class="px-4 py-2">Họ tên Bố</th>
                <th class="px-4 py-2">Ngày sinh</th>
                <th class="px-4 py-2">Họ tên Mẹ</th>
                <th class="px-4 py-2">Ngày sinh</th>
                <th class="px-4 py-2">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(familyst, index) in paginatedfamilysts" :key="familyst.familyStId">
                <td class="border px-4 py-2">{{ startIndex + index + 1 }}</td>
                <td class="border px-4 py-2">{{ familyst.familyStId }}</td>
                <td class="border px-4 py-2">{{ familyst.dadName }}</td>
                <td class="border px-4 py-2">{{ familyst.dadBirthday }}</td>
                <td class="border px-4 py-2">{{ familyst.momName }}</td>
                <td class="border px-4 py-2">{{ familyst.momBirthday }}</td>
                <td class="border px-4 py-2 flex justify-around">
                  <button @click="detailfamilyst(familyst)" class="text-gray-300 hover:text-blue-500">
                    <i class="ri-eye-fill"></i>
                  </button>
                  <button @click="editfamilyst(familyst)" class="text-gray-300 hover:text-blue-500">
                    <i class="ri-edit-box-fill"></i>
                  </button>
                  <button @click="confirmDelete(familyst)" class="text-gray-300 hover:text-red-500">
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
      <!-- Detail familyst Dialog -->
      <div v-if="showDetailDialog" class="dialog-overlay">
        <div class="dialog-content">
          <h3 class="text-xl font-semibold mb-4">Chi tiết gia đình sinh viên</h3>
          <div>
            <p><strong>Mã SV:</strong> {{ selectedfamilyst.familystId }}</p>
            <p><strong>Tên:</strong> {{ selectedfamilyst.dadName }}</p>
            <p><strong>SĐT:</strong> {{ selectedfamilyst.dadBirthday }}</p>
            <p><strong>Email:</strong> {{ selectedfamilyst.dadNation }}</p>
            <p><strong>Giới tính:</strong> {{ selectedfamilyst.dadNationality }}</p>
            <p><strong>Ngày sinh:</strong> {{ selectedfamilyst.dadPlaceOfResidence }}</p>
            <p><strong>Quốc tịch:</strong> {{ selectedfamilyst.dadNote }}</p>
            <p><strong>Tên:</strong> {{ selectedfamilyst.momName }}</p>
            <p><strong>SĐT:</strong> {{ selectedfamilyst.momBirthday }}</p>
            <p><strong>Email:</strong> {{ selectedfamilyst.momNation }}</p>
            <p><strong>Giới tính:</strong> {{ selectedfamilyst.momNationality }}</p>
            <p><strong>Ngày sinh:</strong> {{ selectedfamilyst.momPlaceOfResidence }}</p>
            <p><strong>Quốc tịch:</strong> {{ selectedfamilyst.momNote }}</p>
          </div>
          <button
            @click="showDetailDialog = false"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Đóng
          </button>
        </div>
      </div>
  
      <!-- Edit familyst Dialog -->
      <div v-if="showEditDialog" class="dialog-overlay">
        <div class="dialog-content">
          <edit-view
            :currentItem="currentItem"
            @close="showEditDialog = false"
            @updateData="getfamilysts"
          />
        </div>
      </div>
  
      <!-- Delete familyst Dialog -->
      <div v-if="showDeleteDialog" class="dialog-overlay">
        <div class="dialog-content p-4">
          <h3 class="text-xl font-semibold mb-4">Xóa thông tin gia đình sinh viên</h3>
          <p>Bạn có chắc chắn muốn xóa thông tin gia đình sinh viên này?</p>
          <div class="mt-4 flex flex-col md:flex-row gap-4">
            <button
              @click="deletefamilyst"
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
        familysts: [],
        classes: [],
        selectedClass: null, // Thêm biến selectedClass để lưu trữ lớp học được chọn
        showAddDialog: false,
        showEditDialog: false,
        showDeleteDialog: false,
        showDetailDialog: false,
        selectedfamilyst: {},
        currentItem: {},
        perPage: 5,
        currentPage: 1
      }
    },
    computed: {
      familystsFiltered() {
        let filteredfamilysts = this.familysts
  
        // Lọc theo từ khóa tìm kiếm
        if (this.searchText) {
          const searchTextLowerCase = this.searchText.toLowerCase()
          filteredfamilysts = filteredfamilysts.filter(
            (familyst) =>
              familyst.dadName.toLowerCase().includes(searchTextLowerCase) ||
              familyst.momName.toLowerCase().includes(searchTextLowerCase) ||
              familyst.familyStId.toString().toLowerCase().includes(searchTextLowerCase)
          )
        }
  
        return filteredfamilysts
      },
  
      totalfamilysts() {
        return this.familystsFiltered.length
      },
      totalPages() {
        return Math.ceil(this.totalfamilysts / this.perPage)
      },
      startIndex() {
        return (this.currentPage - 1) * this.perPage
      },
      endIndex() {
        return Math.min(this.startIndex + this.perPage, this.totalfamilysts)
      },
      paginatedfamilysts() {
        return this.familystsFiltered.slice(this.startIndex, this.endIndex)
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
      async getFamilySts() {
        try {
          const response = await axios.get('https://localhost:44356/api/FamilySt')
          this.familysts = response.data
        } catch (error) {
          console.error(error)
        }
      },
      addfamilyst() {
        this.showAddDialog = true
      },
      detailfamilyst(familyst) {
        this.selectedfamilyst = familyst
        this.showDetailDialog = true
      },
      editfamilyst(familyst) {
        this.currentItem = familyst
        this.showEditDialog = true
      },
      confirmDelete(familyst) {
        this.selectedfamilyst = familyst
        this.showDeleteDialog = true
      },
      async deletefamilyst() {
        try {
          await axios.delete(`https://localhost:44356/api/FamilySt/${this.selectedfamilyst.familyStId}`)
          this.familysts = this.familysts.filter(
            (familyst) => familyst.familyStId !== this.selectedfamilyst.familyStId
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
      this.getFamilySts()
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