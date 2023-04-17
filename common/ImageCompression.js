/*
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-01-17 18:23:34
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-03-08 19:26:20
 * @FilePath: /orz-cash-web/src/utils/ImageCompression.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export async function compressBase64(base64) {
    return new Promise((resolve, reject) => {
      const w = 500;
  
      //第一个参数就是原来的字符串，第二个是宽度
      const newImage = new Image();
      let quality = 0.6; //压缩系数0-1之间
  
      newImage.src = base64;
      newImage.setAttribute('crossOrigin', 'Anonymous'); //url为外域时需要
  
      let imgWidth, imgHeight;
  
      newImage.addEventListener('load', function () {
        imgWidth = this.width;
        imgHeight = this.height;
  
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        if (Math.max(imgWidth, imgHeight) > w) {
          if (imgWidth > imgHeight) {
            canvas.width = w;
            canvas.height = (w * imgHeight) / imgWidth;
          } else {
            canvas.height = w;
            canvas.width = (w * imgWidth) / imgHeight;
          }
        } else {
          canvas.width = imgWidth;
          canvas.height = imgHeight;
          quality = 0.6;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
  
        const base64 = canvas.toDataURL('image/jpeg', quality); //压缩语句
  
        // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
        // while (base64.length / 1024 > 150) {
        //   quality -= 0.01;
        //   base64 = canvas.toDataURL("image/jpeg", quality);
        // }
        // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
        // while (base64.length / 1024 < 50) {
        //   quality += 0.001;
        //   base64 = canvas.toDataURL("image/jpeg", quality);
        // }
  
        resolve(base64); //必须通过回调函数返回，否则无法及时拿到该值
      });
    });
  }
  /* 压缩base64图片，怎么压缩base64是题外话，这里不赘述 */
  export function compress(
    base64, // 源图片
    rate, // 缩放比例
    callback, // 回调
  ) {
    //处理缩放，转格式
    const _img = new Image();
  
    _img.src = base64;
    _img.addEventListener('load', function () {
      const _canvas = document.createElement('canvas');
  
      const w = this.width / rate;
      const h = this.height / rate;
  
      _canvas.setAttribute('width', w);
      _canvas.setAttribute('height', h);
      _canvas.getContext('2d').drawImage(this, 0, 0, w, h);
  
      const base64 = _canvas.toDataURL('image/jpeg');
  
      _canvas.toBlob(function (blob) {
        if (blob.size > 750 * 1334) {
          //如果还大，继续压缩
          compress(base64, rate, callback);
        } else {
          callback(base64);
        }
      }, 'image/jpeg');
    });
  }
  