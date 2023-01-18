<template>
    <PageLoader v-if="employee.length <= 0" />
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-12 ">
                <p>Karyawan Atas Nama,</p>
                <h4>{{ employee.name }}</h4>
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
                        <div class="card-body row">
                            <div class="col-6  ">
                                <p>Nama : </p>
                                <p>Nik : </p>
                                <p>Tempat Lahir : </p>
                                <p>Tanggal Lahir : </p>
                                <p>Alamat : </p>
                                <p>Jenis Kelamin : </p>
                                <p>No.Telepon : </p>
                                <p>Agama : </p>
                                <p>Status : </p>
                            </div>
                            <div class="col-6 text-left">
                                <p>{{ employee.name }}</p>
                                <p>{{ employee.nik }}</p>
                                <p>{{ employee.place_of_birth }}</p>
                                <p>{{ employee.date_of_birth }}</p>
                                <p>{{ employee.address }}</p>
                                <p>{{ employee.gender }}</p>
                                <p>{{ employee.phone }}</p>
                                <p>{{ employee.religion }}</p>
                                <p>{{ employee.type }}</p>

                            </div>
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
<!-- <h6>Nama : {{ employee.name }}</h6>
<h6>Nik : {{ employee.nik}}</h6>
<h6>Tempat Lahir : {{ employee.place_of_birth }}</h6>
<h6>Tanggal Lahir : {{ employee.date_of_birth }}</h6>
<h6>Alamat : {{ employee.address }}</h6>
<h6>Jenis Kelamin : {{ employee.gender }}</h6>
<h6>No. Telepon : {{ employee.phone }}</h6>
<h6>Agama : {{ employee.religion }}</h6>
<h6>Karyawan : {{ employee.type }}</h6> -->
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

