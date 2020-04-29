states_hash =
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

var dataDescription = {
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
        var date = '0'+(today.getMonth()+1)+'-'+(today.getDate()-1)+'-'+(today.getFullYear());

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

        $('#data-field').change(function() {
            let excludes = $('#exclude :selected').map(function() {
                return this.value
            }).get();

            let val = $('#data-field :selected').val();

            polygonSeries.exclude = excludes;

            polygonSeries.data = globalRows.map(function(x) {

                if (excludes.includes(states_hash[x['Province_State']])) {

                    return {
                        'id': states_hash[x['Province_State']],
                        'value': 0
                    }
                }

                if (x['Province_State'] in states_hash) {
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

            $('#data-description').val(dataDescription[val]);

        });

        $('#exclude').change(function() {
            let excludes = $('#exclude :selected').map(function() {
                return this.value
            }).get();

            let val = $('#data-field :selected').val();

            polygonSeries.exclude = excludes;

            polygonSeries.data = globalRows.map(function(x) {

                if (excludes.includes(states_hash[x['Province_State']])) {

                    return {
                        'id': states_hash[x['Province_State']],
                        'value': 0
                    }
                }

                if (x['Province_State'] in states_hash) {
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

        });

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