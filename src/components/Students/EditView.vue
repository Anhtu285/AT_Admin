<template>
  <div class="dialog">
    <div class="dialog-header">Chỉnh sửa sinh viên</div>
    <div class="dialog-body">
      <div class="form-group">
        <label for="class">Lớp học</label>
        <select id="class" v-model="data.classId" class="input">
          <option v-for="(item, index) in classes" :key="index" :value="item.classId">
            {{ item.className }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="livingId">Living ID</label>
        <select id="livingId" v-model="data.livingId" class="input">
          <option v-for="(item, index) in livingId" :key="index" :value="item.livingId">
            {{ item.livingName }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="profileStId">Profile ST ID</label>
        <select id="profileStId" v-model="data.profileStId" class="input">
          <option v-for="(item, index) in profileStId" :key="index" :value="item.profileStId">
            {{ item.studentName }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="familyStId">Family ST ID</label>
        <select id="familyStId" v-model="data.familyStId" class="input">
          <option v-for="(item, index) in familyStId" :key="index" :value="item.familyStId">
            {{ item.dadName }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="studentName">Tên sinh viên</label>
        <input id="studentName" type="text" v-model="data.studentName" class="input" />
      </div>
      <div class="form-group">
        <label for="sex">Giới tính</label>
        <select id="sex" v-model="data.sex" class="input">
          <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
        </select>
      </div>
      <div class="form-group">
        <label for="birthday">Ngày sinh</label>
        <input id="birthday" type="date" v-model="formattedBirthday" class="input" />
      </div>
      <div class="form-group">
        <label for="nationality">Quốc tịch</label>
        <input id="nationality" type="text" v-model="data.nationality" class="input" />
      </div>
      <div class="form-group">
        <label for="placeOfOrigin">Nơi sinh</label>
        <input id="placeOfOrigin" type="text" v-model="data.placeOfOrigin" class="input" />
      </div>
      <div class="form-group">
        <label for="placeOfResidence">Nơi ở</label>
        <input id="placeOfResidence" type="text" v-model="data.placeOfResidence" class="input" />
      </div>
      <div class="form-group">
        <label for="phoneNumber">Số điện thoại</label>
        <input id="phoneNumber" type="text" v-model="data.phoneNumber" class="input" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="text" v-model="data.email" class="input" />
      </div>
      <div class="form-group">
        <label for="note">Ghi chú</label>
        <input id="note" type="text" v-model="data.note" class="input" />
      </div>
    </div>
    <div class="dialog-footer">
      <button class="button" @click="$emit('close')">Hủy</button>
      <button class="button primary" @click="updateStudent">Cập nhật</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditView',
  props: {
    dialogEdit: Boolean,
    currentItem: Object
  },
  data() {
    return {
      data: { ...this.currentItem },
      classes: [],
      livingId: [],
      profileStId: [],
      familyStId: []
    };
  },
  computed: {
    formattedBirthday: {
      get() {
        // Chuyển đổi giá trị ngày thành định dạng 'YYYY-MM-DD'
        return this.data.birthday ? this.formatDate(this.data.birthday) : null;
      },
      set(value) {
        this.data.birthday = value;
      }
    }
  },
  methods: {
    async updateStudent() {
      try {
        // Kiểm tra dữ liệu trước khi gửi yêu cầu
        if (!this.data.studentId) {
          throw new Error('Student ID is required');
        }

        const response = await axios.put(
          `https://localhost:44356/api/Student/${this.data.studentId}`,
          this.data
        );
        this.$emit('close');
        this.$emit('updateData');
        console.log(response.status);
      } catch (error) {
        console.error('Error updating student:', error);
      }
    },
    async getClasses() {
      try {
        const response = await axios.get('https://localhost:44356/api/Class');
        this.classes = response.data;
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    },
    async findAll() {
      try {
        const response = await axios.get('https://localhost:44356/api/FamilySt');
        this.familyStId = response.data;
      } catch (error) {
        console.error('Error fetching family data:', error);
      }
    },
    async FindAllProfile() {
      try {
        const response = await axios.get('https://localhost:44356/api/ProfileSt');
        this.profileStId = response.data;
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    },
    async FindAllLiving() {
      try {
        const response = await axios.get('https://localhost:44356/api/Living');
        this.livingId = response.data;
      } catch (error) {
        console.error('Error fetching living data:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  watch: {
    currentItem: {
      deep: true,
      handler() {
        this.data = { ...this.currentItem };

        // Chuyển đổi ngày sinh sang định dạng 'YYYY-MM-DD' nếu không null
        if (this.data.birthday) {
          this.data.birthday = this.formatDate(this.data.birthday);
        }
      }
    }
  },
  created() {
    this.getClasses();
    this.findAll();
    this.FindAllLiving();
    this.FindAllProfile();
  }
};
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
