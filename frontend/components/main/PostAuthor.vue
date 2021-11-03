<template>
    <div class="flex items-center justify-between p-4">
        <div class="flex items-center">
            <img src="~/assets/img/profil.jpg" alt="Photo de profil de l'utilisateur" class="w-10 rounded-full border border-black">
            <div class="ml-4">
                <h2 class="text-base font-bold"><nuxt-link to="" class="hover:underline">{{ author }}</nuxt-link></h2>
                <span class="text-xs">20 octobre 2021, 00:16</span>
            </div>
        </div>
        <div class="relative">
            <button id="editMessage" class="w-full flex justify-end">
                <IconDots />
            </button>
            <EditMessage class="absolute -left-44 hidden" />
        </div>
    </div>
</template>

<script>
import IconDots from '~/components/utils/icons/IconDots.vue';
import EditMessage from '~/components/modales/EditMessage.vue';

export default {
    components: {
        IconDots,
        EditMessage
    },
    computed: {
        author() {
            return `${this.firstName} ${this.lastName}`
        }
    },
    props: {
        firstName: String,
        lastName: String
    }
}
</script>