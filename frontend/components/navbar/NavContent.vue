<template>
    <div class="space-x-8 text-lg flex items-center">
        <nuxt-link to="/" class="text-white duration-200 ease-linear text-xl"><IconHome /></nuxt-link>
        <nuxt-link to="/me" class="text-white duration-200 ease-linear text-xl"><IconUser /></nuxt-link>
        <button type="button" @click="disconnectAccount" class="text-white duration-200 ease-linear text-xl"><IconDoor /></button>
    </div>
</template>

<script>
import IconDoor from '~/components/utils/icons/IconDoor.vue';
import IconHome from '~/components/utils/icons/IconHome.vue';
import IconUser from '~/components/utils/icons/IconUser.vue';

export default {
    components: {
        IconDoor,
        IconHome,
        IconUser
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