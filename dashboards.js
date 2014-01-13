/*
 Brief summary of dashboard.js configuration:

 [Gauges]
 This section is for ONE value display.
 Different 'renderer' types have their own mandatory attributes

 gauge:
    size |
    (optional): color zone | factor | threshold | formatter

 tbox:
    size | formatter | valueName | valueUom |
    (optional): color zone | threshold | factor

 box: (not recommended to use other than value rankings - /render?highestMax()
    overridePeriod (hardcode a lookback timeframe other than using page timepanel)|


 [Metrics]
 This section is for a series of values according to time series display
 Different 'renderer' types have their own mandatory attributes

 line | area | bar :
 colspan | yFormatter | summaryFormatter |


 */

var graphite_url = "http://10.20.19.83:8888";  //"http://192.168.1.7:8888"// enter your graphite url, e.g. http://your.graphite.com

//This is for overall metrics page, must configure upfront and no dynamic change
//Add more prefixes for different JVM ports
var tarprefix_1 = "servers.*"
var tarprefix_2 = "servers.*.22001"


//These are placeholders and will be replaced later.

var tarprefix1 = "servers.(1)"
var tarprefix2 = "servers.(1)"


var dashboards =
    [
        {  "name": "SPS Average Metrics", //For overall page, not recommend to use [metrics] elements
            "refresh": 10000,
            dashboards: [
                {   "description": "\n####Web Tier" //Use description here as sub-dashboard title
                        + "\n___",
                    "refresh": 10000,
                    "gauges" :
                        [
                            {
                                "alias": "% Avg Processor used",  // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".processor.usage)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 100
                            },
                            {
                                "alias": "Avg Available Memory", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".memory.availableKB)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"MGTP",
                                "valueName":"available physical memory among servers",
                                "valueUom" :""
                            },
                            {
                                "alias": "Avg Network Traffic", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.totalBytes)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Network sent and received traffic",
                                "valueUom" :"/sec"
                            },
                            {
                                "alias": "Avg Network Bandwidth", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.currentBandWidth)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Average Current Network Bandwidth",
                                "valueUom" :""
                            }

                        ]

                },
                {   "description": "\n####IOL"
                    + "\n___",
                    "refresh": 10000,
                    "gauges" :
                        [
                            {
                                "alias": "% Avg Processor used",  // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".processor.usage)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 100
                            },
                            {
                                "alias": "Avg Available Memory", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".memory.availableKB)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"MGTP",
                                "valueName":"available physical memory among servers",
                                "valueUom" :""
                            },
                            {
                                "alias": "Avg Network Traffic", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.totalBytes)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Network sent and received traffic",
                                "valueUom" :"/sec"
                            },
                            {
                                "alias": "Avg Network Bandwidth", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.currentBandWidth)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Average Current Network Bandwidth",
                                "valueUom" :""
                            }
                        ]
                },
                {   "description": "\n####ESB"
                        + "\n___",
                    "refresh": 10000,
                    "gauges" :
                        [
                            {
                                "alias": "% Avg Mule CPU Usage",  // display name for this metric
                                "target": "averageSeries("+tarprefix_2+".ActiveMQ.os.ProcessCpuLoad)",
                                "description": "",
                                "renderer": "gauge",
                                "size": 100,
                                "width":200,
                                "Formatter":"percent"

                            },
                            {
                                "alias": "% Avg Mule Heap Mem Usage",  // display name for this metric
                                "target": "divideSeries("+tarprefix_2+".ActiveMQ.heap.HeapMemoryUsage.used,"+tarprefix_2+".ActiveMQ.heap.HeapMemoryUsage.init)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 100, //currently for gauge only
                                "width":200,
                                "Formatter":"percent"

                            },
                            {
                                "alias": "Avg Network Traffic", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.totalBytes)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Network sent and received traffic",
                                "valueUom" :"/sec"
                            },
                            {
                                "alias": "Avg Network Bandwidth", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.currentBandWidth)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Average Current Network Bandwidth",
                                "valueUom" :""
                            }
                        ]

                },
                {   "description": "\n####ActiveMQ"
                    + "\n___",
                    "refresh": 10000,
                    "gauges" :
                        [
                            {
                                "alias": "% Avg ActiveMQ CPU Usage",  // display name for this metric
                                "target": "averageSeries("+tarprefix_2+".ActiveMQ.os.ProcessCpuLoad)",
                                "description": "",
                                "renderer": "gauge",
                                "size": 100,
                                "width":200,
                                "Formatter":"percent"

                            },
                            {
                                "alias": "% Avg ActiveMQ Heap Mem Usage",  // display name for this metric
                                "target": "divideSeries("+tarprefix_2+".ActiveMQ.heap.HeapMemoryUsage.used,"+tarprefix_2+".ActiveMQ.heap.HeapMemoryUsage.init)",
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 100, //currently for gauge only
                                "width":200,
                                "Formatter":"percent"

                            },
                            {
                                "alias": "Avg Network Traffic", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.totalBytes)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Network sent and received traffic",
                                "valueUom" :"/sec"
                            },
                            {
                                "alias": "Avg Network Bandwidth", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.currentBandWidth)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Average Current Network Bandwidth",
                                "valueUom" :""
                            }

                        ]


                },
                {   "description": "\n####Application Server"
                    + "\n___",
                    "refresh": 10000,
                    "gauges" :
                        [
                            {
                                "alias": "% Avg Processor used",  // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".processor.usage)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 100
                            },
                            {
                                "alias": "Avg Available Memory", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".memory.availableKB)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"MGTP",
                                "valueName":"available physical memory among servers",
                                "valueUom" :""
                            },
                            {
                                "alias": "Avg Network Traffic", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.totalBytes)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Network sent and received traffic",
                                "valueUom" :"/sec"
                            },
                            {
                                "alias": "Avg Network Bandwidth", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.currentBandWidth)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Average Current Network Bandwidth",
                                "valueUom" :""
                            }
                        ]
                }
            ]
        },

        { "name": "WebTier Servers",
            "refresh": 10000,
            // you can use any rickshaw supported color scheme.
            // Enter palette name as string, or an array of colors
            // (see var scheme at the bottom).
            // Schemes can be configured globally (see below), per-dashboard, or per-metric
            //"scheme": "colorwheel",   // this is a dashboard-specific color palette
            "description": "\n###Monitoring Windows Environment Metrics"
                + "\n ",
            "gauges" :
                [

                ],
            "metrics": [

                {
                    "alias": "% Processor Time",  // display name for this metric
                    "target": "averageSeries("+tarprefix2+".processor.usage)",  // enter your graphite barebone target expression here
                    "description": "",  // enter your metric description here
                    "renderer": "gauge",
                    "size": 210,
                    "Formatter":"none",
                    "colspan" : 1
//                        "yellowZones":[{from:10,to:20}],
//                        "redZones":[{from:0,to:10}],
//                        "threshold":{value:20,factor:"lt"} //factor lt = less than or equal to, gt = greater than or equal to
                },
                {
                    "alias": "% Avg Processor Usage Over Time",
                    "target": "averageSeries("+tarprefix2+".processor.usage)",  // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "description": "cpu utilization revealed from both Processor Time %. Higher % means slower performance",
                    "interpolation": "linear",  // you can use different rickshaw interpolation values
                    "stroke_width": 1 , // change stroke width
                    "height" : 200,
                    "renderer": "line",
                    "colspan" : 2

                },
                {
                    "alias": "Avg Available Memory",
                    "target": "averageSeries("+tarprefix2+".memory.availableKB)",
                    // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "size" : 210,
                    "renderer":"tbox",
                    "colspan" : 1,
                    "valueName":"",
                    "valueUom":"",
                    "Formatter":"MGTP"
//                    "yellowZones":[{from:10,to:20}],
//                    "redZones":[{from:0,to:10}],
//                    "threshold":{value:20,factor:"lt"} //factor lt = less than or equal to, gt = greater than or equal to

                },
                {
                    "alias": "Avg Available Memory Over Time",
                    "target" : "averageSeries("+tarprefix2+".memory.availableKB)",
//                    "targets": ["aliasByNode(derivative(servers.system.cpu.user),4)",  // targets array can include strings,
//                        // functions or dictionaries
//                        {target: 'alias(derivative(servers.system.cpu.system,"system utilization")',
//                            alias: 'system utilization',                           // if you use a graphite alias, specify it here
//                            color: '#f00'}],                                       // you can also specify a target color this way
                    // (note that these values are ignored on the demo)
                    // annotator can also be a dictionary of target and description.
                    // However, only one annotator is supported per-metric.
//                    "annotator": {'target': 'events.deployment',
//                        'description': 'deploy'},
                    "renderer": "line",
                    "description": "If it is low, then the system is likely running out of memory",
                    "interpolation": "linear",
                    "colspan": 2,
                    "yFormatterName":"MGTP",
                    "height" : 200
                },

                {
                    "alias": "Network",
                    "targets": [
                        "averageSeries("+tarprefix2+".network.currentBandWidth)",
                        "averageSeries("+tarprefix2+".network.totalBytes)"
                        ],
                    "events": "*",  // instead of annotator, if you use the graphite events feature
                    // you can retrieve events matching specific tag(s) -- space separated
                    // or use * for all tags. Note you cannot use both annotator and events.
                    "renderer": "line",
                    "description": "Network IO Traffic and current bandwidth",
                    "interpolation": "linear",
                    "height" : 200,
                    "colspan": 3
                }

                   // instead of annotator, if you use the graphite events feature
                    // you can retrieve events matching specific tag(s) -- space separated
                    // or use * for all tags. Note you cannot use both annotator and events.
            ]

        },

        { "name": "IOL Servers",
            "refresh": 10000,
            // you can use any rickshaw supported color scheme.
            // Enter palette name as string, or an array of colors
            // (see var scheme at the bottom).
            // Schemes can be configured globally (see below), per-dashboard, or per-metric
            //"scheme": "colorwheel",   // this is a dashboard-specific color palette
            "description": "\n###Monitoring Windows Environment Metrics"
                + "\n ",
            "gauges" :
                [

                ],
            "metrics": [
                {
                    "alias": "% Processor Time",  // display name for this metric
                    "target": "averageSeries("+tarprefix2+".processor.usage)",  // enter your graphite barebone target expression here
                    "description": "",  // enter your metric description here
                    "renderer": "gauge",
                    "size": 210,
                    "Formatter":"none",
                    "colspan" : 1
//                        "yellowZones":[{from:10,to:20}],
//                        "redZones":[{from:0,to:10}],
//                        "threshold":{value:20,factor:"lt"} //factor lt = less than or equal to, gt = greater than or equal to
                },
                {
                    "alias": "% Avg Processor Usage Over Time",
                    "target": "averageSeries("+tarprefix2+".processor.usage)",  // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "description": "cpu utilization revealed from both Processor Time %. Higher % means slower performance",
                    "interpolation": "linear",  // you can use different rickshaw interpolation values
                    "stroke_width": 1 , // change stroke width
                    "height" : 200,
                    "renderer": "line",
                    "colspan" : 2

                },
                {
                    "alias": "Avg Available Memory",
                    "target": "averageSeries("+tarprefix2+".memory.availableKB)",
                    // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "size" : 210,
                    "renderer":"tbox",
                    "colspan" : 1,
                    "valueName":"",
                    "valueUom":"",
                    "Formatter":"MGTP"
//                    "yellowZones":[{from:10,to:20}],
//                    "redZones":[{from:0,to:10}],
//                    "threshold":{value:20,factor:"lt"} //factor lt = less than or equal to, gt = greater than or equal to

                },
                {
                    "alias": "Avg Available Memory Over Time",
                    "target" : "averageSeries("+tarprefix2+".memory.availableKB)",
//                    "targets": ["aliasByNode(derivative(servers.system.cpu.user),4)",  // targets array can include strings,
//                        // functions or dictionaries
//                        {target: 'alias(derivative(servers.system.cpu.system,"system utilization")',
//                            alias: 'system utilization',                           // if you use a graphite alias, specify it here
//                            color: '#f00'}],                                       // you can also specify a target color this way
                    // (note that these values are ignored on the demo)
                    // annotator can also be a dictionary of target and description.
                    // However, only one annotator is supported per-metric.
//                    "annotator": {'target': 'events.deployment',
//                        'description': 'deploy'},
                    "renderer": "line",
                    "description": "If it is low, then the system is likely running out of memory",
                    "interpolation": "linear",
                    "colspan": 2,
                    "yFormatterName":"MGTP",
                    "height" : 200
                },

                {
                    "alias": "Network",
                    "targets": [
                        "averageSeries("+tarprefix2+".network.currentBandWidth)",
                        "averageSeries("+tarprefix2+".network.totalBytes)"
                    ],
                    "events": "*",  // instead of annotator, if you use the graphite events feature
                    // you can retrieve events matching specific tag(s) -- space separated
                    // or use * for all tags. Note you cannot use both annotator and events.
                    "renderer": "line",
                    "description": "Network IO Traffic and current bandwidth",
                    "interpolation": "linear",
                    "height" : 200,
                    "colspan": 3
                }

            ]

        },

        { "name": "ESB Metrics",  // give your dashboard a name (required!)
            "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
            // add an (optional) dashboard description. description can be written in markdown / html.
            //"scheme": "colorwheel",
            "description": "\n###ESB system health metrics"
                + "\n Monitoring ESB JVM"
                + "\n",
            "gauges" :
                [

                ],
            "metrics":  // metrics is an array of charts on the dashboard
                [

//                    {
//                        "alias": "Mule Top 5 Slow Flows",  // display name for this metric
//                        "target": "highestMax("+tarprefix1+".ActiveMQ.queues.*.QueueSize,5)",
//                        "description": "The diagram indicates the top 5 (or less) queues in queue size", // enter your metric description here
//                        "renderer": "box",
//                        "interpolation":"linear",
//                        "height" : 200,
//                        "colspan" : 3
//
//                    },
                    {
                        "alias": "Mule Flows AverageProcessingTime",  // display name for this metric
                        "target":"averageSeries("+tarprefix2+".Mule.app.*.AverageProcessingTime)",  // enter your graphite barebone target expression here

                        "description": "", // enter your metric description here
                        "renderer": "line",
                        "interpolation":"cardinal",
                        "height" : 200,
                        "colspan":3,
                        "summaryFormatterName" : "KMBT",
                        "legendFormatterName" : "KMBT",
                        "yFormatterName" : "KMBT"
                    },
                    {
                        "alias": "% Mule CPU Usage",  // display name for this metric
                        "target": ""+tarprefix1+".ActiveMQ.os.ProcessCpuLoad",
                        "description": "", // enter your metric description here
                        "renderer": "gauge",
                        "size" : 150,
                        "colspan":1,
                        "Formatter" : "percent"
                    },
                    {
                        "alias": "Mule CPU Usage",  // display name for this metric
                        "target":""+tarprefix1+".ActiveMQ.os.ProcessCpuLoad",
                        "description": "", // enter your metric description here
                        "renderer": "line",
                        "interpolation":"cardinal",
                        "height" : 160,
                        "colspan":2,
                        "summaryFormatterName" : "KMGTP",
                        "legendFormatterName" : "KMGTP",
                        "yFormatterName" : "percent"
                    },
                    {
                        "alias": "% Mule Heap Memory Usage",  // display name for this metric
                        "target": "divideSeries("+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage.used,"+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage.init)",
                        "description": "", // enter your metric description here
                        "renderer": "gauge",
                        "size" : 150,
                        "colspan":1,
                        "Formatter" : "percent"
                    },
                    {
                        "alias": "Mule Memory Usage",  // display name for this metric
                        "targets": [""+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage.init",
                            ""+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage.used",
                            ""+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage.committed"
                        ],  // enter your graphite barebone target expression here

                        "description": "", // enter your metric description here
                        "renderer": "line",
                        "height" : 160,
                        "colspan":2,
                        "summaryFormatterName" : "KMGTP",
                        "legendFormatterName" : "KMGTP",
                        "yFormatterName" : "KMGTP"
                    }

                ]
        },
        { "name": "ActiveMQ Metrics",  // give your dashboard a name (required!)
            "refresh": 10000,  // each dashboard has its own refresh interval (in ms)
            // add an (optional) dashboard description. description can be written in markdown / html.
            //"scheme": "colorwheel",
            "description": "\n###ActiveMQ system health metrics"
                + "\n Monitoring ActiveMQ JVM"
                + "\n",
            "gauges" :
                [

                ],
            "metrics":  // metrics is an array of charts on the dashboard
                [

                    {
                        "alias": "Avg Top 5 Busy Queues",  // display name for this metric
                        "target": "highestMax("+tarprefix1+".ActiveMQ.queues.*.DequeueCount,5)",
                        "description": "The diagram indicates over time peak values", // enter your metric description here
                        "renderer": "box",
                        "height" : 200,
                        "colspan" : 1,
                        "Formatter" : "rKMBT"

                    },
                    {
                        "alias": "Current Top 5 Pending Queues",  // display name for this metric
                        "target": "highestMax("+tarprefix1+".ActiveMQ.queues.*.QueueSize,5)",
                        "description": "The diagram indicates current values", // enter your metric description here
                        "renderer": "box",
                        "height" : 200,
                        "overridePeriod":"2", //string value in minutes, 2min is best for current value
                        "colspan" : 2,
                        "Formatter" : "rKMBT"

                    },

                    {
                        "alias": "ActiveMQ Queue Metrics",  // display name for this metric
                        "targets": [
                            ""+tarprefix1+".ActiveMQ.queues_total.TotalMessageCount",
                            ""+tarprefix1+".ActiveMQ.queues_total.TotalDequeueCount",
                            ""+tarprefix1+".ActiveMQ.queues_total.TotalEnqueueCount"
                        ],
                        "description": "The diagram indicates ActiveMQ total message counts by status", // enter your metric description here
                        "renderer": "line",
                        "interpolation":"linear",
                        "height" : 200,
                        "colspan" : 3,
                        "summaryFormatterName" : "KMBT", //Currently has 3 types of formatter KMGTP/KMBT/Raw
                        "legendFormatterName" : "KMBT",
                        "yFormatterName" : "KMBT"

                    },
                    {
                        "alias": "% ActiveMQ CPU Usage",  // display name for this metric
                        "target": ""+tarprefix1+".ActiveMQ.os.ProcessCpuLoad",
                        "description": "", // enter your metric description here
                        "renderer": "gauge",
                        "size" : 150,
                        "colspan":1,
                        "Formatter" : "percent"
                    },
                    {
                        "alias": "ActiveMQ CPU Usage",  // display name for this metric
                        "target":""+tarprefix1+".ActiveMQ.os.ProcessCpuLoad",
                        "description": "", // enter your metric description here
                        "renderer": "line",
                        "interpolation":"cardinal",
                        "height" : 160,
                        "colspan":2,
                        "summaryFormatterName" : "KMGTP",
                        "legendFormatterName" : "KMGTP",
                        "yFormatterName" : "percent"
                    },

                    {
                        "alias": "% ActiveMQ Heap Memory Usage",  // display name for this metric
                        "target": "divideSeries("+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage.used,"+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage.init)",
                        "description": "", // enter your metric description here
                        "renderer": "gauge",
                        "size" : 150,
                        "colspan":1,
                        "Formatter" : "percent"
                    },
                    {
                        "alias": "ActiveMQ Memory Usage",  // display name for this metric
                        "targets": [""+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage.init",
                            ""+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage.used",
                            ""+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage.committed"
                        ],  // enter your graphite barebone target expression here

                        "description": "", // enter your metric description here
                        "renderer": "line",
                        "height" : 160,
                        "colspan":2,
                        "summaryFormatterName" : "KMGTP",
                        "legendFormatterName" : "KMGTP",
                        "yFormatterName" : "KMGTP"
                    }


//                    {
//                        "alias": "10_5_250_91.threads",  // display name for this metric
//                        "targets": [""+tarprefix1+".ActiveMQ.threads.ThreadCount",
//                            ""+tarprefix1+".ActiveMQ.threads.PeakThreadCount",
//                            ""+tarprefix1+".ActiveMQ.threads.DaemonThreadCount"
//                        ],  // enter your graphite barebone target expression here
//                        "description": "The diagram indicates ActiveMQ threads usages", // enter your metric description here
//                        "renderer": "line",
//
//                        "height" : 200,
//                        "colspan" : 3,
//                        "summaryFormatterName" : "KMBT",
//                        "legendFormatterName" : "KMBT",
//                        "yFormatterName" : "KMBT"
//                    }

//                    {
//                        "alias": "10_5_250_91.login.count",  // display name for this metric
//                        "target": "derivative("+tarprefix1+".ActiveMQ.queues.panviva_dev_supportpoint_public_security_login_request_1.EnqueueCount)",  // enter your graphite barebone target expression here
//                        "description": "", // enter your metric description here
//                        "renderer": "line",
//                        "interpolation": "linear",
//                        "height" : 200,
//                        "colspan" : 3,
//                        "summary" : "per_minute",
//                        "summaryFormatterName" : "Raw"
//
//                    }

                ]
        },

        { "name": "Application Servers",
            "refresh": 10000,
            // you can use any rickshaw supported color scheme.
            // Enter palette name as string, or an array of colors
            // (see var scheme at the bottom).
            // Schemes can be configured globally (see below), per-dashboard, or per-metric
            //"scheme": "colorwheel",   // this is a dashboard-specific color palette
            "description": "\n###Monitoring Windows Environment Metrics"
                + "\n ",
            "gauges" :
                [

                ],
            "metrics": [ {
                "alias": "% Processor Time",  // display name for this metric
                "target": "averageSeries("+tarprefix2+".processor.usage)",  // enter your graphite barebone target expression here
                "description": "",  // enter your metric description here
                "renderer": "gauge",
                "size": 210,
                "Formatter":"none",
                "colspan" : 1
//                        "yellowZones":[{from:10,to:20}],
//                        "redZones":[{from:0,to:10}],
//                        "threshold":{value:20,factor:"lt"} //factor lt = less than or equal to, gt = greater than or equal to
            },
                {
                    "alias": "% Avg Processor Usage Over Time",
                    "target": "averageSeries("+tarprefix2+".processor.usage)",  // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "description": "cpu utilization revealed from both Processor Time %. Higher % means slower performance",
                    "interpolation": "linear",  // you can use different rickshaw interpolation values
                    "stroke_width": 1 , // change stroke width
                    "height" : 200,
                    "renderer": "line",
                    "colspan" : 2

                },
                {
                    "alias": "Avg Available Memory",
                    "target": "averageSeries("+tarprefix2+".memory.availableKB)",
                    // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "size" : 210,
                    "renderer":"tbox",
                    "colspan" : 1,
                    "valueName":"",
                    "valueUom":"",
                    "Formatter":"MGTP"
//                    "yellowZones":[{from:10,to:20}],
//                    "redZones":[{from:0,to:10}],
//                    "threshold":{value:20,factor:"lt"} //factor lt = less than or equal to, gt = greater than or equal to

                },
                {
                    "alias": "Avg Available Memory Over Time",
                    "target" : "averageSeries("+tarprefix2+".memory.availableKB)",
//                    "targets": ["aliasByNode(derivative(servers.system.cpu.user),4)",  // targets array can include strings,
//                        // functions or dictionaries
//                        {target: 'alias(derivative(servers.system.cpu.system,"system utilization")',
//                            alias: 'system utilization',                           // if you use a graphite alias, specify it here
//                            color: '#f00'}],                                       // you can also specify a target color this way
                    // (note that these values are ignored on the demo)
                    // annotator can also be a dictionary of target and description.
                    // However, only one annotator is supported per-metric.
//                    "annotator": {'target': 'events.deployment',
//                        'description': 'deploy'},
                    "renderer": "line",
                    "description": "If it is low, then the system is likely running out of memory",
                    "interpolation": "linear",
                    "colspan": 2,
                    "yFormatterName":"MGTP",
                    "height" : 200
                },

                {
                    "alias": "Network",
                    "targets": [
                        "averageSeries("+tarprefix2+".network.currentBandWidth)",
                        "averageSeries("+tarprefix2+".network.totalBytes)"
                    ],
                    "events": "*",  // instead of annotator, if you use the graphite events feature
                    // you can retrieve events matching specific tag(s) -- space separated
                    // or use * for all tags. Note you cannot use both annotator and events.
                    "renderer": "line",
                    "description": "Network IO Traffic and current bandwidth",
                    "interpolation": "linear",
                    "height" : 200,
                    "colspan": 3
                }

            ]

        }


    ];

//var scheme = [
//              '#423d4f',
//              '#4a6860',
//              '#848f39',
//              '#a2b73c',
//              '#ddcb53',
//              '#c5a32f',
//              '#7d5836',
//              '#335488',
//              '#7c2626'
//              ].reverse();
var scheme = []
var colors = d3.scale.category20()
for (var k = 0; k < 20; k++) {
    scheme.push(colors(k))
}
function relative_period() {
    return (typeof period == 'undefined') ? 1 : parseInt(period / 7) + 1;
}
function entire_period() {
    return (typeof period == 'undefined') ? 1 : period;
}
function at_least_a_day() {
    return entire_period() >= 1440 ? entire_period() : 1440;
}


