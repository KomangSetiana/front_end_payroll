<template>
    <div class=" contaner">
        <h4 class="m-3">Edit Perusahaan</h4>
        <div class="row m-3">
            <div class="col-6">

                <div class=" card rounded shadow">
                    <div class="card-header">
                        <router-link :to="{name :'company'}" class="btn btn-primary btn-sm rounded shadow mb-3"><i
                                class="fas fa-arrow-alt-circle-left"></i> Kembali</router-link>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update">
                            <div class="mb-3">
                                <label for="" class="form-label">Nama Perusahaan</label>
                                <input type="text" class="form-control" v-model="company.company_name">
                                <div v-if="validation.company_name" class="text-danger">
                                    {{ validation.company_name }}
                                </div>
                            </div>
                            <button class="btn btn-primary" @click.prevent="destroy(company.id, index)"><i class="fas fa-save"></i> Simpan</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
        //data binding
        let company = reactive({
            company_name: ''
        });
        const validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() =>{
            axios.get(`http://127.0.0.1:8000/api/company/${route.params.id}`)
            .then((result) => {
                company.company_name = result.data.data.company_name
            }).catch((err) =>{
                console.log(err.response.data)
            })   
        })

        function update() {
            axios.put(`http://127.0.0.1:8000/api/company/${route.params.id}`, company
            )
            .then(() => {
                router.push({
                    name: 'company'
                })
            }).catch((err) => {
                validation.value = err.response.data;
            });
        }
        return {
            company,
            validation,
            router,
            update
        }
    }
}
</script>
