export const processPollutionScore = (pollution: number): string => {
    switch (pollution) {
        case 1:
            return "Can drive to office";
        case 2:
            return "Should consider carpooling/public transport";
        case 3:
            return "Should consider WFH Hybrid for employee";
        case 4:
            return "Should consider Full WFH/alternate batch commute";
    }

    return "";
};