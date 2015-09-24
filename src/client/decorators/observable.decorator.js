'use strict';
var eventList = Symbol();
/**
 * Given a list of callback functions it iterates through it
 * and calls each function alongside the passed arguments
 *
 * Thanks to Jeremy Ashkenas @see https://github.com/jashkenas/backbone/
 *
 * @param [Array] callbacks the list of callback functions to be called
 * @param [Array] args the arguments array passed to EventBus::trigger
 **/

function triggerEventCallbacks(callbacks, args) {
    if (!callbacks || !callbacks.length) {
        return;
    }
    var cbLen, i, a1 = args[0], a2 = args[1], a3 = args[2];
    cbLen = callbacks.length;
    i = -1;
    switch (args.length) {
        case 0:
            while (++i < cbLen) {
                callbacks[i].cb.call(callbacks[i].ctx);
            }
            break;
        case 1:
            while (++i < cbLen) {
                callbacks[i].cb.call(callbacks[i].ctx, a1);
            }
            break;
        case 2:
            while (++i < cbLen) {
                callbacks[i].cb.call(callbacks[i].ctx, a1, a2);
            }
            break;
        case 3:
            while (++i < cbLen) {
                callbacks[i].cb.call(callbacks[i].ctx, a1, a2, a3);
            }
            break;
        default:
            while (++i < cbLen) {
                callbacks[i].cb.apply(callbacks[i].ctx, result);
            }
    }

}


/**
 *  @ngdoc method
 *  @name trigger
 *  @methodOf ObserableMixin
 *  @description
 *   Triggers the event specified and calls the
 *   attached callback functions
 *  @param {String} event the name of the event that will be triggered
 */
function trigger(event, ...args) {
    var eventCallbacks = this[eventList][event];
    if (event && eventCallbacks && eventCallbacks.length) {
        triggerEventCallbacks(eventCallbacks, args);
    }
}

/**
 *  @ngdoc method
 *  @name on
 *  @methodOf Observable
 *  @description Attaches an event to a callback
 *  @param {String} event the name of the event it will monitor
 *  @param {Function} cb the callback function triggered for event
 *  @param {Object} ctx Context in which the callback function will be called
 *  @return {EventBus}
 */
function on(event, cb, ctx) {
    if (typeof cb === 'function' && typeof event === 'string') {
        if (!this[eventList][event]) {
            this[eventList][event] = [];
        }
        this[eventList][event].push({
            cb: cb,
            ctx: ctx || this
        });
    }
}

/**
 *  @ngdoc method
 *  @name off
 *  @methodOff Observable
 *  @description
 *   Removes a callback function for a given event and
 *   deletes the event if the callback list becomes empty
 *  @param {String} event the name of the event
 *  @param {Function} cb the callback to be removed from the callback list
 */
function off(event, cb) {
    var callback, callbackList, i, j, len, retain;
    callbackList = this[eventList][event];
    if (event && cb && callbackList && callbackList.length) {
        this[eventList][event] = retain = [];
        for (i = j = 0, len = callbackList.length; j < len; i = ++j) {
            callback = callbackList[i];
            if (callback.cb !== cb) {
                retain.push(callback);
            }
        }
        if (retain.length) {
            this[eventList][event] = retain;
        } else {
            delete this[eventList][event];
        }
    }
}

/**
 * checks if anyone is listening on the given event
 * @param event {string} the event to check
 * @returns {boolean|*}
 */

function hasTrigger(event) {
    return this[eventList][event] && this[eventList][event].length
}

/**
 *  @ngdoc decorator
 *  @name Observable
 *  @description
 *  Dispatching mechanism for centralizing application-wide events
 *  The internal structure of the event list looks like this:
 *      events = {
 *          callbacks: [{cb, ctx}, {cb, ctx}, ...]
 *      }
 *  where each object corresponding to the "eventName" array,
 *  represents a set containing a callback and a context
 *
 *  es7 example
 *  <example>
 *      @Observable
 *      class Person {
 *      }
 *      var y = new Person();
 *      y.on('event', function(){
 *          console.log('y event triggered')
 *      });
 *      y.trigger('event');
 *  </example>
 *
 *
 */

export default function observable(target) {
    Object.defineProperty(target, 'hasTrigger', {
        value: hasTrigger
    });
    Object.defineProperty(target.prototype, 'on', {
        enumerable: false,
        value: on
    });
    Object.defineProperty(target.prototype, 'off', {
        enumerable: false,
        value: off
    });
    Object.defineProperty(target.prototype, 'emit', {
        enumerable: false,
        value: trigger
    });
    Object.defineProperty(target.prototype, 'trigger', {
        enumerable: false,
        value: trigger
    });

    //target.prototype.hasTrigger = hasTrigger;
    //target.prototype.on = on;
    //target.prototype.off = off;
    //target.prototype.trigger = trigger;
    var oldConstructor = target.prototype.constructor;

    function Wrapper() {
        this[eventList] = [];
        oldConstructor.apply(this, arguments);
    }

    Wrapper.prototype = target.prototype;
    Wrapper.prototype.constructor = Wrapper;
    return Wrapper;
}