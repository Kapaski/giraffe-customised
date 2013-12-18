/**
 * Created by james on 16/12/13.
 */

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

        var color = d3.interpolateRgb("rgb(0,255,0)", "rgb(255,0,0)");

        var treemap = d3.layout.treemap()
            .size([w, h])
            .sticky(true)
            .value(function (d) {
                return d.name;
            });
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

        function treemap_color(value, stepsize, steps) {
            if (value == 0) {

                return "rgb(0,0,0)";

            } else if (value < 0) {

                var x = Math.round((255 / steps) * Math.abs(value / stepsize));
                return 'rgb(0,' + x + ',0)';   //DECREASE in unemployment => green

            } else {

                var y = Math.round((255 / steps) * value / stepsize);
                return 'rgb(' + y + ',0,0)';  //INCREASE in unemployment => red
            }
        }

    }


    this.redraw = function (series, formatter) {
        series.forEach(function(d){
            var row = $("#"+d.name)
            if(row.length>0) {

                $("#"+d.name+" td:eq(1)").text(d.value)
            }else {
                $(this.placeholderName).empty();
                this.config.value = serires
                this.render()
            }
        },this)
    }

    // initialization
    this.configure(configuration);
}//box end


//A box solution done with Mustache
function Box1(placeholderName, configuration) {
    this.placeholderName = placeholderName;
    var self = this; // for internal d3 functions
    console.log(this.placeholderName)
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
        $(this.placeholderName).empty()
        this.context = {
            boxdata: []
        };
    }


    this.render = function () {

        this.context["boxdata"] = this.config.value;
        /*
         [{
         name:name,value:value,time:time
         },...]
         */
        var template =
            "{{#boxdata}}\n " +
                "<div class=\"row-fluid box-taggroup\" id=\"box-{{name}}\">\n " +
                "<div class=\"box-tags\" >\n      " +
                "<p>{{name}}: <b style='font-size: 1.5em'>{{value}}</b></br>\n  " +
                "{{time}}</p>\n </div>\n  " +
                "</div>\n {{/boxdata}}\n "

        $(this.placeholderName).append(Mustache.render(template, this.context))

        this.redraw(this.config.value, this.config.formatter);
    }


    this.redraw = function (series, formatter) {

    }

    // initialization
    this.configure(configuration);
}//box1 end
