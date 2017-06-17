/**
 * !VCropper
 *
 * 工具类
 *
 * @author yiwei
 * @data 2017-06-14
 */
export default class Util {
    /**
     * 根据容器与图片原始大小信息，返回最终展示的大小
     *
     * @param img
     * @param warp
     */
    static calculationSize(img, warp) {
        let size = {
            width: 0,
            height: 0
        };
        if (img.aspectRatio == 1) { // 图片为正方向
            size.width = size.height = Math.min(warp.height, warp.width);
        } else if (img.aspectRatio > 1) { // 宽 > 高
            size.width = warp.width;
            size.height = warp.width * 1/img.aspectRatio;
        } else {
            size.height = warp.height;
            size.width = warp.height * img.aspectRatio;
        }
        return size;
    }

    /**
     * mousedown | touchstart listener
     *
     * @param ev
     * @param moveListener
     * @param upListener
     */
    static touchDown(ev, moveListener, upListener) {
        let self = this;
        self.crop.rect = self.$refs['crop-box'].getBoundingClientRect();
        self.warpRect = self.$refs['vue-cropper'].getBoundingClientRect();
        window.addEventListener('mousemove', moveListener);
        window.addEventListener('touchmove', moveListener);
        window.addEventListener('mouseup', upListener);
        window.addEventListener('touchend', upListener);
        self.crop.coordinate.x = ev.clientX;
        self.crop.coordinate.y = ev.clientY;
    }

    /**
     * mouseup | touchend listener
     *
     * @param moveListener
     * @param upListener
     */
    static touchUp(moveListener, upListener) {
        window.removeEventListener('mousemove', moveListener);
        window.removeEventListener('mouseup', upListener);
        window.removeEventListener('touchmove', moveListener);
        window.removeEventListener('touchend', upListener);
    }

    /**
     * 设置裁切框属性
     *
     * @param width
     * @param height
     * @param cropX
     * @param cropY
     */
    static setCrop({width, height, cropX, cropY} = {}) {
        let self = this,
            maxX = self.warpRect.width - width,
            maxY = self.warpRect.height - height;

        // 计算边界值
        if (cropX < 0) cropX = 0;
        if (cropX > maxX) cropX = maxX;
        if (cropY < 0) cropY = 0;
        if (cropY > maxY) cropY = maxY;

        // 设置裁切框size
        self.crop.width = width;
        self.crop.height = height;

        // 设置裁切框位移量
        self.crop.translate.x = cropX;
        self.crop.translate.y = cropY;

        // 设置可视图片位移量
        self.crop.view.x = self.sourceImage.translate.x - self.crop.translate.x;
        self.crop.view.y = self.sourceImage.translate.y - self.crop.translate.y;
    }
}

