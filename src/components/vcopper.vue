<script>
    import Util from '../util/tool';
    export default {
        name: 'v-cropper',
        data() {
            return {
                warpRect: null,
                crop: { // 裁切框操作时相关的数据
                    show: !!1,
                    create: {
                        able: false,
                        originX: 0,
                        originY: 0
                    },
                    rect: null,
                    lines: [
                        {
                            direction: 'n',
                            size: 'height'
                        },
                        {
                            direction: 's',
                            size: 'height'
                        },
                        {
                            direction: 'w',
                            size: 'width'
                        },
                        {
                            direction: 'e',
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
                    width: 0,
                    height: 0,
                    view: { // 裁切框可视化图片位置
                        x: 0,
                        y: 0
                    },
                    coordinate: { // move 或 resize 时的坐标系
                        originX: 0,
                        originY: 0,
                        x: 0,
                        y: 0
                    },
                    translate: {
                        x: 0,
                        y: 0
                    },
                    resize: {
                        originW: 0,
                        originH: 0,
                        direction: ''
                    }
                },
                sourceImage : { // 图片操作时相关的数据
                    loaded: false,
                    width: 0,
                    height: 0,
                    translate: {
                        x: 0,
                        y: 0
                    },
                    coordinate: { // move 或 resize 时的坐标系
                        originX: 0, // 原始坐标 x
                        originY: 0, // 原始坐标 y
                        x: 0, // 实时坐标 x
                        y: 0 // 实时坐标 y
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
                default: "free"
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
                if (!self.movable) return;
                Util.touchDown.call(self, ev, self.cropMove, self.cropStop);
                self.crop.coordinate.originX = self.crop.translate.x;
                self.crop.coordinate.originY = self.crop.translate.y;
            },

            cropMove(ev) {
                let self = this,
                    touch = Util.touches(ev),
                    disX = ~~(touch.clientX - self.crop.coordinate.x),
                    disY = ~~(touch.clientY - self.crop.coordinate.y),
                    transX,
                    transY,
                    crop = {
                        width: 0,
                        height: 0,
                        cropX: 0,
                        cropY: 0
                    };
                if (!disX && !disY) return;
                transX = self.crop.coordinate.originX + disX;
                transY = self.crop.coordinate.originY + disY;

                // 设置裁切框size
                crop.width = self.crop.width;
                crop.height = self.crop.height;

                // 移动裁切框
                crop.cropX = transX;
                crop.cropY = transY;

                Util.setCrop.call(self, crop);

                return false;
            },

            cropStop(ev) {
                let self = this;
                Util.touchUp.call(self, self.cropMove, self.cropStop);
            },

            /**
             * 开始生成裁切框
             */
            createCropStart(ev) {
                let self = this;
                if (self.imgMovable) return;
                Util.touchDown.call(self, ev, self.createCropMove, self.createCropStop);
                self.crop.create.able = !!1;
                self.crop.create.originX = ~~(self.crop.coordinate.x - self.warpRect.left);
                self.crop.create.originY = ~~(self.crop.coordinate.y - self.warpRect.top);
            },

            createCropMove(ev) {
                let self = this,
                    touch = Util.touches(ev),
                    aspectRatio,
                    clientX = touch.clientX,
                    clientY = touch.clientY,
                    disX,
                    disY,
                    crop = {
                        width: 0,
                        height: 0,
                        cropX: 0,
                        cropY: 0
                    };
                self.crop.show = !!1;
                if (clientX < self.warpRect.left) clientX = self.warpRect.left;
                if (clientX > self.warpRect.right) clientX = self.warpRect.right;
                if (clientY < self.warpRect.top) clientY = self.warpRect.top;
                if (clientY > self.warpRect.bottom) clientY = self.warpRect.bottom;

                disX = ~~(clientX - self.crop.coordinate.x);
                disY = ~~(clientY - self.crop.coordinate.y);

                if (self.aspectRatio != 'free') {
                    aspectRatio = Util.aspectRatio(self.aspectRatio);
                    disY = ~~(disX*(aspectRatio[1]/aspectRatio[0]));
                }

                // 设置裁切框size
                crop.width = Math.abs(disX);
                crop.height = Math.abs(disY);

                // 设置裁切框位移量
                crop.cropX = disX >= 0 ? self.crop.create.originX : self.crop.create.originX + disX;
                crop.cropY = disY >=0 ? self.crop.create.originY : self.crop.create.originY + disY;

                if (
                    (disY >=0 && crop.height > self.warpRect.bottom - self.crop.coordinate.y) ||
                    (disY <0 && crop.height > self.crop.coordinate.y - self.warpRect.top)
                ) return;

                Util.setCrop.call(self, crop);
            },

            createCropStop(ev) {
                let self = this;
                Util.touchUp.call(self, self.createCropMove, self.createCropStop);
                self.crop.create.able = !!0;
            },

            resizeStart(ev) {
                let self = this,
                    target = ev.target,
                    direction = target.dataset.target;
                if (!self.resizable) return;
                Util.touchDown.call(self, ev, self.resizeMove, self.resizeStop);
                self.crop.resize.originW = self.crop.width;
                self.crop.resize.originH = self.crop.height;
                self.crop.coordinate.originX = self.crop.translate.x;
                self.crop.coordinate.originY = self.crop.translate.y;
                self.crop.resize.direction = /\w+-(\w+)/gi.exec(direction)[1];
            },
            
            resizeMove(ev) {
                let self = this,
                    touch = Util.touches(ev),
                    aspectRatio,
                    disX = ~~(touch.clientX - self.crop.coordinate.x),
                    disY = ~~(touch.clientY - self.crop.coordinate.y),
                    origin = {
                        w: self.crop.resize.originW,
                        h: self.crop.resize.originH,
                        x: self.crop.coordinate.originX,
                        y: self.crop.coordinate.originY
                    },
                    crop = {
                        width: origin.w,
                        height: origin.h,
                        cropX: origin.x,
                        cropY: origin.y
                    };
                if (!disX && !disY) return;
                if (self.aspectRatio != 'free') {
                    aspectRatio = Util.aspectRatio(self.aspectRatio);
                }

                if (/s/.test(self.crop.resize.direction)) {
                    let _height_ = origin.h + disY;
                    crop.height = _height_ > 0 ? _height_ : Math.abs(_height_);
                    crop.cropY = _height_ > 0 ? origin.y : origin.y - Math.abs(_height_);
                    if (self.aspectRatio != 'free') {
                        let disX = ~~(disY*(aspectRatio[0]/aspectRatio[1]));
                        crop.width = Math.abs(origin.w + disX);
                        if (self.crop.resize.direction == 's') {
                            crop.cropX = _height_ > 0 ? origin.x - disX/2 : origin.x + (origin.w - crop.width)/2;
                        }
                    }
                }

                if (/e/.test(self.crop.resize.direction)) {
                    let _width_ = origin.w + disX;
                    crop.width = _width_ > 0 ? _width_ : Math.abs(_width_);
                    crop.cropX = _width_ > 0 ? origin.x : origin.x - Math.abs(_width_);
                    if (self.aspectRatio != 'free') {
                        let disY = ~~(disX*(aspectRatio[1]/aspectRatio[0]));
                        crop.height = Math.abs(origin.h + disY);
                        if (self.crop.resize.direction == 'e') {
                            crop.cropY = _width_ > 0 ? origin.y - disY/2 : origin.y + (origin.h - crop.height)/2;
                        }
                    }
                }

                if (/n/.test(self.crop.resize.direction)) {
                    let _height_ = origin.h - disY;
                    crop.height = _height_ > 0 ? _height_ : Math.abs(disY) - origin.h;
                    crop.cropY = _height_ > 0 ? origin.y + disY : origin.y + origin.h;
                    if (self.aspectRatio != 'free') {
                        let disX = ~~(disY*(aspectRatio[0]/aspectRatio[1]));
                        crop.width = Math.abs(origin.w - disX);
                        if (self.crop.resize.direction == 'n') {
                            crop.cropX = _height_ > 0 ? origin.x + disX/2 : origin.x + (origin.w - crop.width)/2;
                        }
                    }
                }

                if (/w/.test(self.crop.resize.direction)) {
                    let _width_ = origin.w - disX;
                    crop.width = _width_ > 0 ? _width_ : Math.abs(disX) - origin.w;
                    crop.cropX = _width_ > 0 ? origin.x + disX : origin.x + origin.w;
                    if (self.aspectRatio != 'free') {
                        let disY = ~~(disX*(aspectRatio[1]/aspectRatio[0]));
                        crop.height = Math.abs(origin.h - disY);
                        if (self.crop.resize.direction == 'w') {
                            crop.cropY = _width_ > 0 ? origin.y + disY/2 : origin.y + (origin.h - crop.height)/2;
                        }
                    }
                }
                Util.setCrop.call(self, crop);
            },
            
            resizeStop(ev) {
                let self = this;
                Util.touchUp.call(self, self.resizeMove, self.resizeStop);
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

            crop() {

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
                self.crop.show = self.autoCrop;
                self.sourceImage.width = img.naturalWidth;
                self.sourceImage.height = img.naturalHeight;
                self.sourceImage.aspectRatio = self.sourceImage.width / self.sourceImage.height;
                Object.assign(self.sourceImage, Util.calculationSize(self.sourceImage, self.warpRect));
                // 初始化size
                (() => {
                    self.initSize.w = self.initSize.w || '50%';
                    self.initSize.h = self.initSize.h || '50%';
                    if (self.aspectRatio != 'free') {
                        let aspectRatio = Util.aspectRatio(self.aspectRatio);
                        if (/%/.test(self.initSize.w) && !/%/.test(self.initSize.h)) {
                            self.initSize.w = ~~parseInt(self.initSize.h)*aspectRatio[0]/aspectRatio[1] + 'px';
                        } else {
                            if (/%/.test(self.initSize.w)) {
                                self.initSize.h = ~~parseInt(self.initSize.w)*aspectRatio[1]/aspectRatio[0] + '%';
                            } else {
                                self.initSize.h = ~~parseInt(self.initSize.w)*aspectRatio[1]/aspectRatio[0] + 'px';
                            }
                        }
                    }
                })();
                self.initPosition.left = self.initPosition.left || '50%';
                self.initPosition.top = self.initPosition.top || '50%';
                self.sourceImage.translate.x = (self.warpRect.width - self.sourceImage.width)/2;
                self.sourceImage.translate.y = (self.warpRect.height - self.sourceImage.height)/2;

                // crop
                if (/%/.test(self.initPosition.left)) {
                    if (/%/.test(self.initSize.w)) {
                        self.crop.width = parseInt(self.initSize.w)*0.01*self.warpRect.width;
                    } else {
                        self.crop.width = parseInt(self.initSize.w);
                    }
                    self.crop.translate.x = (self.warpRect.width - self.crop.width)/2;
                } else {
                    self.crop.translate.x = self.initPosition.left;
                }
                if (/%/.test(self.initPosition.top)) {
                    if (/%/.test(self.initSize.h)) {
                        self.crop.height = parseInt(self.initSize.h)*0.01*self.warpRect.height;
                    } else {
                        self.crop.height = parseInt(self.initSize.h);
                    }
                    self.crop.translate.y = (self.warpRect.height - self.crop.height)/2;
                } else {
                    self.crop.translate.y = self.initPosition.top;
                }

                // crop view image
                this.$nextTick(() => {
                    let rect = refs['crop-box'].getBoundingClientRect();
                    let originRect = refs['origin-img'].getBoundingClientRect();
                    self.crop.view.x = originRect.left - rect.left;
                    self.crop.view.y = originRect.top - rect.top;
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
                 v-show="!!sourceImage.loaded"
                 @mousedown.self.stop="createCropStart"
                 @touchstart.self.stop="createCropStart"
                 :class="[!!modal || !!crop.create.able ? 'mask' : '']"
                 :style="{
                    cursor: !!imgMovable ? 'move' : 'crosshair'
                 }">
            </div>
            <div class="cropper-crop-box"
                 ref="crop-box"
                 v-show="!!crop.show && !!sourceImage.loaded"
                 @mousedown="resizeStart"
                 @touchstart="resizeStart"
                 :style="{
                    width: `${crop.width}px`,
                    height: `${crop.height}px`,
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
                      :style="{
                        cursor: movable ? 'move' : 'not-allowed'
                      }"
                      @touchstart.stop.self="cropMoveStart"
                      @mousedown.stop.self="cropMoveStart">
                </span>
                <span class="crop-info"
                      v-text="`${crop.width} * ${crop.height}`"
                      v-show="showSize">
                </span>
                <span v-for="(line, index) in crop.lines"
                      :data-target="`line-${line.direction}`"
                      :key="index"
                      :style="{
                        [`${line.size}`]: `${initStyle.borderWith}`,
                        [`${line.direction}`]: `-${initStyle.borderWith}`
                      }"
                      :class="['crop-line', `crop-${line.direction}`, !resizable ? 'disable' : '']"></span>
                <span v-for="(point, index) in crop.points"
                      :data-target="`point-${point.direction}`"
                      :key="index"
                      :style="{
                        width: `${initStyle.dotSize}`,
                        height: `${initStyle.dotSize}`,
                        background: `${initStyle.dotColor}`
                      }"
                      v-show="resizable"
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

    .cropper-modal.mask {
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

    .crop-n {
        top: 0;
        left: 0;
        cursor: n-resize;
    }

    .crop-w {
        left: 0;
        top: 0;
        cursor: w-resize;
    }

    .crop-e {
        top: 0;
        right: 0;
        cursor: e-resize;
    }

    .crop-s {
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

    .disable.crop-line {
        cursor: not-allowed;
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

    .crop-info {
        position: absolute;
        left: 0;
        min-width: 65px;
        text-align: center;
        color: white;
        line-height: 20px;
        background-color: rgba(0, 0, 0, 0.8);
        font-size: 12px;
        top: -21px;
    }
</style>