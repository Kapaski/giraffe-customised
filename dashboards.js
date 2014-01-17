/*
 Brief summary of dashboard.js configuration:

 [Gauges]
 This section is for ONE value display.
 Different 'renderer' types have their own mandatory attributes

 gauge:
    size |
    (optional): yellowZones|redZones {from:v , to:v}
    | factor  | formatter
    threshold {value: [normally 0~100], factor [lt | gt]}
 tbox:
    size | formatter | valueName | valueUom |
    (optional): color zone | threshold | factor
    threshold {value: [actual graphite stored value], factor [lt | gt]}

 box: (not recommended to use other than value rankings - /render?highestMax()
    overridePeriod (hardcode a lookback timeframe other than using page timepanel)|


 [Metrics]
 This section is for a series of values according to time series display
 Different 'renderer' types have their own mandatory attributes

 line | area | bar :
 colspan | yFormatter | summaryFormatter |


 ** [formatters]
 * "KMBT" "MGBT" "KMGBT" "percent"

 */

var graphite_url = "http://10.5.250.95:8888";  //"http://192.168.1.7:8888"// enter your graphite url, e.g. http://your.graphite.com

//This is for overall metrics page, must configure upfront and no dynamic change
//Add more prefixes for different JVM ports
var tarprefix_1 = "servers.*"
var tarprefix_2 = "servers.*.22001"


//These are placeholders and will be replaced later.

var tarprefix1 = "servers.(1)"
var tarprefix2 = "servers.(1)"
var timeframe = "(2)"

var dashboards =
    [
        {  "name": "Summary", //For overall page, not recommend to use [metrics] elements
            "refresh": 10000,
            dashboards: [
                {   "description": "\n####Web Tier" //Use description here as sub-dashboard title
                        + "\n___",
                    "refresh": 10000,
                    "gauges" :
                        [
                            {
                                "alias": "Processor Usage (avg %)",  // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".processor.usage)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 100,
                                "threshold":{value:80,factor:"gt"}
                            },
                            {
                                "alias": "Available Memory (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".memory.availableKB)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"MGTP",
                                "valueName":"physical memory",
                                "valueUom" :""
                            },
                            {
                                "alias": "Network Traffic (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.totalBytes)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"sent and received",
                                "valueUom" :"/sec",
                                "threshold": {value:1024*1024,factor:"gt"}
                            },
                            {
                                "alias": "Network Bandwidth (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.currentBandWidth)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Network Utilisation",
                                "valueUom" :"bytes/sec"
                            }

                        ]

                },
                {   "description": "\n####IOL"
                    + "\n___",
                    "refresh": 10000,
                    "gauges" :
                        [
                            {
                                "alias": "Processor Usage (avg %)",  // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".processor.usage)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 100
                            },
                            {
                                "alias": "Available Memory (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".memory.availableKB)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"MGTP",
                                "valueName":"physical memory",
                                "valueUom" :""
                            },
                            {
                                "alias": "Network Traffic (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.totalBytes)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"sent and received",
                                "valueUom" :"/sec"
                            },
                            {
                                "alias": "Network Bandwidth (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.currentBandWidth)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Network Utilisation",
                                "valueUom" :"bytes/sec"
                            }
                        ]
                },
                {   "description": "\n####ESB"
                        + "\n___",
                    "refresh": 10000,
                    "gauges" :
                        [
                            {
                                "alias": "Processor Usage (avg %)",  // display name for this metric
                                "target": "averageSeries("+tarprefix_2+".ActiveMQ.os.ProcessCpuLoad)",
                                "description": "",
                                "renderer": "gauge",
                                "size": 100,
                                "width":200,
                                "Formatter":"percent"

                            },
                            {
                                "alias": "Heap Memory Usage (avg %)",  // display name for this metric
                                "target": "divideSeries("+tarprefix_2+".ActiveMQ.heap.HeapMemoryUsage.used,"+tarprefix_2+".ActiveMQ.heap.HeapMemoryUsage.init)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 100, //currently for gauge only
                                "width":200,
                                "Formatter":"percent"

                            },
                            {
                                "alias": "Network Traffic (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.totalBytes)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"sent and received",
                                "valueUom" :"/sec"
                            },
                            {
                                "alias": "Network Bandwidth (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.currentBandWidth)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Network Utilisation",
                                "valueUom" :"bytes/sec"
                            }
                        ]

                },
                {   "description": "\n####Messaging Bus"
                    + "\n___",
                    "refresh": 10000,
                    "gauges" :
                        [
                            {
                                "alias": "Processor Usage (avg %)",  // display name for this metric
                                "target": "averageSeries("+tarprefix_2+".ActiveMQ.os.ProcessCpuLoad)",
                                "description": "",
                                "renderer": "gauge",
                                "size": 100,
                                "width":200,
                                "Formatter":"percent"

                            },
                            {
                                "alias": "Heap Memory Usage (avg %)",  // display name for this metric
                                "target": "divideSeries("+tarprefix_2+".ActiveMQ.heap.HeapMemoryUsage.used,"+tarprefix_2+".ActiveMQ.heap.HeapMemoryUsage.init)",
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 100, //currently for gauge only
                                "width":200,
                                "Formatter":"percent"

                            },
                            {
                                "alias": "Network Traffic (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.totalBytes)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"sent and received",
                                "valueUom" :"/sec"
                            },
                            {
                                "alias": "Network Bandwidth (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.currentBandWidth)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Network Utilisation",
                                "valueUom" :"bytes/sec"
                            }

                        ]


                },
                {   "description": "\n####SupportPoint Server"
                    + "\n___",
                    "refresh": 10000,
                    "gauges" :
                        [
                            {
                                "alias": "Processor Usage (avg %)",  // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".processor.usage)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 100
                            },
                            {
                                "alias": "Available Memory (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".memory.availableKB)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"MGTP",
                                "valueName":"physical memory",
                                "valueUom" :""
                            },
                            {
                                "alias": "Network Traffic (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.totalBytes)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"sent and received",
                                "valueUom" :"/sec"
                            },
                            {
                                "alias": "Network Bandwidth (avg)", // display name for this metric
                                "target": "averageSeries("+tarprefix_1+".network.currentBandWidth)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "tbox",
                                "size": 100, //currently for gauge only
                                "Formatter":"KMGTP",
                                "valueName":"Network Utilisation",
                                "valueUom" :"bytes/sec"
                            }
                        ]
                }
            ]
        },

        { "name": "Web Tier",
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
                    "alias": "Processor Usage (%)",  // display name for this metric
                    "target": "averageSeries("+tarprefix2+".processor.usage)",  // enter your graphite barebone target expression here
                    "description": "",  // enter your metric description here
                    "renderer": "gauge",
                    "size": 150,
                    "Formatter":"none",
                    "colspan" : 0.5,
//                        "yellowZones":[{from:10,to:20}],
//                        "redZones":[{from:0,to:10}],
                   "threshold":{value:80,factor:"gt"} //factor lt = less than or equal to, gt = greater than or equal to
                },
                {
                    "alias": "Processor Usage Over Time",
                    "target": "averageSeries("+tarprefix2+".processor.usage)",  // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "description": "",
                    "interpolation": "cardinal",  // you can use different rickshaw interpolation values
                    "stroke_width": 1 , // change stroke width
                    "height" : 200,
                    "renderer": "line",
                    "colspan" : 2.5

                },
                {
                    "alias": "Available Memory",
                    "target": ""+tarprefix2+".memory.availableKB",
                    // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "description":"",
                    "size" : 195,
                    "renderer":"tbox",
                    "colspan" : 0.5,
                    "valueName":"",
                    "valueUom":"",
                    "Formatter":"MGTP",
                    "threshold":{value:1024*512,factor:"lt"} //factor lt = less than or equal to, gt = greater than or equal to

                },
                {
                    "alias": "Available Memory Over Time",
                    "target" : ""+tarprefix2+".memory.availableKB",
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
                    "interpolation": "cardinal",
                    "colspan": 2.5,
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
                    "interpolation": "cardinal",
                    "yFormatterName":"KMGTP",
                    "height" : 200,
                    "colspan": 3
                }

                   // instead of annotator, if you use the graphite events feature
                    // you can retrieve events matching specific tag(s) -- space separated
                    // or use * for all tags. Note you cannot use both annotator and events.
            ]

        },

        { "name": "IOL",
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
                    "alias": "Processor Usage (%)",  // display name for this metric
                    "target": "averageSeries("+tarprefix2+".processor.usage)",  // enter your graphite barebone target expression here
                    "description": "",  // enter your metric description here
                    "renderer": "gauge",
                    "size": 150,
                    "Formatter":"none",
                    "colspan" : 0.5
//                        "yellowZones":[{from:10,to:20}],
//                        "redZones":[{from:0,to:10}],
//                        "threshold":{value:20,factor:"lt"} //factor lt = less than or equal to, gt = greater than or equal to
                },
                {
                    "alias": "Processor Usage Over Time",
                    "target": "averageSeries("+tarprefix2+".processor.usage)",  // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "description": "",
                    "interpolation": "cardinal",  // you can use different rickshaw interpolation values
                    "stroke_width": 1 , // change stroke width
                    "height" : 200,
                    "renderer": "line",
                    "colspan" : 2.5

                },
                {
                    "alias": "Available Memory",
                    "target": "averageSeries("+tarprefix2+".memory.availableKB)",
                    // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "description":"",
                    "size" : 195,
                    "renderer":"tbox",
                    "colspan" : 0.5,
                    "valueName":"",
                    "valueUom":"",
                    "Formatter":"MGTP",
                    "threshold":{value:1024*1024*3,factor:"lt"} //factor lt = less than or equal to, gt = greater than or equal to

                },
                {
                    "alias": "Available Memory Over Time",
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
                    "interpolation": "cardinal",
                    "colspan": 2.5,
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
                    "interpolation": "cardinal",
                    "yFormatterName":"KMGTP",
                    "height" : 200,
                    "colspan": 3
                }

            ]

        },

        { "name": "ESB",  // give your dashboard a name (required!)
            "refresh": 10000,  // each dashboard has its own refresh interval (in ms)
            // add an (optional) dashboard description. description can be written in markdown / html.
            //"scheme": "colorwheel",
            "description": "\n###Enterprise Service Bus (ESB)"
               + "\n",
            /*
             *  1. top 5 slowest applications in terms of average event process time
             *  box    highestMax(averageProcessTime)
             2. top 5 busiest applications in terms of total events received
             box    highestMax(totalEventsReceived)
             3. esb events received and processed per minute
             chart  scaleToSeconds(sumSeries(server.addr.*(flownamewildcard).totalEventsReceived,'time','avg'),timeframe)
             */

            "gauges" :
                [

                ],
            "metrics":  // metrics is an array of charts on the dashboard
                [


                    {
                        "alias": "Processing Time (avg,ms)",  // display name for this metric
                        "target":"averageSeries("+tarprefix1+".Mule.applications.*.AverageProcessingTime)",  // enter your graphite barebone target expression here

                        "description": "", // enter your metric description here
                        "renderer": "line",
                        "interpolation":"cardinal",
                        "height" : 200,
                        "colspan":1,
                        "summaryFormatterName" : "KMBT",
                        "legendFormatterName" : "KMBT",
                        "yFormatterName" : "KMBT"
                    },
                    {
                        "alias": "Flows Events Received (total)",  // display name for this metric
                        "target":"sumSeries("+tarprefix1+".Mule.applications.*.TotalEventsReceived)",  // enter your graphite barebone target expression here

                        "description": "", // enter your metric description here
                        "renderer": "line",
                        "interpolation":"cardinal",
                        "height" : 200,
                        "colspan":1,
                        "summaryFormatterName" : "KMBT",
                        "legendFormatterName" : "KMBT",
                        "yFormatterName" : "KMBT"
                    },
                    {
                        "alias": "Processed Events (total)",  // display name for this metric
                        "target":"sumSeries("+tarprefix1+".Mule.applications.*.ProcessedEvents)",  // enter your graphite barebone target expression here

                        "description": "", // enter your metric description here
                        "renderer": "line",
                        "interpolation":"cardinal",
                        "height" : 200,
                        "colspan":1,
                        "summaryFormatterName" : "KMBT",
                        "legendFormatterName" : "KMBT",
                        "yFormatterName" : "KMBT"
                    },
                    {
                        "alias": "Processor Usage (%)",  // display name for this metric
                        "target": ""+tarprefix1+".Mule.os.ProcessCpuLoad",
                        "description": "", // enter your metric description here
                        "renderer": "gauge",
                        "size" : 150,
                        "colspan":1,
                        "Formatter" : "percent"
                    },
                    {
                        "alias": "Processor Usage Over Time",  // display name for this metric
                        "target":""+tarprefix1+".Mule.os.ProcessCpuLoad",
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
                        "alias": "Heap Memory Usage (%)",  // display name for this metric
                        "target": "divideSeries("+tarprefix1+".Mule.heap.HeapMemoryUsage.used,"+tarprefix1+".Mule.heap.HeapMemoryUsage.init)",
                        "description": "", // enter your metric description here
                        "renderer": "gauge",
                        "size" : 150,
                        "colspan":1,
                        "Formatter" : "percent"
                    },
                    {
                        "alias": "Memory Usage Over Time",  // display name for this metric
                        "targets": [""+tarprefix1+".Mule.heap.HeapMemoryUsage.init",
                            ""+tarprefix1+".Mule.heap.HeapMemoryUsage.used",
                            ""+tarprefix1+".Mule.heap.HeapMemoryUsage.committed"
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
        { "name": "Messaging Bus",  // give your dashboard a name (required!)
            "refresh": 10000,  // each dashboard has its own refresh interval (in ms)
            // add an (optional) dashboard description. description can be written in markdown / html.
            //"scheme": "colorwheel",
            "description": "\n###Messaging Bus system health metrics"
                + "\n",
            "gauges" :
                [

                ],
            "metrics":  // metrics is an array of charts on the dashboard
                [

                    {
                        "alias": "Top 5 Queue Throughput",  // display name for this metric
                        "target": "highestMax("+tarprefix1+".ActiveMQ.queues.*.DequeueCount,5)",
                        "description": "Total Dequeued Messages", // enter your metric description here
                        "renderer": "box",
                        "height" : 200,
                        "colspan" : 1,
                        "Formatter" : "rKMBT"

                    },
                    {
                        "alias": "Top 5 Pending Queues",  // display name for this metric
                        "target": "highestMax("+tarprefix1+".ActiveMQ.queues.*.QueueSize,5)",
                        "description": "Current Queue Depths", // enter your metric description here
                        "renderer": "box",
                        "height" : 200,
                        "overridePeriod":"2", //string value in minutes, 2min is best for current value
                        "colspan" : 2,
                        "Formatter" : "rKMBT"

                    },

                    {
                        "alias": "Queue Reconcilliation",  // display name for this metric
                        "targets": [
                            ""+tarprefix1+".ActiveMQ.queues_total.TotalMessageCount",
                            ""+tarprefix1+".ActiveMQ.queues_total.TotalDequeueCount",
                            ""+tarprefix1+".ActiveMQ.queues_total.TotalEnqueueCount"
                        ],
                        "description": "The diagram indicates ActiveMQ total message counts by status", // enter your metric description here
                        "renderer": "line",
                        "interpolation":"cardinal",
                        "height" : 200,
                        "colspan" : 3,
                        "summaryFormatterName" : "KMBT", //Currently has 3 types of formatter KMGTP/KMBT/Raw
                        "legendFormatterName" : "KMBT",
                        "yFormatterName" : "KMBT"

                    },
                    {
                        "alias": "Processor Usage (%)",  // display name for this metric
                        "target": ""+tarprefix1+".ActiveMQ.os.ProcessCpuLoad",
                        "description": "", // enter your metric description here
                        "renderer": "gauge",
                        "size" : 150,
                        "colspan":1,
                        "Formatter" : "percent"
                    },
                    {
                        "alias": "Processor Usage Over Time",  // display name for this metric
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
                        "alias": "Heap Memory Usage (%)",  // display name for this metric
                        "target": "divideSeries("+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage.used,"+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage.init)",
                        "description": "", // enter your metric description here
                        "renderer": "gauge",
                        "size" : 150,
                        "colspan":1,
                        "Formatter" : "percent"
                    },
                    {
                        "alias": "Memory Usage Over Time",  // display name for this metric
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

        { "name": "SupportPoint Server",
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
                "alias": "Processor Usage (%)",  // display name for this metric
                "target": "averageSeries("+tarprefix2+".processor.usage)",  // enter your graphite barebone target expression here
                "description": "",  // enter your metric description here
                "renderer": "gauge",
                "size": 150,
                "Formatter":"none",
                "colspan" : 0.5
//                        "yellowZones":[{from:10,to:20}],
//                        "redZones":[{from:0,to:10}],
//                        "threshold":{value:20,factor:"lt"} //factor lt = less than or equal to, gt = greater than or equal to
            },
                {
                    "alias": "Processor Usage Over Time",
                    "target": "averageSeries("+tarprefix2+".processor.usage)",  // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "description": "",
                    "interpolation": "cardinal",  // you can use different rickshaw interpolation values
                    "stroke_width": 1 , // change stroke width
                    "height" : 200,
                    "renderer": "line",
                    "colspan" : 2.5

                },
                {
                    "alias": "Available Memory",
                    "target": "averageSeries("+tarprefix2+".memory.availableKB)",
                    // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "size" : 210,
                    "renderer":"tbox",
                    "colspan" : 0.5,
                    "valueName":"",
                    "valueUom":"",
                    "Formatter":"MGTP"
                },
                {
                    "alias": "Available Memory Over Time",
                    "target" : "averageSeries("+tarprefix2+".memory.availableKB)",
                    "renderer": "line",
                    "description": "If it is low, then the system is likely running out of memory",
                    "interpolation": "cardinal",
                    "colspan": 2.5,
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
                    "interpolation": "cardinal",
                    "yFormatterName":"KMGTP",
                    "height" : 200,
                    "colspan": 3
                }

            ]

        },
        /*
         *  this per minute calculation
          * is for graphite API scaleToSeconds, which actually does scale to 60/timeframe, and
         *  value calculated is actually per minute (misleading name).
         *  NOTE: this also leads to the carbon-schema setup, it's 60s by default which why uses 60 divides
         *  timeframe here
         */
        { "name": "SPS Usage",
            "refresh": 10000,
            "description": "\n###Monitoring SupportPoint Metrics"
                + "\n ",
            "gauges" :
                [

                ],
            "metrics": [
                {
                    "alias": "Login Activity",
                    "target": "derivative("+tarprefix1+".ActiveMQ.queues.foo1.DequeueCount)",
                    "description": "Login requests received by supportpoint over given time frame.",
                    "interpolation": "cardinal",  // you can use different rickshaw interpolation values
                    "stroke_width": 1 , // change stroke width
                    "height" : 200,
                    "renderer": "line",
                    "colspan" : 2.5

                },
//                {
//                    "alias": "Login requests total overtime",
//                    "target": ""+tarprefix1+".ActiveMQ.queues.foo1.DequeueCount",
//                    "description": "Total login requests received by supportpoint over given time frame.",
//                    "interpolation": "cardinal",  // you can use different rickshaw interpolation values
//                    "stroke_width": 1 , // change stroke width
//                    "height" : 200,
//                    "renderer": "area",
//                    "colspan" : 1
//
//                },
                {
                    "alias": "Rate",
                    "target": "scaleToSeconds("+tarprefix1+".ActiveMQ.queues.foo1.DequeueCount,"+timeframe+")",
                    "size" : 205,
                    "renderer":"tbox",
                    "colspan" : 0.5,
                    "valueName":"Login requests received:",
                    "valueUom":"/minute",
                    "Formatter":"KMBT",
                    "threshold":{value:20,factor:"no"} //factor lt = less than or equal to, gt = greater than or equal to

                },

                {
                    "alias": "Document Retrieval Activity",
                    "target" : "derivative("+tarprefix1+".ActiveMQ.queues.foo1.DequeueCount)",
                    "renderer": "line",
                    "description": "Document retrieval requests received by supportpoint over given time frame",
                    "interpolation": "cardinal",
                    "colspan": 2.5,
                    "yFormatterName":"KMBT",
                    "height" : 200
                },
                {
                    "alias": "Rate",
                    "target": "scaleToSeconds("+tarprefix1+".ActiveMQ.queues.foo1.DequeueCount,"+timeframe+")",
                    "size" : 205,
                    "renderer":"tbox",
                    "colspan" : 0.5,
                    "valueName":"Document retrieval requests received:",
                    "valueUom":"/minute",
                    "Formatter":"KMBT",
                    "threshold":{value:20,factor:"no"} //factor lt = less than or equal to, gt = greater than or equal to

                },
                {
                    "alias": "Search Activity",
                    "target":
                        "derivative("+tarprefix1+".ActiveMQ.queues.foo1.DequeueCount)",

                    "renderer": "line",
                    "description": "Keyword search requests received by supportpoint over give time frame",
                    "interpolation": "cardinal",
                    "height" : 200,
                    "colspan": 2.5
                },
                {
                    "alias": "Rate",
                    "target": "scaleToSeconds("+tarprefix1+".ActiveMQ.queues.foo1.DequeueCount,"+timeframe+")",
                    "size" : 205,
                    "renderer":"tbox",
                    "colspan" : 0.5,
                    "valueName":"Keyword search requests received:",
                    "valueUom":"/minute",
                    "Formatter":"KMBT",
                    "threshold":{value:20,factor:"no"} //factor lt = less than or equal to, gt = greater than or equal to

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


/*
 * Here are only several original Giraffe comments from author
 */

//{
//    "alias": "Available Memory (avg) Over Time",
//    "target" : "averageSeries("+tarprefix2+".memory.availableKB)",
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



//{
//    "alias": "Network",
//    "targets": [
//    "averageSeries("+tarprefix2+".network.currentBandWidth)",
//    "averageSeries("+tarprefix2+".network.totalBytes)"
//],
//    "events": "*",  // instead of annotator, if you use the graphite events feature
//    // you can retrieve events matching specific tag(s) -- space separated
//    // or use * for all tags. Note you cannot use both annotator and events.
//    "renderer": "line",
//    "description": "Network IO Traffic and current bandwidth",
//    "interpolation": "cardinal",
//    "height" : 200,
//    "colspan": 3
//}
