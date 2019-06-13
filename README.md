## Portfolio Allocator: Data Visualization for Your Portfolio

### Overview: 

Portfolio Allocator is a data visualization tool built for investors to get an understanding of where their portfolio would stand in today's market. Using year-to-date, quarterly, and monthly data across various sectors, Investors' would be provided a visualization of the performance of their portfolio.

### Functionality and MVP 

- [ ] Construct a portfolio based on value and choice of sector exposure
- [ ] See the peformance of their portfolio and sector exposure
- [ ] Change sector exposure and its impact on portfolio value

### Wireframes

This application will consist of a single screen with three input field where the user would be able to specify a minimum portfolio value, the desired timeframe (YTD,quarterly, and monthly), and sector exposure. 

Based on the user's input, a pie chart will be rendered. Depicting portfolio performance along sector exposure. As the user hovers over the pie chart, he/she will be able to see the respective sectors along with percentage allocated.

### Technologies and Architecture

Portfolio Allocator will be built with the following technologies: 

- JavaScript to handle logic, computing data, and data retrieval
- `D3.js` + `HTML5` + `SVG` + `CSS3` for interactive visualization
- Webpack to bundle and serve up the various scripts

In addition to the webpack entry file, there will be three scripts involved in this project:

- data.js : handles the retrieval of data
- performance.js : handles the performance calculations
- performanceSummary.js: handles the rendering of visualizations for Summary 
- sectorChart.js : handles the rendering of visualizations for piechart

### Implementation Timeline

### Day 1: 

- Get webpack serving files
- Write a basic entry file
- Learn D3.js and SVG 
- Setup API requests: complete the data.js module


### Day 2: 
- Continue learning technologies mentioned above
- Notes on performance calulations
- Complete the performance.js module

### Day 3: 
- Complete the performanceSummary.js

### Day 4: 
- Work on styling
- Complete the sectorChart.js

### Day 5: 
- Complete styling