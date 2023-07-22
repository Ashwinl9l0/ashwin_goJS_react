import React from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

import './gojs.css'; 
var diagram
function initDiagram() {
  function nodeTypeImage(type) {
    switch (type) {                                         // Image sizes
      case "switch": return "images/switch.png";      // 55x55
      case "server": return "images/server.png";         // 55x55
      case "printer": return "images/printer.png";     // 60x85
      case "internet": return "images/internet.png";         // 55x80
      case "router": return "images/router.png"; // 80x50
      case "firewall": return "images/firewall.png";  
      case "laptop": return "images/laptop.png";  
      case "wifi": return "images/wifi.png";  
      case "pc": return "images/pc.png";
      case "mobile": return "images/tablet-716.png";                    // 80x70
                          // 80x70
      default: return "images/pc.png";                      // 80x70
    }
  }

  function nodeTypeSize(type) {
    switch (type) {
      case "S2": return new go.Size(55, 55);
      case "S3": return new go.Size(55, 55);
      case "P1": return new go.Size(60, 85);
      case "P2": return new go.Size(55, 80);
      case "M4": return new go.Size(80, 50);
      case "M5": return new go.Size(90, 65);
      case "I1": return new go.Size(80, 70);
      default: return new go.Size(80, 70);
    }
  }
  const $ = go.GraphObject.make;
  diagram =
    $(go.Diagram,
      {
        // layout: $(go.TreeLayout),
        model: new go.GraphLinksModel(
          {
            linkKeyProperty: 'key'  
          })
      });
  
  diagram.nodeTemplate =
    $(go.Node, "Vertical",
      { locationObjectName: "ICON", locationSpot: go.Spot.Center },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Panel, "Spot",
        $(go.Panel, "Auto",
          { name: "ICON" },
          $(go.Picture,
            { margin: 5 },
            new go.Binding("source", "type", nodeTypeImage),
            new go.Binding("desiredSize", "type", nodeTypeSize))
        ),
        
      ),
      $(go.TextBlock,
        new go.Binding("text"))
    );
  diagram.linkTemplate =
    $(go.Link, go.Link.AvoidsNodes, // the whole link panel
      { 
          corner: 3
      },
      $(go.Shape, { strokeWidth: 3, stroke: '#424242' }),
          $(go.Shape, 
            { segmentIndex: -1, segmentOffset: new go.Point(-2, 6),
              segmentOrientation: go.Link.OrientPlus90,
              alignmentFocus: go.Spot.Right,
              figure: "triangle",
              width: 12, height: 12, strokeWidth: 0
            },
          ),
          );
      

  return diagram;
}


const handleModelChange = (changes) => {
  console.log('m',changes)
  // alert('GoJS model changed!');
}
// triggered() {
//   const model = diagram.model.toJson();
//   console.log('mm')
//   // alert('GoJS model changed!');
// }
const triggered = () =>{
  const model = diagram.model.toJson();
  console.log('mm',model)
}

function Diagram() {
  return (
    <div>
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName='diagram-component'
        nodeDataArray={[
          {"key":"1","text":"Switch 1","type":"switch","loc":"122.79998779296875 198.00001525878906"},
          {"key":"2","text":"Switch 2","type":"switch","loc":"-127.54203239440943 197.92799968719487"},
          {"key":"3","text":"Switch 3","type":"switch","loc":"265.3225289463712 391.27965740403283"},
          {"key":"4","text":"Server 1","type":"server","loc":"173.15965752128824 595.0831697688501"},
          {"key":"5","text":"Server 2","type":"server","loc":"265.4463365072535 597.6885070982762"},
          {"key":"6","text":"Server 3","type":"server","loc":"-296.52371132593913 197.92449037059862"},
          {"key":"7","text":"PC 1","type":"pc","loc":"-222.35738685936633 411.85577202275766"},
          {"key":"8","text":"PC 2","type":"pc","loc":"-126.99499359476874 410.115219289213"},
          {"key":"9","text":"PC 3","type":"pc","loc":"-37.86396772250566 410.0652925660009"},
          {"key":"10","text":"Printer 1","type":"printer","loc":"261.5453586851688 35.32220184574739"},
          {"key":"11","text":"Printer 2","type":"printer","loc":"365.20329377759634 594.8928866685562"},
          {"key":"12","text":"Printer 3","type":"printer","loc":"-126.93839273895722 545.9362296583996"},
          {"key":"13","text":"Internet","type":"internet","loc":"-204.20000457763672 33.20002746582031"},
          {"key":"14","text":"Router","type":"router","loc":"123 33.199981689453125"},
          {"key":"15","text":"Firewall","type":"firewall","loc":"-34.000030517578125 33.19999694824219"},
          {"key":"16","text":"Mobile Devicie","type":"mobile","loc":"373.43370210331636 353.0600907282847"},
          {"key":"17","text":"Laptop","type":"laptop","loc":"469.15207904684667 34.036117845125816"},
          {"key":"18","text":"Wifi","type":"wifi","loc":"373.40303679176543 197.99694571837568"}
          ]}
  
        linkDataArray={[
          {"from":"13", "to":"15"},
          {"from":"15", "to":"14"},
          {"from":"14", "to":"1"},
          {"from":"1", "to":"18"},
          {"from":"18", "to":"17"},
          {"from":"18", "to":"10"},
          {"from":"18", "to":"16"},
          {"from":"1", "to":"3"},
          {"from":"3", "to":"4"},
          {"from":"3", "to":"5"},
          {"from":"3", "to":"11"},
          {"from":"1", "to":"2"},
          {"from":"2", "to":"6"},
          {"from":"2", "to":"7"},
          {"from":"2", "to":"8"},
          {"from":"2", "to":"9"},
          {"from":"8", "to":"12"}
           ]}
        onModelChange={handleModelChange}
      />
      {/* <button onClick={triggered}>cliick me</button> */}
    </div>
  );
}
export default Diagram;