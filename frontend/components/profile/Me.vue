<template>
    <div class="w-1/2 mt-8 sm:mt-0">
        <h2 class="font-bold text-xl mb-8 md:text-left text-center">
            Modifier votre profil
            <span v-if="user.isAdmin == true" class="block font-normal text-xs italic">Vous êtes Administrateur</span>
        </h2>
        <div class="flex flex-col justify-center">
            <ul class=" w-full md:w-3/4">
                <li class="flex justify-between sm:flex-row flex-col items-center relative mb-4">
                    <span class="font-bold">Prénom :</span> {{ user.firstName }}
                </li>
                <li class="flex justify-between sm:flex-row flex-col items-center relative mb-4">
                    <span class="font-bold">Nom :</span> {{ user.lastName }}
                </li>
                <li class="flex justify-between sm:flex-row flex-col items-center relative mb-4">
                    <span class="font-bold">Adresse e-mail :</span> {{ user.email }}
                </li>
                <li class="flex justify-between sm:flex-row flex-col items-center relative mb-4">
                    <span class="font-bold">Mot de passe :</span> •••••••••• <button v-on:click="editPassword = true" class="cursor-pointer sm:absolute -right-10 text-red-500 hover:text-red-700 duration-300"><IconEdit /></button>
                </li>
                <EditPassword @close-password="closePassword" v-if="editPassword" v-bind:key="user.id" :password="user.password" />
            </ul>
            <button type="button" v-on:click="openDeleteAccount = true" class="text-red-500 hover:underline cursor-pointer max-w-max">Supprimer mon compte</button>
        </div>
        <DeleteAccount @close-deleteAccount="closeDeleteAccount" v-if="openDeleteAccount" v-bind:key="user.id" :userId="user.id" :firstName="user.firstName" :lastName="user.lastName" :isAdmin="user.isAdmin" />
    </div>
</template>

<script>
import IconEdit from '~/components/utils/icons/IconEdit.vue';
import EditPassword from '~/components/modales/EditPassword.vue';
import DeleteAccount from '~/components/modales/DeleteAccount.vue';

export default {
    components: {
        IconEdit,
        EditPassword,
        DeleteAccount
    },
    data() {
        return {
            user: {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                isAdmin: ""
            },
            editPassword: false,
            openDeleteAccount: false
        };
    },
    methods: {
        closePassword() {
            this.editPassword = false;
        },
        closeDeleteAccount() {
            this.openDeleteAccount = false;
        }
    },
    mounted() {
        const connection = this.$axios.create({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
        connection.$get("/auth/me").then((res) => {
        this.user = res
        })
        .catch(error => {
            console.log(error)
        })
    }
}
</script>