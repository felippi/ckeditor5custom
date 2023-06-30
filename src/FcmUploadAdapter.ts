

/*
  Config

  {
    fcmUploaderFile: (path, file, progressFn, setUploadTask) => {}

  }


 */

function fcmUploaderFileDefault (path:any, file:any, progressFn:any, setUploadTask:any) {
  console.error('You need add fcmUploaderFile on ckeditor config');
}

function fcmGetterNewIdDefault () {
  console.error('You need add fcmGetterNewId on ckeditor config');
  return 'error';
}

function fcmSetImageDbDefault () {
  console.error('You need add fcmGetterNewId on ckeditor config');
  return 'error';
}

/*

    function fcmGetterNewIdDefault () {
      return firebase.firestore().collection('ckeditorImages').doc().id
    }


    function fcmSetImageDb(async (id, url, path) {
      await firebase.firestore().collection('ckeditorImages').doc(id).set({
        url: url,
        resourceId: config?.fcmId || null,
        resourceType: config?.fcmType || null,
        path: path,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }, {merge: true});
    });

*/

function getAnyClass(obj:any) {
  if (typeof obj === "undefined") return "undefined";
  if (obj === null) return "null";
  return obj.constructor.name;
}

function fcmCompactImageFromFileDefault (file:any, type='image/jpeg', quality=0.9, maxWidth=0, maxHeight=0) {
  return new Promise(async (resolve)=>{
    try {
      if(!(file instanceof File)) {
        console.log('file is not instanceof File', file, getAnyClass(file));
        return resolve({isOk: false});
      }
      if(!type) {
        type = 'image/jpeg';
      }
      if(!quality) {
        quality = 0.9;
      }

      const reader = new FileReader();
      reader.onerror = error => {
        console.error('Erro ao ler arquivo', error);
        resolve({isOk: false});
      };
      reader.onload = (event) => {
        // event.target.result;
        const img = new Image();

        img.onload = () => {
          const elem = document.createElement('canvas');
          let w = img.width;
          let h = img.height;
          if(maxWidth && w>maxWidth) {
            h = Math.floor((h*maxWidth)/w);
            w = maxWidth;
          }
          if(maxHeight && h>maxHeight) {
            w = Math.floor((w*maxHeight)/h);
            h = maxHeight;
          }

          elem.width = w;
          elem.height = h;
          const ctx = elem.getContext('2d');
          if(ctx) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, elem.width, elem.height);
            // img.width and img.height will contain the original dimensions
            ctx.drawImage(img, 0, 0, w, h);
            ctx.canvas.toBlob((blob) => {
              const dataUrl = ctx.canvas.toDataURL(type, quality);
              resolve({isOk: true, blob, dataUrl});
            }, type, quality);
          }
        };
        if (typeof event?.target?.result === "string") {
          img.src = event.target.result;
        }

      };
      reader.readAsDataURL(file);
    } catch(error) {
      console.error('Error on preProcessImage', error);
      resolve({isOk: false});
    }
  });
}



export function fcmUploadAdapterPlugin(editor:any) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader:any ) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter( loader, editor.config?._config );
  };
}


export class MyUploadAdapter {
  private loader: any;
  private isAbort: boolean;
  private uploadTask: any;
  private readonly fcmUploaderFile: any;
  private readonly fcmGetterNewId: any;
  private readonly fcmSetImageDb: any;
  private readonly fcmCompactImageFromFile: any;
  constructor( loader:any, config:any=undefined ) {
    // The file loader instance to use during the upload.
    this.loader = loader;
    this.isAbort = false;
    this.uploadTask = null;
    this.fcmUploaderFile = config?.fcmUploaderFile || fcmUploaderFileDefault;
    this.fcmGetterNewId = config?.fcmGetterNewId || fcmGetterNewIdDefault;
    this.fcmSetImageDb = config?.fcmSetImageDb || fcmSetImageDbDefault;
    this.fcmCompactImageFromFile = config?.fcmCompactImageFromFile || fcmCompactImageFromFileDefault;
  }

  // loader.uploadTotal = evt.total;
  // loader.uploaded = evt.loaded;

  // Starts the upload process.
  async upload() {
    this.isAbort = false;
    this.uploadTask = null;
    try {
      const file = await this.loader.file;
      const id = this.fcmGetterNewId();
      //  console.log('Teste', file);
      //  const blob = await ImageUtils.compactImageFromFile(file,'image/jpeg', 0.76, 3000, 3000);
      const compact = await this.fcmCompactImageFromFile(file);
      if(!compact.isOk) {
        console.error('Error on compact image', compact);
        return new Error('Error on compact image');
      }
      const path = 'ckeditorImages/'+id+'.jpeg';
      const url = await this.fcmUploaderFile(
        path,
        compact.blob,
        (progress:any, transferred:any, total:any)=>{
          this.loader.uploadTotal = total;
          this.loader.uploaded = transferred;
        },
        (uploadTask:any)=>{
          this.uploadTask = uploadTask;
        });

      if(this.isAbort) {
        return new Error('Abort');
      }
      await this.fcmSetImageDb(id, url, path);

      return {default: url};
    } catch(err) {
      console.error('Erro no upload de imagem', err);
      return new Error('Error');
    }
  }

  // Aborts the upload process.
  async abort() {
    this.isAbort = true;
    if(this.uploadTask) {
      this.uploadTask.cancel();
    }
  }
}