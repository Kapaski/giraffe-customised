/*
 * Configuration of server selection dropdown on every metric details page
 *  {
 *      name: name of the server
 *      address: IP or hostname of the server
 *
 *  }
 *
 *  Servers are grouped mapping to dashboard pages, add them carefully also make sure url
 *  is correct or the query sent to Graphite will return wrong data
 *
 *  Every first server info in array will be default to display when page starts
 *
 */


var serverdropdownlist = [

    {
        type:"WebTier",
        servers:[
            {
                name:"QA-B1",
                address:"qa-b-all01"

            }
        ]
    },
    {
        type:"IOL",
        servers:[
            {
                name:"QA-B1",
                address:"qa-b-all01"

            }
        ]
    },
    {
        type:"ESB",
        servers:[
            {
                name:"QA-B1",
                address:"qa-b-all01",
                port:"22002"

            }

        ]
    },
    {
        type:"MQ",
        servers:[
            {
                name: "QA-B1",
                address:"qa-b-all01",
                port:"22001"
            }
        ]
    },
    {
        type:"AppServer",
        servers:[
            {
                name:"QA-B1",
                address:"qa-b-all01"

            }
        ]
    },
    {
        type:"SpsUsage",
        servers:[
            {
                name:"QA-B1",
                address:"qa-b-all01",
                port:"22001"
            }
        ]
    },
    {
        type:"SQL",
        servers:[
            {
                name:"QA-B1",
                address:"qa-b-all01"

            }
        ]
    }

]
