const BACKGROUND_COLORS = {
    "red": "rgba(255, 99, 132, 0.2)",
    "orange": "rgba(255, 159, 64, 0.2)",
    "blue": "rgba(54, 162, 235, 0.2)",
    "green": "rgba(75, 192, 192, 0.2)"
};

export const processBgColor = (pollutionScore: number) => {
    switch (pollutionScore) {
        case 1:
            return BACKGROUND_COLORS.green;
        case 2:
            return BACKGROUND_COLORS.blue;
        case 3:
            return BACKGROUND_COLORS.orange;
        case 4:
            return BACKGROUND_COLORS.red;
    }
};