<template>
    <li class="nav-item">
        <router-link class="nav-link" :to="link" :class="{ active : isActive()}">
            <i class="nav-icon" :class="icon" v-if="icon"></i>

        </router-link>
    </li>
</template>

<script>
export default {
    props: {
        icon:{
            type: String,
            default: null
        },
        link:{
            type: [String,Object],
            default : null
        },
        medtods: {
            isActive(){
                if(typeof this.link ==="object"){
                    return this.$route.name === this.link.name;
                }else {
                    return this.$route.path === this.link;
                }
            }
        }
    }
}
</script>