<template>
  <div>
    <div class="header">
      <div><h1>Thêm sinh viên</h1></div>
    </div>
    <div class="table">
      <label>Class</label>
      <select v-model="data.classId">
        <option v-for="(item, index) in classes" :key="index" :value="item.classId">
          {{ item.className }}
        </option>
      </select>
    </div>
    <div class="table">
      <label>livingId</label>
      <select v-model="data.livingId">
        <option v-for="(item, index) in livingId" :key="index" :value="item.livingId">
          {{ item.livingName }}
        </option>
      </select>
    </div>
    <div class="table">
      <label>profileStId</label>
      <select v-model="data.profileStId">
        <option v-for="(item, index) in profileStId" :key="index" :value="item.profileStId">
          {{ item.studentName }}
        </option>
      </select>
    </div>
    <div class="table">
      <label>familyStId</label>
      <select v-model="data.familyStId">
        <option v-for="(item, index) in familyStId" :key="index" :value="item.familyStId">
          {{ item.dadName }}
        </option>
      </select>
    </div>
    <div class="table">
      <label>studentName</label>
      <input type="text" v-model="data.studentName" />
    </div>
    <div class="table">
      <label>sex</label>
      <select v-model="data.sex">
        <option value="nam">Nam</option>
        <option value="nu">Nữ</option>
      </select>
    </div>
    <div class="table">
      <label>birthday</label>
      <input type="date" v-model="data.birthday" @change="layDate($event)" />
    </div>
    <div class="table">
      <label>nationality</label>
      <input type="text" v-model="data.nationality" />
    </div>
    <div class="table">
      <label>placeOfOrigin</label>
      <input type="text" v-model="data.placeOfOrigin" />
    </div>
    <div class="table">
      <label>placeOfResidence</label>
      <input type="text" v-model="data.placeOfResidence" />
    </div>
    <div class="table">
      <label>phoneNumber</label>
      <input type="text" v-model="data.phoneNumber" />
    </div>
    <div class="table">
      <label>email</label>
      <input type="text" v-model="data.email" />
    </div>
    <div class="table">
      <label>note</label>
      <input type="text" v-model="data.note" />
    </div>
    <button v-on:click="addStudent">Add</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AddView',
  data() {
    return {
      data: {
        studentId: 0,
        studentName: '',
        sex: '',
        birthday: null,
        nationality: '',
        placeOfOrigin: '',
        placeOfResidence: '',
        phoneNumber: '',
        email: '',
        note: '',
        livingId: 0,
        classId: 0,
        profileStId: 0,
        familyStId: 0
      },
      classes: [],
      livingId: [],
      profileStId: [],
      familyStId: []
    }
  },
  methods: {
    layDate(event) {
      // console.log(event.target.value)
      this.data.birthday = event.target.value
    },
    addStudent() {
      console.log(this.data)
      axios
        .post('https://localhost:44356/api/Student', this.data)
        .then((response) => {
          this.$emit('close') // Đóng dialog Add
          this.$emit('updateData') // Gọi sự kiện để cập nhật dữ liệu trang Index
          console.log(response.status)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getClasses() {
      await axios
        .get('https://localhost:44356/api/Class')
        .then((response) => {
          this.classes = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async findAll() {
      await axios
        .get('https://localhost:44356/api/FamilySt')
        .then((response) => {
          this.familyStId = response.data
        })
        .catch((error) => {})
    },
    async FindAllProfile() {
      await axios
        .get('https://localhost:44356/api/ProfileSt')
        .then((response) => {
          this.profileStId = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async FindAllLiving() {
      await axios
        .get('https://localhost:44356/api/Living')
        .then((response) => {
          this.livingId = response.data
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  props: ['dialogAdd'],
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
  async created() {
    await this.getClasses()
    await this.findAll()
    await this.FindAllLiving()
    await this.FindAllProfile()
  }
}
</script>

<style></style>
