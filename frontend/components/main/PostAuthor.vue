<template>
    <div class="flex items-center justify-between p-4">
        <div class="flex items-center">
            <img src="~/assets/img/profil.jpg" alt="Photo de profil de l'utilisateur" class="w-10 rounded-full border border-black">
            <div class="ml-4">
                <h2 class="text-base font-bold">Théo Lemoine</h2>
                <span class="text-xs">20 octobre 2021, 00:16</span>
            </div>
        </div>
        <div>
            <IconDots />
        </div>
    </div>
</template>

<script>
import IconDots from '~/components/utils/icons/IconDots.vue';

export default {
    components: {
        IconDots
    }
}
</script>