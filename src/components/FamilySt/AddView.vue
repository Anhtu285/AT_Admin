<template>
  <div class="dialog">
    <div class="dialog-header">Thêm mới sinh viên</div>
    <div class="dialog-body">
      <div class="input-group">
        <label for="dadName">Dad Name</label>
        <input id="dadName" type="text" v-model="data.dadName" class="input" />
      </div>
      <div class="input-group">
        <label for="dadBirthday">Dad Birthday</label>
        <input id="dadBirthday" type="date" v-model="data.dadBirthday" class="input" />
      </div>
      <div class="input-group">
        <label for="dadNation">Dad Nation</label>
        <input id="dadNation" type="text" v-model="data.dadNation" class="input" />
      </div>
      <div class="input-group">
        <label for="dadNationality">Place Nationality</label>
        <input id="dadNationality" type="text" v-model="data.dadNationality" class="input" />
      </div>
      <div class="input-group">
        <label for="dadPlaceOfResidence">Dad Place of Residence</label>
        <input
          id="dadPlaceOfResidence"
          type="text"
          v-model="data.dadPlaceOfResidence"
          class="input"
        />
      </div>
      <div class="input-group">
        <label for="dadNote">Dad Note</label>
        <input id="dadNote" type="text" v-model="data.dadNote" class="input" />
      </div>
      <div class="input-group">
        <label for="momName">Mom Name</label>
        <input id="momName" type="text" v-model="data.momName" class="input" />
      </div>
      <div class="input-group">
        <label for="momBirthday">Mom Birthday</label>
        <input id="momBirthday" type="date" v-model="data.momBirthday" class="input" />
      </div>
      <div class="input-group">
        <label for="momNation">Mom Nation</label>
        <input id="momNation" type="text" v-model="data.momNation" class="input" />
      </div>
      <div class="input-group">
        <label for="momNationality">Mom Nationality</label>
        <input id="momNationality" type="text" v-model="data.momNationality" class="input" />
      </div>
      <div class="input-group">
        <label for="momPlaceOfResidence">MOm Place of Residence</label>
        <input
          id="momPlaceOfResidence"
          type="text"
          v-model="data.momPlaceOfResidence"
          class="input"
        />
      </div>
      <div class="input-group">
        <label for="momNote">Mom Note</label>
        <input id="momNote" type="text" v-model="data.momNote" class="input" />
      </div>
      <div class="dialog-footer">
        <button class="button" @click="$emit('close')">Đóng</button>
        <button class="button primary" @click="addStudent">Tạo mới</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      data: {
        dadName: '',
        dadBirthday: '',
        dadNation: '',
        dadNationality: '',
        dadPlaceOfResidence: '',
        dadNote: 'null',
        momName: '',
        momBirthday: '',
        momNation: '',
        momNationality: '',
        momPlaceOfResidence: '',
        momNote: 'null'
      }
    }
  },
  methods: {
    async addfamilyst() {
      try {
        const response = await axios.post('https://localhost:44356/api/FamilySt', this.data)
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
      this.data.familystId = this.currentItem.familystId
      this.data.dadName = this.currentItem.dadName
      this.data.dadBirthday = this.currentItem.dadBirthday
      this.data.dadNation = this.currentItem.dadNation
      this.data.dadNationality = this.currentItem.dadNationality
      this.data.dadPlaceOfResidence = this.currentItem.dadPlaceOfResidence
      this.data.dadNote = this.currentItem.dadNote
      this.data.momName = this.currentItem.momName
      this.data.momBirthday = this.currentItem.momBirthday
      this.data.momNation = this.currentItem.momNation
      this.data.momPlaceOfResidence = this.currentItem.momPlaceOfResidence
      this.data.momNote = this.currentItem.momNote
    }
  },
  async created() {}
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
