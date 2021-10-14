<template>
    <div class="content">
                <form action="">
                    <div class="flex flex-col">
                        <label for="login-email" class="text-sm">Adresse e-mail</label>
                        <IconUser class="icon" />
                        <input type="email" placeholder="Saisissez votre adresse e-mail" id="login-email" name="loginEmail" class="outline-none p-2 pl-8 border-b-2 border-gray-300 border-solid">
                    </div>

                    <div class="flex flex-col mt-4">
                        <label for="login-password" class="text-sm">Mot de passe</label>
                        <IconKey class="icon" />
                        <input type="password" placeholder="Saisissez votre mot de passe" id="login-password" name="loginPassword" class="outline-none p-2 pl-8 border-b-2 border-gray-300 border-solid">
                        <div class="flex justify-end my-2">
                            <button class="text-xs text-right text-gray-600 hover:text-black duration-300 cursor-pointer outline-none">Mot de passe oublié ?</button>
                        </div>
                    </div>

                    <div class="text-center mt-4 text-white">
                        <button type="submit" class="submit uppercase font-bold tracking-wider w-full h-full py-2 rounded-full">Connexion</button>
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
        background: linear-gradient(90deg, rgba(1,244,254,1) 0%, rgba(234,23,229,1) 100%);
        transition: all .3s ease-in-out;
    }
    .submit:hover {
        filter: brightness(90%);
    }
</style>