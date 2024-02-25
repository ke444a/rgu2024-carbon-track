const BORDER_COLORS = {
    "red": "rgba(255, 99, 132, 1)",
    "orange": "rgba(255, 159, 64, 1)",
    "blue": "rgba(54, 162, 235, 1)",
    "green": "rgba(75, 192, 192, 1)"
};

export const processBorderColor = (pollutionScore: number) => {
    switch (pollutionScore) {
        case 1:
            return BORDER_COLORS.green;
        case 2:
            return BORDER_COLORS.blue;
        case 3:
            return BORDER_COLORS.orange;
        case 4:
            return BORDER_COLORS.red;
    }
};
