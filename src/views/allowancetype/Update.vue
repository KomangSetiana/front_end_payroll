<template>
    <div class=" contaner">
        <h4 class="m-3">Edit Tipe Tunjangan</h4>
        <div class="row m-3">
            <div class="col-6">

                <div class=" card rounded shadow">
                    <div class="card-header">
                        <router-link :to="{name: 'allowancetype'}" class="btn btn-primary btn-sm rounded shadow mb-3"><i
                                class="fas fa-arrow-alt-circle-left"></i> Kembali</router-link>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update">
                            <div class="mb-3">
                                <label for="" class="form-label">Tipe Cuti</label>
                                <input type="text" class="form-control" v-model="allowancetype.allowance_name">
                                <div v-if="validation.allowance_name" class="text-danger">
                                    {{ validation.allowance_name }}
                                </div>
                                <label for="" class="form-label">Status</label>
                                <input type="text" class="form-control" v-model="allowancetype.status">
                                <div v-if="validation.status" class="text-danger">
                                    {{ validation.status }}
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
import { reactive, ref, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
        //data binding
        let allowancetype = reactive({
            allowance_name: '',
            status: ''
        });
        const validation = ref([]);

        const router = useRouter();
        const route = useRoute();

        onMounted(() =>{
            axios.get(`http://127.0.0.1:8000/api/allowancetype/${route.params.id}`)
            .then((result) => {
                allowancetype.allowance_name = result.data.data.allowance_name
                allowancetype.status = result.data.data.status
            }).catch((err) =>{
                console.log(err.response.data)
            })   
        })

        function update() {
            axios.put(`http://127.0.0.1:8000/api/allowancetype/${route.params.id}`, allowancetype
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
            update
        }
    }
}
</script>
