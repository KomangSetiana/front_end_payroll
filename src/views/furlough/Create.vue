<template>
    <div class=" contaner">
        <h4 class="m-3">Tambah Cuti Karyawan</h4>
        <div class="row m-3">
            <div class="col-8">

                <div class=" card rounded shadow">
                    <div class="card-header">
                        <router-link :to="{name : 'furlough'}" class="btn btn-primary btn-sm rounded shadow mb-3"><i
                                class="fas fa-arrow-alt-circle-left"></i> Kembali</router-link>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="mb-3">
                                <label for="" class="form-label">Nama</label>
                                <input type="text" class="form-control" v-model="furlough.name">
                                <div v-if="validation.name" class="text-danger">
                                    {{ validation.name }}
                                </div>
                                <label for="" class="form-label">Tipe Cuti</label>
                                <select id="" class="form-select" v-model="furlough.furlough_type">
                                    <option value="permanent">Permanen</option>
                                    <option value="non_permanent">Tidak Permanen</option>
                                </select>
                                <label for="" class="form-label">Tanggal</label>
                                <input type="text" class="form-control" v-model="furlough.date">
                                <div v-if="validation.date" class="text-danger">
                                    {{ validation.date }}
                                </div>
                                <label for="floatingTextarea2">Deskripsi</label>
                                <div class="form-floating">
                                    <textarea class="form-control" placeholder="Leave a comment here"
                                        id="floatingTextarea2" style="height: 100px"></textarea>

                                </div>
                            </div>
                            <button class="btn btn-primary"><i class="fas fa-save"></i> Simpan</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
        //data binding
        const furlough = reactive({
            name: '',
            status: ''
        });
        const validation = ref([]);

        const router = useRouter();

        function store() {
            axios.post('http://127.0.0.1:8000/api/furlough', furlough
            )
                .then(() => {
                    router.push({
                        name: 'furlough'
                    })
                }).catch((err) => {
                    validation.value = err.response.data;
                });
        }
        return {
            furlough,
            validation,
            router,
            store
        }
    }
}
</script>
