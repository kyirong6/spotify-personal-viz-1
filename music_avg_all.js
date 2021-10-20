var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 560 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#avg-musical-all")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// I uploaded my data to gist
url = 'https://gist.githubusercontent.com/kyirong6/8ca723c85780d1a7312f3cb95f9ad4e1/raw/3994ea235abe38956f8e9c985f7d8e9983220df1/avg_all_musical_features_organized.csv';
d3.csv(url).then( function(data) {
    // X axis
    const x = d3.scaleBand()
                .range([ 0, width])
                .domain(data.map(d => d.feature))
                .padding(0.2);
    svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
                .domain([0, 1])
                .range([ height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.feature))
        .attr("y", d => y(parseFloat(d.percentage)))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(parseFloat(d.percentage)))
        .attr("fill", "#69b3a2")
})

const sv2 = d3.select("#avg-musical-range")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

url = "https://gist.githubusercontent.com/kyirong6/12e0a0c4ecdc346145af289733483b2f/raw/c8feb6f110eb0997d6d1f6e3637df0fa8b0f52bb/audio_features_over_time.csv"
d3.csv(url).then(function(data) {

    // List of groups (here I have one group per column)
    const allGroup = ['valence','liveness','danceability','energy','speechiness','acousticness','instrumentalness'];

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(d => d) // text showed in the menu
      .attr("value", d => d) // corresponding value returned by the button

    const x = d3.scalePoint()
	            .domain(['short_term', 'medium_term', 'long_term'])
                .range([ 0, width ]);;
    
    sv2.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");


    const y = d3.scaleLinear()
      .domain( [0,1])
      .range([ height, 0 ]);
    sv2.append("g")
      .call(d3.axisLeft(y));


    const line = sv2
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(d => x(d.time_frame))
          .y(d => y(parseFloat(d.valence)))
        )
        .attr("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "none")


    const dot = sv2
      .selectAll('circle')
      .data(data)
      .join('circle')
        .attr("cx", d => x(d.time_frame))
        .attr("cy", d => y(parseFloat(d.valence)))
        .attr("r", 7)
        .style("fill", "#69b3a2")


    function update(selectedGroup) {

      // Create new data with the selection?
      const dataFilter = data.map(function(d){return {time_frame: d.time_frame, value:d[selectedGroup]} })

      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(d => x(d.time_frame))
            .y(d => y(parseFloat(d.value)))
          )
      dot
        .data(dataFilter)
        .transition()
        .duration(1000)
          .attr("cx", d => x(d.time_frame))
          .attr("cy", d => y(parseFloat(d.value)))
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(event, d) {
        // recover the option that has been chosen
        let selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

})


// defined data here for ease of use. 
const data = [{'name': 'Brad Mehldau', 'genre': 'jazz'},
{'name': 'Shai Maestro', 'genre': 'jazz'},
{'name': 'Walter Smith III', 'genre': 'jazz'},
{'name': 'Aaron Parks', 'genre': 'jazz'},
{'name': 'Queen', 'genre': 'rock'},
{'name': 'Khatia Buniatishvili', 'genre': 'classical'},
{'name': 'Drake', 'genre': 'hip hop'},
{'name': 'Kendrick Scott Oracle', 'genre': 'jazz'},
{'name': 'Kurt Rosenwinkel', 'genre': 'jazz'},
{'name': 'Daniel Caesar', 'genre': 'hip pop'},
{'name': 'Ambrose Akinmusire', 'genre': 'jazz'},
{'name': 'Billie Eilish', 'genre': 'pop'},
{'name': 'Ben Wendel', 'genre': 'jazz'},
{'name': 'Brad Mehldau Trio', 'genre': 'jazz'},
{'name': 'Chet Baker', 'genre': 'jazz'},
{'name': 'Kanye West', 'genre': 'hip hop'},
{'name': 'Amine', 'genre': 'hip hop'},
{'name': 'Berliner Philharmoniker', 'genre': 'classical'},
{'name': 'Jacob Mann', 'genre': 'jazz'},
{'name': 'Omar Apollo', 'genre': 'pop'},
{'name': 'Tibetan Institute Of Performing Arts', 'genre': 'tibetan'},
{'name': 'Tigran Hamasyan', 'genre': 'jazz'},
{'name': 'Lana Del Rey', 'genre': 'pop'},
{'name': 'Joshua Redman', 'genre': 'jazz'},
{'name': 'Beyonce', 'genre': 'pop'},
{'name': 'Immanuel Wilkins', 'genre': 'jazz'},
{'name': 'Lady Gaga', 'genre': 'pop'},
{'name': 'Gerald Clayton', 'genre': 'jazz'},
{'name': 'Mark Turner', 'genre': 'jazz'},
{'name': 'Nir Felder', 'genre': 'jazz'},
{'name': 'Snoh Aalegra', 'genre': 'pop'},
{'name': 'Florence + The Machine', 'genre': 'pop'},
{'name': 'Arthur Rubinstein', 'genre': 'classical'},
{'name': 'Miguel', 'genre': 'hip hop'},
{'name': 'Still Woozy', 'genre': 'hip hop'},
{'name': 'Dayna Stephens', 'genre': 'jazz'},
{'name': 'Cigarettes After Sex', 'genre': 'rock'},
{'name': 'Seamus Blake', 'genre': 'jazz'},
{'name': 'Daft Punk', 'genre': 'electro'},
{'name': 'Lizzo', 'genre': 'pop'},
{'name': 'Doja Cat', 'genre': 'hip pop'},
{'name': 'Ari Hoenig', 'genre': 'jazz'},
{'name': 'Kali Uchis', 'genre': 'pop'},
{'name': 'Wallows', 'genre': 'pop'},
{'name': 'Tame Impala', 'genre': 'pop'},
{'name': 'The Beatles', 'genre': 'rock'},
{'name': 'Matt Brewer', 'genre': 'jazz'},
{'name': 'Tinashe', 'genre': 'pop'},
{'name': 'John Legend', 'genre': 'pop'},
{'name': 'Keith Jarrett Trio', 'genre': 'jazz'}]




const sv3 = d3.select("#artist-genre")
  .append("svg")
    .attr("width", 580)
    .attr("height", 500)


const x = d3.scaleOrdinal()
  .domain(['jazz', 'rock', 'classical', 'hip hop', 'pop', 'tibetan','electro'])
  .range([50, 125, 200, 275, 350, 425, 500])


const color = d3.scaleOrdinal()
  .domain(['jazz', 'rock', 'classical', 'hip hop', 'pop', 'tibetan','electro'])
  .range([ "#D32F2F", "#1976D2", "#2E7D32", "#FFFF00", "#FF5722", "#795548", "#607D8B"])



var Tooltip = d3.select("#avg-musical-range")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")

var mouseover = function(event, d) {
        Tooltip
          .style("opacity", .5)
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", .5)
      }
var mousemove = function(event, d) {
        Tooltip
          .text(d.name)
          .style("left", (d3.pointer(this)[0]+70) + "px")
          .style("top", (d3.pointer(this)[1]) + "px")
      }
var mouseleave = function(event, d) {
        Tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("opacity", 1)
      }



const node = sv3.append("g")
  .selectAll("circle")
  .data(data)
  .join("circle")
    .attr("r", 12)
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", d => color(d.genre))
    .style("fill-opacity", 0.8)
    .attr("stroke", "black")
    .style("stroke-width", 4)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .call(d3.drag() // call specific function when circle is dragged
         .on("start", dragstarted)
         .on("drag", dragged)
         .on("end", dragended));

var simulation = d3.forceSimulation()
    .force("x", d3.forceX().strength(3).x(d => x(d.genre)))
    .force("y", d3.forceY().strength(3).y( height/2 ))
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(.05)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.1).radius(18).iterations(1)) // Force that avoids circle overlapping

simulation
    .nodes(data)
    .on("tick", function(d){
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
    });

function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.03).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}
function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0.008);
  d.fx = null;
  d.fy = null;
}




var Svg = d3.select("#legend")


var keys = ['jazz', 'rock', 'classical', 'hip hop', 'pop', 'tibetan','electro'];


var colors = d3.scaleOrdinal()
  .domain(keys)
  .range([ "#D32F2F", "#1976D2", "#2E7D32", "#FFFF00", "#FF5722", "#795548", "#607D8B"]);


Svg.selectAll("mydots")
  .data(keys)
  .enter()
  .append("circle")
    .attr("cx", 100)
    .attr("cy", function(d,i){ return 100 + i*25}) 
    .attr("r", 9)
    .attr("stroke", "black")
    .style("stroke-width", 3)
    .style("fill", function(d){ return colors(d)})


Svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 120)
    .attr("y", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")

/*

function get_csv_music_features_data(url) {
    var data  = [];
    d3.csv(url, function(d) {
        data.push(
            { feature: d.feature, 
            percentage: parseFloat(d.percentage)
            }
        )
    });
    return data;
};
*/


//  url = 'https://gist.githubusercontent.com/kyirong6/8ca723c85780d1a7312f3cb95f9ad4e1/raw/3994ea235abe38956f8e9c985f7d8e9983220df1/avg_all_musical_features_organized.csv';
//musical_features_data = get_csv_music_features_data(url)
//console.log(musical_features_data)

// REFERENCE: https://www.d3-graph-gallery.com/index.html