import React from 'react';
import * as d3 from "d3";

class Pie extends React.Component {
    componentDidMount() {
        // Dimensions of sunburst.
        const width = 750;
        const height = 600;
        const radius = Math.min(width, height) / 2;

        const pointSize = 10;
        const firstSegmentRatio = 2;
        const pieTotalHeight = 220; // Need accurate calculation

        // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
        const b = {
            w: 75, h: 30, s: 3, t: 10
        };

        // Mapping of step names to colors.
        var colors = ["#333", "#555", "#777", "#999", "#bbb", "#ddd", "#eee","#fff"]
        const config = {
            type: [
                'Brain',
                'Breast',
                'Heme',
                'Lung',
                'Other',
                'Ovarian',
                'Pancreatic',
                'Prostate',
            ],
            innovation: [
                'Diagnostic/Biomakers',
                'Health Services',
                'Healthcare IT/Software',
                'Med Tech',
                'Therapeutics',
            ],
            stage: [
                'Discovery',
                'Early Translation',
                'Late Translation',
                'Dissemination',
                'Adoption',
            ],
        };
        

        // Total size of all segments; we set this later, after loading the data.
        var totalSize = 0; 

        var vis = d3.select("#chart").append("svg:svg")
            .attr("width", width)
            .attr("height", height)
            .append("svg:g")
            .attr("id", "container")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var arc = d3.svg.arc()
            .innerRadius(40)
            .outerRadius(70)
            .startAngle(0)
            .endAngle(Math.PI);

        const pieHeight = pieTotalHeight / config.stage.length;

        // Render 5 stages (Discovery - Adaption )
        config.stage.map((t, j) => {
            const segmentInnerRadius = j === 0 ? 0 : pieHeight * j + (pieHeight * firstSegmentRatio - pieHeight);
            const segmentOuterRadius = j === 0 ? pieHeight + (pieHeight * firstSegmentRatio - pieHeight) : pieHeight + segmentInnerRadius;

            // Render 8 cancer types
            config.type.map((title, i) => {
                
                const json = [
                    { x: 30, y: 0, val: 11},
                    { x: 2, y: 15, val: 311},
                    { x: 90, y: 30, val: 141},
                    { x: 34, y: 45, val: 121},
                    { x: 10, y: 60, val: 191}
                ]

                const angleWidth = 360 / config.type.length;
                const offset = angleWidth * i;

                const group = vis.append("g");

                // Draw each segments.
                const arc = d3.svg.arc()
                    .innerRadius(segmentInnerRadius)
                    .outerRadius(segmentOuterRadius)
                    .startAngle(offset *  Math.PI / 180)
                    .endAngle( (angleWidth + offset )  *  Math.PI / 180);
                
                const path = group.append("svg:path")
                    .style('stroke', '#ddd')
                    .style('stroke-width', 1)
                    .attr("class", "arc")
                    .attr("d", arc)
                    .attr("id", `path_${i}_${j}`)
                    .attr("fill", colors[j])
                
                // Plot 5 points with data.
                switch(j){
                    case 0:

                        // First line
                        for (let k=0; k<2; k++) {
                            
                            const angle = 360 / config.type.length / 2;
                            const arc2 = d3.svg.arc()
                                .innerRadius(segmentOuterRadius - pointSize*1.5)
                                .outerRadius((segmentOuterRadius - pointSize*1.5) + 1)
                                .startAngle((offset + angle*k + angle/2) *  Math.PI / 180)
                                .endAngle( ((offset + angle*k + 1 + angle/2) *  Math.PI / 180));

                            const path2 = group.append("svg:path")
                                .attr("class", "arc2")
                                .attr("d", arc2)
                                .attr("id", `path2_${i}_${j}_${k}`)
                                .attr("fill", '#fff');
                            
                            const pos = path2[0][0].getPointAtLength(0);
                            group.append("circle")
                            .attr("cx", pos.x)
                            .attr("cy", pos.y)
                            .attr("fill", '#fff')
                            .attr("r", pointSize)
                            
                        }

                        // Second line
                        for (let k=0; k<2; k++) {
                            
                            const originalAngle = 360 / config.type.length / 2;
                            const angle = 360 / config.type.length / 2.2;
                            const arc3 = d3.svg.arc()
                                .innerRadius(segmentOuterRadius - segmentOuterRadius/2 + pointSize*0.75)
                                .outerRadius((segmentOuterRadius - segmentOuterRadius/2) + pointSize*0.75 + 1)
                                .startAngle((originalAngle - angle + offset + angle*k + angle/2) *  Math.PI / 180)
                                .endAngle( ((originalAngle - angle + offset + angle*k + 1 + angle/2) *  Math.PI / 180));

                            const path2 = group.append("svg:path")
                                .attr("class", "arc3")
                                .attr("d", arc3)
                                .attr("id", `path2_${i}_${j}_${k}`)
                                .attr("fill", '#fff');
                            
                            const pos = path2[0][0].getPointAtLength(0);
                            group.append("circle")
                            .attr("cx", pos.x)
                            .attr("cy", pos.y)
                            .attr("fill", '#fff')
                            .attr("r", pointSize)

                        }

                        // last one 
                        const angle = 360 / config.type.length;
                        const arc4 = d3.svg.arc()
                            .innerRadius(pointSize*3)
                            .outerRadius((pointSize*3) + 1)
                            .startAngle((offset + angle/2) *  Math.PI / 180)
                            .endAngle( ((offset + 5 + angle/2) *  Math.PI / 180));

                        const path3 = group.append("svg:path")
                            .attr("class", "arc4")
                            .attr("d", arc4)
                            .attr("id", `path2_${i}_${j}_4`)
                            .attr("fill", '#fff');
                        
                        const pos = path3[0][0].getPointAtLength(0);
                        group.append("circle")
                        .attr("cx", pos.x)
                        .attr("cy", pos.y)
                        .attr("fill", '#fff')
                        .attr("r", pointSize)

                        break;
                    case 1:

                        // First line
                        for (let k=0; k<3; k++) {
                            
                            const angle = 360 / config.type.length / 3;
                            const arc2 = d3.svg.arc()
                                .innerRadius(segmentOuterRadius - pieHeight/2 + pointSize*0.8)
                                .outerRadius((segmentOuterRadius - pieHeight/2 + pointSize*0.8) + 1)
                                .startAngle((offset + angle*k + angle/2) *  Math.PI / 180)
                                .endAngle( ((offset + angle*k + 1 + angle/2) *  Math.PI / 180));

                            const path2 = group.append("svg:path")
                                .attr("class", "arc2")
                                .attr("d", arc2)
                                .attr("id", `path2_${i}_${j}_${k}`)
                                .attr("fill", '#fff');
                            
                            const pos = path2[0][0].getPointAtLength(0);
                            group.append("circle")
                            .attr("cx", pos.x)
                            .attr("cy", pos.y)
                            .attr("fill", '#fff')
                            .attr("r", pointSize)
                            
                        }

                        // Second line
                        for (let k=0; k<2; k++) {
                            
                            const originalAngle = 360 / config.type.length / 2;
                            const angle = 360 / config.type.length / 3;
                            const arc3 = d3.svg.arc()
                                .innerRadius(segmentOuterRadius - pieHeight/2 - pointSize)
                                .outerRadius((segmentOuterRadius - pieHeight/2 - pointSize) + 1)
                                .startAngle((originalAngle - angle + offset + angle*k + angle/2) *  Math.PI / 180)
                                .endAngle( ((originalAngle - angle + offset + angle*k + 1 + angle/2) *  Math.PI / 180));

                            const path2 = group.append("svg:path")
                                .attr("class", "arc3")
                                .attr("d", arc3)
                                .attr("id", `path2_${i}_${j}_${k}`)
                                .attr("fill", '#fff');
                            
                            const pos = path2[0][0].getPointAtLength(0);
                            group.append("circle")
                            .attr("cx", pos.x)
                            .attr("cy", pos.y)
                            .attr("fill", '#fff')
                            .attr("r", pointSize)

                        }

                        break;
                    default:
                        for (let k=0; k<5; k++) {
                            
                            const angle = 360 / config.type.length / 5;
                            const arc2 = d3.svg.arc()
                                .innerRadius(segmentInnerRadius + pieHeight/2)
                                .outerRadius((segmentInnerRadius + pieHeight/2) + 1)
                                .startAngle((offset + angle*k + angle/2) *  Math.PI / 180)
                                .endAngle( ((offset + angle*k + 0.5 + angle/2) *  Math.PI / 180));

                            const path2 = group.append("svg:path")
                                .attr("class", "arc2")
                                .attr("d", arc2)
                                .attr("id", `path2_${i}_${j}_${k}`)
                                .attr("fill", '#fff');

                            const pos = path2[0][0].getPointAtLength(0);
                            group.append("circle")
                            .attr("cx", pos.x)
                            .attr("cy", pos.y)
                            .attr("fill", '#fff')
                            .attr("r", pointSize)
                            
                            group.append("text")
                            .style("text-anchor", "middle")
                            .attr("dx", pos.x)
                            .attr("dy", pos.y + pointSize/2)
                            .text('11')

                        }
                        break; 
                }

                if (j === config.stage.length -1 ) {
                    var text = vis.append("text")
                        .style("text-anchor", "middle")
                        .attr('dy', -15);
                    
                    text.append("textPath")
                        .attr('startOffset', '22%')
                        .attr("stroke","black")
                        .attr("xlink:href", `#path_${i}_${j}`)
                        .text(title);
                }
            });

        });
            
    }
    render() {
        return (
            <div>
                <div id="main">
                    <div id="sequence"></div>
                    <div id="chart">
                        <div id="explanation" style={{ visibility: "hidden" }}>
                        <span id="percentage"></span><br/>
                        of visits begin with this sequence of pages
                        </div>
                    </div>
                    </div>
                    <div id="sidebar">
                    <input type="checkbox" id="togglelegend" /> Legend<br/>
                    <div id="legend" style={{ visibility: "hidden" }}></div>
                </div>
            </div>
        );
    }
}
export default Pie;
