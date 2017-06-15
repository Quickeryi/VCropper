<script>
    export default {
        name: 'v-cropper',
        data() {
            return {
                // 裁切框数据
                crop: {
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
                    ]
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
             * 初始化裁切框样式
             */
            initCropStyle() {
                return {
                    width: this.initSize.w || '50%',
                    height: this.initSize.h || '50%',
                    left: this.initPosition.left || '50%',
                    top: this.initPosition.top || '50%'
                };
            }
        }
    }
</script>

<template>
    <div class="vue-cropper"
         :style="{
            backgroundImage: background ? `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)` : ''
         }">
        <div class="cropper-container">
            <div class="cropper-modal" v-show="!!modal"></div>
            <div class="cropper-crop-box" v-show="!!autoCrop"
                 :style="initCropStyle()">
                <span class="cropper-view-box"
                      :style="{
                        'outline-width': `${initStyle.borderWith}`,
                        'outline-color': `${initStyle.borderColor}`
                      }">
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
        cursor: move;
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
        border-radius: 100%;
    }

    .crop-point-nw {
        top: 0;
        left: 0;
        transform: translate3d(-50%, -50%, 0);
        cursor: nw-resize;
    }

    .crop-point-n {
        left: 50%;
        top: 0;
        transform: translate3d(0, -50%, 0);
        cursor: n-resize;
    }

    .crop-point-ne {
        top: 0;
        left: 100%;
        transform: translate3d(-50%, -50%, 0);
        cursor: ne-resize;
    }

    .crop-point-e {
        top: 50%;
        left: 100%;
        transform: translate3d(-50%, -50%, 0);
        cursor: e-resize;
    }

    .crop-point-se {
        bottom: 0;
        left: 100%;
        transform: translate3d(-50%, -50%, 0);
        cursor: se-resize;
    }

    .crop-point-s {
        bottom: 0;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        cursor: s-resize;
    }

    .crop-point-sw {
        bottom: 0;
        left: 0;
        transform: translate3d(-50%, -50%, 0);
        cursor: sw-resize;
    }

    .crop-point-w {
        top: 50%;
        left: 0;
        transform: translate3d(-50%, -50%, 0);
        cursor: w-resize;
    }
</style>