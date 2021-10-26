<template>
    <div class="content">
                <form submit="formSubmit">
                    <div class="flex flex-col">
                        <label for="login-email" class="text-sm">Adresse e-mail</label>
                        <IconUser class="icon" />
                        <input type="email" placeholder="Saisissez votre adresse e-mail" v-model="email" class="outline-none p-2 pl-8 border-b-2 border-gray-300 border-solid">
                    </div>

                    <div class="flex flex-col mt-4">
                        <label for="login-password" class="text-sm">Mot de passe</label>
                        <IconKey class="icon" />
                        <input type="password" placeholder="Saisissez votre mot de passe" v-model="password" class="outline-none p-2 pl-8 border-b-2 border-gray-300 border-solid">
                        <div class="flex justify-end my-2">
                            <nuxt-link to="login" class="text-xs text-right text-gray-600 hover:text-black duration-300 cursor-pointer outline-none">Mot de passe oublié ?</nuxt-link>
                        </div>
                    </div>

                    <div class="text-center mt-4 text-white">
                        <button @click="userLogin()" class="submit uppercase font-bold tracking-wider w-full h-full py-2 rounded-full">Connexion</button>
                    </div>
                </form>
            </div>
</template>

<script>
import IconUser from '~/components/utils/icons/IconUser.vue';
import IconKey from '~/components/utils/icons/IconKey.vue';

export default {
    components: {
        IconUser,
        IconKey
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        userLogin() {
            this.$axios.post('/auth/login', {
            email: this.email,
            password: this.password 
            })
            .then(function (response) {
                window.location = '/';
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    created () {
        this.userLogin();
    }
}
</script>

<style scoped>
    .content {
        height: 50%;
    }

    .icon {
        transform: translateY(25px);
    }

    .submit {
        background: linear-gradient(209deg, rgba(234,23,23,1) 10%, rgba(116,0,0,1) 100%);
        transition: all .3s ease-in-out;
    }
    .submit:hover {
        filter: brightness(90%);
    }
</style>