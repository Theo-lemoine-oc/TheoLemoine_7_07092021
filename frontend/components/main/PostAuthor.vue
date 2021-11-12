<template>
    <div class="flex items-center justify-between p-4 relative">
        <div class="flex items-center">
            <img src="~/assets/img/profil.jpg" alt="Photo de profil de l'utilisateur" class="w-10 rounded-full border border-black">
            <div class="ml-4">
                <h2 class="text-base font-bold"><nuxt-link to="" class="hover:underline flex items-center"><IconShield v-if="this.isAdmin == true" /> {{ author }}</nuxt-link></h2>
                <span class="text-xs">{{createdAt.slice(0, 10)}}</span>
            </div>
        </div>
        <div>
            <button v-on:click="modaleMessage" class="w-full flex justify-end">
                <IconDots />
            </button>
        </div>
        <EditMessage v-if="openMessage" :messageId="messageId" class="absolute right-5 top-12" />
    </div>
</template>

<script>
import IconDots from '~/components/utils/icons/IconDots.vue';
import IconShield from '~/components/utils/icons/IconShield.vue';
import EditMessage from '~/components/modales/EditMessage.vue';

export default {
    components: {
        IconDots,
        EditMessage,
        IconShield
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
        isAdmin: Boolean,
        createdAt: String
    },
    data() {
        return {
            openMessage: false
        };
    },
    methods: {
        modaleMessage() {
            if(this.openMessage) {
                this.openMessage = false;
            } else {
                this.openMessage = true;
            }
        }
    }
}
</script>