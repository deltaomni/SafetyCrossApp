/**
 * Copyright (c) 2024
 * MapOmega Tecnologia
 * SC23MVP500 - SpaceX Raptor
 * This file starts the Safety Cross App
 *
 *
 * @summary Starts the App
 * @author KingOfDendroar <support@mapomega.com>
 * @location Casinha, Sítio Água Santa
 *
 * Created at       : 2024-02-18 12:00:00 
 * Revision         : 01/   2024-02-18    
 * Last modified    : 2024-02-18 12:00:0
 * 
 */


    // Global Variables
    /// To Be completed

'use strict'

function mostart_init() {
    console.log('ok');
    var getimages = moblob_io_GETFromBlob();

    mouix_f_setUIXEvents();
     //moio_setBlobEvents();
     //scevent_f_setNewEventEvents();

    return "ok";
}


    /**
    * Get element by Id
    * @param {string} id - input element id
    * @returns {element} - element
    */
    function _(id) {
        return document.getElementById(id);
    }

    /**
    * Get element by class name
    * @param {string} classname - input element classname
    * @param {string} element - input element - optional
    * @returns {[element]} - Array of elements
    */
    function _cn(cname, el) {
        if (el) {
            return el.getElementsByClassName(cname);
        } else {
            return document.getElementsByClassName(cname);
        }
    }
    /**
    * Get element by Selector 
    * @param {string} classname - input element Selector (id,class,...)
    * @param {string} element - input element - optional
    * @returns {[element]} - Array of elements
    */
    function _qsa(cname, el) {
        if (el) {
            return el.querySelectorAll(cname);
        } else {
            return document.querySelectorAll(cname);
        }
    }

    /**
    * Get element by Tag Name 
    * @param {string} classname - input element Tag Name (<p>,<div>,<span>)
    * @param {string} element - input element - optional
    * @returns {[element]} - Array of elements
    */
    function _tn(cname, el) {
        if (el) {
            return el.getElementsByTagName(cname);
        } else {
            return document.getElementsByTagName(cname);
        }
    }

var start = mostart_init();