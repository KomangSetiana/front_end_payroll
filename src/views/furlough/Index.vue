<template>
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-12">
        <h3>Daftar Cuti Karyawan</h3>
      </div>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <button type="button" class="btn btn-primary" data-toggle="modal" @click="showModal()">
                <i class="fas fa-user-plus"></i>Tambah Cuti
              </button>
            </div>
            <!-- <input type="text" v-model="per_page">
            <input type="text" v-model="keyword" placeholder="keyword">
            <button @click="getData()">Refresh</button> -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Tipe Cuti</th>
                    <th>Tanggal</th>
                    <th>Keterangan</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(furlough, index) in furloughs.data" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ furlough.employees.name }}</td>
                    <td>{{ furlough.furlough_types.furlough_name }}</td>
                    <td>{{ furlough.date }}</td>
                    <td>{{ furlough.description }}</td>
                    <td>
                      <div class="btn-group">
                        <button class="btn btn-sm btn-warning rounded mr-2" @click="showModalEdit(form = furlough)">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger rounded" @click="destroy(furlough.id)">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="showModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" v-show="!statusModal"> Tambah Cuti</h5>
              <h5 class="modal-title" id="exampleModalLabel" v-show="statusModal"> Update Cuti</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="statusModal ? update() : storeData()">
                <div class="mb-3">
                  <label for="" class="form-label">Nama</label>
                  <select v-model="form.employee_id" id="" class="form-select">
                    <option v-for="employee in employees.data" :value="employee.id">{{ employee.name }}</option>
                  </select>
                  <div v-if="validation.employee_id" class="text-danger">
                    {{ validation.employee_id[0] }}
                  </div>
                  <label for="" class="form-label">Tipe Cuti</label>
                  <select v-model="form.furlough_type_id" id="" class="form-select">
                    <option v-for="furloughType in furloughTypes.data" :value="furloughType.id">{{
                        furloughType.furlough_name
                    }}</option>
                  </select>
                  <div v-if="validation.furlough_type_id" class="text-danger">
                    {{ validation.furlough_type_id[0] }}
                  </div>
                  <label for="" class="form-label">Tanggal</label>
                  <input type="date" class="form-control" v-model="form.date">
                  <div v-if="validation.date" class="text-danger">
                    {{ validation.date[0] }}
                  </div>
                  <label for="floatingTextarea2">Deskripsi</label>
                  <input type="text" class="form-control" v-model="form.description">
                  <div v-if="validation.description" class="text-danger">
                    {{ validation.description[0] }}
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary" v-show="!statusModal">
                    Simpan
                  </button>
                  <button type="submit" class="btn btn-primary" v-show="statusModal">
                    Ubah
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </section>
</template>

<script>
import axios from "axios";
import env from "../../../env";

export default {
  data() {
    return {
      statusModal: false,
      furloughs: [],
      employees: [],
      validation: [],
      furloughTypes: [],
      form: {
        id: '',
        employee_id: '',
        date: '',
        furlough_type_id: '',
        description: '',
        employees: {
          id: '',
          name: ''
        },
        furlough_types: {
          id: '',
          furlough_name: ''
        }
      }
    };
  },

  methods: {
    showModal() {
      this.form ={}
      this.validation = []
      this.statusModal = false,
        $("#showModal").modal("show");
    },
    showModalEdit() {
      this.statusModal = true;
      this.validation = []
      this.getData()
      $("#showModal").modal("show");

    },
    getData() {
      let url = env.VUE_APP_URL + "furlough";
      axios
        .get(url)
        .then((result) => {
          this.furloughs = result.data
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    storeData() {

      let url = env.VUE_APP_URL + "furlough";
      axios.post(url, this.form)
        .then(() => {
          this.getData()
          $("#showModal").modal("hide")
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tambah Cuti Berasil',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err) => {
          this.validation = err.response.data.errors;
        });
    },
    update() {
      let url = env.VUE_APP_URL + 'furlough/' + this.form.id
      axios.put(url, this.form)
        .then(() => {
          this.getData()
          $("#showModal").modal("hide")
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Update Cuti Berasil',
            showConfirmButton: false,
            timer: 1500
          })
        }).catch((err) => {
          this.validation = err.response.data.errors
        })
    },
    destroy(id) {
      this.$swal.fire({
        title: 'Anda Yakin Mau Hapus?',
        text: "data akan hilang!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!'
      }).then((result) => {
        if (result.value) {
          let url = env.VUE_APP_URL + `furlough/${id}`
          axios.delete(url)
            .then(() => {
              this.$swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Delete Data Berasil',
                showConfirmButton: false,
                timer: 1500
              })
              this.getData();
            }).catch(() => {
              his.$swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Delete Data Gagal',
                showConfirmButton: false,
                timer: 1500
              })
            })
        }
      })
    },
    getEmployees() {
      let url = env.VUE_APP_URL + 'employee'
      axios.get(url)
        .then((result) => {
          this.employees = result.data
        }).catch((err) => {
          console.log(err.response)
        })
    },
    getFurloughTypes() {
      let url = env.VUE_APP_URL + 'furloughtype'
      axios.get(url)
        .then((result) => {
          this.furloughTypes = result.data
        }).catch((err) => {
          console.log(err.response)
        })
    },




  },
  mounted() {
    this.getData();
    this.getEmployees();
    this.getFurloughTypes();
  }
}
</script>

<style>
@import "vue-select/dist/vue-select.css";
</style>
