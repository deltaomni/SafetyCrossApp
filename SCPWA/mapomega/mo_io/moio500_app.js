/**
 * Copyright (c) 2024
 * MapOmega Tecnologia
 * SC23MVP500 - SpaceX Raptor
 * This file performs I/O operations
 * For the Safety Cross App
 *
 * @summary I/O Operations
 * @author KingOfDendroar <support@mapomega.com>
 * @location Casinha, Sítio Água Santa
 *
 * Created at       : 2024-02-18 12:00:00 
 * Revision         : 01/   2024-02-18    
 * Last modified    : 2024-02-18 12:00:0
 * 
 */

/**
* Blink element when I/O Operation is in progress
* @param {bool} status - true: start blinking/ false: end blinking
* @returns {id} - element id (Optional)
*/
function moio_blinkIOActivity(status, id) {

    if (id) {
        var divTimer = id;
    } else {
        blinkel = "mo_blinkEl";
    }
    var blink = _cn(blinkel);
    for (var i = 0; i < blink.length; i++) {
        var list = blink[i].classList;
        if (status === false) { // STOP PROCESS
            list.add('d-none');
        } else { // START PROCESS
            list.remove('d-none')
        }
    }
}
