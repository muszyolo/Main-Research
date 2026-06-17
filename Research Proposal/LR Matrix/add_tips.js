const fs = require('fs');
let html = fs.readFileSync('C:\\Users\\HP\\Desktop\\Main Research\\Research Proposal\\LR Matrix\\index.html', 'utf8');

const additionalTips = `
            // Content-Related Themes (Added)
            "Content Tip: Stigma is a major barrier for formal help-seeking in Malaysian ASD parents. Note if the study measures cultural stigma.",
            "Content Tip: Coping styles (emotion-focused vs problem-focused) are key predictors in clustering caregiver phenotypes.",
            "Content Tip: Check if informal support networks (family/friends) are documented, as they often substitute formal counseling.",
            "Content Tip: Religious coping is heavily prevalent in SE Asian contexts; ensure the study evaluates its role in help-seeking.",
            "Content Tip: Early intervention access disparities heavily bias the help-seeking timeline. Always note the child's age at diagnosis.",
            "Content Tip: Financial strain is the ultimate moderating variable. Does the study control for household income levels?",
`;

html = html.replace('// Grey Literature (WHO, NASOM, NARC)', additionalTips + '\n            // Grey Literature (WHO, NASOM, NARC)');

// Wait, the user said "change to 150s" for the breaking tips animation. Let's make sure it is exactly 150s.
html = html.replace(/animation:\s*ticker\s+\d+s\s+linear\s+infinite;/g, 'animation: ticker 150s linear infinite;');

fs.writeFileSync('C:\\Users\\HP\\Desktop\\Main Research\\Research Proposal\\LR Matrix\\index.html', html);
