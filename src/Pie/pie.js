import React from 'react';
import * as d3 from "d3";

const toMachineName = (str) => ( typeof str === 'string' ? str.toLowerCase().replace(/[\s|\/]/g, '-') : '');

class Pie extends React.Component {
    componentDidMount() {
        fetch('/projects.json')
            .then(response => response.json())
            .then((response) => {
                this.renderPie(this.transformDemoData(response));
        });
        
    }
    transformDemoData(data) {
        return data.map((pj) => {
            const cancer_types = [];
            const stages = [];
            const innovations = [];
            if(pj.type_other === "x") {
                cancer_types.push("Other");
            }
            if(pj.type_brain === "x") {
                cancer_types.push("Brain");
            }
            if(pj.type_breast === "x") {
                cancer_types.push("Breast");
            }
            if(pj.type_heme === "x") {
                cancer_types.push("Heme");
            }
            if(pj.type_lung === "x") {
                cancer_types.push("Lung");
            }
            if(pj.type_prostate === "x") {
                cancer_types.push("Prostate");
            }
            if(pj.type_pancreatic === "x") {
                cancer_types.push("Pancreatic");
            }
            if(pj.type_ovarian === "x") {
                cancer_types.push("Ovarian");
            }
            if(pj.type_multiple === "x") {
                cancer_types.push("Multiple");
            }

            if(pj.stage_discovery === "x") {
                stages.push("Discovery")
            }
            if(pj.stage_early_trans === "x") {
                stages.push("Early Translation")
            }
            if(pj.stage_late_trans === "x") {
                stages.push("Late Translation")
            }
            if(pj.stage_dissemenination === "x") {
                stages.push("Dissemination")
            }
            if(pj.stage_adoption === "x") {
                stages.push("Adoption")
            }

            if(pj.innov_therapeutics === 'x') {
                innovations.push('Therapeutics')
            }
            if(pj.innov_diagnostic_biomakers === 'x') {
                innovations.push('Diagnostic/Biomakers')
            }
            if(pj.innov_med_tech === 'x') {
                innovations.push('Med Tech')
            }
            if(pj.innov_healthcare === 'x') {
                innovations.push('Healthcare IT/software')
            }
            if(pj.innov_health_services === 'x') {
                innovations.push('Health Services')
            }
            
            return {
                title: pj.title,
                cancer_types,
                stages,
                innovations,
            }
        })
    }
    renderCircle(node, ids, params, data) {
        
        const { pointSize, innovationTypeColors } = this.props;
        const { stageId, cancerId, innovName } = ids;
        const { innerRadius, outerRadius, startAngle, endAngle } = params;
        const innovId = toMachineName(innovName);
        const group = node.append('g');
        const dataFilteredByInnovationType = data.filter((pj) => (pj.innovations.includes(innovName)));

        // Calculate points to draw a circle.
        if (dataFilteredByInnovationType.length > 0) {
            const arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius).startAngle(startAngle).endAngle(endAngle);
            const path = group.append("svg:path").attr("class", "arc").attr("d", arc);
            const pos = path[0][0].getPointAtLength(0);

            group.append('circle')
                .attr("id", `circle_${stageId}_${cancerId}_${innovId}`)
                .attr("cx", pos.x)
                .attr("cy", pos.y)
                .attr("fill", innovationTypeColors[innovName])
                .attr("r", pointSize)

            group.append("text")
                .attr("id", `text_${stageId}_${cancerId}_${innovId}`)
                .style("font-size", pointSize)
                .style("text-anchor", "middle")
                .style("fill", "#fff")
                .attr("dx", pos.x)
                .attr("dy", pos.y + pointSize / 2.5)
                .text(dataFilteredByInnovationType.length)

            // Bind data to circle
            group.selectAll('circle')
                .data([dataFilteredByInnovationType])
                .on('mouseover', (d) => {
                    console.log(d)
                })

        }
    }
    renderPie(raw) {
        console.log(this.props);
        const { width, height, pointSize, firstSegmentRatio, pieTotalHeight, config, innovationTypeColors, colors } = this.props;
        
        // Dimensions of sunburst.
        // const width = 750;
        // const height = 750;
        const radius = Math.min(width, height) / 2;

        // const pointSize = 10;
        // const firstSegmentRatio = 2;
        // const pieTotalHeight = 240; // Need accurate calculation

        // Mapping of step names to colors.
        // const colors = ["#525252", "#757575", "#9c9c9c", "#c3c3c3", "#e5e5e5"];
        // const innovationTypeColors = {
        //     'Diagnostic/Biomakers': '#dc3912',
        //     'Health Services': '#109618',
        //     'Healthcare IT/Software': '#990099',
        //     'Med Tech': '#ff9900',
        //     'Therapeutics': '#3366cc',
        // };

        // Draw circle.
        const drawCircle = (node, ids, params, data) => {
            const { stageId, cancerId, innovName } = ids;
            const { innerRadius, outerRadius, startAngle, endAngle } = params;
            const innovId = toMachineName(innovName);
            const group = node.append('g');
            const dataFilteredByInnovationType = data.filter((pj) => (pj.innovations.includes(innovName)));

            // Calculate points to draw a circle.
            if (dataFilteredByInnovationType.length > 0) {
                const arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius).startAngle(startAngle).endAngle(endAngle);
                const path = group.append("svg:path").attr("class", "arc").attr("d", arc);
                const pos = path[0][0].getPointAtLength(0);

                group.append('circle')
                    .attr("id", `circle_${stageId}_${cancerId}_${innovId}`)
                    .attr("cx", pos.x)
                    .attr("cy", pos.y)
                    .attr("fill", innovationTypeColors[innovName])
                    .attr("r", pointSize)

                group.append("text")
                    .attr("id", `text_${stageId}_${cancerId}_${innovId}`)
                    .style("font-size", pointSize)
                    .style("text-anchor", "middle")
                    .style("fill", "#fff")
                    .attr("dx", pos.x)
                    .attr("dy", pos.y + pointSize / 2.5)
                    .text(dataFilteredByInnovationType.length)

                // Bind data to circle
                group.selectAll('circle')
                    .data([dataFilteredByInnovationType])
                    .on('mouseover', (d) => {
                        console.log(d)
                    })

            }
        }
        
        // const config = {
        //     type: [
        //         'Brain',
        //         'Breast',
        //         'Heme',
        //         'Lung',
        //         'Other',
        //         'Ovarian',
        //         'Pancreatic',
        //         'Prostate',
        //     ],
        //     innovation: [
        //         'Diagnostic/Biomakers',
        //         'Health Services',
        //         'Healthcare IT/Software',
        //         'Med Tech',
        //         'Therapeutics',
        //     ],
        //     stage: [
        //         'Adoption',
        //         'Dissemination',
        //         'Late Translation',
        //         'Early Translation',
        //         'Discovery',
        //     ],
        // };

        const pieHeight = pieTotalHeight / config.stage.length;

        const svg = d3.select("#chart").append("svg:svg")
            .attr("width", width)
            .attr("height", height)
            .append("svg:g")
            .attr("id", "container")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Render 5 stages (Discovery - Adaption )
        config.stage.map((stageName, stageIdx) => {
            
            // Filtered by stage
            const dataFilteredByStage = raw.filter((pj) => (pj.stages.includes(stageName)));

            const stageId = toMachineName(stageName);
            const segmentInnerRadius = stageIdx === 0 ? 0 : pieHeight * stageIdx + (pieHeight * firstSegmentRatio - pieHeight);
            const segmentOuterRadius = stageIdx === 0 ? pieHeight + (pieHeight * firstSegmentRatio - pieHeight) : pieHeight + segmentInnerRadius;

            // Render 8 cancer types
            config.type.map((cancerType, typeIdx) => {

                const dataFilteredByCancerType = dataFilteredByStage.filter((pj) => (pj.cancer_types.includes(cancerType)));
                const cancerId = toMachineName(cancerType);
                const segmentAngle = 360 / config.type.length;
                const offset = segmentAngle * typeIdx;

                const group = svg.append('g');

                // Draw each segments. (Background)
                /////////////////////////////////////////////////////////////////////////////////////////
                const arc = d3.svg.arc()
                    .innerRadius(segmentInnerRadius)
                    .outerRadius(segmentOuterRadius)
                    .startAngle(offset *  Math.PI / 180)
                    .endAngle( (segmentAngle + offset )  *  Math.PI / 180);
                
                const path = group.append("path")
                    .style('stroke', '#ddd')
                    .style('stroke-width', 1)
                    .attr('class', 'arc')
                    .attr('d', arc)
                    .attr('id', `seg_${stageId}_${cancerId}`)
                    .attr('fill', colors[stageIdx])

                if (stageIdx === config.stage.length -1 ) {
                    
                    // Draw outer segment for title
                    const outerArc = d3.svg.arc()
                        .innerRadius(segmentInnerRadius + pieHeight)
                        .outerRadius(segmentOuterRadius + pieHeight*0.7)
                        .startAngle(offset *  Math.PI / 180)
                        .endAngle( (segmentAngle + offset )  *  Math.PI / 180);
                    
                    const path = group.append("path")
                        .attr('class', 'arc')
                        .attr('d', outerArc)
                        .attr('id', `seg_outerArc`)
                        .attr('fill', '#fff')
                                        
                    // Put outer segment for title
                    const text = svg.append("text")
                        .style("text-anchor", "middle")
                        .attr('dy', -10);
                    
                    text.append("textPath")
                        .attr('startOffset', '22%')
                        .attr("stroke","black")
                        .attr("xlink:href", `#seg_${stageId}_${cancerId}`) // has to match
                        .text(cancerType.toUpperCase());
                    
                }
                /////////////////////////////////////////////////////////////////////////////////////////


                // Draw data
                /////////////////////////////////////////////////////////////////////////////////////////
                // Plot 5 points with data.
                switch(stageIdx){
                    case 0: // If it's first inner circle

                        // First line
                        for (let innovIdx = 0; innovIdx < 2; innovIdx++) {
                            const innovId = toMachineName(config.innovation[innovIdx]);

                            const angle = 360 / config.type.length / 2;
                            const params = {
                                innerRadius: segmentOuterRadius - pointSize * 1.5,
                                outerRadius: (segmentOuterRadius - pointSize * 1.5) + 1,
                                startAngle: (offset + angle * innovIdx + angle / 2) *  Math.PI / 180,
                                endAngle: ((offset + angle * innovIdx + 1 + angle / 2) *  Math.PI / 180)
                            }
                            drawCircle(group, { stageId, cancerId, innovName: config.innovation[innovIdx] }, params, dataFilteredByCancerType);                            
                        }

                        // Second line
                        for (let innovIdx=0; innovIdx<2; innovIdx++) {
                            const innovId = toMachineName(config.innovation[innovIdx+2]);
                            const originalAngle = 360 / config.type.length / 2;
                            const angle = 360 / config.type.length / 2;
                            const params = {
                                innerRadius: segmentOuterRadius - segmentOuterRadius / 2 + pointSize*0.75,
                                outerRadius: (segmentOuterRadius - segmentOuterRadius / 2) + pointSize*0.75 + 1,
                                startAngle: (originalAngle - angle + offset + angle * innovIdx + angle / 2) *  Math.PI / 180,
                                endAngle: ((originalAngle - angle + offset + angle * innovIdx + 1 + angle / 2) *  Math.PI / 180)
                            }
                            drawCircle(group, { stageId, cancerId, innovName: config.innovation[innovIdx+2] }, params, dataFilteredByCancerType);
                        }

                        // last one 
                        const innovId = toMachineName(config.innovation[4]);
                        const angle = 360 / config.type.length;
                        const params = {
                            innerRadius: pointSize*3,
                            outerRadius: (pointSize*3) + 1,
                            startAngle: (offset + angle/2) *  Math.PI / 180,
                            endAngle: ((offset + 5 + angle/2) *  Math.PI / 180)
                        }
                        drawCircle(group, { stageId, cancerId, innovName: config.innovation[4] }, params, dataFilteredByCancerType);

                        break;
                    case 1: // If it's second inner circle

                        // First line
                        for (let innovIdx=0; innovIdx<3; innovIdx++) {
                            const innovId = toMachineName(config.innovation[innovIdx]);
                            const angle = 360 / config.type.length / 3;
                            const params = {
                                innerRadius: segmentOuterRadius - pieHeight/2 + pointSize*0.8,
                                outerRadius: (segmentOuterRadius - pieHeight/2 + pointSize*0.8) + 1,
                                startAngle: (offset + angle*innovIdx + angle/2) *  Math.PI / 180,
                                endAngle: ((offset + angle*innovIdx + 1 + angle/2) *  Math.PI / 180)
                            }
                            drawCircle(group, { stageId, cancerId, innovName: config.innovation[innovIdx] }, params, dataFilteredByCancerType);
                        }

                        // Second line
                        for (let innovIdx=0; innovIdx<2; innovIdx++) {
                            const innovId = toMachineName(config.innovation[innovIdx+3]);
                            const originalAngle = 360 / config.type.length / 2;
                            const angle = 360 / config.type.length / 3;
                            const params = {
                                innerRadius: segmentOuterRadius - pieHeight/2 - pointSize,
                                outerRadius: (segmentOuterRadius - pieHeight/2 - pointSize) + 1,
                                startAngle: (originalAngle - angle + offset + angle*innovIdx + angle/2) *  Math.PI / 180,
                                endAngle: ((originalAngle - angle + offset + angle*innovIdx + 1 + angle/2) *  Math.PI / 180)
                            }
                            drawCircle(group, { stageId, cancerId, innovName: config.innovation[innovIdx+3] }, params, dataFilteredByCancerType);
                        }

                        break;
                    default:
                        for (let innovIdx=0; innovIdx<5; innovIdx++) {
                            const innovId = toMachineName(config.innovation[innovIdx]);
                            const angle = 360 / config.type.length / 5;
                            const params = {
                                innerRadius: segmentInnerRadius + pieHeight/2,
                                outerRadius: (segmentInnerRadius + pieHeight/2) + 1,
                                startAngle: (offset + angle*innovIdx + angle/2) *  Math.PI / 180,
                                endAngle: ((offset + angle*innovIdx + 0.5 + angle/2) *  Math.PI / 180)
                            }
                            drawCircle(group, { stageId, cancerId, innovName: config.innovation[innovIdx] }, params, dataFilteredByCancerType);
                        }
                        break; 
                }
                /////////////////////////////////////////////////////////////////////////////////////////

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
