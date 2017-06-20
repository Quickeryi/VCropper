<script>
    export default {
        data() {
            return {
                id: 'a',
                background: true,
                img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
                initSize: {
                    w: '300px',
                    h: '200px'
                },
                imgMovable: false,
                modal: true,
                aspectRatio: "16:9",
                movable: true,
                resizable: true,
                showSize: false,
                autoCrop: false
            }
        },
        methods: {
            unmodel() {
                this.modal = !!0;
            },

            modelable() {
                this.modal = !!1;
            },

            unresize() {
                this.resizable = !!0;
            },

            canresize() {
                this.resizable = !!1;
            },

            unmove() {
                this.movable = !!0;
            },

            move() {
                this.movable = !!1;
            },

            unbackground() {
                this.background = !!0;
            },

            setbackground() {
                this.background = !!1;
            },

            unShowSize() {
                this.showSize = !!0;
            },

            showSizeF() {
                this.showSize = !!1;
            },

            upload(ev) {
                let that = this;
                let target = ev.target;
                // 获取File引用
                let file = target.files[0];

                // 读取文件
                let reader = new FileReader();
                reader.onload = (e) => {
                    let data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'
                    that.img = data;
                };
                reader.readAsDataURL(file);
            }
        },
        mounted() {

        }
    }
</script>

<template>
    <div class="warp">
        <VCopper :img="img"
                 id="crop"
                 :autoCrop="autoCrop"
                 :background="background"
                 :imgMovable="imgMovable"
                 :aspectRatio="aspectRatio"
                 :movable="movable"
                 :resizable="resizable"
                 :showSize="showSize"
                 :modal="modal">
        </VCopper>
        <div class="btn" @click="unmodel" @touchstart="unmodel">关闭蒙层</div>
        <div class="btn" @click="modelable" @touchstart="modelable">开启蒙层</div>
        <div class="btn" @click="unresize" @touchstart="unresize">unresize</div>
        <div class="btn" @click="canresize" @touchstart="canresize">resizable</div>
        <div class="btn" @click="unmove" @touchstart="unmove">unmove</div>
        <div class="btn" @click="move" @touchstart="move">movable</div>
        <div class="btn" @click="setbackground" @touchstart="setbackground">background</div>
        <div class="btn" @click="unbackground" @touchstart="unbackground">unbackground</div>
        <div class="btn" @click="showSizeF" @touchstart="showSizeF">showSize</div>
        <div class="btn" @click="unShowSize" @touchstart="unShowSize">unShowSize</div>
        <label class="btn upload" for="upload">
            <input type="file" @change="upload" id="upload">
            <span class="label">上传</span>
        </label>
    </div>
</template>

<style type="text/css" scoped>
    .warp {
        width: 700px;
        height: 500px;
        margin: 100px;
    }

    .btn {
        text-align: center;
        background-color: #0275d8;
        color: #fff;
        padding: 10px;
        cursor: pointer;
        width: 100px;
        border-radius: 3px;
        margin-top: 10px;
        margin-right: 5px;
        float: left;
    }

    .upload {
        position: relative;
    }

    .btn input {
        position: absolute;
        display: block;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
    }

    .label {
        position: absolute;
        display: block;
        width: 100px;
        height: 100%;
        left: 0;
        top: 0;
        padding: 10px;
        background-color: #0275d8;
    }
</style>