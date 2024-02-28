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
    "Description": null,
    "geolocation": null,
    "options": [],
    "user": null
}

function scevent_f_clearNewEvent() {
    moblob_f_clearSelectedImage(_blobSelectedImageId);

    //var visitor = _('mo_event_visitor').checked;
    //var incognito = _('mo_event_incognito').checked;

    _('mo_event_visitor').checked = false;
    _('mo_event_incognito').checked = false;

    // console.log(visitor, incognito);
}

