/**
 * Copyright (c) 2024
 * MapOmega Tecnologia
 * SC23MVP500 - SpaceX Raptor
 * This file uploads an image to
 * MS Azure Blob
 *
 * @summary Put image to Blob
 * @author KingOfDendroar <support@mapomega.com>
 * @location Casinha, Sítio Água Santa
 *
 * Created at       : 2024-02-10 12:00:00 
 * Revision         : 01/   2024-02-10    
 * Last modified    : 2024-02-10 12:00:0
 * 
 */

var collection = [];
var _loadedCollection = [];
var _selectedCover = null;
var _prefix = "";
_prefix += "https://mapsailor32620240201174338.azurewebsites.net/";
var _uri = _prefix + "/blobapi/MVP500BlobPutImage";
var _path = "https://safetycross.blob.core.windows.net/";
var _defaultContainer = "scapp";
var _blobSelectedImageId = "moblob_input_image_2";
var _mo_blob_content = "mo_blob_content";

var _htmlin = "<strong><small>";
var _htmlout = "</strong>";
var _htmlend = "</small>";




function moio_setBlobEvents() {
    _("moblob_copyimg")
        .addEventListener("click", moblob_f_copyimg);
    _("moblob_openimg")
        .addEventListener("click", moblob_f_openimg);
    _("moblob_toblob")
        .addEventListener("click", moblob_io_toblob);
    _("moblob_cancelblob")
        .addEventListener("click", moblob_f_clearSelectedImage);
    //_("moblob_input_image")
    //    .addEventListener("input", moblob_f_input_image);
    _('moblob_input_image_2')
        .addEventListener('input', moblob_f_captureInputFile);
    _("mo_blob_content")
        .addEventListener("click", moblob_f_displaySelectedImage);
//    _("moblob_erase")
    //        .addEventListener("click", moblob_f_removeFromBlob);
    _("moblob_clear")
        .addEventListener("click", moblob_f_clearFromSelected);

}


/**
* Get image attributes
* @param {string} el - input element
* @returns {} - nothing
*/
async function moblob_f_input_image(el) {
    var image = await moblob_f_serialize_image(el.target, _blobSelectedImageId);
    _(_blobSelectedImageId).removeAttribute("imgId")
   // moblob_f_displayImgAttributes(image);
}

function moblob_f_displayImgAttributes(image) {
    console.log(image);
    var img = image;

    if (image) {
        var _name = img.name;
        var _size = Math.round(img.size / 1024) + "kb";
        var _type = img.type;
        var _date = new Date(img.lastModified);
    } else {
        _name = "";
        _size = "";
        _type = "";
        _date = "";
    }

    _("moblob_name")
        .innerHTML = _htmlin + "Name:" + _htmlout + _name + _htmlend;
    _("moblob_size")
        .innerHTML = _htmlin + "Size:" + _htmlout + _size + _htmlend;
    _("moblob_type")
        .innerHTML = _htmlin + "Type:" + _htmlout + _type + _htmlend;
    _("moblob_modified")
        .innerHTML = _htmlin + "Modified:" + _htmlout + _date + _htmlend;
}

function moblob_f_setSelectedImageId(imgId) {
    var image = _(_blobSelectedImageId);
    image.setAttribute("imgId", imgId);
}

async function moblob_f_serialize_image(el, imgid) {
    var readXml = null;
    var img = el.files[0];
    console.log(el.files);
    event.preventDefault();

    var reader = new FileReader();
    reader.onload = await function (e) {
        //console.log(e.target);
        //console.log(e.target.result);
        //console.log(img);

        readXml = e.target.result;
        if (imgid) {
            moblob_f_display_image(readXml, img, imgid);
        }
    }

    //moblob_f_clearSelectedImage();

    if (img) {
        reader.readAsDataURL(img);
      //  return img;
    }

    // clear files
    el.files = null;
}

async function moblob_f_display_image(readXml, img, imgid) {
    console.log(img);

    var _URL = window.URL || window.webkitURL;

    var image = _(imgid);
    image.classList.add("loaded");
    //image.style = "background-image: url(" + readXml + ");";

    img1 = new Image();
    if (img) {
        var objectUrl = _URL.createObjectURL(img);
    } else {
        objectUrl = readXml;
    }

    img1.onload = await function () {
        var vw = window.innerWidth - 0; // side left)
        //  var vw1 = window.outerWidth;

        var scalew = vw / this.width;
        var scaleh = scalew;

        var imgw = Math.round(this.width * scalew);
        var imgh = Math.round(this.height * scaleh);

        image.style.width = imgw + "px";
        image.style.height = imgh + "px";

        _URL.revokeObjectURL(objectUrl);
    };

    img1.src = objectUrl;
    //  console.log(img1)
    //  _('mo_upload_content').innerHTML = img1.outerHTML
    image.style = "background-image: url(" + objectUrl + ");";


}

function moblob_f_clearSelectedImage() {

    var selectedImage = _(_blobSelectedImageId)

    selectedImage.style = "";
}


function moblob_f_copyimg() {
    var img = _(_blobSelectedImageId)
    var bi = moblob_f_getimageurl(img);
    if (!bi) { return false; }

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(bi);
    //  console.log(bi);
}

function moblob_f_openimg() {
    console.log("open");
    var img = _(_blobSelectedImageId)
    var bi = moblob_f_getimageurl(img);
    // console.log(bi);
    if (!bi) { return false; }

    var image = new Image();
    image.src = bi;

    var w = window.open("");
    w.document.write(image.outerHTML);
}

async function moblob_io_GETFromBlob() {
    moio_blinkIOActivity(true)
    const response = await fetch(_uri);
    const data = await response.json();
    console.log(data);
    var directoryfiles = data.listnames;
    var container = data.container;
    moblob_endPostItem(directoryfiles, container)//
}

async function moblob_io_toblob() {
    console.log("POST to blob");

    var files = _(_blobSelectedImageId).files;

    if (!files.length) {
        return false;
    }

    moio_blinkIOActivity(true)

    var battlePlans = new FormData();
    for (var i0 = 0; i0 < files.length; i0++) {
        battlePlans.append("battlePlans", files[i0]);
    }

    console.log(files);
    console.log(battlePlans);

    await fetch(_uri, {
        method: 'POST',
        body: battlePlans
    })
        .then(response => response.text())
        .then((response) => {
            var filenames = JSON.parse(response);
            var directoryfiles = filenames.listnames;
            var container = filenames.container;
            moblob_endPostItem(directoryfiles, container)//
            mouix_showtoastOK('ok','Item salvo')
        })
        .catch(error => {
            console.error('Unable to add item.', error)
            moio_blinkIOActivity(false)
            // show no ok
            mouix_showtoastOK('nok','Erro ao salvar')
        });


    moio_blinkIOActivity(false)
   
}

function moblob_f_removeFromBlob() {
    var container = null;
    if (!container) {
        container = _defaultContainer;
    }

    var imgSrc = _(_blobSelectedImageId).getAttribute("imgId")
    console.log(container, imgSrc);
    moblob_io_removeFromBlob(container, imgSrc)
}

/// DELETE
async function moblob_io_removeFromBlob(container, imgSrc) {
    var selectedImage = _(_blobSelectedImageId)
    moio_blinkIOActivity(true)
    var uri = _uri + "/" + container + "/" + imgSrc;
    await fetch(uri, {
        method: 'DELETE'
    })
        .then((response) => {

            var status = response.status;
            if (status == 200) {

                // build function to end removal
                _(imgSrc).outerHTML = "";
                moblob_f_clearSelectedImage();
                selectedImage.removeAttribute("imgid");
                selectedImage.classList.remove("loaded");
                moio_blinkIOActivity(false)

                // Trigger toast/ Snackbar
                mouix_showtoastOK('ok')

            }
        })
        .catch(error => {
            console.error('Unable to delete item.', error)
            moio_blinkIOActivity(false)
            mouix_showtoastOK('nok')
        });
}


function moblob_f_getimageurl(img) {
    var style = img.currentStyle || window.getComputedStyle(img, false),
        bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");

    var check = img.classList.value.indexOf("loaded");
    //  console.log(check);
    if (check < 0) { return false; }
    return bi;
}


function moblob_endPostItem(directoryfiles, container) {
    if (!container) {
        container = _defaultContainer;
    }
    console.log(directoryfiles)

    var pathfile = _path + container + "/";
    var directory = []


    if (!directoryfiles) {
        console.log(null)
        return false;
    }
    directory = directoryfiles.split(",")


    var imgHtml = "";
    var thumb = "";

    for (var i = 0; i < directory.length; i++) {
        if (directory[i]) {
            var imgUrl = pathfile + directory[i];
            var thumb = '<div id="' + directory[i] + '" class="center-cropped" style="background-image: url(' + imgUrl + '); "></div>'
            imgHtml += thumb;
            _loadedCollection.push(imgUrl)
        }
    }
    // console.log(imgHtml)
    _(_mo_blob_content).innerHTML = imgHtml;
    moio_blinkIOActivity(false)
}


function moblob_f_displaySelectedImage(ev, container) {
    if (!container) {
        container = _defaultContainer;
    }
    var imgId = ev.target.id;
  
    var pathfile = _path + container + "/" + imgId ;
    //console.log(ev.target.id)
    //console.log(ev)

    var readXml = pathfile;
    moblob_f_display_image(readXml, null, _blobSelectedImageId);
    moblob_f_setSelectedImageId(imgId);
}


async function moblob_f_captureInputFile(e) {

    var files = e.target.files;

    for (var i = 0; i < files.length; i++) {
        // We need to represent the image as a file,
        var file = files[i]
        var blob = file;
        // and use a URL or webkitURL (whichever is available to the browser)
        // to create a temporary URL to the object
        var URLObj = window.URL || window.webkitURL;
        var source = URLObj.createObjectURL(blob);

        var img = await moblob_f_createImage(source)
        //var h = img.height;
        //var w = img.width;
        //var check = h < w;

        collection.push(img);
    }

    console.log(collection)
    moblob_f_buildImageCollection(collection);
    mouix_f_toggleTagName('moimg_options')
}

function moblob_f_createImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
    })
}

function moblob_f_buildImageCollection(collection) {
    var coll = _('moblob_img_collection')
    coll.innerHTML = "";

    var l = collection.length;

    for (var i = 0; i < l; i++) {
        var div = document.createElement('div')
        div.classList.add('thumbs-center-cropped');
        div.id = 'blobimg-' + i;
        var dstyle = "background-image: url(" + collection[i].src + "); ";
        div.style = dstyle;
        var ci = _('moblob_cover_image')

        div.addEventListener('click', function () {
            var id = this.id.split('-')[1]

            var dstyle = "background-image: " + this.style.backgroundImage + ";";

            var img = collection[id];

            var vw = window.innerWidth - 0; // side left)

            var scalew = vw / img.width;
            var scaleh = scalew;

            var imgw = Math.round(img.width * scalew);
            var imgh = Math.round(img.height * scaleh);

            //  console.log(check, vw, scalew, scaleh, imgw, imgh);

            if (imgh <= 240) {
                imgh = 240;
                imgw = Math.round(img.width * (240 / imgh));
            } // min height
            if (imgw < imgh) {
                dstyle += " height:" + imgh + "px; width:" + vw + "px; ";
            } else {
                dstyle += " height:" + imgh + "px; width:" + imgw + "px";
            }
            ci.style = dstyle;
            ci.classList.add('cover_image_selected')
            ci.classList.remove('cover_image_blank')

        })

        coll.append(div);
    }
}    

function moblob_f_clearFromSelected(ev) {
    //moblob_f_clearSelectedImage();
    //selectedImage.removeAttribute("imgid");
    //selectedImage.classList.remove("loaded");
}
