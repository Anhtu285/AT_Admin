<template>
  <div class="dialog">
    <div class="dialog-header">Chỉnh sửa thông tin gia đình sinh viên</div>
    <div class="dialog-body">
      <div class="form-group">
        <label for="dadName">Tên Bố</label>
        <input id="dadName" type="text" v-model="data.dadName" class="input" />
      </div>
      <div class="form-group">
        <label for="dadBirthday">Ngày sinh Bố</label>
        <input id="dadBirthday" type="date" v-model="data.dadBirthday" class="input" />
      </div>
      <div class="form-group">
        <label for="dadNation">Dân Tộc</label>
        <input id="dadNation" type="text" v-model="data.dadNation" class="input" />
      </div>
      <div class="form-group">
        <label for="dadNationality">Quốc tịch</label>
        <input id="dadNationality" type="text" v-model="data.dadNationality" class="input" />
      </div>
      <div class="form-group">
        <label for="dadPlaceOfResidence">Nơi Sinh</label>
        <input
          id="dadPlaceOfResidence"
          type="text"
          v-model="data.dadPlaceOfResidence"
          class="input"
        />
      </div>
      <div class="form-group">
        <label for="dadNote">Note</label>
        <input id="dadNote" type="text" v-model="data.dadNote" class="input" />
      </div>
      <div class="form-group">
        <label for="momName">Tên Mẹ</label>
        <input id="momName" type="text" v-model="data.momName" class="input" />
      </div>
      <div class="form-group">
        <label for="momBirthday">Ngày sinh Mẹ</label>
        <input id="momBirthday" type="date" v-model="data.momBirthday" class="input" />
      </div>
      <div class="form-group">
        <label for="momNation">Dân Tộc</label>
        <input id="momNation" type="text" v-model="data.momNation" class="input" />
      </div>
      <div class="form-group">
        <label for="momNationality">Quốc Tịch</label>
        <input id="momNationality" type="text" v-model="data.momNationality" class="input" />
      </div>
      <div class="form-group">
        <label for="momPlaceOfResidence">Nơi sinh</label>
        <input
          id="momPlaceOfResidence"
          type="text"
          v-model="data.momPlaceOfResidence"
          class="input"
        />
      </div>
      <div class="form-group">
        <label for="momNote">Note</label>
        <input id="momNote" type="text" v-model="data.momNote" class="input" />
      </div>
      <div class="dialog-footer">
        <button class="button" @click="$emit('close')">Hủy</button>
        <button class="button primary" @click="updatefamilyst">Cập nhật</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditView',
  props: {
    dialogEdit: Boolean,
    currentItem: Object
  },
  data() {
    return {
      data: { ...this.currentItem }
    }
  },
  computed: {
    formattedBirthday: {
      get() {
        // Chuyển đổi giá trị ngày thành định dạng 'YYYY-MM-DD'
        return this.data.birthday ? this.formatDate(this.data.birthday) : null
      },
      set(value) {
        this.data.birthday = value
      }
    }
  },
  methods: {
    async updatefamilyst() {
      try {
        // Kiểm tra dữ liệu trước khi gửi yêu cầu
        if (!this.data.familystId) {
          throw new Error('familyst ID is required')
        }

        const response = await axios.put(
          `https://localhost:44356/api/FamilySt/${this.data.familystId}`,
          this.data
        )
        this.$emit('close')
        this.$emit('updateData')
        console.log(response.status)
      } catch (error) {
        console.error('Error updating familyst:', error)
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  },
  watch: {
    currentItem: {
      deep: true,
      handler() {
        this.data = { ...this.currentItem }

        // Chuyển đổi ngày sinh sang định dạng 'YYYY-MM-DD' nếu không null
        if (this.data.birthday) {
          this.data.birthday = this.formatDate(this.data.birthday)
        }
      }
    }
  },
  created() {}
}
</script>

<style scoped>
.dialog {
  max-width: 800px;
  margin: 2rem auto;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

.dialog-header {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  border-radius: 10px 10px 0 0;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.dialog-body {
  background-color: #f8f9fa;
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 70vh;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: white;
  font-size: 1rem;
  color: #495057;
  transition: border-color 0.3s;
}

.input:focus {
  border-color: #007bff;
  outline: none;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0 0 10px 10px;
}

.button {
  padding: 0.5rem 1.25rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background-color: white;
  color: #495057;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 0.5rem;
}

.button.primary {
  background-color: #007bff;
  color: white;
}

.button:hover {
  background-color: #f8f9fa;
}
</style>