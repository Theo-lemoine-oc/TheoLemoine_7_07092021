<template>
    <div class="space-x-8 text-lg flex items-center">
        <nuxt-link to="/" class="text-white duration-200 ease-linear">Accueil</nuxt-link>            
        <nuxt-link to="/" class="text-white duration-200 ease-linear">Messages</nuxt-link>
        <nuxt-link to="/me" class="text-white duration-200 ease-linear">Mon profil</nuxt-link>
        <button type="button" @click="disconnectAccount" class="text-white duration-200 ease-linear"><IconDoor /></button>
    </div>
</template>

<script>
import IconDoor from '~/components/utils/icons/IconDoor.vue';

export default {
    components: {
        IconDoor
    },
    data() {
        return {
            user: {
                id: "",
                firstName: "",
                lastName: "",
                isAdmin: ""
            }
        }
    },
    methods: {
        disconnectAccount() {
            const connection = this.$axios.create({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            connection.$get(`/auth/me`).then((res) => {
            localStorage.clear();
            location.replace(location.origin + "/login");
            })
            .catch(error => {
                console.log(error)
            })  
        },
    }
}
</script>

<style scoped>
    .text-white:hover {
        color: #00e1ff;
    }
</style>