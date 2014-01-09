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
 *
 */


var servers = [

    {
        type:"WebTier",
        servers:[
            {
                name:"IIS01",
                address:"10.2.250.1"

            },
            {
                name:"IIS02",
                address:"10.2.250.11"

            },
            {
                name:"IIS03",
                address:"10.2.250.12"

            }
        ]
    },
    {
        type:"IOL",
        servers:[
            {
                name:"IOL1",
                address:"10.2.250.2"

            }
        ]
    },
    {
        type:"ESB",
        servers:[
            {
                name:"Mule01",
                address:"10.2.250.3"

            }
        ]
    },
    {
        type:"MQ",
        servers:[
            {
                name:"Amq01",
                address:"10.2.250.4"

            }
        ]
    },
    {
        type:"AppServer",
        servers:[
            {
                name:"App1",
                address:"10.2.250.5"

            }
        ]
    },
    {
        type:"SQL",
        servers:[
            {
                name:"DB01",
                address:"10.2.250.6"

            }
        ]
    }

]