<template>
    <div class="w-full h-full bg-black bg-opacity-30 absolute top-0 left-0 flex justify-center items-center z-10">
        <div class="create-message bg-white rounded-2xl shadow-lg p-4">
            <div class="w-full h-1/2">
                <div class="flex justify-between">
                    <h3 class="font-bold mb-4 text-lg">Quoi de neuf, {{ firstName }} ?</h3>
                    <IconCross @click.native="closeModale()" />
                </div>
                <textarea v-model="contentMessage.content" placeholder="Écrivez votre message" class="text-sm bg-gray-200 rounded-3xl w-full h-full px-6 py-2 outline-none resize-none"></textarea>
                <span v-on:click="uploadImage" class="fit-content flex items-center text-red-500 hover:text-red-600 cursor-pointer"><IconImage /> Ajouter une image</span>
                <input type="file" name="inputImage" @change="onFileChange" accept=".png,.jpg,.jpeg" id="inputImage" class="w-full text-red-500 flex items-center hidden" />
                <div class="text-center mt-4 text-white">
                    <button @click.prevent="createMessage" type="submit" class="submit uppercase font-bold tracking-wider h-full py-2 px-8 rounded-full">Poster le message</button>
                    <span id="feedBackMsg" class="text-red-500">{{ msgError }}</span>
                </div>
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
    props: {
        firstName: String,
        lastName: String,
    },
    data() {
        return {
            contentMessage: {
                content: "",
                attachment: ""
            },
            msgError: ""
        };
    },
    methods: {
        createMessage() {
            const fd = new FormData();
            fd.append('content', this.contentMessage.content);
            fd.append('attachment', this.contentMessage.attachment)
            if(fd.get("content") == "null" && fd.get('attachment') == "null") {
                this.msgError = "Veuillez saisir un contenu à votre message";
            } else {
                const connection = this.$axios.create({ headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
                connection.$post("/message", fd).then(response => {
                    if(response) {
                        window.location.reload();
                    }
                })
                .catch(error => {
                    this.msgError = error;
                })
            }
        },
        onFileChange (e) {
            this.contentMessage.attachment = e.target.files[0] || e.dataTransfer.files;
        },
        uploadImage() {
            document.getElementById('inputImage').click();
        },
        closeModale() {
            this.$emit('close-createMessage');
        }
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