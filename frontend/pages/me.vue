<template>
    <main class="bg-gray-50 h-screen">
        <Navbar />
        <h1 class="text-center font-bold text-4xl my-8">Paramètres de votre compte</h1>
        <div class="bg-white shadow-md w-1/2 mx-auto p-8 flex items-center rounded">
            <div class="w-1/2">
                <img src="~/assets/img/profil.jpg" alt="Photo de profil de l'utilisateur" class="w-40 rounded-full border border-black">
            </div>
            <div class="w-1/2">
                <h2 class="font-bold text-xl mb-8">Modifier votre profil</h2>
                <div class="flex flex-col justify-center">
                    <ul class="w-2/3">
                        <li class="flex justify-between items-center relative mb-4">
                            <span class="font-bold">Prénom :</span> {{ user.firstName }}
                        </li>
                        <li class="flex justify-between items-center relative mb-4">
                            <span class="font-bold">Nom :</span> {{ user.lastName }}
                        </li>
                        <li class="flex justify-between items-center relative mb-4">
                            <span class="font-bold">Adresse e-mail :</span> {{ user.email }}
                        </li>
                        <li class="flex justify-between items-center relative mb-4">
                            <span class="font-bold">Mot de passe :</span> •••••••••• <button v-on:click="editPassword()" class="cursor-pointer absolute -right-10 text-red-500 hover:text-red-700 duration-300"><IconEdit /></button>
                        </li>
                        <EditPassword id="editPassword" v-bind:key="user.id" :password="user.password" class="hidden" />
                    </ul>
                    <button type="button" @click="deleteAccount" class="text-red-500 hover:underline cursor-pointer max-w-max">Supprimer mon compte</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import IconEdit from '~/components/utils/icons/IconEdit.vue';
    import EditPassword from '~/components/modales/editPassword.vue';

    export default {
        head: {
            title: 'Groupomania | Mon profil'
        },
        components: {
            IconEdit,
            EditPassword,
        },
        data() {
            return {
                user: {
                    id: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: ""
                }
            };
        },
        methods: {
            deleteAccount() {
              const connection = this.$axios.create({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } })

                connection.$get("/auth/me").then((res) => {
                this.user = res
                })
                .catch(error => {
                    console.log(error)
                }),
                connection.$delete("/auth/:id").then((res) => {
                localStorage.clear();
                location.replace(location.origin + "/#/signup");
                })
                .catch(error => {
                    console.log(error)
                })  
            },
            editPassword() {
                const editPassword = document.getElementById('editPassword');
                editPassword.classList.remove('hidden');
            }
        }
    }
</script>

<style scoped>
    .mx-auto {
        margin-left: auto;
        margin-right: auto;
    }
</style>