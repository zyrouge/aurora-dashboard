const botChart = () => {
    const key = "m784892050-8d5441d21dd9f5405211e7cc";
    axios.post("https://api.uptimerobot.com/v2/getMonitors", `api_key=${key}&format=json&response_times=1`, {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    })
    .then(res => {
        const monitor = res.data.monitors[0];
        switch (monitor.status) {
            case 8: $(".bot__title").addClass("__disrupted__"); break;
            case 9: $(".bot__title").addClass("__down__"); break;
            default: $(".bot__title").addClass("__up__");
        }
        var data = [];
        var labels = [];
        var monitors = monitor.response_times
            .sort((a, b) => b.datetime - a.datetime)
            .filter((m, index) => index < 20)
            .reverse();
        for (var i = 0; i < monitors.length; i++) {
            let current = monitors[i];
            let x = moment.unix(current.datetime).format("HH:mm");
            let y = parseInt(current.value);
            labels.push(`${x}`);
            data.push(y);
        }

        var dashboardChart = $("#bot__chart")[0].getContext('2d');
        new Chart(dashboardChart, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "Ping (in ms)",
                        data,
                        backgroundColor: 'rgba(162, 57, 202, 0.2)',
                        borderColor: 'rgba(162, 57, 202, 1)',
                        borderWidth: 1
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: false
                            }
                        }
                    ]
                }
            },
        });
    });
}

const dashboardChart = () => {
    const key = "m784804799-e0f8c9482c801f8c37e0c3d7";
    axios.post("https://api.uptimerobot.com/v2/getMonitors", `api_key=${key}&format=json&response_times=1`, {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
    })
    .then(res => {
        const monitor = res.data.monitors[0];
        switch (monitor.status) {
            case 8: $(".dashboard__title").addClass("__disrupted__"); break;
            case 9: $(".dashboard__title").addClass("__down__"); break;
            default: $(".dashboard__title").addClass("__up__");
        }
        var data = [];
        var labels = [];
        var monitors = monitor.response_times
            .sort((a, b) => b.datetime - a.datetime)
            .filter((m, index) => index < 20)
            .reverse();
        for (var i = 0; i < monitors.length; i++) {
            let current = monitors[i];
            let x = moment.unix(current.datetime).format("HH:mm");
            let y = parseInt(current.value);
            labels.push(`${x}`);
            data.push(y);
        }

        var dashboardChart = $("#dashboard__chart")[0].getContext('2d');
        new Chart(dashboardChart, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "Ping (in ms)",
                        data,
                        backgroundColor: 'rgba(162, 57, 202, 0.2)',
                        borderColor: 'rgba(162, 57, 202, 1)',
                        borderWidth: 1
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: false
                            }
                        }
                    ]
                }
            },
        });
    });
}

const incidents = () => {
    axios.get("https://secret.auroradiscordbot.ga/statuschannel")
    .then(({ data }) => {
        const incidentsHtml = [];
        data.forEach(incident => {
            const incidentHtml = `
             <div class="author">
                <div class="__author__">
                    <img src="https://cdn.discordapp.com/avatars/${incident.author.id}/${incident.author.avatar}.png?size=512">
                    <p class="username">
                        ${incident.author.username}
                    </p>
                </div>
                <p class="time">
                    ${moment(incident.unparsedTimestamp).format('DD/MM HH:mm')}
                </p>
            </div>
            <hr>
            <div class="text">${marked(incident.content)}</div>`;
            incidentsHtml.push(`<div class="incident">${incidentHtml}</div>`);
        });
        $(`${incidentsHtml.join("<br>")}`).appendTo(".incidents");
    })
    .then(() => {
        $(document).ready(() => {
            $("#__LOADER__").css("display", "none");
        });
    });
}

const status = () => {
    botChart();
    dashboardChart();
    incidents();
}

status();