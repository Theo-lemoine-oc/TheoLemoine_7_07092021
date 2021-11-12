<template>
    <main>
        <Navbar />
        <div class="min-screen-h h-full flex justify-center py-8 bg-gray-50">
            <IndexContent />
        </div>
    </main>
</template>

<script>
    import Navbar from '~/components/navbar/Navbar.vue';
    import IndexContent from '~/components/main/IndexContent.vue';

    export default {
        components: {
            Navbar,
            IndexContent
        }
    }
</script>

<style scoped>
    .min-screen-h {
        min-height: 91vh;
    }
</style>