/**
 * Created by james on 26/11/13.
 * Imported the idea from Visuals.js, credits belong to them!
 */
var Visuals = {
    namespace: function(namespace, obj) {

        var parts = namespace.split('.');

        var parent = Visuals;

        for(var i = 1, length = parts.length; i < length; i++) {
            var currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart];
        }
        return parent;
    },
    keys: function(obj) {
        var keys = [];
        for (var key in obj) keys.push(key);
        return keys;
    },

    extend: function(destination, source) {

        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    },

    clone: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
};


if (typeof module !== 'undefined' && module.exports) {
    var d3 = require('d3');
    module.exports = Visuals;
}


/* Adapted from https://github.com/Jakobo/PTClass */

/*
 Copyright (c) 2005-2010 Sam Stephenson

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/* Based on Alex Arnell's inheritance implementation. */
/** section: Language
 * class Class
 *
 *  Manages Prototype's class-based OOP system.
 *
 *  Refer to Prototype's web site for a [tutorial on classes and
 *  inheritance](http://prototypejs.org/learn/class-inheritance).
 **/
(function(globalContext) {
    /* ------------------------------------ */
    /* Import from object.js                */
    /* ------------------------------------ */
    //console.log(globalContext)
    var _toString = Object.prototype.toString,
        NULL_TYPE = 'Null',
        UNDEFINED_TYPE = 'Undefined',
        BOOLEAN_TYPE = 'Boolean',
        NUMBER_TYPE = 'Number',
        STRING_TYPE = 'String',
        OBJECT_TYPE = 'Object',
        FUNCTION_CLASS = '[object Function]';
    function isFunction(object) {
        return _toString.call(object) === FUNCTION_CLASS;
    }
    function extend(destination, source) {
        for (var property in source) if (source.hasOwnProperty(property)) // modify protect primitive slaughter
            destination[property] = source[property];
        return destination;
    }
    function keys(object) {

        if (Type(object) !== OBJECT_TYPE) { throw new TypeError(); }
        var results = [];
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                results.push(property);
            }
        }
        return results;
    }
    function Type(o) {
        switch(o) {
            case null: return NULL_TYPE;
            case (void 0): return UNDEFINED_TYPE;
        }
        var type = typeof o;
        switch(type) {
            case 'boolean': return BOOLEAN_TYPE;
            case 'number':  return NUMBER_TYPE;
            case 'string':  return STRING_TYPE;
        }
        return OBJECT_TYPE;
    }
    function isUndefined(object) {
        return typeof object === "undefined";
    }
    /* ------------------------------------ */
    /* Import from Function.js              */
    /* ------------------------------------ */
    var slice = Array.prototype.slice;
    function argumentNames(fn) {
        var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
            .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
            .replace(/\s+/g, '').split(',');
        return names.length == 1 && !names[0] ? [] : names;
    }
    function wrap(fn, wrapper) {
        var __method = fn;
        return function() {
            var a = update([bind(__method, this)], arguments);
            return wrapper.apply(this, a);
        }
    }
    function update(array, args) {
        var arrayLength = array.length, length = args.length;
        while (length--) array[arrayLength + length] = args[length];
        return array;
    }
    function merge(array, args) {
        array = slice.call(array, 0);
        return update(array, args);
    }
    function bind(fn, context) {
        if (arguments.length < 2 && isUndefined(arguments[0])) return this;
        var __method = fn, args = slice.call(arguments, 2);
        return function() {
            var a = merge(args, arguments);
            return __method.apply(context, a);
        }
    }

    /* ------------------------------------ */
    /* Import from Prototype.js             */
    /* ------------------------------------ */
    var emptyFunction = function(){};

    var Class = (function() {

        // Some versions of JScript fail to enumerate over properties, names of which 
        // correspond to non-enumerable properties in the prototype chain
        var IS_DONTENUM_BUGGY = (function(){
            for (var p in { toString: 1 }) {
                // check actual property name, so that it works with augmented Object.prototype
                if (p === 'toString') return false;
            }
            return true;
        })();

        function subclass() {};
        function create() {
            var parent = null, properties = [].slice.apply(arguments);
            if (isFunction(properties[0]))
                parent = properties.shift();

            function klass() {
                this.initialize.apply(this, arguments);
            }

            extend(klass, Class.Methods);
            klass.superclass = parent;
            klass.subclasses = [];

            if (parent) {
                subclass.prototype = parent.prototype;
                klass.prototype = new subclass;
                try { parent.subclasses.push(klass) } catch(e) {}
            }

            for (var i = 0, length = properties.length; i < length; i++)
                klass.addMethods(properties[i]);

            if (!klass.prototype.initialize)
                klass.prototype.initialize = emptyFunction;

            klass.prototype.constructor = klass;
            return klass;
        }

        function addMethods(source) {
            var ancestor   = this.superclass && this.superclass.prototype,
                properties = keys(source);

            // IE6 doesn't enumerate `toString` and `valueOf` (among other built-in `Object.prototype`) properties,
            // Force copy if they're not Object.prototype ones.
            // Do not copy other Object.prototype.* for performance reasons
            if (IS_DONTENUM_BUGGY) {
                if (source.toString != Object.prototype.toString)
                    properties.push("toString");
                if (source.valueOf != Object.prototype.valueOf)
                    properties.push("valueOf");
            }

            for (var i = 0, length = properties.length; i < length; i++) {
                var property = properties[i], value = source[property];
                if (ancestor && isFunction(value) &&
                    argumentNames(value)[0] == "$super") {
                    var method = value;
                    value = wrap((function(m) {
                        return function() { return ancestor[m].apply(this, arguments); };
                    })(property), method);

                    value.valueOf = bind(method.valueOf, method);
                    value.toString = bind(method.toString, method);
                }
                this.prototype[property] = value;
            }

            return this;
        }

        return {
            create: create,
            Methods: {
                addMethods: addMethods
            }
        };
    })();

    if (globalContext.exports) {
        globalContext.exports.Class = Class;
    }
    else {
        globalContext.Class = Class;
    }
})(Visuals);

Visuals.namespace('Visuals.Compat.ClassList');
Visuals.Compat.ClassList = function() {

    /* adapted from http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

    if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

        (function (view) {

            "use strict";

            var
                classListProp = "classList"
                , protoProp = "prototype"
                , elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
                , objCtr = Object
                , strTrim = String[protoProp].trim || function () {
                    return this.replace(/^\s+|\s+$/g, "");
                }
                , arrIndexOf = Array[protoProp].indexOf || function (item) {
                    var
                        i = 0
                        , len = this.length
                        ;
                    for (; i < len; i++) {
                        if (i in this && this[i] === item) {
                            return i;
                        }
                    }
                    return -1;
                }
            // Vendors: please allow content code to instantiate DOMExceptions
                , DOMEx = function (type, message) {
                    this.name = type;
                    this.code = DOMException[type];
                    this.message = message;
                }
                , checkTokenAndGetIndex = function (classList, token) {
                    if (token === "") {
                        throw new DOMEx(
                            "SYNTAX_ERR"
                            , "An invalid or illegal string was specified"
                        );
                    }
                    if (/\s/.test(token)) {
                        throw new DOMEx(
                            "INVALID_CHARACTER_ERR"
                            , "String contains an invalid character"
                        );
                    }
                    return arrIndexOf.call(classList, token);
                }
                , ClassList = function (elem) {
                    var
                        trimmedClasses = strTrim.call(elem.className)
                        , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
                        , i = 0
                        , len = classes.length
                        ;
                    for (; i < len; i++) {
                        this.push(classes[i]);
                    }
                    this._updateClassName = function () {
                        elem.className = this.toString();
                    };
                }
                , classListProto = ClassList[protoProp] = []
                , classListGetter = function () {
                    return new ClassList(this);
                }
                ;
            // Most DOMException implementations don't allow calling DOMException's toString()
            // on non-DOMExceptions. Error's toString() is sufficient here.
            DOMEx[protoProp] = Error[protoProp];
            classListProto.item = function (i) {
                return this[i] || null;
            };
            classListProto.contains = function (token) {
                token += "";
                return checkTokenAndGetIndex(this, token) !== -1;
            };
            classListProto.add = function (token) {
                token += "";
                if (checkTokenAndGetIndex(this, token) === -1) {
                    this.push(token);
                    this._updateClassName();
                }
            };
            classListProto.remove = function (token) {
                token += "";
                var index = checkTokenAndGetIndex(this, token);
                if (index !== -1) {
                    this.splice(index, 1);
                    this._updateClassName();
                }
            };
            classListProto.toggle = function (token) {
                token += "";
                if (checkTokenAndGetIndex(this, token) === -1) {
                    this.add(token);
                } else {
                    this.remove(token);
                }
            };
            classListProto.toString = function () {
                return this.join(" ");
            };

            if (objCtr.defineProperty) {
                var classListPropDesc = {
                    get: classListGetter
                    , enumerable: true
                    , configurable: true
                };
                try {
                    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                } catch (ex) { // IE 8 doesn't support enumerable:true
                    if (ex.number === -0x7FF5EC54) {
                        classListPropDesc.enumerable = false;
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                    }
                }
            } else if (objCtr[protoProp].__defineGetter__) {
                elemCtrProto.__defineGetter__(classListProp, classListGetter);
            }

        }(window));

    }
};

if ( (typeof Visuals_NO_COMPAT !== "undefined" && !Visuals_NO_COMPAT) || typeof Visuals_NO_COMPAT === "undefined") {
    new Visuals.Compat.ClassList();
}



Visuals.namespace('Visuals.Graph');
Visuals.Graph = function(args) {

    if (!args.element) throw "Visuals.Graph needs a reference to an element";
    this.params = args;
    this.element = args.element;
    this.series = args.series;

    this.defaults = {
        interpolation: 'cardinal',
        offset: 'zero',
        min: undefined,
        max: undefined,
        preserve: false
    };

    Visuals.keys(this.defaults).forEach( function(k) {
        this[k] = args[k] || this.defaults[k];
    }, this );

    this.window = {};

    this.updateCallbacks = [];

    var self = this;

    this.initialize = function(args) {

        this.validateSeries(args.series);

        this.series.active = function() { return self.series.filter( function(s) { return !s.disabled } ) };

        this.setSize({ width: args.width, height: args.height });

        this.element.classList.add('Visuals_graph');
//        this.vis = d3.select(this.element)
//            .append("svg:svg")
//            .attr('width', this.width)
//            .attr('height', this.height);

        for (var name in Visuals.Graph.Renderer) {
            if (!name || !Visuals.Graph.Renderer.hasOwnProperty(name)) continue;
            var r = Visuals.Graph.Renderer[name];
            if (!r || !r.prototype || !r.prototype.render) continue;
            self.registerRenderer(new r( { graph: self } ));
        }

        this.setRenderer(args.renderer || 'stack', args);
    };

    this.validateSeries = function(series) {
        //implement from subclass
    };

    this.dataDomain = function() {

        var data = this.series.map( function(s) { return s.data } );

        var min = d3.min( data.map( function(d) { return d[0].x } ) );
        var max = d3.max( data.map( function(d) { return d[d.length - 1].x } ) );

        return [min, max];
    };


    this.render = function() {

        var stackedData = this.stackData();

        this.renderer.render(this.series);

        this.updateCallbacks.forEach( function(callback) {
            callback();
        } );
    };

    this.update = this.render;

    this.stackData = function() {

        var data = this.series.active()
            .map( function(d) { return d.data } )
            .map( function(d) { return d.filter( function(d) { return this._slice(d) }, this ) }, this);

        var preserve = this.preserve;
        if (!preserve) {
            this.series.forEach( function(series) {
                if (series.scale) {
                    // data must be preserved when a scale is used
                    preserve = true;
                }
            } );
        }

        data = preserve ? Visuals.clone(data) : data;

        this.series.active().forEach( function(series, index) {
            if (series.scale) {
                // apply scale to each series
                var seriesData = data[index];
                if(seriesData) {
                    seriesData.forEach( function(d) {
                        d.y = series.scale(d.y);
                    } );
                }
            }
        } );

        this.stackData.hooks.data.forEach( function(entry) {
            data = entry.f.apply(self, [data]);
        } );

        var stackedData;

        if (!this.renderer.unstack) {

            this._validateStackable();

            var layout = d3.layout.stack();
            layout.offset( self.offset );
            stackedData = layout(data);
        }

        stackedData = stackedData || data;

        this.stackData.hooks.after.forEach( function(entry) {
            stackedData = entry.f.apply(self, [data]);
        } );


        var i = 0;
        this.series.forEach( function(series) {
            if (series.disabled) return;
            series.stack = stackedData[i++];
        } );

        this.stackedData = stackedData;

        return stackedData;
    };

    this._validateStackable = function() {

        var series = this.series;
        var pointsCount;

        series.forEach( function(s) {

            pointsCount = pointsCount || s.data.length;

            if (pointsCount && s.data.length != pointsCount) {
                throw "stacked series cannot have differing numbers of points: " +
                    pointsCount + " vs " + s.data.length + "; see Visuals.Series.fill()";
            }

        }, this );
    };

    this.stackData.hooks = { data: [], after: [] };

    this._slice = function(d) {

        if (this.window.xMin || this.window.xMax) {

            var isInRange = true;

            if (this.window.xMin && d.x < this.window.xMin) isInRange = false;
            if (this.window.xMax && d.x > this.window.xMax) isInRange = false;

            return isInRange;
        }

        return true;
    };

    this.onUpdate = function(callback) {
        this.updateCallbacks.push(callback);
    };

    this.registerRenderer = function(renderer) {
        this._renderers = this._renderers || {};
        this._renderers[renderer.name] = renderer;
    };

    this.configure = function(args) {

        if (args.width || args.height) {
            this.setSize(args);
        }

        Visuals.keys(this.defaults).forEach( function(k) {
            this[k] = k in args ? args[k]
                : k in this ? this[k]
                : this.defaults[k];
        }, this );

        this.setRenderer(args.renderer || this.renderer.name, args);
    };

    this.setRenderer = function(r, args) {
        if (typeof r == 'function') {
            this.renderer = new r( { graph: self } );
            this.registerRenderer(this.renderer);
        } else {
            if (!this._renderers[r]) {
                throw "couldn't find renderer " + r;
            }
            this.renderer = this._renderers[r];
        }

        if (typeof args == 'object') {
            this.renderer.configure(args);
        }
    };

    this.setSize = function(args) {

        args = args || {};

        if (typeof window !== undefined) {
            var style = window.getComputedStyle(this.element, null);
            var elementWidth = parseInt(style.getPropertyValue('width'), 10);
            var elementHeight = parseInt(style.getPropertyValue('height'), 10);
        }

        this.width = args.width || elementWidth || 400;
        this.height = args.height || elementHeight || 250;

//        this.vis && this.vis
//            .attr('width', this.width)
//            .attr('height', this.height);
    };

    this.initialize(args);
    
    
};


Visuals.namespace('Visuals.Graph.Ajax');

Visuals.Graph.Ajax = Visuals.Class.create( {

    initialize: function(args) {

        this.dataURL = args.dataURL;
        console.log(this.dataURL)
        this.onData = args.onData || function(d) { return d };
        this.onComplete = args.onComplete || function() {};
        this.onError = args.onError || function() {};

        this.args = args; // pass through to Visuals.Graph

        this.request();
    },

    request: function() {

        $.ajax( {
            url: this.dataURL,
            dataType: 'json',
            success: this.success.bind(this),
            error: this.error.bind(this)
        } );
    },

    error: function() {

        console.log("error loading dataURL: " + this.dataURL);
        this.onError(this);
    },

    success: function(data, status) {

        data = this.onData(data);

        this.args.series = this._splice({ data: data, series: this.args.series });

        this.graph = this.graph || new Visuals.Graph(this.args);
        this.graph.render();

        this.onComplete(this);
    },

    _splice: function(args) {

        var data = args.data;
        var series = args.series;

        if (!args.series) return data;

        series.forEach( function(s) {

            var seriesKey = s.key || s.name;
            if (!seriesKey) throw "series needs a key or a name";

            data.forEach( function(d) {

                var dataKey = d.key || d.name;
                if (!dataKey) throw "data needs a key or a name";

                if (seriesKey == dataKey) {
                    var properties = ['color', 'name', 'data'];
                    properties.forEach( function(p) {
                        if (d[p]) s[p] = d[p];
                    } );
                }
            } );
        } );

        return series;
    }
} );


Visuals.namespace('Visuals.Graph.JSONP');
Visuals.Graph.JSONP = Visuals.Class.create( Visuals.Graph.Ajax, {

    request: function() {

        $.ajax( {
            url: this.dataURL,
            dataType: 'jsonp',
            success: this.success.bind(this),
            error: this.error.bind(this)
        } );
    }
} );

Visuals.namespace("Visuals.Graph.Renderer");

Visuals.Graph.Renderer = Visuals.Class.create( {

    params:{},
    initialize: function(args) {
        this.graph = args.graph;
        this.configure(args);

    },

    seriesPathFactory: function() {
        //implement in subclass
    },

    seriesStrokeFactory: function() {
        // implement in subclass
    },

    defaults: function() {
        return {
            tension: 0.8,
            strokeWidth: 2,
            unstack: true,
            padding: { top: 0.01, right: 0, bottom: 0.01, left: 0 },
            stroke: false,
            fill: false
        };
    },

    domain: function(data) {
        // implement from subclass
    },

    render: function(args) {
        //console.log(args)
    },

    _styleSeries: function(series) {
     },

    configure: function(args) {
        this.params = args
//        args = args || {};
//
//        Visuals.keys(this.defaults()).forEach( function(key) {
//
//            if (!args.hasOwnProperty(key)) {
//                this[key] = this[key] || this.graph[key] || this.defaults()[key];
//                return;
//            }
//
//            if (typeof this.defaults()[key] == 'object') {
//
//                Visuals.keys(this.defaults()[key]).forEach( function(k) {
//
//                    this[key][k] =
//                        args[key][k] !== undefined ? args[key][k] :
//                            this[key][k] !== undefined ? this[key][k] :
//                                this.defaults()[key][k];
//                }, this );
//
//            } else {
//                this[key] =
//                    args[key] !== undefined ? args[key] :
//                        this[key] !== undefined ? this[key] :
//                            this.graph[key] !== undefined ? this.graph[key] :
//                                this.defaults()[key];
//            }
//
//        }, this );
    },

    setStrokeWidth: function(strokeWidth) {
        if (strokeWidth !== undefined) {
            this.strokeWidth = strokeWidth;
        }
    },

    setTension: function(tension) {
        if (tension !== undefined) {
            this.tension = tension;
        }
    }
} );



Visuals.namespace('Visuals.Graph.Renderer.Gauge');
Visuals.Graph.Renderer.Gauge = Visuals.Class.create( Visuals.Graph.Renderer, {

    name: 'gauge',

    _gauge :  {},

    defaults:  function(){
           return{
            unstack: true,
            fill: false,
            stroke: true
        }
    },
    seriesPathFactory: {},

    _switchFormatter : function(formatterName) {
        switch(formatterName) {
            case "percent":
                return this._percentFormatter;
                break

            default:
                return this._noneFormatter;
                break
        }
    },
    _percentFormatter : function(d) {
        if(d===null || d === 'undefined') return 0;
        return (d*100).toFixed(2);

    },

    _noneFormatter : function(d) {
        return d;
    },


    gaugeFactory : function(size, anchor, label, min, max){
        //console.log(anchor)

        var config =
        {
            size: size || 120,
            label: label,
            min: undefined != min ? min : 0,
            max: undefined != max ? max : 100,
            minorTicks: 5,
            majorTicks:10

        }

        var range = config.max - config.min;
        config.threshold = this.params.threshold ||{value:80,factor:"gt"}
        //this.params.yellowZones = [{from:0,to:10}]
        config.yellowZones =this.params.yellowZones || [{ from: config.min + range*0.80, to: config.min + range*0.9 }];
        config.redZones = this.params.redZones || [{ from: config.min + range*0.9, to: config.max }];

        var gauge = new Gauge(anchor, config);
        gauge.render();
        return gauge;
    },

    updateGauges : function(gauge, series,formatter){

            var value;
            for(var k = (series[0].data.length-1); k>=0; k--) {
                value = series[0].data[k].y
                if(value!=null){
                    //console.log("at "+k+" find "+value)
                    break;

                }
            }
            //console.log(gauge)

            if (value!=null) {
                var v = formatter(value)
                gauge.redraw(v)
            };


    },

    render : function(series) {


        var id = "#gauge-"+this.params.anchor.replace("#","")
        var svgid = "#gauge-"+id.replace("#","")
        //console.log(svgid)
        if(!$(svgid).length>0) {
            this._gauge = this.gaugeFactory(this.params.size,id,this.params.alias);
        } else {
            var formatterName = this.params.Formatter || "none"
            //console.log(formatterName)
            var formatter = this._switchFormatter(formatterName)
            this.updateGauges(this._gauge,series,formatter)
        }

    }
});

/*
 * Todo: Add a new visualisation that is made of Text box with value in type of metrics.gauge
 * display both value and timestamp
 */
Visuals.namespace('Visuals.Graph.Renderer.Box');
Visuals.Graph.Renderer.Box = Visuals.Class.create( Visuals.Graph.Renderer, {

    name: 'box',

    _box :  {},

    defaults:  function(){
        return{
            unstack: true,
            fill: false,
            stroke: true
        }
    },
    seriesPathFactory: {},

    _switchFormatter : function(formatterName) {
        switch(formatterName) {
            case "percent":
                return this._percentFormatter;
                break

            default:
                return this._noneFormatter;
                break
        }
    },
    _percentFormatter : function(d) {
        if(d===null || d === 'undefined') return 0;
        return (d*100).toFixed(2);

    },

    _noneFormatter : function(d) {
        return d;
    },


    boxFactory : function(size, anchor, value){
//        console.log(anchor)

        var config =
        {
            size: size || 120,
            value: undefined != value ? value : 0,
            threshold: this.params.threshold || null,
            height: this.params.height || null,
            width: this.params.width || null

        }

        var box = new Box(anchor, config);
        box.render();
        return box;
    },

    updateBox : function(box, series,formatter){
        box.redraw(series,formatter)

    },

    render : function(series) {
        var curSeries = []
        var formatterName = this.params.BoxFormatter || "none"
        //console.log(formatterName)
        var formatter = this._switchFormatter(formatterName)
        series.forEach(function(d){
                var curValue,
                    curTime
                for(var k = (d.data.length-1); k>=0; k--) {
                    curValue = d.data[k].y
                    if(curValue!=null){
                        curTime = d.data[k].x;

                        break;
                    }
                }

                if(formatterName==="none") {
                    formatter = d3.format(".2r")
                }
                curValue = formatter(curValue)
                //console.log(d.name)
                var names= d.name.split(".")
                var i = names.length-1<0?0:(names.length-1)

                var name1 = names[i-1]
                var name2 = names[i]//.replaceAll(")","")
                //console.log(name)

                var name = (name1!=null && name1!="*"? name1.split(")").join("").split(",")[0]+".":"")
                    +(name2!=null? name2.split(")").join("").split(",")[0]:"Read")
                //console.log(name)
                curTime = moment(moment.unix(curTime)).format("D MMM HH:mm")
                var curObj = {

                    name: name,
                    time: curTime,
                    value: curValue
                }
                curSeries.push(curObj)
            }
        ,this)

        var id = "#box-"+this.params.anchor.replace("#","")
        var svgid = "#box-"+id.replace("#","")
        //console.log(id)
        if(!$(svgid).length>0) {
            this._box = this.boxFactory(this.params.size,id,curSeries);
            $(svgid+' tr:eq(5)').style("display:none")
        } else {

            this.updateBox(this._box,curSeries,formatter)
        }

    }
});

Visuals.namespace('Visuals.Graph.Renderer.TBox');
Visuals.Graph.Renderer.TBox = Visuals.Class.create( Visuals.Graph.Renderer, {

    name: 'tbox',

    _box :  {},

    defaults:  function(){
        return{
            unstack: true,
            fill: false,
            stroke: true
        }
    },
    seriesPathFactory: {},

    _switchFormatter : function(formatterName) {
        switch(formatterName) {
            case "percent":
                return this._percentFormatter;
                break

            default:
                return this._noneFormatter;
                break
        }
    },
    _percentFormatter : function(d) {
        if(d===null || d === 'undefined') return 0;
        return (d*100).toFixed(2);

    },

    _noneFormatter : function(d) {
        return d;
    },


    boxFactory : function(size, anchor, value){
//        console.log(anchor)

        var config =
        {
            size: size || 120,
            value: undefined != value ? value : 0,
            threshold: this.params.threshold || null,
            height: this.params.height || null,
            width: this.params.width || null

        }

        var box = new TBox(anchor, config);
        box.render();
        return box;
    },

    updateBox : function(box, series,formatter){
        box.redraw(series,formatter)

    },

    render : function(series) {
        var curSeries = []
        var formatterName = this.params.BoxFormatter || "none"
        //console.log(formatterName)
        var formatter = this._switchFormatter(formatterName)
        series.forEach(function(d){
                var curValue,
                    curTime
                for(var k = (d.data.length-1); k>=0; k--) {
                    curValue = d.data[k].y
                    if(curValue!=null){
                        curTime = d.data[k].x;

                        break;
                    }
                }

                if(formatterName==="none") {
                    formatter = d3.format(".2r")
                }
                curValue = formatter(curValue)
                //console.log(d.name)
                var names= d.name.split(".")
                var i = names.length-1<0?0:(names.length-1)

                var name1 = names[i-1]
                var name2 = names[i]//.replaceAll(")","")
                //console.log(name)

                var name = (name1!=null && name1!="*"? name1.split(")").join("").split(",")[0]+".":"")
                    +(name2!=null? name2.split(")").join("").split(",")[0]:"Read")
                //console.log(name)
                curTime = moment(moment.unix(curTime)).format("D MMM HH:mm")
                var curObj = {

                    name: name,
                    time: curTime,
                    value: curValue
                }
                curSeries.push(curObj)
            }
            ,this)

        var id = "#box-"+this.params.anchor.replace("#","")
        var svgid = "#box-"+id.replace("#","")
        //console.log(id)
        if(!$(svgid).length>0) {
            this._box = this.boxFactory(this.params.size,id,curSeries);
            $(svgid+' tr:eq(5)').style("display:none")
        } else {

            this.updateBox(this._box,curSeries,formatter)
        }

    }
});