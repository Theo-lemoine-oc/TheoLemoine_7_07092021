<template>
    <div>
        <div class="edit-message flex flex-col rounded-2xl shadow-lg py-4 bg-white">
            <button v-on:click="report" id="report" class="text-left mb-3 px-4 hover:bg-gray-100 duration-200 ease-in flex items-center">
                <IconFlag /> Signaler le message
            </button>
            <button @click="deleteMessage" class="text-left text-red-500 px-4 hover:bg-gray-100 duration-200 ease-in flex items-center">
                <IconTrash /> Supprimer le message
            </button>
            <span class="text-red-500">{{ msgError }}</span>
        </div>
    </div>
</template>

<script>
import IconFlag from '~/components/utils/icons/IconFlag.vue';
import IconEdit from '~/components/utils/icons/IconEdit.vue';
import IconTrash from '~/components/utils/icons/IconTrash.vue';

 
export default {
    components: {
        IconFlag,
        IconEdit,
        IconTrash
    },
    props: {
        messageId: Number
    },
    data() {
        return {
            msgError: ""
        }
    },
    methods: {
        //delete message
        deleteMessage() {
            const connection = this.$axios.create({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            connection.$delete(`/message/${this.messageId}`)
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                this.msgError = "Vous ne pouvez pas supprimer ce message !";
            })
        },
        //report message alert
        report() {
            alert("Vous avez bien signalé ce message, merci !");
        }
    }
}
</script>

<style scoped>
    .edit-message {
        width: 108%
    }
</style>