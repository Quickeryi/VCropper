# VCropper
基于vue2.0的图片裁切器

### 安装
```javascript
npm install v-cropper
```
### 如何使用
```javascript
import VCropper from 'v-cropper';
import Vue from 'vue';
// 如果vue是使用模块化方式引入，则需要执行下面语句
Vue.use(VCropper);

<VCropper
   :id="id"
   :img="img_src"
   //others init params
>
</VCropper>
```
### 参数
名称 | 说明 | 参数值 | 备注
--- | ----| ------| ----
id | 子组件引用 | `[String]`  | [可选，默认为`vcropper`]，此参数涉及到调用组建方法，所以很重要
img | 裁切图片地址 | `[String]` `url`或`base64`或`blob`地址 | [可选，默认为空]
autoCrop | 初始组建时，是否展示裁切框 | `[Boolean]` `true`或`false` | [可选，默认为`true`]
initSize | 初始组建时，裁切框初始大小 | `[Object]` {`w`: '% 或 px', `h`: '% 或 px'} | [可选，默认为{`w`: '50%', `h`: '50%'}]
initPosition | 初始组建时，裁切框初始位置 | `[Object]` {`left`: '% 或 px', `top`: '% 或px'} | [可选，默认为{`left`: '50%', `top`: '50%'}]
movable | 裁切框是否可移动 | `[Boolean]` `true`或`false` | [可选，默认为`true`]
imgMovable | 图片否可移动 | `[Boolean]` `true`或`false` | [可选，默认为`false`]
aspectRatio | 拉伸裁切框时宽高比 | `[String]` | [可选，默认为`free`]
zoomable | 图片是否可放大缩小 | `[Boolean]` `true`或`false` | [可选，默认为`false`]
background | 初始组建时，是否展示透明背景图 | [`Boolean`] `true`或`false` | [可选，默认为`true`]
resizable | 裁切框是否可以改变大小 | [`Boolean`] `true`或`false` | [可选，默认为`true`]
modal | 裁切时，是否加上蒙层| [`Boolean`] `true`或`false` | [可选，默认为`true`]
showSize | 裁切时，是否实时展示裁切区域大小| [`Boolean`] `true`或`false` | [可选，默认为`false`]
initStyle | 初始组建时，裁切框初始样式| `[Object]` {`dotColor`: resize操作点颜色, `dotSize`: resize操作点大小, `borderColor`: 裁切框颜色, `borderWith`: 裁切框大小} | [可选，默认为{`dotColor`: '#39f', `dotSize`: '8px', `borderColor`: '#39f', `borderWith`: '1px'}]
### 方法
1.**clear()**
   
  * 作用：清除裁切，恢复默认的初始化状态

2.**replace(url)**
  * **url**
    - `Type`: `String`
    - `value`: `url`或`base64`或`blob`地址
  * 作用：替换裁切的图片

3.**disable()**
   
  * 作用：禁用裁切框

4.**enable()**
   
  * 作用：开启裁切框

5.**getImageData()**
  * **return**
    - `Type`: `Object`
    - `value`
      - `left`: the offset left of the image
      - `top`: the offset top of the image
      - `width`: the width of the image
      - `height`: the height of the image
      - `naturalWidth`: the natural width of the image
      - `naturalHeight`: the natural height of the image
      - `aspectRatio`: the aspect ratio of the image
  * 作用：获取图片信息
