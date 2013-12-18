var graphite_url = "http://10.5.250.45:8888";  // enter your graphite url, e.g. http://your.graphite.com
var tarprefix1 = "servers.10_5_250_91_21001.serverLocal"
var tarprefix2 = "servers.10_5_250_91_21002.serverLocal"
var tarprefix3 = "servers.10_5_250_91_host.serverLocal"


var dashboards =
    [
        {  "name": "SPS Overall Metrics", //For overall page, not recommend to use [metrics] elements
            "refresh": 10000,
            dashboards: [
                {   "description": "\n####System health metrics Server" //Use description here as sub-dashboard title
                        + "\n",
                    "refresh": 10000,
                    "scheme": "spectrum2001",
                    "gauges" :
                        [
                            {
                                "alias": "% Avg Processor used",  // display name for this metric
                                "target": "averageSeries("+tarprefix3+".Processor.ProcessorTimePercent)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 120, //currently for gauge only
                                "width":280

                            },
                            {
                                "alias": "% Avg Memory Comitted",  // display name for this metric
                                "target": "averageSeries("+tarprefix3+".memory.CommittedPercent)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 120, //currently for gauge only
                                "width":200
                                //"Formatter":"percent"

                            },
                            {
                                "alias": "",  // display name for this metric
                                "targets": [""+tarprefix3+".Disk.LogicalDisk.*",
                                            ""+tarprefix3+".Disk.PhysicalDisk.*"
                                ], // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "box",
                                "size": 120, //currently for gauge only
                                "height":150
                                //"Formatter":"percent"

                            }


                        ],

                    "metrics": [


                    ]

                },
                {   "description": "\n####System health metrics ESB"
                        + "\n",
                    "refresh": 10000,
                    "scheme": "spectrum2001",
                    "gauges" :
                        [
                            {
                                "alias": "%  Mule heap memory used",  // display name for this metric
                                "target": "divideSeries("+tarprefix2+".mule.heap.HeapMemoryUsage_used,"+tarprefix2+".mule.heap.HeapMemoryUsage_init)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 120, //currently for gauge only
                                "width":100,
                                "Formatter":"percent"
                            },
                            {
                                "alias": "% Mule thread usage", // display name for this metric
                                "targets": "divideSeries("+tarprefix2+".mule.threads.ThreadCount,"+tarprefix2+".mule.threads.PeakThreadCount)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "height": 120, //currently for gauge only
                                "width":100
                            },
                            {
                                "alias": "", // display name for this metric
                                "targets": "averageSeries("+tarprefix2+".mule.app.*.averageProcessingTime)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "box",
                                "height": 120, //currently for gauge only
                                "width":100
                            }


                        ],

                    "metrics": [


                    ]

                },
                {   "description": "\n#####System health metrics MQ"
                    + "\n",
                    "refresh": 10000,
                    "scheme": "spectrum2001",
                    "gauges" :
                        [
                            {
                                "alias": "%  ActiveMQ heap memory used",  // display name for this metric
                                "target": "divideSeries("+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage_used,"+tarprefix1+".ActiveMQ.heap.HeapMemoryUsage_init)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 120, //currently for gauge only
                                "width":280,
                                "Formatter":"percent"
                            },
                            {
                                "alias": "% ActiveMQ Thread used",  // display name for this metric
                                "target": "divideSeries("+tarprefix1+".ActiveMQ.threads.ThreadCount,"+tarprefix1+".ActiveMQ.threads.PeakThreadCount)",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "gauge",
                                "size": 120, //currently for gauge only
                                "width":200,
                                "Formatter":"percent"

                            },
                            {
                                "alias": "",  // display name for this metric
                                "target": tarprefix1+".ActiveMQ.queues_total.*",  // enter your graphite barebone target expression here
                                "description": "",  // enter your metric description here
                                "renderer": "box",
                                "size": 120, //currently for gauge only
                                "width":200,
                                "Formatter":"percent"

                            }


                        ],

                    "metrics": [


                    ]

                }
            ]
        },

        { "name": "SPS Server Metrics",
            "refresh": 5000,
            // you can use any rickshaw supported color scheme.
            // Enter palette name as string, or an array of colors
            // (see var scheme at the bottom).
            // Schemes can be configured globally (see below), per-dashboard, or per-metric
            //"scheme": "colorwheel",   // this is a dashboard-specific color palette
            "description": "\n###Monitoring Windows Environment Performance"
                + "\n ",
            "gauges" :
                [
                    {
                        "alias": "% Processor Time",  // display name for this metric
                        "target": "servers.127_0_0_1_20001.serverLocal.Processor.ProcessorTimePercent",  // enter your graphite barebone target expression here
                        "description": "",  // enter your metric description here
                        "renderer": "gauge",
                        "size": 150, //currently for gauge only
                        "width":280,
                        "Formatter":"none",
                        "yellowZones":[{from:10,to:20}],
                        "redZones":[{from:0,to:10}],
                        "threshold":{value:20,factor:"lt"} //factor lt = less than or equal to, gt = greater than or equal to
                    },
                    {
                        "alias": "% Memory Commited",  // display name for this metric
                        "target": "servers.127_0_0_1_20001.serverLocal.memory.CommittedPercent",  // enter your graphite barebone target expression here
                        "description": "",  // enter your metric description here
                        "renderer": "gauge",
                        "size": 150, //currently for gauge only
                        "width":200,
                        "Formatter":"none"

                    }



                ],
            "metrics": [

                {
                    "alias": "cpu utilization %",
                    "target": "servers.127_0_0_1_20001.serverLocal.Processor.*",  // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "description": "cpu utilization revealed from both Processor Time % and Priviledged Time %. Higher % means slower performance",
                    "interpolation": "linear",  // you can use different rickshaw interpolation values
                    "stroke_width": 1 , // change stroke width
                    "height" : 350,
                    "renderer": "line",
                    "colspan" : 2

                },
                {
                    "alias": "",
                    "targets": ["servers.127_0_0_1_20001.serverLocal.memory.AvailableMemory",
                        "servers.127_0_0_1_20001.serverLocal.memory.AvailableMemoryKb",
                        "servers.127_0_0_1_20001.serverLocal.memory.*"
                        ],  // target can use any graphite-supported wildcards
                    //"annotator": 'events.deployment',  // a simple annotator will track a graphite event and mark it as 'deployment'.
                    // enter your graphite target as a string
                    "description": "",
                    "interpolation": "linear",  // you can use different rickshaw interpolation values
                    "stroke_width": 1 , // change stroke width
                    "height" : 200,
                    "size" : 200,
                    "renderer": "box",
                    "colspan" : 1,
                    "yellowZones":[{from:10,to:20}],
                    "redZones":[{from:0,to:10}],
                    "threshold":{value:20,factor:"lt"} //factor lt = less than or equal to, gt = greater than or equal to

                },
                {
                    "alias": "available memory",
                    "target": "absolute(scale(servers.127_0_0_1_20001.serverLocal.memory.AvailableMemoryKb,1))",  // enter your graphite barebone target expression here

                    "description": "available memeory", // enter your metric description here
                    "renderer": "area",
                    "interpolation": "cardinal",
                    "summaryFormatterName" : "MGTP",
                    "legendFormatterName" : "MGTP",
                    "yFormatterName" : "MGTP",
                    "height" : 200,
                    "colspan": 1

                },
                {
                    "alias": "memory pages/sec",
                    "target" : "servers.127_0_0_1_20001.serverLocal.memory.PagesSec",
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
                    "renderer": "bar",
                    "description": "If it is high, then the system is likely running out of memory by trying to page the memory to the disk.",
                    "interpolation": "linear",
                    "colspan": 1,
                    "height" : 200
                  //"scheme": "munin"  // this is a metric-specific color palette
                },
                {
                    "alias": "memory available + comitted",
                    "target" : "sum(servers.127_0_0_1_20001.serverLocal.memory.AvailableMemory,servers.127_0_0_1_20001.serverLocal.memory.CommittedBytes)",
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
                    "description": "Sum of available and comitted",
                    "interpolation": "linear",
                    "colspan": 1,
                    "height" : 200,
                    "scheme": "munin"  // this is a metric-specific color palette
                },
                {
                    "alias": "network",
                    "target": "servers.127_0_0_1_20001.serverLocal.Network.BytesTotal",
                    "events": "*",  // instead of annotator, if you use the graphite events feature
                    // you can retrieve events matching specific tag(s) -- space separated
                    // or use * for all tags. Note you cannot use both annotator and events.
                    "renderer": "line",
                    "description": "Network IO performance",
                    "interpolation": "linear",
                    "height" : 200,
                    "colspan": 3
                }

                   // instead of annotator, if you use the graphite events feature
                    // you can retrieve events matching specific tag(s) -- space separated
                    // or use * for all tags. Note you cannot use both annotator and events.
            ]

        },
        { "name": "SPS ESB Metrics",  // give your dashboard a name (required!)
            "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
            // add an (optional) dashboard description. description can be written in markdown / html.
            //"scheme": "colorwheel",
            "description": "\n###ESB system health metrics"
                + "\n Monitoring ActiveMQ and ESB (Currently ActiveMQ on localhost)"
                + "\n",
            "gauges" :
                [
                    {
                        "alias": "% Mule memory Available",  // display name for this metric
                        "target": "divideSeries(servers.127_0_0_1_20003.serverLocal.Mule.agent.FreeMemory,servers.127_0_0_1_20003.serverLocal.Mule.agent.TotalMemory)",  // enter your graphite barebone target expression here
                        "description": "",  // enter your metric description here
                        "renderer": "gauge",
                        "size": 150, //currently for gauge only
                        "width":280,
                        "Formatter":"percent"
                    }

                ],
            "metrics":  // metrics is an array of charts on the dashboard
                [



                    {
                        "alias": "10_5_250_45.Mule Server.memory",  // display name for this metric
                        "target":"servers.127_0_0_1_20003.serverLocal.Mule.agent.*",  // enter your graphite barebone target expression here

                        "description": "", // enter your metric description here
                        "renderer": "line",
                        "height" : 200,
                        "colspan":3,
                        "summaryFormatterName" : "KMGTP",
                        "legendFormatterName" : "KMGTP",
                        "yFormatterName" : "KMGTP"
                    }
                ]
        },
        { "name": "SPS MQ Metrics",  // give your dashboard a name (required!)
            "refresh": 5000,  // each dashboard has its own refresh interval (in ms)
            // add an (optional) dashboard description. description can be written in markdown / html.
            //"scheme": "colorwheel",
            "description": "\n###ActiveMQ system health metrics"
                + "\n Monitoring ActiveMQ and ESB (Currently ActiveMQ on localhost)"
                + "\n",
            "gauges" :
                [
                    {
                        "alias": "%  ActiveMQ heap memory used",  // display name for this metric
                        "target": "divideSeries(servers.127_0_0_1_20001.serverLocal.ActiveMQ.heap.HeapMemoryUsage_used,servers.127_0_0_1_20001.serverLocal.ActiveMQ.heap.HeapMemoryUsage_init)",  // enter your graphite barebone target expression here
                        "description": "",  // enter your metric description here
                        "renderer": "gauge",
                        "size": 150, //currently for gauge only
                        "width":280,
                        "Formatter":"percent"
                    },
                    {
                        "alias": "% ActiveMQ Thread used",  // display name for this metric
                        "target": "divideSeries(servers.127_0_0_1_20001.serverLocal.ActiveMQ.threads.ThreadCount,servers.127_0_0_1_20001.serverLocal.ActiveMQ.threads.PeakThreadCount)",  // enter your graphite barebone target expression here
                        "description": "",  // enter your metric description here
                        "renderer": "gauge",
                        "size": 150, //currently for gauge only
                        "width":200,
                        "Formatter":"percent"

                    }


                ],
            "metrics":  // metrics is an array of charts on the dashboard
                [
                    {
                        "alias": "10_5_250_45.login.count",  // display name for this metric
                        "target": "derivative(servers.127_0_0_1_20001.serverLocal.ActiveMQ.queues_temp.panviva_dev_supportpoint_public_security_login_request_1.EnqueueCount)",  // enter your graphite barebone target expression here
                        "description": "", // enter your metric description here
                        "renderer": "line",
                        "interpolation": "linear",
                        "height" : 200,
                        "colspan" : 3,
                        "summary" : "per_minute",
                        "summaryFormatterName" : "Raw"

                    },
                    {
                        "alias": "10_5_250_45.overal ActiveMQ Queue Metrics",  // display name for this metric
                        "targets": [
                            "servers.127_0_0_1_20001.serverLocal.ActiveMQ.queues_total.TotalMessageCount",
                            "servers.127_0_0_1_20001.serverLocal.ActiveMQ.queues_total.TotalDequeueCount",
                            "servers.127_0_0_1_20001.serverLocal.ActiveMQ.queues_total.TotalEnqueueCount"
                        ],
                        "description": "The diagram indicates ActiveMQ total message counts in status", // enter your metric description here
                        "renderer": "line",
                        "interpolation":"linear",
                        "height" : 200,
                        "colspan" : 3,
                        "summaryFormatterName" : "KMBT", //Currently has 3 types of formatter KMGTP/KMBT/Raw
                        "legendFormatterName" : "KMBT",
                        "yFormatterName" : "KMBT"

                    },

                    {
                        "alias": "10_5_250_45.threads",  // display name for this metric
                        "targets": ["servers.127_0_0_1_20001.serverLocal.ActiveMQ.threads.ThreadCount",
                            "servers.127_0_0_1_20001.serverLocal.ActiveMQ.threads.PeakThreadCount",
                            "servers.127_0_0_1_20001.serverLocal.ActiveMQ.threads.DaemonThreadCount"
                        ],  // enter your graphite barebone target expression here
                        "description": "The diagram indicates ActiveMQ threads usages", // enter your metric description here
                        "renderer": "bar",

                        "height" : 200,
                        "colspan" : 1,
                        "summaryFormatterName" : "KMBT",
                        "legendFormatterName" : "KMBT",
                        "yFormatterName" : "KMBT"
                    },
                    {
                        "alias": "10_5_250_45.jvm.memory",  // display name for this metric
                        "targets": ["servers.127_0_0_1_20001.serverLocal.ActiveMQ.heap.HeapMemoryUsage_init",
                            "servers.127_0_0_1_20001.serverLocal.ActiveMQ.heap.HeapMemoryUsage_used",
                            "servers.127_0_0_1_20001.serverLocal.ActiveMQ.heap.HeapMemoryUsage_committed"
                        ],  // enter your graphite barebone target expression here

                        "description": "", // enter your metric description here
                        "renderer": "line",
                        "height" : 200,
                        "colspan":2,
                        "summaryFormatterName" : "KMGTP",
                        "legendFormatterName" : "KMGTP",
                        "yFormatterName" : "KMGTP"
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
