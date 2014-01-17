/**
 * Created by james on 16/12/13.
 */


//tbox solution done with d3js
function TBox(placeholderName, configuration) {
    this.placeholderName = placeholderName;
    var self = this; // for internal d3 functions
//    console.log(this.placeholderName)
    this.configure = function (configuration) {
        this.config = configuration;
        //console.log(configuration)
        this.config.size = this.config.size  ;
        this.config.s = Math.ceil(this.config.size) //to match other visualisation height in same fluid-row style display
        this.config.formatter = configuration.formatter;
        this.config.width = configuration.width;
        this.config.value = configuration.value;
        this.config.rawvalue = configuration.rawvalue;
        this.config.threshold = configuration.threshold || {value:50,factor:"lt"}
        this.config.transitionDuration = configuration.transitionDuration || 500;

    }


    this.render = function () {
        var h = this.config.s
        var w = this.config.s
        var json = this.config.value
        var data = json[0] || {name:"",value:"",uom:""}
        var anchor = "tbox-"+this.placeholderName.replace("#","");
        var tboxholder = d3.select(this.placeholderName).append("div")
            .attr("id", anchor)
            .attr("class","tbox-holder")
            .style("position", "relative")
            .style("height",h+"px")
            .style("width",h/0.618+"px")

        tboxholder.append("div")
            .attr("id","")
            .attr("class","tbox-name")
            .text(function(d) {
                return data['name'] || ""
            })
        tboxholder.append("div")
            .attr("id","")
            .attr("class","tbox-value")
            .text(function(d) {
                return data['value']
            })

        tboxholder.append("div")
            .attr("id","")
            .attr("class","tbox-uom")
            .text(function(d){
                return data['uom'] || ""
            })

        var over = false
//        var r = /[\s\S]$/ // /^(-?[0-9]+)[^0-9\.]*([0-9]*).*$/g
//        var v = parseInt(data.value.replace(r,""))
        var v = this.config.rawvalue;
        if(this.config.factor === "no") {
            over = false
        }else if(this.config.threshold.factor==="lt") {
            if(v <= this.config.threshold.value) {
                over = true;
            }
        }else {
            if(v >=this.config.threshold.value) {
                over = true;
            }
        }

       // console.log("compare ",this.config.rawvalue," ",this.config.threshold.value," as ",this.config.threshold.factor," ",over)

        if(over) {
            d3.select('#'+anchor).style("background-color", "#da4f49")
         }else {

        }




    }


    this.redraw = function (series) {
            $(this.placeholderName).empty();
            this.config.value = series
            this.render()


    }

    // initialization
    this.configure(configuration);
}//tbox end


//Box solution done with d3js
function Box(placeholderName, configuration) {
    this.placeholderName = placeholderName;
    var self = this; // for internal d3 functions
    //console.log(this.placeholderName)
    this.configure = function (configuration) {
        this.config = configuration;
        //console.log(configuration)
        this.config.size = this.config.size * 0.9;
        this.config.width = configuration.width || d3.select(this.placeholderName).width;
        this.config.height = configuration.height || d3.select(this.placeholderName).height;

        this.config.formatter = configuration.formatter;

        this.config.x = this.config.size / 2;
        this.config.y = this.config.size / 2;

        this.config.value = configuration.value;

        this.config.greenColor = configuration.greenColor || "#109618";
        this.config.yellowColor = configuration.yellowColor || "#FF9900";
        this.config.redColor = configuration.redColor || "#DC3912";

        this.config.threshold = configuration.threshold
        this.config.transitionDuration = configuration.transitionDuration || 500;

    }


    this.render = function () {
        var w = this.config.width,
            h = this.config.height;

        var json = this.config.value

         var tb = d3.select(this.placeholderName).append("table")
            .attr("id", "box-"+this.placeholderName.replace("#",""))
            .attr("class","table")
            .style("position", "relative")
            .style("width", w + "px")
            .style("height", h + "px");


        var tr = tb.selectAll("tr")
            .data(json)
            .enter().append("tr")
            .attr("class", "box-tags")
            .attr("id",function(d){
                return d.name
            })
            .call(cell)



            tr.append("td")
                .text(function (d) {
                return d.name
            })
            tr.append("td")
                .attr("class","box-td")
                .text(function (d) {
                return d.value
            })



        function cell() {
            this
                .style("left", function (d) {
                    return d.x + "px";
                })
                .style("top", function (d) {
                    return d.y + "px";
                })
                .style("width", function (d) {
                    return d.dx - 1 + "px";
                })
                .style("height", function (d) {
                    return d.dy - 1 + "px";
                })
                .style("text-anchor", "end");
        }



    }


    this.redraw = function (series, formatter) {
            $(this.placeholderName).empty();
            this.config.value = series
            this.render()
    }

    // initialization
    this.configure(configuration);
}//box end



