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

let pacificStates = [
    "US-AK",
    "US-HI"
];

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

var globalRows = null;

function incidentRate(rows) {
    return rows.map(function(x) {
        return {
            'id': states_hash[x['Province_State']],
            'value': x['Incident_Rate']
        }
    })
}

$(function () {

    $('#instruction-modal').modal('show');

    $('#data-explorer-instructions').click(function () {
        $('#instruction-modal').modal('show');
    });

    $('#control-panel-instructions').click(function() {
        $('#control-panel-modal').modal('show');
    });

    am4core.ready(function () {

        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("map-container", am4maps.MapChart);
        chart.geodata = am4geodata_usaLow;
        chart.projection = new am4maps.projections.AlbersUsa();

        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.heatRules.push({
            property: "fill",
            target: polygonSeries.mapPolygons.template,
            min: chart.colors.getIndex(1).brighten(1),
            max: chart.colors.getIndex(1).brighten(-0.3)
        });
        polygonSeries.useGeodata = true;


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

        $('#date').val(date);

        Plotly.d3.csv('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/' + date + '.csv', function (err, rows) {
            polygonSeries.data = incidentRate(rows);
            globalRows = rows;
        });

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

        $('.data-input').change(function () {
            let excludes = $('#exclude :selected').map(function() {
                return this.value
            }).get();

            let filters = $('#filter :selected').map(function() {
                return this.value
            }).get();

            let val = $('#data-field :selected').val();

            var includes = [];

            for (var i = 0; i < filters.length; i++) {
                includes += globalFilters[filters[i]];
            }

            if (includes.length > 0) {
                polygonSeries.include = includes;
            } else {
                polygonSeries.include = null;
            }

            polygonSeries.exclude = excludes;

            polygonSeries.data = globalRows.map(function(x) {

                if (excludes.includes(states_hash[x['Province_State']])) {
                    return {
                        'id': states_hash[x['Province_State']],
                        'value': 0
                    }
                }

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
        })

    });

    anime({
        targets: '.control-panel-container',
        borderColor: '#000000',
        marginTop: '10px',
        height: '80vh',
        width: '22vw',
        easing: 'easeInOutQuad'
    });

    for (let [key, value] of Object.entries(states_hash)) {
        let opt = '<option value="' + value + '">' + key + '</option>';

        $('#exclude').append(opt);
    }

});