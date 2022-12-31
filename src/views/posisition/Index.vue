<template>
  <PageLoader v-if="posisitions.length <= 0 ? posisitions.length : load" />
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-12">
        <h3>Daftar Jabatan</h3>
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
                <i class="fas fa-user-plus"></i> Jabatan
              </button>
              <form class="col-6 ms-auto" @submit.prevent="getData()">
              <div class="input-group">
                <input type="text" class="form-control" v-model="keyword">
                <div class="input-group-append">
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-search"></i> 
                  </button>
                </div>
              </div>
              </form>
            </div>
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Jabatan</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(posisition, index) in posisitions" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ posisition.posisition_name }}</td>
                    <td>
                      <div class="btn-group">
                        <button class="btn btn-sm btn-warning rounded mr-2" @click="showModalEdit(form = posisition)">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger rounded" @click="destroy(posisition.id)">
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
              <h5 class="modal-title" id="exampleModalLabel" v-show="!statusModal"> Tambah Jabatan</h5>
              <h5 class="modal-title" id="exampleModalLabel" v-show="statusModal"> Update Jabatan</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="statusModal ? update() : storeData()">
                <div class="mb-3">
                  <label for="" class="form-label"> Jabatan</label>
                  <input type="text" class="form-control" v-model="form.posisition_name">
                  <div v-if="validation.posisition_name" class="text-danger">
                    {{ validation.posisition_name[0] }}
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
      validation: [],
      posisitions: [],
      load: [],
      form: {
        id: '',
        posisition_name: ''
      }
    };
  },
  components: {
    PageLoader
  },

  methods: {
    showModal() {
      this.validation = []
      this.form = {}
      this.statusModal = false,
        $("#showModal").modal("show");
    },
    showModalEdit() {
      this.validation = []
      this.statusModal = true;
      this.getData()
      $("#showModal").modal("show");

    },
    getData() {
      let url = env.VUE_APP_URL + "posisition/";
      axios
        .get(url, {
          params: {
            per_page: this.per_page,
            keyword: this.keyword,
          },
        })
        .then((result) => {
          this.posisitions = result.data.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    storeData() {

      let url = env.VUE_APP_URL + "posisition";
      axios.post(url, this.form)
        .then(() => {
          this.getData()
          $("#showModal").modal("hide")
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tambah Jabatan Berasil',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err) => {
          this.validation = err.response.data.errors;
        });
    },
    update() {
      let url = env.VUE_APP_URL + 'posisition/' + this.form.id
      axios.put(url, this.form)
        .then(() => {
          this.getData()
          $("#showModal").modal("hide")
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Update Jabatan Berasil',
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
          let url = env.VUE_APP_URL + `posisition/${id}`
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
    }
  },

  mounted() {
    this.getData();
    setTimeout(() => this.load = false, 2000);
  },

}
</script>
