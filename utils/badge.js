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
    // Information to include
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

    let svg = `
<svg width="800" height="240" viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="794" height="234" rx="10" fill="#F6ECDF" stroke="#C05A1C" stroke-width="1.5"/>

    <text x="30" y="40" font-family="monospace" font-size="18" fill="#808080" font-weight="normal">
        ${svc.id}
    </text>

    <text x="30" y="80" font-family="sans-serif" font-size="36" fill="#C05A1C" font-weight="bold">
        ${title}
    </text>

    <text x="30" y="110" font-family="sans-serif" font-size="24" fill="#404040">
        ${subtitle}
    </text>

    <line x1="20" y1="130" x2="774" y2="130" stroke="#C05A1C" stroke-width="3"/>

    <text x="30" y="135" font-family="sans-serif" font-size="18" fill="#404040">
        <tspan x="30" dy="1.3em">${desc_lines[0] ?? ''}</tspan>
        <tspan x="30" dy="1.3em">${desc_lines[1] ?? ''}</tspan>
        <tspan x="30" dy="1.3em">${desc_lines[2] ?? ''}</tspan>
    </text>
</svg>`;
    return svg.trim();
}
