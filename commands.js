const commands = async () => {
    const divs = [];
    axios.get('https://secret.auroradiscordbot.ga/commands')
        .then((response) => {
            response.data.filter(cmd => cmd.conf.category.toLowerCase() !== "owner").forEach(({ conf: { name, aliases, description, cooldown, permission: { bot, user }, usage, category }, commands }) => {
                const cmdHtml = [];
                cmdHtml.push(`<div class="title"><h3>${name}</h3><h3 class="cat">${category}</h3></div>`);
                cmdHtml.push(`<p>${description}</p>`);
                cmdHtml.push(`<hr>`);
                if (aliases.length) cmdHtml.push(`<p><b>Aliases: </b><code>${aliases.join(", ")}</code></p>`);
                cmdHtml.push(`<p><b>Cooldown: </b>${cooldown} Seconds</p>`);
                cmdHtml.push(`<p><b>Usage: </b><code>a&${name}${usage ? ` ${usage}` : ""}</code></p>`);
                if (bot.length) cmdHtml.push(`<p><b>Bot Permissions: </b><code>${bot.join(", ")}</code></p>`);
                if (user.length) cmdHtml.push(`<p><b>User Permissions: </b><code>${user.join(", ")}</code></p>`);
                if (commands.length) {
                    commands.forEach(sub => {
                        const subCmdHtml = [];
                        subCmdHtml.push(`<h4>${sub.name}</h4>`);
                        subCmdHtml.push(`<p>${sub.description}</p>`);
                        if (sub.aliases.length) subCmdHtml.push(`<p><b>Aliases: </b><code>${sub.aliases.join(", ")}</code></p>`)
                        subCmdHtml.push(`<p><b>Usage: </b><code>a&${sub.name}${sub.usage ? ` ${sub.usage}` : ""}</code></p>`);
                        cmdHtml.push(`<div class="subcommand">${subCmdHtml.join("")}</div>`)
                    })
                }
                divs.push(`<div class="command-box">${cmdHtml.join("")}</div>`);
            });
            $(`${divs.join("<br>")}`).appendTo(".commands");
        })
        .then(() => {
            $(document).ready(() => {
                $("#__LOADER__").css("display", "none");
            });
        });
};

commands();