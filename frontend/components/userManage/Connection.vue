<template>
    <section class="flex justify-center items-center w-screen h-screen relative overflow-hidden">
        <!-- background blur effect -->
        <div class="blur-1 w-full h-full max-w-sm max-h-40 absolute bg-white opacity-10 rounded-xl"></div>
        <div class="blur-2 w-full h-full max-w-sm max-h-40 absolute bg-white opacity-10 rounded-xl"></div>
        <div class="blur-3 w-full h-full max-w-sm max-h-40 absolute bg-black opacity-10 rounded-xl"></div>

        <div class="bg-white h-full w-full max-w-sm max-h-40 rounded-lg shadow-2xl px-12">
            <!-- title -->
            <LoginTitle />

            <!-- form connexion -->
            <LoginContent />

            <!-- bottom card -->
            <LoginBottom />
        </div>
    </section>
</template>

<script>
import LoginTitle from '~/components/userManage/login/LoginTitle.vue';
import LoginContent from '~/components/userManage/login/LoginContent.vue';
import LoginBottom from '~/components/userManage/login/LoginBottom.vue';

export default {
    components: {
        LoginTitle,
        LoginContent,
        LoginBottom
    }
}
</script>

<style scoped>
    section {
        background: linear-gradient(210deg, rgba(234,23,229,1) 10%, rgba(1,244,254,1) 100%);
    }

    .max-h-40 {
        max-height: 40rem;
    }

    .blur-1 {
        transform: rotate(159deg);
        top: -250px;
        left: -300px;
    }

    .blur-2 {
        transform: rotate(245deg);
        top: 700px;
        left: 400px;
    }

    .blur-3 {
        transform: rotate(150deg);
        top: 200px;
        left: 1800px;
    }
</style>