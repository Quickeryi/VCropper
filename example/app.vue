<script>
    export default {
        data() {
            return {
                id: 'a',
                background: false,
                img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
                initSize: {
                    w: '300px',
                    h: '200px'
                },
                imgMovable: false,
                modal: false,
                aspectRatio: "3:2"
            }
        }
    }
</script>

<template>
    <div class="warp">
        <!--<VCopper :id="ref"
                 :background="background">

        </VCopper>-->
        <VCopper :img="img" :imgMovable="imgMovable" :initSize="initSize" :aspectRatio="aspectRatio"></VCopper>
    </div>
</template>

<style type="text/css" scoped>
    .warp {
        width: 700px;
        height: 500px;
        margin: 100px;
    }
</style>