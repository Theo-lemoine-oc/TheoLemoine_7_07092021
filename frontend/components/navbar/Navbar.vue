<template>
    <header>
            <!-- navbar content --> 
            <nav class="shadow-md px-16 w-full">
                <div class="mx-auto py-4 w-full">
                    <div class="flex justify-between items-center flex-col md:flex-row">
                        <!-- logo -->
                        <div class="flex justify-center">
                            <Logo />
                        </div>

                        <!-- nav -->
                        <div>
                            <NavContent />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
</template>

<script>
    import Logo from '~/components/navbar/Logo.vue';
    import NavContent from '~/components/navbar/NavContent.vue';

    export default {
        components: {
            Logo,
            NavContent
        }
    }
</script>

<style scoped>
    nav {
        background: linear-gradient(209deg, rgba(234,23,23,1) 10%, rgba(116,0,0,1) 100%);
    } 
</style>