﻿/**
 * Copyright (c) 2024
 * MapOmega Tecnologia
 * SC23MVP500 - SpaceX Raptor
 * This file lists all functions for UIX
 *
 *
 * @summary Functions for the UIX
 * @author KingOfDendroar <support@mapomega.com>
 * @location Casinha, Sítio Água Santa
 *
 * Created at       : 2024-02-18 12:00:00 
 * Revision         : 01/   2024-02-18    
 * Last modified    : 2024-02-18 12:00:0
 * 
 */

function mouix_f_setUIXEvents() {

    //_('mouix_dashboard').
    //    addEventListener('click', modash_start)

    _('mouix_setPin').
        addEventListener('click', mouix_PinToast)

    _('mo-switch-images').
        addEventListener('click', function () {
            mouix_f_toggleTagName('mo_blob_content')
        })
}

function mouix_PinToast() {
   // console.log("open pin toast");

    var pin = _('mouix_setPin').classList.contains('text-warning');
    if (pin) {
        _('mouix_setPin').classList.remove('text-warning');
        _('mouix_setPin').classList.add('color-theme');
        _('mouix_setPin').classList.add('opacity-25');
        var eventTitle = 'pin-off'
    } else {
        
        _('mouix_setPin').classList.remove('color-theme');
        _('mouix_setPin').classList.remove('opacity-25');
        _('mouix_setPin').classList.add('text-warning');
        eventTitle = 'pin-in'
    }
    var node = _('mouix_SelectedItem')
    const clone = node.cloneNode(true);
    mouix_f_showPintoast('ok', eventTitle, clone.innerHTML)
}

function mouix_f_showPintoast(toastId, toastTitle, toastBody) {
    if (!toastId) {
        return false
    }
    if (!_('mo-pin-fixed')) { return false }
   
    toastId = 'mo_pintoast_' + toastId;
    if (toastTitle == 'pin-in') {
        _('mo-pin-fixed').classList.remove('d-none')
        _('mo-pin-removed').classList.add('d-none')
    } else {
        _('mo-pin-removed').classList.remove('d-none')
        _('mo-pin-fixed').classList.add('d-none')
    }
    
    if (toastBody) {
        _(toastId + "-body").innerHTML = toastBody;
    }

    var toastID = _(toastId);
    toastID = new bootstrap.Toast(toastID);
    toastID.show();
   // console.log(toastBody)
}

function mouix_showtoastOK(toastStatus, toastTitle, toastBody) {

    var toastStatus = 'mo_msgtoast_' + toastStatus;

    //if (toastTitle) {
    //    _(toastStatus + '-title').innerHTML = toastTitle;      
    //} 

    //if (toastBody) {
    //    _(toastStatus+'-body').innerHTML = toastBody;
    //}

    var toast= _(toastStatus);
    toast = new bootstrap.Toast(toast);
    toast.show();
}

function mouix_f_swichContent(content) {
    var blobc = _cn('mo_blob_content');
    mouix_f_toggleClass(blobc, 'd-none') 

    var cardc = _cn('mo_card_content');
    mouix_f_toggleClass(cardc, 'd-none') 
}

function mouix_f_toggleClass(coll, tclass) {
    // console.log(coll)

    for (var i = 0; i < coll.length; i++) {
        coll[i].classList.toggle(tclass);
    }
}

function mouix_f_toggleTagName(content) {
    var coll = _qsa("[sccontent-toggle='" + content + "']");
    console.log(coll)
    if (coll.length == 0) { return false }
    for (var i = 0; i < coll.length; i++) {
        coll[i].classList.toggle('d-none');
    }
}


