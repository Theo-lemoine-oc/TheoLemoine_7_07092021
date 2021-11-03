<template>
    <div class="content">
                <form action="">
                    <div class="flex flex-col">
                        <label for="login-email" class="text-sm">Votre prénom</label>
                        <IconUser class="icon" />
                        <input type="texte" placeholder="Saisissez votre prénom" v-model="firstName" class="outline-none p-2 pl-8 border-b-2 border-gray-300 border-solid">
                    </div>

                    <div class="flex flex-col mt-4">
                        <label for="login-email" class="text-sm">Votre nom</label>
                        <IconUserTag class="icon" />
                        <input type="texte" placeholder="Saisissez votre nom" v-model="lastName" class="outline-none p-2 pl-8 border-b-2 border-gray-300 border-solid">
                    </div>

                    <div class="flex flex-col mt-4">
                        <label for="login-email" class="text-sm">Adresse e-mail</label>
                        <IconEnvelope class="icon" />
                        <input type="email" placeholder="Saisissez une adresse e-mail" v-model="email" class="outline-none p-2 pl-8 border-b-2 border-gray-300 border-solid">
                    </div>

                    <div class="flex flex-col mt-4">
                        <label for="login-password" class="text-sm">Mot de passe</label>
                        <IconKey class="icon" />
                        <input type="password" placeholder="Saisissez un mot de passe" v-model="password" class="outline-none p-2 pl-8 border-b-2 border-gray-300 border-solid">
                    </div>

                    <div class="text-center mt-8 text-white">
                        <button @click.prevent="userSignup" type="submit" class="submit uppercase font-bold tracking-wider w-full h-full py-2 rounded-full">Inscription</button>
                    </div>
                </form>
            </div>
</template>

<script>
import IconUser from '~/components/utils/icons/IconUser.vue';
import IconUserTag from '~/components/utils/icons/IconUserTag.vue';
import IconEnvelope from '~/components/utils/icons/IconEnvelope.vue';
import IconKey from '~/components/utils/icons/IconKey.vue';

import { mapState } from 'vuex';

export default {
    components: {
        IconUser,
        IconUserTag,
        IconEnvelope,
        IconKey
    },
    data() {
        return {
            email: null,
            firstName: null,
            lastName: null,
            password: null
        };
    },
    computed: {
        ...mapState(['user'])    
    },
    methods: {
        userSignup() {
            const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;


            if ((this.email !== null || this.firstName !== null || this.lastName !== null || this.password !== null) && (EMAIL_REGEX.test(this.email) && PASSWORD_REGEX.test(this.password))) {
                this.$axios.post('/auth/signup', {
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                password: this.password 
                })
                .then(function (response) {
                    location.replace("/login");
                })
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                console.log('missing parameters')
            }
        }
    },
    created () {
        this.userSignup();
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