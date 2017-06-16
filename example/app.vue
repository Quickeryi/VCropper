<script>
    export default {
        data() {
            return {
                id: 'a',
                background: false,
                img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
                initSize: {
                    w: '60%'
                },
                imgMovable: false
            }
        }
    }
</script>

<template>
    <div class="warp">
        <!--<VCopper :id="ref"
                 :background="background">

        </VCopper>-->
        <VCopper :img="img" :imgMovable="imgMovable" :initSize="initSize"></VCopper>
    </div>
</template>

<style type="text/css" scoped>
    .warp {
        width: 700px;
        height: 500px;
    }
</style>