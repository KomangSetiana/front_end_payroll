<template>
  <PageLoader v-if="employees.length <= 0 ? employees.length : load" />
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h3>Daftar Karyawan</h3>
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
                <i class="fas fa-user-plus"></i> Karyawan
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
                    <th>Divisi</th>
                    <th>Perusahaan</th>
                    <th>Jabatan</th>
                    <th>Alamat</th>
                    <th>Tipe</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(employee, index) in searchResult" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ employee.name }}</td>
                    <td>{{ employee.divisions.division_name }}</td>
                    <td>{{ employee.companies.company_name }}</td>
                    <td>{{ employee.posisitions.posisition_name }}</td>
                    <td>{{ employee.address }}</td>
                    <td>{{ employee.type }}</td>
                    <td>
                      <div class="btn-group">
                        <router-link :to="{
                          name: 'employees.show',
                          params: { id: employee.id },
                        }" class="btn btn-sm btn-info rounded mr-1">
                          <i class="fas fa-eye"></i>
                        </router-link>
                        <button class="btn btn-sm btn-warning rounded mr-2" @click="showModalEdit(form = employee)">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger rounded ml-1" @click="destroy(employee.id)">
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
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" v-show="!statusModal">
                Tambah Karyawan
              </h5>
              <h5 class="modal-title" id="exampleModalLabel" v-show="statusModal">
                Update Karyawan
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row" @submit.prevent="statusModal ? update() : storeData()">
                <div class="col-md-6">
                  <label for="name" class="form-label">Nama</label>
                  <input type="text" class="form-control" id="name" v-model="form.name" />
                  <div v-if="validation.name" class="text-danger">
                    {{ validation.name[0] }}
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="nik" class="form-label">Nik</label>
                  <input type="number" class="form-control" id="inputPassword4" v-model="form.nik" />
                  <div v-if="validation.nik" class="text-danger">
                    {{ validation.nik[0] }}
                  </div>
                </div>
                <div class="col-md-4">
                  <label for="" class="form-label">Perusahaan</label>
                  <select id="" class="form-select" v-model="form.company_id">
                    <!-- <option  selected >pilih...</option> -->
                    <option v-for="company in companies.data" :value="company.id">
                      {{ company.company_name }}
                    </option>
                  </select>
                  <div v-if="validation.company_id" class="text-danger">
                    {{ validation.company_id[0] }}
                  </div>
                </div>
                <div class="col-md-4">
                  <label for="" class="form-label">Divisi</label>
                  <select id="" class="form-select" v-model="form.division_id">
                    <option v-for="division in divisions.data" :value="division.id">
                      {{ division.division_name }}
                    </option>
                  </select>
                  <div v-if="validation.division_id" class="text-danger">
                    {{ validation.division_id[0] }}
                  </div>
                </div>
                <div class="col-md-4">
                  <label for="" class="form-label">Jabatan</label>
                  <select id="" class="form-select" v-model="form.posisition_id">
                    <option v-for="posisition in posisitions.data" :value="posisition.id">
                      {{ posisition.posisition_name }}
                    </option>
                  </select>
                  <div v-if="validation.posisition_id" class="text-danger">
                    {{ validation.posisition_id[0] }}
                  </div>
                </div>
                <div class="col-12">
                  <label for="inputAddress2" class="form-label">Alamat</label>
                  <input type="text" class="form-control" id="inputAddress2" v-model="form.address" />
                  <div v-if="validation.address" class="text-danger">
                    {{ validation.address[0] }}
                  </div>
                </div>
                <div class="col-md-4">
                  <label for="inputCity" class="form-label">Tempat Lahir</label>
                  <input type="text" class="form-control" id="inputCity" v-model="form.place_of_birth" />
                  <div v-if="validation.place_of_birth" class="text-danger">
                    {{ validation.place_of_birth[0] }}
                  </div>
                </div>
                <div class="col-md-4">
                  <label for="inputZip" class="form-label">Tanggal Lahir</label>
                  <input type="date" class="form-control" id="inputZip" v-model="form.date_of_birth" />
                  <div v-if="validation.date_of_birth" class="text-danger">
                    {{ validation.date_of_birth[0] }}
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="" class="form-label">Jenis Kelamin</label>
                  <select id="" class="form-select" v-model="form.gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <div v-if="validation.gender" class="text-danger">
                    {{ validation.gender[0] }}
                  </div>
                </div>

                <div class="col-md-4">
                  <label for="inputCity" class="form-label">Telepon</label>
                  <input type="number" class="form-control" id="inputCity" v-model="form.phone" />
                  <div v-if="validation.phone" class="text-danger">
                    {{ validation.phone[0] }}
                  </div>
                </div>
                <div class="col-md-4">
                  <label for="inputCity" class="form-label">Agama</label>
                  <input type="text" class="form-control" id="inputCity" v-model="form.religion" />
                  <div v-if="validation.religion" class="text-danger">
                    {{ validation.religion[0] }}
                  </div>
                </div>
                <div class="col-md-3">
                  <label for="inputState" class="form-label">Tipe</label>
                  <select id="inputState" class="form-select" v-model="form.type">
                    <option value="contract">Contract</option>
                    <option value="daily">Daily</option>
                  </select>
                  <div v-if="validation.type" class="text-danger">
                    {{ validation.type[0] }}
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
      per_page: 30,
      loading: false,
      load: [],
      employees: [],
      validation: [],
      companies: [],
      divisions: [],
      posisitions: [],
      pagination: {},
      search: '',
      active: {},
      prev: {},
      next: {},
      from: '',
      to: '',
      total: '',
      form: {
        id: "",
        companies: {
          id: "",
          company_name: "",
        },
        posisitions: {
          id: "",
          posisition_name: "",
        },
        divisions: {
          id: "",
          division_name: "",
        },
      },
    };
  },
  components: {
    PageLoader,
  },
  methods: {
    showModal() {
      this.form = {};
      this.validation = [];
      this.statusModal = false,
        this.loading = false;
      this.disabled = false;
      $("#showModal").modal("show");
    },
    showModalEdit() {
      this.statusModal = true,
        this.loading = false;
      this.disabled = false;
      this.validation = []
      this.form.company_id = this.form.companies.id
      this.form.division_id = this.form.divisions.id
      this.form.posisition_id = this.form.posisitions.id
      this.getData();
      $("#showModal").modal("show");
    },
    getData(page) {
      let url = env.VUE_APP_URL + `employee?page=${page}`;
      axios
        .get(url, {
          params: {
            per_page: this.per_page,
            keyword: this.keyword,
          },
        })
        .then((result) => {
          this.employees = result.data.data;
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
      let url = env.VUE_APP_URL + "employee";
      axios
        .post(url, this.form)
        .then(() => {
          this.getData();
          $("#showModal").modal("hide");
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Tambah Karyawan Berasil",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          this.validation = err.response.data.errors;
        });
    },
    update() {
      this.loading = true;
      let url = env.VUE_APP_URL + "employee/" + this.form.id;
      axios
        .put(url, this.form)
        .then(() => {
          this.getData();
          $("#showModal").modal("hide");
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Update Karyawan Berasil",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          this.validation = err.response.data.errors;
        });
    },
    destroy(id) {
      this.$swal
        .fire({
          title: "Anda Yakin Mau Hapus ?",
          text: "Data Akan Hilang!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Tidak",
          confirmButtonText: "Ya, Yakin!",
        })
        .then((result) => {
          if (result.value) {
            let url = env.VUE_APP_URL + `employee/${id}`;
            axios
              .delete(url)
              .then(() => {
                this.$swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Delete Data Berasil",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.getData();
              })
              .catch(() => {
                this.$swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Delete Data Gagal",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
          }
        });
    },
    getCompany() {
      let url = env.VUE_APP_URL + "company";
      axios
        .get(url)
        .then((result) => {
          this.companies = result.data;
        })
        .catch((err) => {
          this.validation = err.response.data;
        });
    },
    getDivision() {
      let url = env.VUE_APP_URL + "division";
      axios
        .get(url)
        .then((result) => {
          this.divisions = result.data;
        })
        .catch((err) => {
          this.validation = err.response.data;
        });
    },
    getPosisition() {
      let url = env.VUE_APP_URL + "posisition";
      axios
        .get(url)
        .then((result) => {
          this.posisitions = result.data;
        })
        .catch((err) => {
          this.validation = err.response.data;
        });
    },
  },
  mounted() {

    this.getData()
    this.getCompany();
    this.getDivision();
    this.getPosisition();
    setTimeout(() => (this.load = false), 2000);
  },
  computed: {
    searchResult() {
      let employee = this.employees
      console.log(this.search)

      if (this.search != '' && this.search) {
        employee = employee.filter((item) => {
          return item.name
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
