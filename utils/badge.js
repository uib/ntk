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
    const border_width = 3;
    const padding = 40;
    const divider_offset = 20;
    const marker_size = 42;

    const bg_color = "#F6ECDF";
    const kicker_color = "#808080";
    const title_color = "#C05A1C";
    const text_color = "#404040";
    const line_color = "#C05A1C";
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
    let desc_lines = wrapText(svc.description ?? '', 90);
    if (desc_lines.length > 3) {
        desc_lines[2] += " ...";
    }
    const criticality_class = svc.criticality.charAt(0)

    let svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="${border_width/2}" y="${border_width/2}" width="${width - border_width*2}" height="${height - border_width*2}" rx="10" fill="${bg_color}" stroke="${line_color}" stroke-width="${border_width}"/>

    <text x="${border_width + padding}" y="40" font-family="monospace" font-size="18" fill="${kicker_color}" font-weight="normal">
        ${svc.id}
    </text>

    <text x="${border_width + padding}" y="80" font-family="${font_family}" font-size="36" fill="${title_color}" font-weight="bold">
        ${title}
    </text>

    <text x="${border_width + padding}" y="110" font-family="${font_family}" font-size="24" fill="${text_color}">
        ${subtitle}
    </text>

    <line x1="${border_width + padding - divider_offset}" y1="130" x2="${width - border_width*2 - padding + divider_offset}" y2="130" stroke="#C05A1C" stroke-width="3"/>

    <text x="${border_width + padding}" y="135" font-family="${font_family}" font-size="18" fill="#404040">
        <tspan x="${border_width + padding}" dy="1.3em">${desc_lines[0] ?? ''}</tspan>
        <tspan x="${border_width + padding}" dy="1.3em">${desc_lines[1] ?? ''}</tspan>
        <tspan x="${border_width + padding}" dy="1.3em">${desc_lines[2] ?? ''}</tspan>
    </text>

    <!-- critically class -->
    <rect x="${width - border_width*2 - marker_size - 20 }" y="20" width="${marker_size}" height="${marker_size}" rx="4" fill="#ffffff" stroke="${line_color}" stroke-width="1.5" />
    <text x="${width - border_width*2 - marker_size/2 - 20 }" y="${20 + marker_size/2 + marker_size/10}" text-anchor="middle" alignment-baseline="middle" fill="${title_color}" font-family="${font_family}" font-weight="bold" font-size="${marker_size}">${criticality_class}</text>
</svg>`;
    return svg.trim();
}
