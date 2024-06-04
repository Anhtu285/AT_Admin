<template>
    <div class="dialog">
      <div class="dialog-header">Thêm mới thông tin sinh viên</div>
      <div class="dialog-body">
        <div class="input-group">
          <label for="studentName">Student Name</label>
          <input id="studentName" type="text" v-model="data.studentName" class="input" />
        </div>
        <div class="input-group">
          <label for="sex">Sex</label>
          <select id="sex" v-model="data.sex" class="input">
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
          </select>
        </div>
        <div class="input-group">
          <label for="birthday">Birthday</label>
          <input id="birthday" type="date" v-model="data.birthday" class="input" />
        </div>
        <div class="input-group">
          <label for="nationality">Nationality</label>
          <input id="nationality" type="text" v-model="data.nationality" class="input" />
        </div>
        <div class="input-group">
          <label for="placeOfOrigin">Place of Origin</label>
          <input id="placeOfOrigin" type="text" v-model="data.placeOfOrigin" class="input" />
        </div>
        <div class="input-group">
          <label for="placeOfResidence">Place of Residence</label>
          <input id="placeOfResidence" type="text" v-model="data.placeOfResidence" class="input" />
        </div>
        <div class="input-group">
          <label for="phoneNumber">Phone Number</label>
          <input id="phoneNumber" type="text" v-model="data.phoneSv" class="input" />
        </div>
        <div class="input-group">
          <label for="nation">Nation</label>
          <input id="nation" type="text" v-model="data.nation" class="input" />
        </div>
        <div class="input-group">
          <label for="cccd">ID CCCD</label>
          <input id="cccd" type="text" v-model="data.cccd" class="input" />
        </div>
        <div class="input-group">
          <label for="bhyt">ID BHYT</label>
          <input id="bhyt" type="text" v-model="data.bhyt" class="input" />
        </div>
        <div class="input-group">
          <label for="imageSv">Image</label>
          <input id="imageSv" type="text" v-model="data.imageSv" class="input" />
        </div>
      </div>
      <div class="dialog-footer">
        <button class="button" @click="$emit('close')">Đóng</button>
        <button class="button primary" @click="addProfileSt">Tạo mới</button>
      </div>
    </div>
  </template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      data: {
        studentName: '',
        sex: '',
        birthday: null,
        nationality: '',
        placeOfOrigin: '',
        placeOfResidence: '',
        phoneSv: '',
        nation: '',
        cccd: '',
        bhyt: '',
        imageSv: 'null',
      },
    }
  },
  methods: {
    async addProfileSt() {
      try {
        const response = await axios.post('https://localhost:44356/api/ProfileSt', this.data)
        this.$emit('close')
        this.$emit('updateData')
        console.log(response.status)
      } catch (error) {
        console.log(error)
      }
    }
  },
  props: ['dialogAdd', 'currentItem'],
  computed: {
    dialog: {
      get() {
        return this.dialogAdd
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  watch: {
    currentItem: function () {
      this.data.profileStId = this.currentItem.profileStId
      this.data.studentName = this.currentItem.studentName
      this.data.sex = this.currentItem.sex
      this.data.birthday = this.currentItem.birthday
      this.data.nationality = this.currentItem.nationality
      this.data.placeOfOrigin = this.currentItem.placeOfOrigin
      this.data.placeOfResidence = this.currentItem.placeOfResidence
      this.data.phoneSv = this.currentItem.phoneSv
      this.data.nation = this.currentItem.nation
      this.data.cccd = this.currentItem.cccd
      this.data.bhyt = this.currentItem.bhyt
      this.data.imageSv = this.currentItem.imageSv
    }
  },
  async created() {
    await this.getClasses()
    await this.findAll()
    await this.FindAllLiving()
    await this.FindAllProfile()
  }
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

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.input-group label {
  width: 150px;
  font-weight: 600;
  color: #495057;
  margin-right: 1rem;
}

.input {
  flex: 1;
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

.button:hover {
  background-color: #e2e6ea;
}

.button.primary {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.button.primary:hover {
  background-color: #0056b3;
}
</style>
