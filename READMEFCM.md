

```js
const editorConfig = {
  language: this.$i18n.locale==='en-US'?'en':'pt-br',
  fcmUploaderFile: uploadFile,
  fcmGetterNewId: newId,
  fcmSetImageDb: (id, url, path) =>{setImageDb(id, url, path,'faqs', vm.valueId)}
};


function uploadFile (path, file, progressFn, setUploadTask) {
  return new Promise(function (resolve, reject) {
    let storageRef = storage.ref(path);
    let uploadTask = storageRef.put(file);

    if(setUploadTask) {
      setUploadTask(uploadTask);
    }

    uploadTask.on(TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        if (progressFn) {
          let progress = (snapshot.bytesTransferred / (snapshot.totalBytes ||1));
          progressFn(progress, snapshot.bytesTransferred, snapshot.totalBytes);
        }
      }, function (error) {
        reject(error);
      }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
          progressFn(1);
          resolve(url);
        });
      });
  });
}


export async function setImageDb(id, url, path, fcmType, fcmId) {
  await firestore.collection('ckeditorImages').doc(id).set({
    url: url,
    resourceId: fcmId || null,
    resourceType: fcmType || null,
    path: path,
    createdAt: FieldValue.serverTimestamp(),
  }, {merge: true});
}

export function newId() {
  return firestore.collection('ckeditorImages').doc().id;
}


```



Plugin extra:

```js
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function MyUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
        // Custom upload adapter.
        // ...
    };
}

// Load the custom upload adapter as a plugin of the editor.
ClassicEditor
    .create( document.querySelector( '#editor' ), {
        extraPlugins: [ MyUploadAdapterPlugin ],
        // More of the editor's configuration.
        // ...
    } )
    .catch( error => {
        console.log( error );
    } );
```


