<template>
    <div>
        <IconSearch class="icon" />
        <input type="text" placeholder="Rechercher.." class="rounded-full px-10 py-2 outline-none w-64">     
    </div>
</template>

<script>
    import IconSearch from '~/components/utils/icons/IconSearch.vue';

    export default {
        components: {
            IconSearch
        }
    }
</script>

<style scoped>
    .icon {
            transform: translateY(5px);
            margin-left: .5rem;
        }
</style>