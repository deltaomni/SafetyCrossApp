/**
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

function mouix_setUIXEvents() {
    _('mouix_setPin').
        addEventListener('click', mouix_PinToast)
}

function mouix_PinToast() {
    console.log("open pin toast");
    var node = _('mouix_SelectedItem')
    const clone = node.cloneNode(true);
    var pin = _('mouix_setPin').classList.contains('text-warning');
    console.log(pin, _('mouix_setPin').classList);
    if (pin) {
        _('mouix_setPin').classList.remove('text-warning');
        _('mouix_setPin').classList.add('text-secondary');
        _('mouix_setPin').classList.add('opacity-25');
        var toastTitle = 'pin-off'
    } else {
        
        _('mouix_setPin').classList.remove('text-secondary');
        _('mouix_setPin').classList.remove('opacity-25');
        _('mouix_setPin').classList.add('text-warning');
        toastTitle = 'pin-in'
    }

    moblob_f_showtoastOK('ok', toastTitle, clone.outerHTML)
}

function moblob_f_showtoastOK(toastId, toastTitle, toastBody) {
    if (!toastId) {
        return false
    }
   
    toastId = 'mo_msgtoast_' + toastId;
    if (toastTitle) {
        if (toastTitle == 'pin-in' || toastTitle == 'pin-off') {
            toastTitle = _(toastId).getAttribute('data-' + toastTitle);
        }
            _(toastId + "-title").innerHTML = toastTitle;
    
    }
    if (toastBody) {
        _(toastId + "-body").innerHTML = toastBody;
    }

    var toastID = _(toastId);
    toastID = new bootstrap.Toast(toastID);
    toastID.show();
    console.log(toastBody)
}
