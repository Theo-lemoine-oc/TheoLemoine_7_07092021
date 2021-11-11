<template>
    <div class="w-full h-full bg-black bg-opacity-30 absolute top-0 left-0 flex justify-center items-center z-10">
        <div class="create-message bg-white rounded-2xl shadow-lg p-4">
            <div class="w-full h-1/2">
                <div class="flex justify-between">
                    <h3 class="font-bold mb-4 text-lg">Modifier le message</h3>
                    <IconCross />
                </div>
                <form action="/update" method="put">
                    <textarea :value="message.content" class="text-sm bg-gray-200 rounded-3xl w-full h-full px-6 py-2 outline-none resize-none"></textarea>
                    <div v-if="message.attachment">
                        <button type="button" @click="deleteAttachment" class="fit-content flex items-center text-red-500 hover:text-red-600 cursor-pointer"><IconImage /> Supprimer l'image</button>
                    </div>
                    <div class="text-center mt-4 text-white">
                        <button @click.prevent="updateMessage" type="submit" class="submit uppercase font-bold tracking-wider h-full py-2 px-8 rounded-full">Modifier le message</button>
                        <span id="feedBackMsg">{{ msgError }}</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import IconCross from '~/components/utils/icons/IconCross.vue';
import IconImage from '~/components/utils/icons/IconImage.vue';

export default {
    components: {
        IconCross,
        IconImage
    },
    data() {
        return {
            removeAttachment: false
        };
    },
    props: {
        message: {
            type: Object,
            default() {}
        }
    },
    methods: {
        //update message
        updateMessage() {
            let newInput = document.getElementById("inputNewText").value;
            let newContent = false;
            if (newInput !== this.message.content || this.deleteAttachment != false) {
                newContent = true;
            }
            if (newContent && this.deleteAttachment) {
                const connection = this.$axios.create({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
                connection.$put(`/message/${message.id}`, {data: {
                    messageId: this.message.id,
                    userIdOrder: this.user.id,
                    newText: newInput,
                    newAttachment: null
                }}).then(response => {
                    this.feedBackAPI = response.data.confirmation;
                    setTimeout(() => {
                        this.feedBackAPI = "";
                        window.location.reload();
                    }, 2000);
                })
                .catch(error => {
                    console.log(error);
                    this.feedBackAPI = "Vérifiez vos saisies !";
                })
            } else if (newContent) {
                const connection = this.$axios.create({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
                connection.$put(`/message/${message.id}`, {data: {
                    messageId: this.message.id,
                    userIdOrder: this.user.id,
                    newText: newInput,
                }}).then(response => {
                    this.feedBackAPI = response.data.confirmation;
                    setTimeout(() => {
                        this.feedBackAPI = "";
                        window.location.reload();
                    }, 2000);
                })
                .catch(error => {
                    console.log(error);
                    this.feedBackAPI = "Vérifiez vos saisies !";
                })
            } else {
                console.log("not update");
            }
        },
        deleteAttachment() {
            this.removeAttachment = true;
        },
    }
}
</script>

<style scoped>
    .create-message {
        max-width: 512px;
        width: 100%;
        height: auto;
    }

    .submit {
        background: linear-gradient(209deg, rgba(234,23,23,1) 10%, rgba(116,0,0,1) 100%);
        transition: all .3s ease-in-out;
    }
    .submit:hover {
        filter: brightness(90%);
    }

    .fit-content {
        width: fit-content;
    }
</style>