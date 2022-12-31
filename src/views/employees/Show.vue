<template>
    <PageLoader v-if="employee.length <= 0 " />
      <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-12 ">
      <p>Karyawan Atas Nama,</p> <h4>{{ employee.name }}</h4>
      </div>
    </div>
  </div>
    <section class="content justify-content-center">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card text-center">
                        <div class="card-header bg-primary  ">
                            Biota Lengkap
                        </div>
                        <div class="card-body">
                         
                            <h6>Nama : {{ employee.name }}</h6>
                            <h6>Nik : {{ employee.nik}}</h6>
                            <h6>Tempat Lahir : {{ employee.place_of_birth }}</h6>
                            <h6>Tanggal Lahir : {{ employee.date_of_birth }}</h6>
                            <h6>Alamat : {{ employee.address }}</h6>
                            <h6>Jenis Kelamin : {{ employee.gender }}</h6>
                            <h6>No. Telepon : {{ employee.phone }}</h6>
                            <h6>Agama : {{ employee.religion }}</h6>
                            <h6>Karyawan : {{ employee.type }}</h6>
                        </div>
                        <div class="card-footer text-muted ">
                            <router-link to="/employees" class="btn btn-primary">
                                <i class="fas fa-angle-double-left"></i> Kembali
                            </router-link>
                     
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import env from '../../../env'
import PageLoader from '../../components/PageLoader.vue';


export default {
    data() {
        return {
            employee: []
        };
    },
    methods: {
        getData() {
            let url = env.VUE_APP_URL + `employee/${this.$route.params.id}`;
            axios.get(url)
                .then((result) => {
                this.employee = result.data.data;
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
    },
    mounted() {
        this.getData();
    },
    components: { PageLoader }
}
</script>

