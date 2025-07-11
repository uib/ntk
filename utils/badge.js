function wrapText(text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
        if ((currentLine + word).length <= maxWidth) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
}

export function generate_badge(svc) {
    // SVG dimensions and styling
    const width = 800;
    const height = 240;
    const border_width = 5;
    const slider = 60;
    const padding = 25;
    const divider_offset = 0;
    const marker_size = 32;

    const bg_color = "#EEEEEE";
    const kicker_color = "#888888";
    const title_color = "brown";
    const text_color = "#222222";
    const line_color = "brown";
    const font_family = "sans-serif";

    // Extract information to include in the badge
    const title = svc.short_name
    let subtitle = svc.name
    if (subtitle.startsWith(title)) {
        subtitle = subtitle.slice(title.length).trim();
        if (subtitle.startsWith(":") || subtitle.startsWith("-") || subtitle.startsWith("–")) {
            subtitle = subtitle.slice(1).trimStart();
        }
    }
    let desc_lines = wrapText(svc.description ?? '', 84);
    if (desc_lines.length > 3) {
        desc_lines[2] += " ...";
    }
    const criticality_class = svc.criticality.charAt(0)

    let svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
       <rect id="outline" x="${border_width/2}" y="${border_width/2}" width="${width - border_width*2}" height="${height - border_width*2}" rx="20"  stroke-width="${border_width}"/>
       <clipPath id="outline-clip"> <use href="#outline" /> </clipPath>
    </defs>

    <use href="#outline"  fill="${bg_color}" stroke="none" />"
    <rect width="${border_width + slider}" height="${height}" fill="${line_color}" clip-path="url(#outline-clip)" />
    <text x="${border_width + slider/2}" y="${height/2-5}" text-anchor="middle" font-family="Courier" font-size="40" font-weight="bold" fill="${bg_color}">TJ</text>
    <text x="${border_width + slider/2}" y="${height/2+5}" text-anchor="middle" font-family="Verdana" font-size="8" font-weight="bold" fill="${bg_color}">katalogen</text>

    <text x="${border_width + slider + padding}" y="40" font-family="monospace" font-size="18" fill="${kicker_color}" font-weight="normal">
        ${svc.id}
    </text>

    <text x="${border_width + slider + padding}" y="80" font-family="${font_family}" font-size="36" fill="${title_color}" font-weight="bold">
        ${title}
    </text>

    <text x="${border_width + slider + padding}" y="110" font-family="${font_family}" font-size="24" fill="${text_color}">
        ${subtitle}
    </text>

    <line x1="${border_width + slider + padding - divider_offset}" y1="130" x2="${width - border_width*2 - padding + divider_offset}" y2="130" stroke="${line_color}" stroke-width="3"/>

    <text x="${border_width + slider + padding}" y="135" font-family="${font_family}" font-size="18" fill="#404040">
        <tspan x="${border_width + slider + padding}" dy="1.3em">${desc_lines[0] ?? ''}</tspan>
        <tspan x="${border_width + slider + padding}" dy="1.3em">${desc_lines[1] ?? ''}</tspan>
        <tspan x="${border_width + slider + padding}" dy="1.3em">${desc_lines[2] ?? ''}</tspan>
    </text>

    <!-- critically class -->
    <rect x="${width - border_width*2 - marker_size - 20 }" y="20" width="${marker_size}" height="${marker_size}" rx="4" fill="#ffffff" stroke="${line_color}" stroke-width="1.5" />
    <text x="${width - border_width*2 - marker_size/2 - 20 }" y="${20 + marker_size/2 + marker_size/10}" text-anchor="middle" alignment-baseline="middle" fill="${title_color}" font-family="${font_family}" font-weight="bold" font-size="${marker_size}">${criticality_class}</text>

    <use href="#outline" fill="none" stroke="${line_color}" />
</svg>`;
    return svg.trim();
}
