<script>
    import Util from '../util/tool';
    export default {
        name: 'v-cropper',
        data() {
            return {
                warpRect: null,
                crop: { // 裁切框操作时相关的数据
                    rect: null,
                    lines: [
                        {
                            direction: 'top',
                            size: 'height'
                        },
                        {
                            direction: 'bottom',
                            size: 'height'
                        },
                        {
                            direction: 'left',
                            size: 'width'
                        },
                        {
                            direction: 'right',
                            size: 'width'
                        }
                    ],
                    points: [
                        {
                            direction: 'nw'
                        },
                        {
                            direction: 'n'
                        },
                        {
                            direction: 'ne'
                        },
                        {
                            direction: 'e'
                        },
                        {
                            direction: 'se'
                        },
                        {
                            direction: 's'
                        },
                        {
                            direction: 'sw'
                        },
                        {
                            direction: 'w'
                        }
                    ],
                    view: { // 裁切框可视化图片位置
                        x: 0,
                        y: 0
                    },
                    coordinate: {
                        originX: 0,
                        originY: 0,
                        x: 0,
                        y: 0
                    },
                    translate: {
                        x: 0,
                        y: 0,
                        movable: true
                    },
                    resize: {
                        resizable: true
                    }
                },
                sourceImage : { // 图片操作时相关的数据
                    loaded: false,
                    width: 0,
                    height: 0,
                    translate: {
                        x: 0,
                        y: 0,
                        movable: false
                    },
                    aspectRatio: 1
                }
            }
        },
        props: {
            id: {
                type: String,
                default: "vcropper"
            },
            img: {
                type: String,
                default: ""
            },
            autoCrop: {
                type: Boolean,
                default: true
            },
            initSize: {
                type: Object,
                default: () => {
                    return {w: '50%', h: '50%'};
                }
            },
            initPosition: {
                type: Object,
                default: () => {
                    return {left: '50%', top: '50%'};
                }
            },
            imgMovable: {
                type: Boolean,
                default: false
            },
            aspectRatio: {
                type: String,
                default: "1:1"
            },
            zoomable: {
                type: Boolean,
                default: true
            },
            movable: {
                type: Boolean,
                default: true
            },
            background: {
                type: Boolean,
                default: true
            },
            resizable: {
                type: Boolean,
                default: true
            },
            modal: {
                type: Boolean,
                default: true
            },
            showSize: {
                type: Boolean,
                default: false
            },
            initStyle: {
                type: Object,
                default: () => {
                    return {
                        dotColor: '#39f',
                        dotSize: '8px',
                        borderColor: '#39f',
                        borderWith: '1px'
                    };
                }
            }
        },
        methods: {
            /**
             * crop move
             * listen: mousedown | touchstart
             */
            cropMoveStart(ev) {
                let self = this;
                if (!self.crop.translate.movable) return;
                self.crop.rect = self.$refs['crop-box'].getBoundingClientRect();
                window.addEventListener('mousemove', self.cropMove);
                window.addEventListener('touchmove', self.cropMove);
                window.addEventListener('mouseup', self.cropStop);
                window.addEventListener('touchend', self.cropStop);
                self.crop.coordinate.x = ev.pageX;
                self.crop.coordinate.y = ev.pageY;
                self.crop.coordinate.originX = self.crop.translate.x;
                self.crop.coordinate.originY = self.crop.translate.y;
            },

            cropMove(ev) {
                let self = this,
                    disX = ev.pageX - self.crop.coordinate.x,
                    disY = ev.pageY - self.crop.coordinate.y,
                    transX,
                    transY,
                    maxX = self.crop.rect.left - self.warpRect.left,
                    maxY = self.crop.rect.top - self.warpRect.top;
                if (!disX && !disY) return;
                transX = self.crop.coordinate.originX + disX;
                transY = self.crop.coordinate.originY + disY;
                if (transX < 0) transX = 0;
                if (transX > maxX) transX = maxX;
                if (transY < 0) transY = 0;
                if (transY > maxY) transY = maxY;
                self.crop.translate.x = transX;
                self.crop.translate.y = transY;
            },

            cropStop(ev) {
                let self = this;
                window.removeEventListener('mousemove', self.cropMove);
                window.removeEventListener('mouseup', self.cropStop);
                window.removeEventListener('touchmove', self.cropMove);
                window.removeEventListener('touchend', self.cropStop);
            },

            clear() {

            },

            replace(url) {

            },

            disable() {

            },

            enable() {

            },

            getImageData() {

            },

            /**
             * 初始化布局
             *
             */
            init(img) {
                let self = this,
                    refs = self.$refs,
                    warp = refs['vue-cropper'];
                self.warpRect = warp.getBoundingClientRect();
                self.sourceImage.loaded = !!1;
                self.sourceImage.width = img.naturalWidth;
                self.sourceImage.height = img.naturalHeight;
                self.sourceImage.aspectRatio = self.sourceImage.width / self.sourceImage.height;
                Object.assign(self.sourceImage, Util.calculationSize(self.sourceImage, self.warpRect));
                self.initSize.w = self.initSize.w || '50%';
                self.initSize.h = self.initSize.h || '50%';
                self.initPosition.left = self.initPosition.left || '50%';
                self.initPosition.top = self.initPosition.top || '50%';

                self.sourceImage.translate.x = (self.warpRect.width - self.sourceImage.width)/2;
                self.sourceImage.translate.y = (self.warpRect.height - self.sourceImage.height)/2;

                // crop
                if (/%/.test(self.initPosition.left)) {
                    let w;
                    if (/%/.test(self.initSize.w)) {
                        w = parseInt(self.initSize.w)*0.01*self.warpRect.width;
                    } else {
                        w = parseInt(self.initSize.w);
                    }
                    self.crop.translate.x = (self.warpRect.width - w)/2;
                } else {
                    self.crop.translate.x = self.initPosition.left;
                }
                if (/%/.test(self.initPosition.top)) {
                    let h;
                    if (/%/.test(self.initSize.h)) {
                        h = parseInt(self.initSize.h)*0.01*self.warpRect.height;
                    } else {
                        h = parseInt(self.initSize.h);
                    }
                    self.crop.translate.y = (self.warpRect.height - h)/2;
                } else {
                    self.crop.translate.y = self.initPosition.top;
                }

                // crop view image
                this.$nextTick(() => {
                    let originRect = refs['origin-img'].getBoundingClientRect();
                    self.crop.rect = refs['crop-box'].getBoundingClientRect();
                    self.crop.view.x = originRect.left - self.crop.rect.left;
                    self.crop.view.y = originRect.top - self.crop.rect.top;
                });
            }
        },
        mounted() {
            let self = this,
                img = self.$refs['origin-img'];
            img.onload = () => {
                self.init(img);
            };
        }
    }
</script>

<template>
    <div class="vue-cropper"
         ref="vue-cropper"
         :style="{
            backgroundImage: background ? `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)` : ''
         }">
        <div class="cropper-container">
            <div class="cropper-box-canvas"
                 :style="{
                    transform: `translate3d(${sourceImage.translate.x}px, ${sourceImage.translate.y}px, 0)`,
                    height: `${sourceImage.height}px`,
                    width: `${sourceImage.width}px`
                 }">
                <img :src="img" alt=""
                     ref="origin-img"
                     class="origin-img">
            </div>
            <div class="cropper-modal"
                 v-show="!!modal && !!sourceImage.loaded"
                 :style="{
                    cursor: !!imgMovable ? 'move' : ''
                 }">
            </div>
            <div class="cropper-crop-box"
                 ref="crop-box"
                 v-show="!!autoCrop && !!sourceImage.loaded"
                 :style="{
                    width: initSize.w,
                    height: initSize.h,
                    transform: `translate3d(${crop.translate.x}px, ${crop.translate.y}px, 0)`
                 }">
                <span class="cropper-view-box"
                      :style="{
                        'outline-width': `${initStyle.borderWith}`,
                        'outline-color': `${initStyle.borderColor}`
                      }">
                    <img :src="img" alt=""
                         :style="{
                            width: `${sourceImage.width}px`,
                            height: `${sourceImage.height}px`,
                            transform: `translate3d(${crop.view.x}px, ${crop.view.y}px, 0)`
                         }"
                         class="view-img">
                </span>
                <span class="cropper-face"
                      @touchstart.self.stop="cropMoveStart"
                      @mousedown.self.stop="cropMoveStart">
                </span>
                <span v-for="(line, index) in crop.lines"
                      :key="index"
                      :style="{
                        [`${line.size}`]: `${initStyle.borderWith}`,
                        [`${line.direction}`]: `-${initStyle.borderWith}`
                      }"
                      :class="['crop-line', `crop-${line.direction}`]"></span>
                <span v-for="(point, index) in crop.points"
                      :key="index"
                      :style="{
                        width: `${initStyle.dotSize}`,
                        height: `${initStyle.dotSize}`,
                        background: `${initStyle.dotColor}`
                      }"
                      :class="['crop-point', `crop-point-${point.direction}`]"></span>
            </div>
        </div>
    </div>
</template>

<style type="text/css" scoped>
    .vue-cropper {
        width: 100%;
        height: 100%;
        position: relative;
        user-select: none;
        box-sizing: border-box;
    }


    .cropper-container, .cropper-modal {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }

    .cropper-modal {
        background: rgba(0, 0, 0, 0.5);
    }

    .cropper-crop-box {
        position: absolute;
    }

    .cropper-view-box {
        display: block;
        overflow: hidden;
        width: 100%;
        height: 100%;
        outline: 1px solid #39f;
        user-select: none;
    }

    .crop-line {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        opacity: .1;
    }

    .crop-top {
        top: 0;
        left: 0;
        cursor: n-resize;
    }

    .crop-left {
        left: 0;
        top: 0;
        cursor: w-resize;
    }

    .crop-right {
        top: 0;
        right: 0;
        cursor: e-resize;
    }

    .crop-bottom {
        left: 0;
        bottom: 0;
        cursor: s-resize;
    }

    .crop-point {
        position: absolute;
        transform: translate3d(-50%, -50%, 0);
        border-radius: 100%;
    }

    .crop-point-nw {
        top: 0;
        left: 0;
        cursor: nw-resize;
    }

    .crop-point-n {
        left: 50%;
        top: 0;
        cursor: n-resize;
    }

    .crop-point-ne {
        top: 0;
        left: 100%;
        cursor: ne-resize;
    }

    .crop-point-e {
        top: 50%;
        left: 100%;
        cursor: e-resize;
    }

    .crop-point-se {
        top: 100%;
        left: 100%;
        cursor: se-resize;
    }

    .crop-point-s {
        top: 100%;
        left: 50%;
        cursor: s-resize;
    }

    .crop-point-sw {
        top: 100%;
        left: 0;
        cursor: sw-resize;
    }

    .crop-point-w {
        top: 50%;
        left: 0;
        cursor: w-resize;
    }

    img {
        user-select: none;
    }

    .origin-img {
        display: block;
        position: relative;
        transform: none;
        height: 100%;
        width: 100%;
    }

    .cropper-box-canvas {
        position: absolute;
    }

    .cropper-face {
        cursor: move;
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, .1);
    }
</style>