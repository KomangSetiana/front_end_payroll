<template>
    <div class=" contaner">
        <h4 class="m-3">Tambah Tipe Tunjangan</h4>
        <div class="row m-3">
            <div class="col-6">

                <div class=" card rounded shadow">
                    <div class="card-header">
                        <router-link :to="{name: 'allowancetype'}" class="btn btn-primary btn-sm rounded shadow mb-3"><i
                                class="fas fa-arrow-alt-circle-left"></i> Kembali</router-link>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="mb-3">
                                <label for="" class="form-label">Tipe Tunjangan</label>
                                <input type="text" class="form-control" v-model="allowancetype.allowance_name">
                                <div v-if="validation.allowance_name" class="text-danger">
                                    {{ validation.allowance_name }}
                                </div>
                                <label for="" class="form-label">Status</label>
                                <select id="" class="form-select" v-model="allowancetype.status" >
                                    <option value="permanent">Permanen</option>
                                    <option value="non_permanent">Tidak Permanen</option>
                                </select>
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
        const allowancetype = reactive({
            allowance_name: '',
            status: ''
        });
        const validation = ref([]);

        const router = useRouter();

        function store() {
            axios.post('http://127.0.0.1:8000/api/allowancetype', allowancetype
            )
                .then(() => {
                    router.push({
                        name: 'allowancetype'
                    })
                }).catch((err) => {
                    validation.value = err.response.data;
                });
        }
        return {
            allowancetype,
            validation,
            router,
            store
        }
    }
}
</script>
