// Designed by dtokita unless otherwise noted

// Object to convert state name to ISO codes used in map
let states_hash =
    {
        'Alabama': 'US-AL',
        'Alaska': 'US-AK',
        'Arizona': 'US-AZ',
        'Arkansas': 'US-AR',
        'California': 'US-CA',
        'Colorado': 'US-CO',
        'Connecticut': 'US-CT',
        'Delaware': 'US-DE',
        'District Of Columbia': 'US-DC',
        'Florida': 'US-FL',
        'Georgia': 'US-GA',
        'Hawaii': 'US-HI',
        'Idaho': 'US-ID',
        'Illinois': 'US-IL',
        'Indiana': 'US-IN',
        'Iowa': 'US-IA',
        'Kansas': 'US-KS',
        'Kentucky': 'US-KY',
        'Louisiana': 'US-LA',
        'Maine': 'US-ME',
        'Maryland': 'US-MD',
        'Massachusetts': 'US-MA',
        'Michigan': 'US-MI',
        'Minnesota': 'US-MN',
        'Mississippi': 'US-MS',
        'Missouri': 'US-MO',
        'Montana': 'US-MT',
        'Nebraska': 'US-NE',
        'Nevada': 'US-NV',
        'New Hampshire': 'US-NH',
        'New Jersey': 'US-NJ',
        'New Mexico': 'US-NM',
        'New York': 'US-NY',
        'North Carolina': 'US-NC',
        'North Dakota': 'US-ND',
        'Ohio': 'US-OH',
        'Oklahoma': 'US-OK',
        'Oregon': 'US-OR',
        'Pennsylvania': 'US-PA',
        'Puerto Rico': 'US-PR',
        'Rhode Island': 'US-RI',
        'South Carolina': 'US-SC',
        'South Dakota': 'US-SD',
        'Tennessee': 'US-TN',
        'Texas': 'US-TX',
        'Utah': 'US-UT',
        'Vermont': 'US-VT',
        'Virginia': 'US-VA',
        'Washington': 'US-WA',
        'West Virginia': 'US-WV',
        'Wisconsin': 'US-WI',
        'Wyoming': 'US-WY'
    };

// Object to map description of the data field to data field
let dataDescription = {
    'Incident_Rate': 'Confirmed cases per 100,000 persons',
    'Mortality_Rate': '(Number of recorded deaths * 100) / (Number of confirmed cases)',
    'Testing_Rate': 'Total number of people tested per 100,000 persons',
    'Hospitalization_Rate': '(Total number of people hospitalized * 100) / (Number of confirmed cases)',
    'Confirmed': 'Aggregated confirmed case count for the state',
    'Deaths': 'Aggregated death case count for the state',
    'Recovered': 'Aggregated recovered case count for the state (if data has been provided)',
    'People_Tested': 'Total number of people who have been tested for the state',
    'People_Hospitalized': 'Total number of people who have been hospitalized for the state'
};

// List containing democratic states based on the 2016 Election
let democraticStates2016 = [
    "US-CA",
    "US-CO",
    "US-CT",
    "US-DE",
    "US-HI",
    "US-IL",
    "US-ME",
    "US-MD",
    "US-MA",
    "US-MN",
    "US-NV",
    "US-NH",
    "US-NJ",
    "US-NM",
    "US-NY",
    "US-OR",
    "US-RI",
    "US-VT",
    "US-VA",
    "US-WA"
];

// List containing republican states based on the 2016 Election
let republicanStates2016 = [
    "US-AL",
    "US-AK",
    "US-AZ",
    "US-AR",
    "US-FL",
    "US-GA",
    "US-ID",
    "US-IN",
    "US-IA",
    "US-KS",
    "US-KY",
    "US-LA",
    "US-MI",
    "US-MS",
    "US-MO",
    "US-MT",
    "US-NE",
    "US-NC",
    "US-ND",
    "US-OH",
    "US-OK",
    "US-PA",
    "US-SC",
    "US-SD",
    "US-TN",
    "US-TX",
    "US-UT",
    "US-WV",
    "US-WI",
    "US-WY"
];

// List of democratic states based on the current governor
let democraticStatesGovernor = [
    "US-CA",
    "US-CO",
    "US-CT",
    "US-DE",
    "US-HI",
    "US-IL",
    "US-KS",
    "US-KY",
    "US-LA",
    "US-ME",
    "US-MI",
    "US-MN",
    "US-MT",
    "US-NV",
    "US-NJ",
    "US-NM",
    "US-NY",
    "US-NC",
    "US-OR",
    "US-PA",
    "US-RI",
    "US-VA",
    "US-WA",
    "US-WI"
];

// List of republican states based on the current governor
let republicanStatesGovernor = [
    "US-AL",
    "US-AK",
    "US-AZ",
    "US-AR",
    "US-FL",
    "US-GA",
    "US-ID",
    "US-IN",
    "US-IA",
    "US-MD",
    "US-MA",
    "US-MS",
    "US-MO",
    "US-NE",
    "US-NH",
    "US-ND",
    "US-OH",
    "US-OK",
    "US-SC",
    "US-SD",
    "US-TN",
    "US-TX",
    "US-UT",
    "US-VT",
    "US-WV",
    "US-WY"
];

// States in Western region as defined in the Census
let westStates = [
    "US-WA",
    "US-OR",
    "US-CA",
    "US-ID",
    "US-NV",
    "US-MT",
    "US-WY",
    "US-UT",
    "US-AZ",
    "US-CO",
    "US-NM"
];

// States in Midwest region as defined in Census
let midwestStates = [
    "US-ND",
    "US-SD",
    "US-NE",
    "US-KS",
    "US-MN",
    "US-IA",
    "US-MO",
    "US-WI",
    "US-IL",
    "US-MI",
    "US-IN",
    "US-OH"
];

// States in South region as defined in Census
let southStates = [
    "US-TX",
    "US-OK",
    "US-AR",
    "US-LA",
    "US-KY",
    "US-TN",
    "US-MS",
    "US-AL",
    "US-GA",
    "US-FL",
    "US-SC",
    "US-NC",
    "US-VA",
    "US-WV",
    "US-MD",
    "US-DE"
];

// States in Northeastern region as defined in Census
let northeastStates = [
    "US-PA",
    "US-NY",
    "US-NJ",
    "US-VT",
    "US-MA",
    "US-CT",
    "US-RI",
    "US-NH",
    "US-ME"
];

// States in Pacific region as defined in Census
let pacificStates = [
    "US-AK",
    "US-HI"
];

// Object containing the filter name mapping to the list of states
let globalFilters = {
    "democraticStates2016": democraticStates2016,
    "republicanStates2016": republicanStates2016,
    "democraticStatesGovernor": democraticStatesGovernor,
    "republicanStatesGovernor": republicanStatesGovernor,
    "westStates": westStates,
    "midwestStates": midwestStates,
    "southStates": southStates,
    "northeastStates": northeastStates,
    "pacificStates": pacificStates
};

// Globals to hold the data from get requests made to COVID-19 repository
var globalRows = null;
var countyRows = null;

// Globals to maintain the current states with counties shown, used during data field changes
var shownStatesCounty = [];
var shownStatesCountySeries = [];

// Helper function to populate US states map with the incident rate
function incidentRate(rows) {
    return rows.map(function(x) {
        return {
            'id': states_hash[x['Province_State']],
            'value': x['Incident_Rate']
        }
    })
}

$(function () {

    // Show instruction modal on page load
    $('#instruction-modal').modal('show');

    $('#data-explorer-instructions').click(function () {
        $('#instruction-modal').modal('show');
    });

    $('#control-panel-instructions').click(function() {
        $('#control-panel-modal').modal('show');
    });

    am4core.ready(function () {

        // Define yesterday's date in format stored in Github CSVs
        var today = new Date();

        var month = today.getMonth() + 1;

        if (month.toString().length == 1) {
            month = '0' + month;
        }

        var day = today.getDate() - 1;

        if (day.toString().length == 1) {
            day = '0' + day;
        }

        var date = month + '-' + day + '-' + today.getFullYear();

        // Populate control panel with yesterday's date
        $('#date').val(date);

        am4core.useTheme(am4themes_animated);

        // Fill the map container with a map of the US using Albers projection
        var chart = am4core.create("map-container", am4maps.MapChart);
        chart.geodata = am4geodata_usaLow;
        chart.projection = new am4maps.projections.AlbersUsa();

        // Create rules for shading the states based on the geodata presented
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.heatRules.push({
            property: "fill",
            target: polygonSeries.mapPolygons.template,
            min: chart.colors.getIndex(1).brighten(2),
            max: chart.colors.getIndex(1).brighten(-1)
        });
        polygonSeries.useGeodata = true;

        // Add listener for a click onto a specific state
        var polygonTemplate = polygonSeries.mapPolygons.template;

        polygonTemplate.events.on("hit", function(ev) {

            // Zoom into the state that was clicked
            ev.target.series.chart.zoomToMapObject(ev.target);

            // Change the control panel to county view
            $('#data-field').hide();
            $('#exclude-container').hide();
            $('#filter-container').hide();
            $('#return-to-state-container').show();
            $('#data-field-county').show();

            let val = $('#data-field-county :selected').val();
            $('#data-description').val(dataDescription[val]);

            // Get state that was targeted by zoom
            let targetName = ev.target.dataItem.dataContext.id;

            // Add state to list of states with county shown
            shownStatesCounty.push(targetName);

            let abbr = (targetName[3] + targetName[4]).toLowerCase();

            // Filter down data set for performance purposes
            tempRows = countyRows.filter(function(x) {
                return x['Province_State'] == ev.target.dataItem.dataContext.name;
            });

            // Initialize blank values for US map behind county maps to show outline of which states can be selected
            polygonSeries.data = globalRows.map(function(x) {
                return {
                    'id': '',
                    'value': 0
                }
            });

            // Get GeoJSON that describes the county lines for the particular zoomed state
            $.getScript('https://www.amcharts.com/lib/4/geodata/region/usa/' + abbr + 'Low.js', function()
            {
                var tempSeries = chart.series.push(new am4maps.MapPolygonSeries());
                tempSeries.geodata = eval('am4geodata_region_usa_' + abbr + 'Low');

                // Populate county data based on FIPS code
                tempSeries.data = tempRows.map(function(x) {
                    return {
                        'id': x['FIPS'],
                        'value': x[$('#data-field-county :selected').val()]
                    }
                });

                heatLegend.series = tempSeries;

                // Restablish tooltip text, legend and hover parameters
                var tempTemplate = tempSeries.mapPolygons.template;
                tempTemplate.tooltipText = "{name}: {value}";
                tempTemplate.nonScalingStroke = true;
                tempTemplate.strokeWidth = 0.5;

                tempSeries.heatRules.push({
                    property: "fill",
                    target: tempSeries.mapPolygons.template,
                    min: chart.colors.getIndex(1).brighten(2),
                    max: chart.colors.getIndex(1).brighten(-1)
                });

                var temphs = tempTemplate.states.create("hover");
                temphs.properties.fill = am4core.color("#3c5bdc");

                // Save reference to series for data update at a later time
                shownStatesCountySeries.push({
                    series: tempSeries,
                    state: ev.target.dataItem.dataContext.name
                });

            });
        });

        // Get daily US state data
        Plotly.d3.csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/' + date + '.csv', function (err, rows) {
            polygonSeries.data = incidentRate(rows);
            globalRows = rows;
        });

        // Get daily US county data
        Plotly.d3.csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/' + date + '.csv', function (err, rows) {
            countyRows = rows;
        });

        // Establish US state chart styling, including legend, tooltip, and hover listener
        var heatLegend = chart.createChild(am4maps.HeatLegend);
        heatLegend.series = polygonSeries;
        heatLegend.align = "right";
        heatLegend.valign = "bottom";
        heatLegend.width = am4core.percent(20);
        heatLegend.marginRight = am4core.percent(4);

        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {value}";
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.strokeWidth = 0.5;

        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#3c5bdc");

        // Whenver the data field, exclude, or include selects are changed
        $('.data-input').change(function () {

            // Get excludes
            let excludes = $('#exclude :selected').map(function() {
                return this.value
            }).get();

            // Get includes
            let filters = $('#filter :selected').map(function() {
                return this.value
            }).get();

            // Get current data field
            let val = $('#data-field :selected').val();

            var includes = [];

            for (var i = 0; i < filters.length; i++) {
                includes += globalFilters[filters[i]];
            }

            // Pass the map includes and excludes
            if (includes.length > 0) {
                polygonSeries.include = includes;
            } else {
                polygonSeries.include = null;
            }

            polygonSeries.exclude = excludes;

            // Populate map with data based on daily pull
            polygonSeries.data = globalRows.map(function(x) {

                // Do not populate data for excluded states
                if (excludes.includes(states_hash[x['Province_State']])) {
                    return {
                        'id': states_hash[x['Province_State']],
                        'value': 0
                    }
                }

                // If the state is in includes if includes exist
                if (x['Province_State'] in states_hash && (includes.includes(states_hash[x['Province_State']]) || includes.length === 0)) {
                    return {
                        'id': states_hash[x['Province_State']],
                        'value': x[val]
                    }
                } else {

                    return {
                        'id': states_hash[x['Province_State']],
                        'value': 0
                    }
                }

            });

            // Update data description accordingly
            $('#data-description').val(dataDescription[val]);
        });

        // Similar data-input update mechanism for counties
        $('.data-input-county').change(function() {

            // Get excludes
            let excludes = $('#exclude :selected').map(function() {
                return this.value
            }).get();

            // Get includes
            let filters = $('#filter :selected').map(function() {
                return this.value
            }).get();

            // Get current county data field
            let val = $('#data-field-county :selected').val();

            var includes = [];

            for (var i = 0; i < filters.length; i++) {
                includes += globalFilters[filters[i]];
            }

            // Pass map state includes and excludes
            if (includes.length > 0) {
                polygonSeries.include = includes;
            } else {
                polygonSeries.include = null;
            }

            polygonSeries.exclude = excludes;

            // Filter down rows to those with counties showing for performance purposes
            tempRows = countyRows.filter(function(x) {
                return shownStatesCounty.includes(states_hash[x['Province_State']]);
            });

            // Iterate through states with counties showing and populate the map with data if it exists
            $.each(shownStatesCountySeries, function(key, value) {
                tempRows = countyRows.filter(function(x) {
                    return x['Province_State'] == value['state']
                });

                value['series'].data = tempRows.map(function(x) {
                    return {
                        'id': x['FIPS'],
                        'value': x[val]
                    }
                })
            });

            // Update data description accordingly
            $('#data-description').val(dataDescription[val]);
        })

    });

    // Animate control panel borders
    anime({
        targets: '.control-panel-container',
        borderColor: '#000000',
        marginTop: '10px',
        height: '80vh',
        width: '22vw',
        easing: 'easeInOutQuad'
    });

    // Populate excludes multiple select from states hash
    for (let [key, value] of Object.entries(states_hash)) {
        let opt = '<option value="' + value + '">' + key + '</option>';

        $('#exclude').append(opt);
    }

    $('#return-to-state').click(function() {
        location.reload();
    })

});