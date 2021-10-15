<template>
    <main>
        <Navbar />
        <IndexContent />
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
