import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Generate dates for four years
start_date = datetime(2020, 1, 1)
end_date = datetime(2023, 12, 31)
date_range = pd.date_range(start_date, end_date)

# Generate random data
np.random.seed(0)  # For reproducibility
total_sales = np.random.randint(500, 5000, size=len(date_range))
transactions = np.random.randint(50, 300, size=len(date_range))
total_hours_worked = np.random.randint(50, 200, size=len(date_range))
number_of_staff = np.random.randint(5, 20, size=len(date_range))

# Create DataFrame
data = {
    "Date": date_range,
    "Total Sales": total_sales,
    "Number of Transactions": transactions,
    "Total Hours Worked": total_hours_worked,
    "Number of Staff": number_of_staff
}

df = pd.DataFrame(data)

# Display the first few rows
print(df.head())

# Optionally, save to a CSV file
df.to_csv("internal_data_dummy_4_years.csv", index=False)



#weather that day .\ no if people visited that day, day 1 (no date) 768 days 