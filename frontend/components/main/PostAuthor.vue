<template>
    <div class="flex items-center justify-between p-4">
        <div class="flex items-center">
            <img src="~/assets/img/profil.jpg" alt="Photo de profil de l'utilisateur" class="w-10 rounded-full border border-black">
            <div class="ml-4">
                <h2 class="text-base font-bold"><nuxt-link to="" class="hover:underline">{{ author }}</nuxt-link></h2>
                <span class="text-xs">{{createdAt.slice(0, 10)}}</span>
            </div>
        </div>
        <div class="relative">
            <button class="w-full flex justify-end">
                <IconDots />
            </button>
        </div>
        <EditMessage :messageId="messageId" />
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
        messageId: Number,
        firstName: String,
        lastName: String,
        createdAt: String
    },
    methods: {

    }
}
</script>