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


}

