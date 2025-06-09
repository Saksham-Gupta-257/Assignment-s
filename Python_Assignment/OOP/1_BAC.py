class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount

acc = BankAccount(10000)
acc.deposit(5000)
acc.withdraw(100)
print("Balance:", acc.balance)