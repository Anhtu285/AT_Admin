<template>
    <div>
      <v-dialog v-model="dialog" max-width="640px">
        <v-card>
          <v-card-title>
            <span>Thêm mới học sinh</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field label="Tên học sinh" v-model="data.studentName">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      label="Giới tính"
                      v-model="data.studentSex"
                      :items="[
                        { id: true, studentSex: 'Nam' },
                        { id: false, studentSex: 'Nữ' },
                      ]"
                      item-title="studentSex"
                      item-value="id"
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      label="Lớp"
                      v-model="data.classId"
                      :items="classes"
                      item-title="className"
                      item-value="classId"
                    >
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mr-2" color="grey darken-3" @click="this.$emit('close')"
              >Huỷ</v-btn
            >
            <v-btn color="primary" @click="addStudent">Lưu</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "AddView",
    data() {
      return {
        data: {
          studentName: "",
          classId: "",
        },
        classes: [],
      };
    },
    methods: {
      addStudent() {
        axios
          .post("https://localhost:7097/api/Student", this.data)
          .then((response) => {
            this.$emit("close"); // Đóng dialog Add
            this.$emit("updateData"); // Gọi sự kiện để cập nhật dữ liệu trang Index
            console.log(response.status);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      getClasses() {
        axios
          .get("https://localhost:7097/api/Class/")
          .then((response) => {
            this.classes = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    props: ["dialogAdd"],
    computed: {
      dialog: {
        get() {
          return this.dialogAdd;
        },
        set(value) {
          if (!value) {
            this.$emit("close");
          }
        },
      },
    },
    created() {
      this.getClasses();
    }
  };
  </script>
  
  <style></style>
  