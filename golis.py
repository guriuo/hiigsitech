# --- Variable Setup ---
sambuus_price = 1.50
tea_price = 0.50
rice_price = 5.00
juice_price = 2.00

# This list represents the 8 tables. Each '0' means a table is empty.
tables = [0, 0, 0, 0, 0, 0, 0, 0]
max_tables = 8
max_seats = 4

# These are counters that start at zero.
total_customers = 0
customers_waited = 0
sambuus_income = 0.0
tea_income = 0.0
rice_income = 0.0
juice_income = 0.0

print("Hargeisa Cultural Centre Cafe")

# --- Main Program Loop ---
# This 'while' loop runs forever until you type 'exit'.
while True:
    print("\nNew Customer...")
    name = input("Enter customer name, or 'exit' to stop: ")

    # --- IF Statement and Control Flow ---
    # This 'if' checks the input. 'break' stops the main loop.
    if name == "exit":
        break

    # --- WHILE Loop for Calculation ---
    # This loop counts all the currently occupied seats.
    seats_taken = 0
    i = 0
    while i < max_tables:
        seats_taken = seats_taken + tables[i]
        i = i + 1

    # --- IF/ELSE Logic for Seating ---
    # This 'if' checks if the cafe is full.
    if seats_taken >= (max_tables * max_seats):
        print("Sorry, all seats are full. The customer has to wait.")
        customers_waited = customers_waited + 1
        # 'continue' skips the rest of this customer and goes to the top of the loop.
        continue
    else:
        print("Seat available for", name)

    # --- Nested WHILE Loop for Ordering ---
    order_total = 0.0
    order_is_drinks_only = True
    customer_order = [] # A list to hold items for one customer.

    while True:
        print("\n--- Menu ---")
        print("1. Sambuus      - $1.50")
        print("2. Tea          - $0.50")
        print("3. Rice w/ Meat - $5.00")
        print("4. Juice        - $2.00")
        print("5. Finish Order")

        choice = input("Choose an item (1-5): ")

        # --- IF/ELIF/ELSE for Menu Choices ---
        if choice == "1":
            item_name = "Sambuus"
            item_price = sambuus_price
            order_is_drinks_only = False
        elif choice == "2":
            item_name = "Tea"
            item_price = tea_price
        elif choice == "3":
            item_name = "Rice with Meat"
            item_price = rice_price
            order_is_drinks_only = False
        elif choice == "4":
            item_name = "Juice"
            item_price = juice_price
        elif choice == "5":
            # 'break' stops the inner ordering loop.
            break
        else:
            print("Wrong choice. Please enter a number from 1 to 5.")
            # 'continue' skips the rest and asks for a menu item again.
            continue
        
        # This part only runs if a valid item (1-4) was chosen.
        quantity_str = input("How many? (max 5): ")
        if quantity_str.isdigit() and 1 <= int(quantity_str) <= 5:
            quantity = int(quantity_str)
            total_for_item = item_price * quantity
            order_total = order_total + total_for_item
            customer_order.append([item_name, quantity, total_for_item])
            
            # This adds income to the correct counter
            if choice == "1": sambuus_income = sambuus_income + total_for_item
            if choice == "2": tea_income = tea_income + total_for_item
            if choice == "3": rice_income = rice_income + total_for_item
            if choice == "4": juice_income = juice_income + total_for_item
            
            print("Added to order.")
        else:
            print("Wrong quantity. Must be 1 to 5.")


    # --- IF Logic for Discounts and Fees ---
    if len(customer_order) > 0:
        final_price = order_total

        if order_total > 15:
            discount = order_total * 0.10
            final_price = final_price - discount
            print("A 10% discount was applied.")

        if order_is_drinks_only == True:
            service_fee = 0.50
            final_price = final_price + service_fee
            print("A $0.50 service fee was added.")

        # --- WHILE Loop to Find a Seat ---
        table_number = 0
        i = 0
        while i < max_tables:
            if tables[i] < max_seats:
                tables[i] = tables[i] + 1
                table_number = i + 1
                break # Stops looking for a table once one is found
            i = i + 1

        print("\n--- RECEIPT ---")
        print("Customer:", name)
        print("Table:", table_number)
        print("Items:")
        # --- FOR Loop to Print Items ---
        # This loop goes through each item in the customer's order list.
        for item in customer_order:
            print("  ", item[0], "x", item[1], " - $", item[2])
        print("Total to pay: $", final_price)
        print("---------------")

        total_customers = total_customers + 1

    # --- FOR Loop with range() to Show Status ---
    print("\n--- Seating ---")
    # This loop runs 8 times (for tables 0 through 7).
    for i in range(max_tables):
        print("Table", i + 1, ":", tables[i], "people")

# --- Final Report (runs after the loop ends) ---
print("\n--- End of Day Report ---")
print("Total customers:", total_customers)
print("Customers that waited:", customers_waited)
print("Income from Sambuus: $", sambuus_income)
print("Income from Tea: $", tea_income)
print("Income from Rice: $", rice_income)
print("Income from Juice: $", juice_income)
total_money = sambuus_income + tea_income + rice_income + juice_income
print("Total income: $", total_money)