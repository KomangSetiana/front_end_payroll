<template>
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-12">
        <h3>Daftar Tipe Tunjangan</h3>
      </div>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header">
              <button type="button" class="btn btn-primary" data-toggle="modal" @click="showModal()">
                <i class="fas fa-user-plus"></i>Tambah Tipe Tunjangan
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
                    <th>Tipe Tunjangan</th>
                    <th>status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(allowancetype, index) in allowancetypes.data" :key="index">
                    <td>{{ allowancetype.id }}</td>
                    <td>{{ allowancetype.allowance_name }}</td>
                    <td>{{ allowancetype.status }}</td>
                    <td>
                      <div class="btn-group">
                        <button class="btn btn-sm btn-warning rounded mr-2"
                          @click="showModalEdit(form = allowancetype)">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger rounded" @click="destroy(allowancetype.id)">
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
              <h5 class="modal-title" id="exampleModalLabel" v-show="!statusModal"> Tambah Divisi</h5>
              <h5 class="modal-title" id="exampleModalLabel" v-show="statusModal"> Update Divisi</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="statusModal ? update() : storeData()">
                <div class="mb-3">
                  <label for="" class="form-label">Tipe Tunjangan</label>
                  <input type="text" class="form-control" v-model="form.allowance_name">
                  <label for="" class="form-label">Status</label>
                  <select id="" class="form-select" v-model="form.status">
                    <option value="permanent">Permanen</option>
                    <option value="non_permanent">Tidak Permanen</option>
                  </select>
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

export default {
  data() {
    return {
      statusModal: false,
      allowancetypes: [],
      form: {
        id: '',
        allowance_name: '',
        status: ''
      }
    };
  },

  methods: {
    showModal() {
      this.statusModal = false,
        $("#showModal").modal("show");
    },
    showModalEdit() {
      this.statusModal = true;
      $("#showModal").modal("show");

    },
    getData() {
      let url = env.VUE_APP_URL + "allowancetype/";
      axios
        .get(url, {
          params: {
            per_page: this.per_page,
            keyword: this.keyword,
          },
        })
        .then((result) => {
          this.allowancetypes = result.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    storeData() {

      let url = env.VUE_APP_URL + "allowancetype";
      axios.post(url, this.form)
        .then(() => {
          this.getData()
          $("#showModal").modal("hide")
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tambah Tipe Tunjangan Berasil',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err) => {
          this.validation = err.response;
        });
    },
    update() {
      let url = env.VUE_APP_URL + 'allowancetype/' + this.form.id
      axios.put(url, this.form)
        .then(() => {
          this.getData()
          $("#showModal").modal("hide")
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Update Tipe Tunjangan Berasil',
            showConfirmButton: false,
            timer: 1500
          })
        }).catch((err) => {
          this.validation = err.response.data
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
          let url = env.VUE_APP_URL + `allowancetype/${id}`
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
              this.$swal.fire({
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

  },

}
</script>
