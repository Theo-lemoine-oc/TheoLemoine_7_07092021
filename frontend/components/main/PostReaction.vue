<template>
    <div class="px-4 py-2">
        <div class="flex">
            <IconHeart class="text-2xl cursor-pointer" />
            <IconShare class="text-2xl ml-2 cursor-pointer" />
        </div>
        <span class="text-sm font-bold">0 j'aimes</span>
    </div>
</template>

<script>
    import IconHeart from '~/components/utils/icons/IconHeart.vue';
    import IconShare from '~/components/utils/icons/IconShare.vue';

    export default {
        components: {
            IconHeart,
            IconShare
        }
    }
</script>