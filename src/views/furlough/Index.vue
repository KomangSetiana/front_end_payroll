<template>
  <PageLoader v-if="furloughs.length <= 0 ? furloughs.length : load" />
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
            <div class="card-header row">
              <button type="button" class="btn btn-primary col-3" data-toggle="modal" @click="showModal()">
                <i class="fas fa-user-plus"></i>Tambah Cuti
              </button>

              <div class="col-6 ms-auto">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Masukan Nama Karyawan..." v-model="search" />
                  <div class="input-group-append">
                    <button type="submit" class="btn btn-primary">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
              
            </div>

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
                  <tr v-for="(furlough, index) in searchResult" :key="index">
                    <td>{{ index+ 1 }}</td>
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
            <div class="ml-3">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">

                  <li class="page-item" :class="{ 'disabled': !prev }">
                    <a class="page-link" href="#" @click.prevent="getData(active - 1)" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item" v-for="page in pagination" :key="page" :class="{ 'active': page == active }">
                    <a class="page-link" href="#" @click.prevent="getData(page)">{{ page }}</a>
                  </li>
                  <li class="page-item" :class="{ 'disabled': !next }">
                    <a class="page-link" href="#" @click.prevent="getData(active + 1)" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
              <div class="mb-3">
                Showing {{ from }} to {{ to }} of {{ total }} entries
              </div>
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
                    <option v-for="employee in employees.data" v-bind:value="employee.id"
                      v-bind:selected="employee.id == form.employee_id">{{ employee.name }}</option>
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
                  <button type="submit" class="btn btn-primary" v-show="!statusModal" :disabled="disabled">
                    <i v-show="loading" class="fas fa-spinner fa-spin"></i> Simpan
                  </button>
                  <button type="submit" class="btn btn-primary" v-show="statusModal" :disabled="disabled">
                    <i v-show="loading" class="fas fa-spinner fa-spin"></i> Ubah
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>

  </section>
</template>

<script>
import axios from "axios";
import env from "../../../env";
import PageLoader from "../../components/PageLoader.vue";

export default {
  data() {
    return {
      statusModal: false,
      disabled: false,
      loading: false,
      load: [],
      furloughs: [],
      employees: [],
      keyword: '',
      validation: [],
      furloughTypes: [],
      per_page: 30,
      pagination: {},
      search: '',
      active: {},
      prev: {},
      next: {},
      from: '',
      to: '',
      total: '',
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
  components: {
    PageLoader
  },
  methods: {
    showModal() {
      this.form = {}
      this.validation = []
      this.statusModal = false,
        this.loading = false;
      this.disabled = false;
      $("#showModal").modal("show");
    },
    showModalEdit() {
      this.statusModal = true;
      this.loading = false;
      this.disabled = false;
      this.validation = []
      this.form.employee_id = this.form.employees.id
      this.form.furlough_type_id = this.form.furlough_types.id
      this.getData()
      $("#showModal").modal("show");

    },
    getData(page) {
      let url = env.VUE_APP_URL + `furlough?page=${page}`;
      axios
        .get(url, {
          params: {
            per_page: this.per_page,
            keyword: this.keyword
          }
        })
        .then((result) => {
          this.furloughs = result.data.data
          this.pagination = result.data.meta.last_page;
          this.active = result.data.meta.current_page
          this.prev = result.data.links.prev
          this.next = result.data.links.next

          this.from = result.data.meta.from
          this.to = result.data.meta.to
          this.total = result.data.meta.total
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    storeData() {
      this.loading = true;
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

      this.loading = true;
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
        cancelButtonText: "Tidak",
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
    setTimeout(() => this.load = false, 2000);
  },
  computed: {
    searchResult() {
      let employee = this.furloughs
      console.log(this.search)

      if (this.search != '' && this.search) {
        employee = employee.filter((item) => {
          return item.employees.name
            .toUpperCase()
            .includes(this.search.toUpperCase())
            // item.divisions.division_name.toUpperCase.includes(this.search.toUpperCase())
        })
      }
      return employee
    }
  }
}
</script>

