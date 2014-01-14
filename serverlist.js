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
                name:"IIS01",
                address:"127.0.0.1"

            },
            {
                name:"IIS02",
                address:"10.2.250.11"

            },
            {
                name:"IIS03",
                address:"127.0.0.1"

            }
        ]
    },
    {
        type:"IOL",
        servers:[
            {
                name:"IOL1",
                address:"127.0.0.1"

            }
        ]
    },
    {
        type:"ESB",
        servers:[
            {
                name: "Mule00",
                address:"127.0.0.1",
                port:"22001"
            },
            {
                name:"Mule01",
                address:"10.2.250.3",
                port:"21002"

            }
        ]
    },
    {
        type:"MQ",
        servers:[
            {
                name: "Amq00",
                address:"127.0.0.1",
                port:"22001"
            },
            {
                name:"Amq01",
                address:"10.20.1.9",
                port:"21001"

            },
            {
                name:"Amq02",
                address:"127.0.0.1",
                port:"21001"

            },
            {
                name:"Amq03",
                address:"192.168.1.8",
                port:"21001"

            }
        ]
    },
    {
        type:"AppServer",
        servers:[
            {
                name:"App1",
                address:"127.0.0.1"

            }
        ]
    },
    {
        type:"SpsBusiness",
        servers:[
            {
                name:"App1",
                address:"127.0.0.1",
                port:"22001"
            }
        ]
    },
    {
        type:"SQL",
        servers:[
            {
                name:"DB01",
                address:"127.0.0.1"

            }
        ]
    }

]