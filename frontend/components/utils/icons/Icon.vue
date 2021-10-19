<template>
    <div>
        <font-awesome-icon :icon="['fas', icon]" class="icon" />
    </div>
</template>

<script>
    export default {
        props: {
            icon: {
                type: String
            }
        }    
    }
</script>

<style scoped>
    div {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon {
        position: absolute;
    }
</style>