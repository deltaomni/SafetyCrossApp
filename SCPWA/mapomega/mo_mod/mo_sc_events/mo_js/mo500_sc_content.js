/**
 * Copyright (c) 2024
 * MapOmega Tecnologia
 * SC23MVP500 - SpaceX Raptor
 * This file uploads a new event to
 * SQL Server
 *
 * @summary Put new event to DB
 * @author KingOfDendroar <support@mapomega.com>
 * @location Casinha, Sítio Água Santa
 *
 * Created at       : 2028-02-10 12:00:00 
 * Revision         : 01/   2028-02-10    
 * Last modified    : 2028-02-10 12:00:0
 * 
 */

var _sc_new_event =
{
    "scimages": [],
    "scimpact": [],
    "scnature": null,
    "scdatetime": null,
    "scdescription": null,
    "scgeolocation": null,
    "scoptions": [],
    "scuser": null,
    "scformdatetime":null
}

function scevent_f_setNewEventEvents() {
    // console.log('setNewEventEvents')

    // Add current date time to form
    var dd = new Date().toISOString(_locale)
    _("sc_event_datetime").innerHTML = dd;

    //Add User Name
    _("sc_event_user").value = _user[1];
    _("sc_event_username").innerHTML = _user[1];
    

    if (_('mo-menunewevent-body').classList.contains('listeners')) {
        console.log('Listeners Attached')
        return false
    }


    _('moblob_input_image_2')
        .addEventListener('input', moblob_f_captureInputFile, { once: false });
    _("mo_blob_content")
        .addEventListener("click", moblob_f_displaySelectedImage, { once: false });
    _("moblob_toggle_cover_bg")
        .addEventListener("click", scevent_f_toggleBackgdSize, { once: false });

    // Image Operations
    _("moimg_tostart")
        .addEventListener("click", function () { scevent_f_moveimg('start'), { once: false } });
    _("moimg_toend")
        .addEventListener("click", function () { scevent_f_moveimg('end'), { once: false } });
    _("moimg_remove")
        .addEventListener("click", scevent_f_removeImgFromCollection, { once: false });

    // toggle User/ Incognito 
    _("sc_event_user")
        .addEventListener("click", scevent_f_toggleIncognito, { once: false });

    // Cancel/close Events
    _("moevent_close")
        .addEventListener("click", scevent_clearAllFormEvent);
    _("moevent_cancel")
        .addEventListener("click", scevent_clearAllFormEvent);

    // Submit/ POST Event
    const form = _('mo-menunewevent-form');
    form.addEventListener('submit', scevent_f_handleSubmit, { once: false });

    _('mo-menunewevent-body').classList.add('listeners');

    //_("moevent_submitForm")
    //    .addEventListener("click", moblob_io_toblob);


//    // Blob
//    //_("moblob_copyimg")
//    //    .addEventListener("click", moblob_f_copyimg);
//    //_("moblob_openimg")
//    //    .addEventListener("click", moblob_f_openimg);
//    //_("moblob_input_image")
//    //    .addEventListener("input", moblob_f_input_image);
//    _('moblob_input_image_2')
//        .addEventListener('input', moblob_f_captureInputFile);
//    _("mo_blob_content")
//        .addEventListener("click", moblob_f_displaySelectedImage);
//    //    _("moblob_erase")
//    //        .addEventListener("click", moblob_f_removeFromBlob);
//    //
//    _("moblob_toggle_cover_bg")
//        .addEventListener("click", scevent_f_toggleBackgdSize);
}

function scevent_f_removeImgFromCollection(ev) {

    console.log(_selectedCover)

    _collection.splice(_selectedCover, 1);
    scevent_f_clearCollection(_collection);

}


function scevent_clearAllFormEvent() {
   // console.log('Clear Form');

    // clean collection
    _collection = [];
    scevent_toggleCollectionClass(_collection)

    // Clear Cover Image
    scevent_f_clearcoverImage()

    // clear incognito
    scevent_f_toggleIncognito(null)

    //Reset Form
    _("mo-menunewevent-form").reset();

    // Scroll form to top
    scevent_f_scrolltoTop("mo-menunewevent");
}

function scevent_f_clearcoverImage() {
    var ci = _('moblob_cover_image')
    if (!_collection.length) {
        ci.style = '';
        ci.classList.remove('cover_image_selected')
        ci.classList.add('cover_image_blank')
        return false;
    }

}


function scevent_f_clearSelectedImage() {

    var selectedImage = _(_blobSelectedImageId)

    selectedImage.style = "";
}

// show/hide moblob_img_collection when _collection is null/not
function scevent_toggleCollectionClass(_collection) {

   // console.log(_collection)
    var cncoll = _cn('moimg_uploads')
    
    for (var i = 0; i < cncoll.length; i++) {
        var check = cncoll[i].getAttribute('data-uploads')
        if (check=='on' && _collection.length) {
            cncoll[i].classList.remove('d-none');
        }
        if (check=='off' && _collection.length) {
            cncoll[i].classList.add('d-none');
        }
        if (check=='on' && !_collection.length) {
            cncoll[i].classList.add('d-none');
        }
        if (check=='off' && !_collection.length) {
            cncoll[i].classList.remove('d-none');
        }
    }
}

function scevent_f_showSelectedUpload(e, imgid) {
    //  console.log('selected:', imgid);

    if (e && !imgid) {
        var id = e.id.split('-')[1];
    }

    if (imgid >= 0) {
        id = imgid

        // Identify Cover Image
        _selectedCover = id;
    }

    // Clear Cover Image
    var ci = _('moblob_cover_image');
    scevent_f_clearcoverImage()
    // scroll to top
    scevent_f_scrolltoTop("mo-menunewevent");

    if (!_collection.length) { return false }

    var dstyle = "background-image: url('" + _collection[id][0].src + "');";

    var img = _collection[id][0];

    var vw = window.innerWidth - 0; // side left)

    var scalew = vw / img.width;
    var scaleh = scalew;

    var imgw = Math.round(img.width * scalew);
    var imgh = Math.round(img.height * scaleh);

    if (imgh <= vw) {
        imgh = vw;
        imgw = Math.round(img.width * (vw / imgh));
    } // min height
    if (imgw < imgh) {
        dstyle += " height:" + imgh + "px; width:" + vw + "px; ";
    } else {
        dstyle += " height:" + imgh + "px; width:" + imgw + "px";
    }

    ci.style = dstyle;
    ci.classList.add('cover_image_selected')
    ci.classList.remove('cover_image_blank')

}

function scevent_f_scrolltoTop(elid) {
    _(elid).scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}


function scevent_f_clearImageInput() {
    var selectedImage = _(_blobSelectedImageId)
    selectedImage.value = null;
}

function scevent_f_clearCollection(_collection, imgid) {

    imgid = imgid || 0

    // select First Image in _collection
    scevent_f_showSelectedUpload(null, imgid)

    // clear Input Image
    scevent_f_clearImageInput()

    moblob_f_buildImageCollection(_collection);
    scevent_toggleCollectionClass(_collection);
}

function scevent_f_moveimg(value) {
   // console.log(value, _selectedCover)

    if (value == 'start' && _selectedCover) {
        var img = _collection.splice(_selectedCover, 1)
        _collection.splice(_selectedCover - 1, 0, img[0])
        _selectedCover--
    }

    if (value == 'end' && _selectedCover != (_collection.length - 1)) {
        _selectedCover++
        var img1 = _collection.splice(_selectedCover, 1)
        _collection.splice(_selectedCover-1, 0, img1[0])   
    }

    scevent_f_clearCollection(_collection, _selectedCover)
}

function scevent_f_toggleBackgdSize() {
    var bg = _('moblob_cover_image').classList.toggle('cover_image_toggle');

}

function scevent_f_toggleIncognito(status) {
   
    var incognito = _cn('mouser_id')
 //   console.log(incognito);
    for (var i = 0; i < incognito.length; i++) {
        var cl = incognito[i].classList;
    
        if (status) { // add incognito
            incognito[i].classList.toggle('d-none');
            _('sc_event_user').value = 'Incognito';
          //  console.log(incognito[i]);
        } else { // remove incognito
            if (cl.contains('incognito')) {
                incognito[i].classList.add('d-none');
            } else {
                incognito[i].classList.remove('d-none');
            }
            _('sc_event_user').value = _user[1];
        }
    }
} 

function scevent_f_handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    console.log(event)

    // Do a bit of work to convert the entries to a plain JS object
    const value = Object.fromEntries(data.entries());
    value.scimpact = data.getAll("scimpact");
    value.scoptions = data.getAll("scoptions");

    // get image collection
    var scimages = []
    for (var i = 0; i < _collection.length; i++) {
        scimages.push(_collection[i][0])
    }
    value.scimages = scimages;

    // insert Date Open and Sent
    value.scformDatetimeUTC = _("sc_event_datetime").innerHTML;
    value.scformSentDatetimeUTC = new Date().toISOString(_locale);

    var formuser = _("sc_event_user").value;
    if (formuser == 'Incognito') {
        value.scmuser = "Incognito"
    } else {
        value.formuser = _user
    }

    // Locale
    value.sclocale = _locale;

    //console.log({value });
    console.log(value);

    // Images to Blob
    //moblob_io_toblob()

    // Reset Form
    scevent_clearAllFormEvent();

    // Scroll form to top
    scevent_f_scrolltoTop("mo-menunewevent");
}

