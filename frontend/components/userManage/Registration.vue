<template>
    <section class="flex justify-center items-center w-screen h-screen relative overflow-hidden">
        <!-- background blur effect -->
        <div class="blur-1 w-full h-full max-w-sm max-h-40 absolute blur bg-white opacity-10 rounded-xl"></div>
        <div class="blur-2 w-full h-full max-w-sm max-h-40 absolute blur bg-white opacity-10 rounded-xl"></div>
        <div class="blur-3 w-full h-full max-w-sm max-h-40 absolute blur bg-black opacity-10 rounded-xl"></div>

        <div class="bg-white h-full w-full max-w-sm max-h-40 rounded-lg shadow-2xl px-12">
            <!-- title -->
            <RegisterTitle />

            <!-- form connexion -->
            <RegisterContent />

            <!-- bottom card -->
            <RegisterBottom />
        </div>
    </section>
</template>

<script>
import RegisterTitle from '~/components/userManage/registration/RegisterTitle.vue';
import RegisterContent from '~/components/userManage/registration/RegisterContent.vue';
import RegisterBottom from '~/components/userManage/registration/RegisterBottom.vue';

export default {
    components: {
        RegisterTitle,
        RegisterContent,
        RegisterBottom,
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