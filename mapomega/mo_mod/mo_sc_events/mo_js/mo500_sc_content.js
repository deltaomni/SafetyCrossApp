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
    "scpics": [],
    "scimpact": [],
    "scnature": null,
    "scdatetime": null,
    "scdescription": null,
    "scgeolocation": null,
    "scoptions": [],
    "scuser": null
}

// sc_form_input
// sc_form_btn
// sc_form_html
// sc_form_check
// sc_form_radio
// sc_form_date
// sc_form_textarea
// sc_form_img
// sc_form_style
function scevent_f_clearEvent(type, value) {

    var coll_ = _cn(type);
    for (var i = 0; i < coll_.length; i++) {
        var ci = coll_[i]
        switch (type) {
            case 'sc_form_input':
                console.log(type, ci.id, "value:", ci.value)
                break;
            case 'sc_form_btn':
                console.log(type, ci.id, "class:", ci.classList)
                break;
            case 'sc_form_html':
                console.log(type, ci.id, "Html:", ci.innerHTML)
                break;
            case 'sc_form_check':
                console.log(type, ci.id, "Checked:", ci.checked)
                break;
            case 'sc_form_radio':
                console.log(type, ci.id, "Radio:", ci.checked)
                break;
            case 'sc_form_date':
                console.log(type, ci.id, "Date:", ci.value)
                break;
            case 'sc_form_textarea':
                console.log(type, ci.id, "TextArea:", ci.value)
                break;
            case 'sc_form_img':
                console.log(type, ci.id, "Img:", ci.src)
                break;
            case 'sc_form_style':
                console.log(type, ci.id, "Style:", ci.style)
                break;
            default:
                break;
        }
    }
}

function scevent_clearAllFormEvent() {
    // sc_form_input
    scevent_f_clearEvent("sc_form_input", null)
    // sc_form_btn
    scevent_f_clearEvent("sc_form_btn", null)
    // sc_form_html
    scevent_f_clearEvent("sc_form_html", null)
    // sc_form_check
    scevent_f_clearEvent("sc_form_check", null)
    // sc_form_radio
    scevent_f_clearEvent("sc_form_radio", null)
    // sc_form_date
    scevent_f_clearEvent("sc_form_date", null)
    // sc_form_textarea
    scevent_f_clearEvent("sc_form_textarea", null)
    // sc_form_img
    scevent_f_clearEvent("sc_form_img", null)
    // sc_form_style
    scevent_f_clearEvent("sc_form_style", null)
}

// show/hide moblob_img_collection when collection is null/not
function scevent_toggleCollectionClass(collection) {

    console.log(collection)
    var cncoll = _cn('moimg_uploads')
    
    for (var i = 0; i < cncoll.length; i++) {
        var check = cncoll[i].getAttribute('data-uploads')
        if (check=='on' && collection.length) {
            cncoll[i].classList.remove('d-none');
        }
        if (check=='off' && collection.length) {
            cncoll[i].classList.add('d-none');
        }
        if (check=='on' && !collection.length) {
            cncoll[i].classList.add('d-none');
        }
        if (check=='off' && !collection.length) {
            cncoll[i].classList.remove('d-none');
        }
    }

}

function scevent_f_showSelectedUpload(e, imgid) {
  //  console.log(e)
    if (e && !imgid) {
        var id = e.id.split('-')[1];
    }
    if (imgid >= 0) {
        id = imgid;
    }

   // console.log(id)
    var ci = _('moblob_cover_image')
    if (!collection.length) {
        ci.style = '';
        ci.classList.remove('cover_image_selected')
        ci.classList.add('cover_image_blank')
        return false;
    }
    var dstyle = "background-image: url('" + collection[id].src + "');";

    var img = collection[id];

    var vw = window.innerWidth - 0; // side left)

    var scalew = vw / img.width;
    var scaleh = scalew;

    var imgw = Math.round(img.width * scalew);
    var imgh = Math.round(img.height * scaleh);

    //if (imgh <= 240) {
    //    imgh = 240;
    //    imgw = Math.round(img.width * (240 / imgh));
    //} // min height
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

    // Identify Cover Image
    _selectedCover = id;
    console.log(_selectedCover)
}

function scevent_f_clearImageInput() {
    var selectedImage = _(_blobSelectedImageId)
    selectedImage.value = null;
}

function scevent_f_clearCollection(collection, imgid) {
    moblob_f_buildImageCollection(collection);
    scevent_toggleCollectionClass(collection);

    imgid = imgid || 0
    // select First Image in collection
    scevent_f_showSelectedUpload(null, imgid)

    // clear Input Image
    scevent_f_clearImageInput()

}

function scevent_f_moveimg(value) {
    console.log(value, _selectedCover)

    if (value == 'start' && _selectedCover) {
        var img = collection.splice(_selectedCover, 1)
        collection.splice(_selectedCover - 1, 0, img[0])
        _selectedCover--
    }

    if (value == 'end' && _selectedCover != (collection.length - 1)) {
        _selectedCover++
        var img1 = collection.splice(_selectedCover, 1)
        collection.splice(_selectedCover-1, 0, img1[0])
       
    }

    scevent_f_clearCollection(collection, _selectedCover)
}

function scevent_f_toggleBackgdSize() {
    var bg = _('moblob_cover_image').classList.toggle('cover_image_toggle');

}

function scevent_f_toggleIncognito() {
    var incognito = _cn('mo-event-userid')
    for (var i = 0; i < incognito.length; i++) {
        incognito[i].classList.toggle('d-none');
    }
} 