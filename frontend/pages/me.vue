<template>
    <main class="bg-gray-50 h-screen">
        <Navbar />
        <h1 class="text-center font-bold text-4xl my-8">Paramètres de votre compte</h1>
        <div class="bg-white shadow-md w-11/12 md:flex-row flex-col lg:w-4/5 xl:w-3/5 2xl:w-1/2 mx-auto p-8 flex items-center rounded">
            <div class="w-1/2 flex justify-center">
                <img src="~/assets/img/profil.jpg" alt="Photo de profil de l'utilisateur" class="md:w-40 rounded-full border border-black">
            </div>
            <Me />
        </div>
    </main>
</template>

<script>
import Me from '~/components/profile/Me.vue';

export default {
    head: {
        title: 'Groupomania | Mon profil'
    },
    components: {
        Me
    }
}
</script>

<style scoped>
    .mx-auto {
        margin-left: auto;
        margin-right: auto;
    }
</style>